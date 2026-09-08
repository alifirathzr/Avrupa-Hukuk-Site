const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

// CSP ve Güvenlik başlıklarını yapılandır (Yerel IP testleri için HSTS, COOP, OAC kısıtlamaları kapatıldı)
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
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://img.icons8.com", "https://images.unsplash.com", "https://img.icons8.com", "https://maps.gstatic.com", "https://maps.googleapis.com", "https://*.google.com", "https://*.googleapis.com"],
      frameSrc: ["'self'", "https://maps.google.com", "https://www.google.com", "https://*.google.com"],
      connectSrc: ["'self'", "https://maps.googleapis.com", "https://*.googleapis.com"],
    },
  },
}));

// DEBUG & CATEGORY DELETE (En üst sırada olmalı)
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  console.log(`>>> DELETE isteği yakalandı. ID: ${id}`);
  
  db.run("DELETE FROM categories WHERE id = ?", [id], function(err) {
    if (err) {
      console.error("Kategori silme hatası:", err);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes > 0) {
      console.log(`>>> ID ${id} kategorisi silindi.`);
      return res.json({ success: true, message: "Kategori silindi." });
    } else {
      console.warn(`>>> ID ${id} veritabanında bulunamadı.`);
      return res.status(404).json({ error: "Kategori bulunamadı." });
    }
  });
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
    db.run("CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, summary TEXT, content TEXT, category TEXT, image TEXT, is_featured INTEGER DEFAULT 0, date DATETIME DEFAULT CURRENT_TIMESTAMP)");
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
        user: 'hezeralifirat@gmail.com',
        pass: 'uzto gliu mmvq bhpz'
    }
});

// Kategori Görsel Eşleşmesi
const categoryImages = {
    "Ceza Hukuku": "/assets/img/categories/ceza.jpg",
    "Tazminat Hukuku": "/assets/img/categories/tazminat.jpg",
    "Gayrimenkul Hukuku": "/assets/img/categories/gayrimenkul.jpg",
    "Medeni Hukuku": "/assets/img/categories/medeni.jpg",
    "Borçlar Hukuku": "/assets/img/categories/borclar.jpg",
    "İdare ve Vergi Hukuku": "/assets/img/categories/idare.jpg",
    "AİHM ve Anayasa Mahkemesi'ne Bireysel Başvuru": "/assets/img/categories/aihm.jpg",
    "Arabuluculuk": "/assets/img/categories/arabuluculuk.jpg",
    "Mevzuat ve Yargıtay Kararları": "/assets/img/categories/mevzuat.jpg"
};

// API Routes
// === CATEGORY DELETE ENDPOINT (ÖNCELİKLİ) ===
app.delete('/api/categories/:id', (req, res) => {
  const categoryId = req.params.id;
  console.log(`[DELETE] /api/categories/${categoryId} isteği alındı.`);

  db.run("DELETE FROM categories WHERE id = ?", [categoryId], function(err) {
    if (err) {
      console.error("Kategori silinirken hata:", err);
      return res.status(500).json({ error: "Veritabanı hatası: " + err.message });
    }
    if (this.changes > 0) {
      console.log(`Kategori ID ${categoryId} başarıyla silindi.`);
      return res.json({ success: true, message: "Kategori başarıyla silindi." });
    } else {
      console.warn(`Kategori ID ${categoryId} bulunamadı.`);
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

app.post('/api/categories', (req, res) => {
    const { name, description, image_url } = req.body;
    db.run("INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)", [name, description, image_url], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

// 2. Admin Mesajlar Endpoint'i
app.get('/api/admin/messages', (req, res) => {
  try {
    db.all('SELECT * FROM messages ORDER BY id DESC', [], (err, rows) => {
      if (err) throw err;
      res.json(rows || []);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    db.run("INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)", [name, email, phone, subject, message], function(err) {
        if (err) return res.status(500).json({ success: false, message: "Veritabanı hatası" });
        try {
            transporter.sendMail({
                from: '"Av. Barış Hezer" <hezeralifirat@gmail.com>',
                to: 'barishezer@gmail.com',
                subject: 'Yeni İletişim Formu: ' + subject,
                html: `
                    <h2>Yeni İletişim Mesajı</h2>
                    <p><strong>İsim:</strong> ${name}</p>
                    <p><strong>E-posta:</strong> ${email}</p>
                    <p><strong>Telefon:</strong> ${phone}</p>
                    <p><strong>Konu:</strong> ${subject}</p>
                    <p><strong>Mesaj:</strong><br>${message.replace(/\n/g, '<br>')}</p>
                `
            }, (mailErr) => {
                if (mailErr) console.error('mailErr:', mailErr);
            });
        } catch (e) {
            console.error('Mail servisi hatası:', e);
        }
        res.status(200).json({ success: true, message: "Mesajınız alındı" });
    });
});

// Admin API - Messages
app.get('/api/admin/messages', (req, res) => {
    db.all("SELECT * FROM messages ORDER BY date DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.delete('/api/admin/messages/:id', (req, res) => {
    db.run("DELETE FROM messages WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.put('/api/admin/messages/:id/read', (req, res) => {
    db.run("UPDATE messages SET is_read = 1 WHERE id = ?", req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.get('/api/articles', (req, res) => {
    db.all("SELECT * FROM articles", [], (err, rows) => { res.json(rows); });
});
app.get('/api/articles/:id', (req, res) => {
    db.get("SELECT * FROM articles WHERE id = ?", [req.params.id], (err, row) => {
        if (err || !row) return res.status(404).json({ error: "Makale bulunamadı" });
        res.json(row);
    });
});


app.put('/api/articles/:id/feature', (req, res) => {
    const { is_featured } = req.body;
    db.run("UPDATE articles SET is_featured = ? WHERE id = ?", [is_featured, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.post('/api/articles', (req, res) => {
  try {
    const { title, summary, content, category, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Başlık ve içerik alanları zorunludur.' });
    }

    const defaultImage = (image && image.trim() !== '') ? image : (categoryImages[category] || '/assets/img/default-article.jpg');
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

app.delete('/api/articles/:id', (req, res) => {
    db.run("DELETE FROM articles WHERE id = ?", req.params.id, (err) => { res.json({ success: true }); });
});

app.get('/api/faqs', (req, res) => {
    db.all("SELECT * FROM faqs", [], (err, rows) => { res.json(rows); });
});

const { headCommon, headerCommon, floatingAndNav, footerCommon } = require('./templates/common');
const makalelerListeTemplate = require('./templates/html_makaleler_liste.js');

app.get('/makaleler-liste.html', (req, res) => {
    res.send(makalelerListeTemplate);
});


app.post('/api/faqs', (req, res) => {
    const { question, answer } = req.body;
    db.run("INSERT INTO faqs (question, answer) VALUES (?, ?)", [question, answer], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

app.delete('/api/faqs/:id', (req, res) => {
    db.run("DELETE FROM faqs WHERE id = ?", req.params.id, (err) => { res.json({ success: true }); });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor.`));
