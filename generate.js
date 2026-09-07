const fs = require('fs');
const path = require('path');

// 1. Dizinleri Oluştur
const dirs = ['assets/css', 'assets/js'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// 2. Tüm Dosyalar
const files = {
    'assets/css/style.css': `
:root {
    --primary: #0d1b2a;
    --primary-light: #1b263b;
    --accent: #c5a059;
    --accent-hover: #d4af37;
    --bg-light: #f8f9fa;
    --text-dark: #333333;
    --text-muted: #6c757d;
    --white: #ffffff;
    --transition: all 0.3s ease;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: var(--bg-light); color: var(--text-dark); line-height: 1.6; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }

header { background-color: var(--primary); color: var(--white); position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.navbar { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; }
.logo { font-size: 1.25rem; font-weight: 600; letter-spacing: 1px; color: var(--accent); }
.nav-links { display: flex; gap: 1.5rem; }
.nav-links a { font-size: 0.95rem; transition: var(--transition); }
.nav-links a:hover, .nav-links a.active { color: var(--accent); }
.hamburger { display: none; cursor: pointer; font-size: 1.5rem; }

.hero { background: linear-gradient(rgba(13, 27, 42, 0.9), rgba(13, 27, 42, 0.9)); color: var(--white); padding: 6rem 2rem; text-align: center; }
.hero-content { max-width: 800px; margin: 0 auto; }
.hero h1 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--white); }
.hero h1 span { color: var(--accent); }
.hero p { font-size: 1.1rem; margin-bottom: 2rem; color: #e0e0e0; }

.btn { display: inline-block; background-color: var(--accent); color: var(--primary); padding: 0.75rem 1.75rem; border-radius: 4px; font-weight: 600; transition: var(--transition); }
.btn:hover { background-color: var(--accent-hover); transform: translateY(-2px); }

.container { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; }
.section-title { text-align: center; margin-bottom: 3rem; }
.section-title h2 { font-size: 2rem; color: var(--primary); margin-bottom: 0.5rem; }
.section-title .underline { height: 3px; width: 60px; background-color: var(--accent); margin: 0 auto; }

.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.card { background: var(--white); padding: 2rem; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: var(--transition); border-top: 3px solid var(--accent); }
.card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
.card h3 { color: var(--primary); margin-bottom: 1rem; }
.card p { color: var(--text-muted); font-size: 0.95rem; }

.contact-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; background: var(--white); padding: 3rem; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
.form-group input, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #ced4da; border-radius: 4px; font-size: 1rem; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--accent); }
.checkbox-group { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }
.checkbox-group input { width: auto; margin-top: 3px; }

footer { background-color: var(--primary); color: var(--white); text-align: center; padding: 2rem; margin-top: 4rem; font-size: 0.9rem; }
footer a { color: var(--accent); }

@media (max-width: 768px) {
    .nav-links { display: none; flex-direction: column; width: 100%; position: absolute; top: 100%; left: 0; background-color: var(--primary); padding: 1rem 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .nav-links.active { display: flex; }
    .hamburger { display: block; }
    .contact-wrapper { grid-template-columns: 1fr; padding: 1.5rem; }
    .hero h1 { font-size: 2rem; }
}
`,

    'assets/js/main.js': `
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const kvkkCheck = document.getElementById('kvkkCheck').checked;

            if (!name || !email || !message) {
                alert('Lütfen tüm zorunlu alanları doldurunuz.');
                return;
            }
            if (!kvkkCheck) {
                alert('Lütfen KVKK Aydınlatma Metni\\'ni onaylayınız.');
                return;
            }
            alert('Mesajınız başarıyla iletilmiştir.');
            contactForm.reset();
        });
    }
});
`,

    'index.html': `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avukat Barış Hezer | Hukuki Danışmanlık</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo">AV. BARIŞ HEZER</a>
            <div class="hamburger">&#9776;</div>
            <ul class="nav-links">
                <li><a href="index.html" class="active">Ana Sayfa</a></li>
                <li><a href="hakkimda.html">Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html">Çalışma Alanları</a></li>
                <li><a href="makaleler.html">Makaleler</a></li>
                <li><a href="iletisim.html">İletişim</a></li>
            </ul>
        </nav>
    </header>
    <section class="hero">
        <div class="hero-content">
            <h1>Avukat Barış Hezer <span>Hukuki Danışmanlık</span></h1>
            <p>Türkiye Barolar Birliği meslek kurallarına uygun, objektif ve güvenilir hukuki hizmetler.</p>
            <a href="iletisim.html" class="btn">İletişime Geçin</a>
        </div>
    </section>
    <main class="container">
        <div class="section-title">
            <h2>Çalışma Alanları</h2>
            <div class="underline"></div>
        </div>
        <div class="grid-3">
            <div class="card"><h3>Ceza Hukuku</h3><p>Ceza muhakemesi sürecinde yasal hakların korunması ve takibi.</p></div>
            <div class="card"><h3>İcra ve İflas Hukuku</h3><p>Alacak tahsili ve icra hukuku süreçlerinin yürütülmesi.</p></div>
            <div class="card"><h3>Gayrimenkul Hukuku</h3><p>Tapu, mülkiyet ve kira uyuşmazlıkları danışmanlığı.</p></div>
        </div>
    </main>
    <footer><p>&copy; 2026 Av. Barış Hezer. | <a href="kvkk.html">KVKK Aydınlatma Metni</a></p></footer>
    <script src="assets/js/main.js"></script>
</body>
</html>`,

    'hakkimda.html': `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hakkımda | Avukat Barış Hezer</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo">AV. BARIŞ HEZER</a>
            <div class="hamburger">&#9776;</div>
            <ul class="nav-links">
                <li><a href="index.html">Ana Sayfa</a></li>
                <li><a href="hakkimda.html" class="active">Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html">Çalışma Alanları</a></li>
                <li><a href="makaleler.html">Makaleler</a></li>
                <li><a href="iletisim.html">İletişim</a></li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <div class="section-title"><h2>Hakkımda</h2><div class="underline"></div></div>
        <div style="max-width: 800px; margin: 0 auto; background: var(--white); padding: 2.5rem; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <p style="margin-bottom: 1.5rem;">Av. Barış Hezer, hukukun üstünlüğü ilkesine bağlı olarak müvekkillerine şeffaf ve etik hukuki hizmet sunmaktadır. Türkiye Barolar Birliği meslek kurallarına bağlılık esastır.</p>
            <p>Hukuki uyuşmazlıkların çözümünde uzlaşma ve önleyici hukuk yolları önceliklidir.</p>
        </div>
    </main>
    <footer><p>&copy; 2026 Av. Barış Hezer. | <a href="kvkk.html">KVKK Aydınlatma Metni</a></p></footer>
    <script src="assets/js/main.js"></script>
</body>
</html>`,

    'uzmanlik-alanlari.html': `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Çalışma Alanları | Avukat Barış Hezer</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo">AV. BARIŞ HEZER</a>
            <div class="hamburger">&#9776;</div>
            <ul class="nav-links">
                <li><a href="index.html">Ana Sayfa</a></li>
                <li><a href="hakkimda.html">Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html" class="active">Çalışma Alanları</a></li>
                <li><a href="makaleler.html">Makaleler</a></li>
                <li><a href="iletisim.html">İletişim</a></li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <div class="section-title"><h2>Çalışma Alanları</h2><div class="underline"></div></div>
        <div class="grid-3">
            <div class="card"><h3>Ceza Hukuku</h3><p>Şüpheli ve sanık müdafii ile mağdur vekilleri hizmetleri.</p></div>
            <div class="card"><h3>İcra ve İflas</h3><p>İcra takiplerinin başlatılması ve alacak yönetimi.</p></div>
            <div class="card"><h3>Gayrimenkul</h3><p>Tapu iptal, tescil ve kira uyuşmazlıkları çözümleri.</p></div>
            <div class="card"><h3>Sözleşmeler</h3><p>Ticari ve hukuki sözleşmelerin hazırlanması ve incelenmesi.</p></div>
            <div class="card"><h3>İş Hukuku</h3><p>İşçi ve işveren uyuşmazlıklarının hukuki takibi.</p></div>
            <div class="card"><h3>İdare Hukuku</h3><p>İptal ve tam yargı davalarının yürütülmesi.</p></div>
        </div>
    </main>
    <footer><p>&copy; 2026 Av. Barış Hezer. | <a href="kvkk.html">KVKK Aydınlatma Metni</a></p></footer>
    <script src="assets/js/main.js"></script>
</body>
</html>`,

    'makaleler.html': `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Makaleler | Avukat Barış Hezer</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo">AV. BARIŞ HEZER</a>
            <div class="hamburger">&#9776;</div>
            <ul class="nav-links">
                <li><a href="index.html">Ana Sayfa</a></li>
                <li><a href="hakkimda.html">Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html">Çalışma Alanları</a></li>
                <li><a href="makaleler.html" class="active">Makaleler</a></li>
                <li><a href="iletisim.html">İletişim</a></li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <div class="section-title"><h2>Hukuki Makaleler</h2><div class="underline"></div></div>
        <div class="grid-3">
            <div class="card">
                <h3>Kira Tespit Davaları Esasları</h3>
                <p>Türk Borçlar Kanunu kapsamında kira bedelinin uyarlanması ve tespiti şartları.</p>
            </div>
            <div class="card">
                <h3>İcra Takibine İtiraz Yolları</h3>
                <p>İlamsız icra takiplerinde yetkiye ve borca itiraz süreleri ile hukuki sonuçları.</p>
            </div>
        </div>
    </main>
    <footer><p>&copy; 2026 Av. Barış Hezer. | <a href="kvkk.html">KVKK Aydınlatma Metni</a></p></footer>
    <script src="assets/js/main.js"></script>
</body>
</html>`,

    'iletisim.html': `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İletişim | Avukat Barış Hezer</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo">AV. BARIŞ HEZER</a>
            <div class="hamburger">&#9776;</div>
            <ul class="nav-links">
                <li><a href="index.html">Ana Sayfa</a></li>
                <li><a href="hakkimda.html">Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html">Çalışma Alanları</a></li>
                <li><a href="makaleler.html">Makaleler</a></li>
                <li><a href="iletisim.html" class="active">İletişim</a></li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <div class="section-title"><h2>İletişim</h2><div class="underline"></div></div>
        <div class="contact-wrapper">
            <div>
                <h3>İletişim Bilgileri</h3>
                <p style="margin-top: 1rem; color: var(--text-muted);">Randevu ve ön bilgilendirme için aşağıdaki form üzerinden iletişime geçebilirsiniz.</p>
            </div>
            <form id="contactForm">
                <div class="form-group">
                    <label for="name">Adınız Soyadınız</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">E-posta Adresiniz</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Mesajınız</label>
                    <textarea id="message" rows="5" required></textarea>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="kvkkCheck" required>
                    <label for="kvkkCheck"><a href="kvkk.html" target="_blank">KVKK Aydınlatma Metni</a>'ni okudum ve kabul ediyorum.</label>
                </div>
                <button type="submit" class="btn">Gönder</button>
            </form>
        </div>
    </main>
    <footer><p>&copy; 2026 Av. Barış Hezer. | <a href="kvkk.html">KVKK Aydınlatma Metni</a></p></footer>
    <script src="assets/js/main.js"></script>
</body>
</html>`,

    'kvkk.html': `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KVKK Aydınlatma Metni | Avukat Barış Hezer</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo">AV. BARIŞ HEZER</a>
            <div class="hamburger">&#9776;</div>
            <ul class="nav-links">
                <li><a href="index.html">Ana Sayfa</a></li>
                <li><a href="hakkimda.html">Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html">Çalışma Alanları</a></li>
                <li><a href="makaleler.html">Makaleler</a></li>
                <li><a href="iletisim.html">İletişim</a></li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <div class="section-title"><h2>KVKK Aydınlatma Metni</h2><div class="underline"></div></div>
        <div style="background: var(--white); padding: 2.5rem; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <p style="margin-bottom: 1rem;">6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Avukat Barış Hezer veri sorumlusu sıfatıyla tarafımıza iletilen kişisel verilerinizi mevzuata uygun işlemektedir.</p>
            <p>Toplanan kişisel verileriniz, yalnızca hukuki danışmanlık taleplerinin değerlendirilmesi ve iletişim süreçlerinin yürütülmesi amacıyla kullanılmaktadır.</p>
        </div>
    </main>
    <footer><p>&copy; 2026 Av. Barış Hezer. | <a href="kvkk.html">KVKK Aydınlatma Metni</a></p></footer>
    <script src="assets/js/main.js"></script>
</body>
</html>`
};

// 3. Dosyaları Yaz
Object.entries(files).forEach(([filePath, content]) => {
    fs.writeFileSync(filePath, content.trim(), 'utf-8');
    console.log(`[Oluşturuldu] ${filePath}`);
});

console.log("\nTüm site dosyaları başarıyla tamamlandı!");