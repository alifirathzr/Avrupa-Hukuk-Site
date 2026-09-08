require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.set('trust proxy', 1);
const db = new sqlite3.Database('./database.db');

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

app.use(express.static(path.join(__dirname, '.')));

// Tabloları oluştur
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, subject TEXT, message TEXT, is_read INTEGER DEFAULT 0, date DATETIME DEFAULT CURRENT_TIMESTAMP)");
    db.run("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, image_url TEXT)", () => {
        db.run("UPDATE categories SET image_url = '' WHERE image_url LIKE '/assets/%'");
        db.get("SELECT COUNT(*) as count FROM categories", (err, row) => {
            if (!err && row && row.count === 0) {
                const defaultCategories = [
                    "Ceza Hukuku", "Tazminat Hukuku", "Gayrimenkul Hukuku", 
                    "Medeni Hukuku", "Borçlar Hukuku", "İdare ve Vergi Hukuku", 
                    "AİHM ve Anayasa Mahkemesi'ne Bireysel Başvuru", "Arabuluculuk", "Mevzuat ve Yargıtay Kararları"
                ];
                const stmt = db.prepare("INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)");
                defaultCategories.forEach(name => {
                    stmt.run(name, "", "");
                });
                stmt.finalize();
            }
        });
    });
    db.run("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, summary TEXT, content TEXT, category TEXT, image TEXT, is_featured INTEGER DEFAULT 0, date DATETIME DEFAULT CURRENT_TIMESTAMP)", () => {
        db.run("UPDATE articles SET image = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' WHERE image LIKE '/assets/%'");
    });
    db.run("ALTER TABLE articles ADD COLUMN is_featured INTEGER DEFAULT 0", (err) => {
        if (err) console.log("Sütun zaten mevcut veya eklenemedi (normal olabilir):", err.message);
        else console.log("is_featured sütunu başarıyla eklendi.");
    });
    db.run("CREATE TABLE IF NOT EXISTS faqs (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer TEXT)");
    db.get("SELECT COUNT(*) as count FROM faqs", (err, row) => {
        if (!err && row && row.count === 0) {
            const defaultFaqs = [
                ["Hukuki danışmanlık hizmeti almak ücretli midir?", "Evet. 1136 Sayılı Avukatlık Kanunu ve TBB Meslek Kuralları uyarınca avukatların ücretsiz danışmanlık vermesi yasaktır. Danışmanlık ve dava ücretleri, her yıl yayınlanan Avukatlık Asgari Ücret Tarifesi esas alınarak belirlenmektedir."],
                ["Avukata vekaletname nasıl ve nereden verilir?", "Vekaletname, Türkiye'deki herhangi bir noterden, yurt dışında ise Türk Konsolosluklarından verilebilmektedir. Vekaletname çıkarılmadan önce avukatınızın belirteceği özel yetkilerin (örneğin sulh yetkisi, arabuluculuk yetkisi, feragat yetkisi vb.) vekaletnamede yer alması gerekmektedir."],
                ["Dava süreci ne kadar sürer ve ne sıklıkla bilgilendirme yapılır?", "Dava süreçleri; ilgili mahkemenin iş yüküne, delillerin toplanma hızına, tebligat sürelerine ve uyuşmazlığın niteliğine göre değişmektedir. Ofisimiz, davanızdaki her önemli gelişmede sizi anlık olarak bilgilendirmektedir."],
                ["Hukuki uyuşmazlıklarda arabuluculuk zorunlu mudur?", "İş uyuşmazlıkları, ticari davalar ve belirli kira uyuşmazlıklarında dava açmadan önce arabulucuya başvurulması yasal bir dava şartıdır. Arabuluculuk süreci anlaşmazlıkların mahkemeye taşınmadan hızlı ve ekonomik bir şekilde çözülmesini sağlar."],
                ["Şirketler için sürekli avukatlık ve danışmanlık hizmeti neleri kapsar?", "Şirket danışmanlığı; sözleşmelerin hazırlanması ve incelenmesi, iş hukuku süreçlerinin yönetilmesi, alacak takipleri ve olası hukuki risklerin önceden tespit edilerek önlem alınmasını (koruyucu hukuk) kapsar."]
            ];
            const stmt = db.prepare("INSERT INTO faqs (question, answer) VALUES (?, ?)");
            defaultFaqs.forEach(faq => {
                stmt.run(faq[0], faq[1]);
            });
            stmt.finalize();
        }
    });
});

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
app.delete('/api/categories/:id', requireAdminAuth, (req, res) => {
  const categoryId = req.params.id;
  db.run("DELETE FROM categories WHERE id = ?", [categoryId], function(err) {
    if (err) {
      console.error("Kategori silinirken hata:", err);
      return res.status(500).json({ error: "Veritabanı hatası: " + err.message });
    }
    if (this.changes > 0) {
      return res.json({ success: true, message: "Kategori başarıyla silindi." });
    } else {
      return res.status(404).json({ error: "Silinecek kategori bulunamadı." });
    }
  });
});

app.get('/api/categories', (req, res) => {
    db.all("SELECT * FROM categories", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows || []);
    });
});

app.get('/api/categories/:id', (req, res) => {
    db.get("SELECT * FROM categories WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Kategori bulunamadı" });
        res.json(row);
    });
});

app.post('/api/categories', requireAdminAuth, (req, res) => {
    const { name, description, image_url } = req.body;
    db.run("INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)", [name, description, image_url], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

// Admin Mesajlar Endpoint'i (Korumalı)
app.get('/api/admin/messages', requireAdminAuth, (req, res) => {
  try {
    db.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
      if (err) throw err;
      res.json(rows || []);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', contactLimiter, (req, res) => {
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const phone = sanitize(req.body.phone);
    const subject = sanitize(req.body.subject);
    const message = sanitize(req.body.message);

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Lütfen gerekli alanları doldurunuz." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Geçerli bir e-posta adresi giriniz." });
    }

    db.run("INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)", [name, email, phone, subject, message], function(err) {
        if (err) return res.status(500).json({ success: false, message: "Veritabanı hatası" });
        try {
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
                }, (mailErr) => {
                    if (mailErr) console.error('mailErr:', mailErr.message);
                });
            }
        } catch (e) {
            console.error('Mail servisi hatası:', e.message);
        }
        res.status(200).json({ success: true, message: "Mesajınız başarıyla iletildi." });
    });
});

app.delete('/api/admin/messages/:id', requireAdminAuth, (req, res) => {
    db.run("DELETE FROM messages WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.put('/api/admin/messages/:id/read', requireAdminAuth, (req, res) => {
    db.run("UPDATE messages SET is_read = 1 WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.get('/api/articles', (req, res) => {
    db.all("SELECT * FROM articles", [], (err, rows) => { res.json(rows || []); });
});
app.get('/api/articles/:id', (req, res) => {
    db.get("SELECT * FROM articles WHERE id = ?", [req.params.id], (err, row) => {
        if (err || !row) return res.status(404).json({ error: "Makale bulunamadı" });
        res.json(row);
    });
});


app.put('/api/articles/:id/feature', requireAdminAuth, (req, res) => {
    const { is_featured } = req.body;
    db.run("UPDATE articles SET is_featured = ? WHERE id = ?", [is_featured, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.post('/api/articles', requireAdminAuth, (req, res) => {
  try {
    const { title, summary, content, category, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Başlık ve içerik alanları zorunludur.' });
    }

    const fallbackImage = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80';
    const defaultImage = (image && image.trim() !== '') ? image : (categoryImages[category] || fallbackImage);
    const articleCategory = category || 'Genel';
    const createdDate = new Date().toISOString();

    db.run('INSERT INTO articles (title, summary, content, category, image, is_featured, date) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [title, summary || '', content, articleCategory, defaultImage, req.body.is_featured || 0, createdDate], 
        function(err) {
            if (err) throw err;
            return res.status(201).json({ 
                success: true, 
                message: 'Makale başarıyla eklendi.', 
                id: this.lastID 
            });
        });
  } catch (err) {
    console.error('Makale ekleme SQL hatası:', err.message);
    return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
  }
});

app.delete('/api/articles/:id', requireAdminAuth, (req, res) => {
    db.run("DELETE FROM articles WHERE id = ?", [req.params.id], (err) => { res.json({ success: true }); });
});

app.get('/api/faqs', (req, res) => {
    db.all("SELECT * FROM faqs", [], (err, rows) => { res.json(rows || []); });
});

const { headCommon, headerCommon, floatingAndNav, footerCommon } = require('./templates/common');
const makalelerListeTemplate = require('./templates/html_makaleler_liste.js');

app.get('/makaleler-liste.html', (req, res) => {
    res.send(makalelerListeTemplate);
});

app.post('/api/faqs', requireAdminAuth, (req, res) => {
    const { question, answer } = req.body;
    db.run("INSERT INTO faqs (question, answer) VALUES (?, ?)", [question, answer], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

app.delete('/api/faqs/:id', requireAdminAuth, (req, res) => {
    db.run("DELETE FROM faqs WHERE id = ?", [req.params.id], (err) => { res.json({ success: true }); });
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
