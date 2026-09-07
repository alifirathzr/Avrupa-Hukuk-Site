module.exports = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İletişim | Avukat Barış Hezer</title>
    <meta name="description" content="Avukat Barış Hezer Hukuk Ofisi iletişim bilgileri, adres haritası ve randevu formu. Doğrudan telefon veya e-posta yoluyla bize ulaşın.">
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://barishezer.av.tr/iletisim.html">
    <meta property="og:title" content="İletişim | Avukat Barış Hezer">
    <meta property="og:description" content="Randevu, hukuki ön bilgi ve danışmanlık talepleriniz için iletişim sayfamızı kullanın.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="icon" type="image/png" href="https://img.icons8.com/ios-filled/50/c5a059/scale.png">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body style="background-color: white;" class="iletisim-page">
    <div class="nav-overlay"></div>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo"><i class="fa-solid fa-scale-balanced"></i> AV. BARIŞ HEZER</a>
            <div class="hamburger"><i class="fa-solid fa-bars"></i></div>
            <ul class="nav-links">
                <li><a href="index.html"><i class="fa-solid fa-house"></i> Ana Sayfa</a></li>
                <li><a href="hakkimda.html"><i class="fa-solid fa-user-tie"></i> Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html"><i class="fa-solid fa-gavel"></i> Çalışma Alanları</a></li>
                <li><a href="makaleler.html"><i class="fa-solid fa-book-open"></i> Makaleler</a></li>
                <li><a href="iletisim.html" class="active"><i class="fa-solid fa-envelope"></i> İletişim</a></li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <div class="section-title">
            <h2>İletişim</h2>
            <div class="underline"></div>
        </div>
        <div class="contact-wrapper">
            <div>
                <h3>İletişim Bilgileri</h3>
                <p style="margin-top: 1rem; color: var(--text-muted); margin-bottom: 2rem;">Randevu ve ön bilgilendirme talepleriniz için aşağıdaki form üzerinden bizimle iletişime geçebilir ya da doğrudan telefon/e-posta yoluyla irtibat sağlayabilirsiniz.</p>
                
                <div class="contact-info-list">
                    <div class="contact-item">
                        <i class="fa-solid fa-phone"></i>
                        <div>
                            <h4>Telefon</h4>
                            <p><a href="tel:+905325588865" style="font-weight: 600; color: var(--accent);">+90 (532) 558 88 65</a></p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fa-brands fa-instagram"></i>
                        <div>
                            <h4>Instagram</h4>
                            <p><a href="https://www.instagram.com/av.hezerbaris/" target="_blank" style="font-weight: 600; color: var(--accent);">av.hezerbaris</a></p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fa-solid fa-envelope"></i>
                        <div>
                            <h4>E-posta</h4>
                            <p><a href="mailto:info@barishezer.av.tr" style="font-weight: 600; color: var(--accent);">info@barishezer.av.tr</a></p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fa-solid fa-location-dot"></i>
                        <div>
                            <h4>Adres</h4>
                            <p><a href="https://www.google.com/maps/dir/?api=1&destination=39.027631216442586,43.363873942376934" target="_blank" style="color: var(--text-dark); transition: var(--transition);" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--text-dark)'">Vanyolu Mahallesi Atakan Çelik Caddesi Atakan Çelik İş Merkezi Kat 3 Daire 10, Erciş / Van</a></p>
                            <p style="margin-top: 0.25rem;"><a href="https://www.google.com/maps/dir/?api=1&destination=39.027631216442586,43.363873942376934" target="_blank" style="font-size: 0.85rem; font-weight: 600; color: var(--accent);"><i class="fa-solid fa-diamond-turn-right"></i> Yol Tarifi Al</a></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3>İletişim Formu</h3>
                <form id="contactForm" style="margin-top: 1.5rem;">
                    <div class="form-group">
                        <label for="name">Adınız Soyadınız *</label>
                        <input type="text" id="name" required placeholder="Adınızı ve soyadınızı giriniz">
                    </div>
                    <div class="form-group">
                        <label for="email">E-posta Adresiniz *</label>
                        <input type="email" id="email" required placeholder="E-posta adresinizi giriniz">
                    </div>
                    <div class="form-group">
                        <label for="message">Mesajınız *</label>
                        <textarea id="message" rows="5" required placeholder="Uyuşmazlığınızın detaylarını özetleyiniz..."></textarea>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="kvkkCheck" required>
                        <label for="kvkkCheck"><a href="kvkk.html" target="_blank">KVKK Aydınlatma Metni</a>'ni okudum ve kabul ediyorum. *</label>
                    </div>
                    <button type="submit" class="btn" style="width: 100%; justify-content: center;"><i class="fa-solid fa-paper-plane"></i> Mesajı Gönder</button>
                </form>
            </div>
        </div>

        <div class="map-container">
            <iframe src="https://maps.google.com/maps?q=39.027631216442586,43.363873942376934&t=&z=17&ie=UTF8&iwloc=&output=embed" allowfullscreen="" loading="lazy"></iframe>
        </div>
    </main>
    <footer>
        <p>&copy; 2026 Av. Barış Hezer. | <a href="kvkk.html"><i class="fa-solid fa-shield-halved"></i> KVKK Aydınlatma Metni</a></p>
    </footer>
    <script src="assets/js/main.js"></script>
</body>
</html>`;
