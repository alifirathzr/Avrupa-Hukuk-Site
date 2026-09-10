require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@libsql/client');
const nodemailer = require('nodemailer');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.set('trust proxy', 1);

const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// CSP ve Güvenlik başlıklarını yapılandır
app.use(helmet({
  crossOriginOpenerPolicy: false,
  crossOriginEmbedderPolicy: false,
  originAgentCluster: false,
  hsts: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://maps.googleapis.com", "https://*.googleapis.com", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://img.icons8.com", "https://maps.gstatic.com", "https://maps.googleapis.com", "https://*.google.com", "https://*.googleapis.com"],
      frameSrc: ["'self'", "https://maps.google.com", "https://www.google.com", "https://*.google.com"],
      connectSrc: ["'self'", "https://maps.googleapis.com", "https://*.googleapis.com"],
    },
  },
}));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Hassas dosyalara doğrudan erişimi engelle (Veritabanı, ortam değişkenleri, kaynak kod)
app.use((req, res, next) => {
    const forbidden = [
        /^\/\.env/i,
        /^\/database/i,
        /^\/.*\.db/i,
        /^\/.*\.sqlite/i,
        /^\/server\.js/i,
        /^\/package(-lock)?\.json/i,
        /^\/\.git/i,
        /^\/\.gitignore/i,
        /^\/templates/i
    ];
    if (forbidden.some(regex => regex.test(req.path))) {
        return res.status(403).sendFile(path.join(__dirname, '404.html'));
    }
    next();
});

app.use((req, res, next) => {
    if (req.path.endsWith('.html') && req.path !== '/404.html') {
        return res.redirect(301, req.path.replace(/\.html$/, ''));
    }
    next();
});

app.use(express.static(path.join(__dirname, '.'), {
    extensions: ['html']
}));

// Tabloları ve başlangıç verilerini oluştur
async function initDb() {
    try {
        await db.execute("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, subject TEXT, message TEXT, is_read INTEGER DEFAULT 0, date DATETIME DEFAULT CURRENT_TIMESTAMP)");
        await db.execute("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, image_url TEXT)");
        
        const catCountRes = await db.execute("SELECT COUNT(*) as count FROM categories");
        const catCount = catCountRes.rows[0]?.count || 0;
        if (catCount === 0) {
            const defaultCategories = [
                "Ceza Hukuku", "Tazminat Hukuku", "Gayrimenkul Hukuku", 
                "Medeni Hukuku", "Borçlar Hukuku", "İdare ve Vergi Hukuku", 
                "AİHM ve Anayasa Mahkemesi'ne Bireysel Başvuru", "Arabuluculuk", "Mevzuat ve Yargıtay Kararları"
            ];
            for (const name of defaultCategories) {
                await db.execute({
                    sql: "INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)",
                    args: [name, "", ""]
                });
            }
        }

        await db.execute("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, summary TEXT, content TEXT, category TEXT, image TEXT, is_featured INTEGER DEFAULT 0, date DATETIME DEFAULT CURRENT_TIMESTAMP)");
        
        try {
            await db.execute("ALTER TABLE articles ADD COLUMN is_featured INTEGER DEFAULT 0");
        } catch (e) {
            // Sütun zaten mevcut olabilir
        }

        await db.execute("CREATE TABLE IF NOT EXISTS faqs (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer TEXT)");
        const faqCountRes = await db.execute("SELECT COUNT(*) as count FROM faqs");
        const faqCount = faqCountRes.rows[0]?.count || 0;
        if (faqCount === 0) {
            const defaultFaqs = [
                ["Hukuki danışmanlık hizmeti almak ücretli midir?", "Evet. 1136 Sayılı Avukatlık Kanunu ve TBB Meslek Kuralları uyarınca avukatların ücretsiz danışmanlık vermesi yasaktır. Danışmanlık ve dava ücretleri, her yıl yayınlanan Avukatlık Asgari Ücret Tarifesi esas alınarak belirlenmektedir."],
                ["Avukata vekaletname nasıl ve nereden verilir?", "Vekaletname, Türkiye'deki herhangi bir noterden, yurt dışında ise Türk Konsolosluklarından verilebilmektedir. Vekaletname çıkarılmadan önce avukatınızın belirteceği özel yetkilerin (örneğin sulh yetkisi, arabuluculuk yetkisi, feragat yetkisi vb.) vekaletnamede yer alması gerekmektedir."],
                ["Dava süreci ne kadar sürer ve ne sıklıkla bilgilendirme yapılır?", "Dava süreçleri; ilgili mahkemenin iş yüküne, delillerin toplanma hızına, tebligat sürelerine ve uyuşmazlığın niteliğine göre değişmektedir. Ofisimiz, davanızdaki her önemli gelişmede sizi anlık olarak bilgilendirmektedir."],
                ["Hukuki uyuşmazlıklarda arabuluculuk zorunlu mudur?", "İş uyuşmazlıkları, ticari davalar ve belirli kira uyuşmazlıklarında dava açmadan önce arabulucuya başvurulması yasal bir dava şartıdır. Arabuluculuk süreci anlaşmazlıkların mahkemeye taşınmadan hızlı ve ekonomik bir şekilde çözülmesini sağlar."],
                ["Şirketler için sürekli avukatlık ve danışmanlık hizmeti neleri kapsar?", "Şirket danışmanlığı; sözleşmelerin hazırlanması ve incelenmesi, iş hukuku süreçlerinin yönetilmesi, alacak takipleri ve olası hukuki risklerin önceden tespit edilerek önlem alınmasını (koruyucu hukuk) kapsar."]
            ];
            for (const [q, a] of defaultFaqs) {
                await db.execute({
                    sql: "INSERT INTO faqs (question, answer) VALUES (?, ?)",
                    args: [q, a]
                });
            }
        }
        console.log("Turso veritabanı bağlantısı ve tablolar başarıyla hazır.");
    } catch (err) {
        console.error("Veritabanı başlatma hatası:", err);
    }
}

initDb();

// Nodemailer yapılandırması
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Admin Kimlik Doğrulama & Token Fonksiyonları
function generateToken(username) {
    const payload = JSON.stringify({
        username,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 saat geçerli
    });
    const payloadB64 = Buffer.from(payload).toString('base64url');
    const secret = process.env.ADMIN_SECRET || 'baris_hezer_secret_legal_key_2026';
    const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
    return `${payloadB64}.${signature}`;
}

function verifyToken(token) {
    try {
        if (!token) return null;
        const parts = token.split('.');
        if (parts.length !== 2) return null;
        const [payloadB64, signature] = parts;
        const secret = process.env.ADMIN_SECRET || 'baris_hezer_secret_legal_key_2026';
        const expectedSignature = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url');
        if (signature !== expectedSignature) return null;
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
        if (Date.now() > payload.exp) return null;
        return payload;
    } catch (e) {
        return null;
    }
}

function requireAdminAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const user = verifyToken(token);
    if (!user) {
        return res.status(401).json({ error: 'Yetkisiz erişim. Lütfen giriş yapınız.' });
    }
    req.adminUser = user;
    next();
}

// Rate limiter for contact form & login
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, message: 'Çok fazla mesaj gönderildi. Lütfen daha sonra tekrar deneyin.' }
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, error: 'Çok fazla hatalı giriş denemesi yapıldı. Lütfen 15 dakika sonra tekrar deneyin.' }
});

function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
}

// Admin Giriş Endpoint'i
app.post('/api/admin/login', loginLimiter, (req, res) => {
    const { username, password } = req.body;
    const validUser = process.env.ADMIN_USER || 'admin';
    const validPass = process.env.ADMIN_PASS || 'BarisHezer2026!';
    if (username === validUser && password === validPass) {
        const token = generateToken(username);
        return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, error: 'Kullanıcı adı veya şifre hatalı.' });
});

// Kategori Görsel Eşleşmesi
const fallbackImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80';
const categoryImages = {
    "Ceza Hukuku": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    "Tazminat Hukuku": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    "Gayrimenkul Hukuku": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    "Medeni Hukuku": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    "Borçlar Hukuku": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    "İdare ve Vergi Hukuku": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "AİHM ve Anayasa Mahkemesi'ne Bireysel Başvuru": "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=80",
    "Arabuluculuk": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    "Mevzuat ve Yargıtay Kararları": "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=800&q=80"
};

// API Routes
// === CATEGORY DELETE ENDPOINT (ÖNCELİKLİ) ===
app.delete('/api/categories/:id', requireAdminAuth, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const rs = await db.execute({ sql: "DELETE FROM categories WHERE id = ?", args: [categoryId] });
    if (rs.rowsAffected > 0) {
      return res.json({ success: true, message: "Kategori başarıyla silindi." });
    } else {
      return res.status(404).json({ error: "Silinecek kategori bulunamadı." });
    }
  } catch (err) {
    console.error("Kategori silinirken hata:", err);
    return res.status(500).json({ error: "Veritabanı hatası: " + err.message });
  }
});

app.get('/api/categories', async (req, res) => {
    try {
        const rs = await db.execute("SELECT * FROM categories");
        res.json(rs.rows || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/categories/:id', async (req, res) => {
    try {
        const rs = await db.execute({ sql: "SELECT * FROM categories WHERE id = ?", args: [req.params.id] });
        const row = rs.rows[0];
        if (!row) return res.status(404).json({ error: "Kategori bulunamadı" });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/categories', requireAdminAuth, async (req, res) => {
    try {
        const { name, description, image_url } = req.body;
        const rs = await db.execute({
            sql: "INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)",
            args: [name, description, image_url]
        });
        res.json({ success: true, id: Number(rs.lastInsertRowid) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Mesajlar Endpoint'i (Korumalı)
app.get('/api/admin/messages', requireAdminAuth, async (req, res) => {
  try {
    const rs = await db.execute('SELECT * FROM messages ORDER BY id DESC');
    res.json(rs.rows || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const phone = sanitize(req.body.phone);
    const subject = sanitize(req.body.subject);
    const message = sanitize(req.body.message);

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, message: "Lütfen gerekli alanları doldurunuz." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Geçerli bir e-posta adresi giriniz." });
    }

    try {
        await db.execute({
            sql: "INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
            args: [name, email, phone, subject, message]
        });

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            transporter.sendMail({
                from: `"Av. Barış Hezer" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER,
                subject: 'Yeni İletişim Formu: ' + (subject || 'Genel'),
                html: `
                    <h2>Yeni İletişim Mesajı</h2>
                    <p><strong>İsim:</strong> ${name}</p>
                    <p><strong>E-posta:</strong> ${email}</p>
                    <p><strong>Telefon:</strong> ${phone || '-'}</p>
                    <p><strong>Konu:</strong> ${subject || '-'}</p>
                    <p><strong>Mesaj:</strong><br>${message.replace(/\n/g, '<br>')}</p>
                `
            }).catch(mailErr => console.error('mailErr:', mailErr.message));
        }

        res.status(200).json({ success: true, message: "Mesajınız başarıyla iletildi." });
    } catch (err) {
        console.error('İletişim formu hatası:', err);
        res.status(500).json({ success: false, message: "Veritabanı hatası" });
    }
});

app.delete('/api/admin/messages/:id', requireAdminAuth, async (req, res) => {
    try {
        await db.execute({ sql: "DELETE FROM messages WHERE id = ?", args: [req.params.id] });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/messages/:id/read', requireAdminAuth, async (req, res) => {
    try {
        await db.execute({ sql: "UPDATE messages SET is_read = 1 WHERE id = ?", args: [req.params.id] });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/articles', async (req, res) => {
    try {
        const rs = await db.execute("SELECT * FROM articles");
        res.json(rs.rows || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/articles/:id', async (req, res) => {
    try {
        const rs = await db.execute({ sql: "SELECT * FROM articles WHERE id = ?", args: [req.params.id] });
        const row = rs.rows[0];
        if (!row) return res.status(404).json({ error: "Makale bulunamadı" });
        res.json(row);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/articles/:id/feature', requireAdminAuth, async (req, res) => {
    try {
        const { is_featured } = req.body;
        await db.execute({ sql: "UPDATE articles SET is_featured = ? WHERE id = ?", args: [is_featured, req.params.id] });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/articles', requireAdminAuth, async (req, res) => {
  try {
    const { title, summary, content, category, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Başlık ve içerik alanları zorunludur.' });
    }

    const fallbackImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80';
    const defaultImage = (image && image.trim() !== '') ? image : (categoryImages[category] || fallbackImage);
    const articleCategory = category || 'Genel';
    const createdDate = new Date().toISOString();

    const rs = await db.execute({
        sql: 'INSERT INTO articles (title, summary, content, category, image, is_featured, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
        args: [title, summary || '', content, articleCategory, defaultImage, req.body.is_featured || 0, createdDate]
    });

    return res.status(201).json({ 
        success: true, 
        message: 'Makale başarıyla eklendi.', 
        id: Number(rs.lastInsertRowid) 
    });
  } catch (err) {
    console.error('Makale ekleme SQL hatası:', err.message);
    return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
  }
});

app.delete('/api/articles/:id', requireAdminAuth, async (req, res) => {
    try {
        await db.execute({ sql: "DELETE FROM articles WHERE id = ?", args: [req.params.id] });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/faqs', async (req, res) => {
    try {
        const rs = await db.execute("SELECT * FROM faqs");
        res.json(rs.rows || []);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const { headCommon, headerCommon, floatingAndNav, footerCommon } = require('./templates/common');
const makalelerListeTemplate = require('./templates/html_makaleler_liste.js');

app.get('/makaleler-liste.html', (req, res) => {
    res.send(makalelerListeTemplate);
});

app.post('/api/faqs', requireAdminAuth, async (req, res) => {
    try {
        const { question, answer } = req.body;
        const rs = await db.execute({
            sql: "INSERT INTO faqs (question, answer) VALUES (?, ?)",
            args: [question, answer]
        });
        res.json({ success: true, id: Number(rs.lastInsertRowid) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/faqs/:id', requireAdminAuth, async (req, res) => {
    try {
        await db.execute({ sql: "DELETE FROM faqs WHERE id = ?", args: [req.params.id] });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/yonetim-panel-gizli-89234', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'admin.html'));
});

app.get('/favicon.ico', (req, res) => {
    res.redirect('https://img.icons8.com/ios-filled/50/c5a059/scale.png');
});

// 404 Fallback Middleware
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor.`));
