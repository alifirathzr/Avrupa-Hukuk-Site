// Ortak Şablon Bileşenleri
const headCommon = (title, desc) => `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Av. Barış Hezer - Avrupa Hukuk Bürosu</title>
    <meta name="description" content="${desc}">
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title} | Av. Barış Hezer - Avrupa Hukuk Bürosu">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="https://img.icons8.com/ios-filled/50/c5a059/scale.png">
    <link rel="stylesheet" href="assets/css/style.css">
`;

const headerCommon = (activePage) => `
    <div class="nav-overlay"></div>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo">
                <div class="logo-icon-wrapper"><i class="fa-solid fa-scale-balanced"></i></div>
                <div class="logo-text">
                    <span class="lawyer-name">AV. BARIŞ HEZER</span>
                    <span class="office-name">Avrupa Hukuk Bürosu</span>
                </div>
            </a>
            <div class="hamburger"><i class="fa-solid fa-bars"></i></div>
            <ul class="nav-links">
                <li><a href="index.html" class="${activePage === 'index' ? 'active' : ''}"><i class="fa-solid fa-house"></i> Ana Sayfa</a></li>
                <li><a href="hakkimda.html" class="${activePage === 'hakkimda' ? 'active' : ''}"><i class="fa-solid fa-user-tie"></i> Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html" class="${activePage === 'uzmanlik' ? 'active' : ''}"><i class="fa-solid fa-gavel"></i> Çalışma Alanları</a></li>
                <li><a href="makaleler.html" class="${activePage === 'makaleler' ? 'active' : ''}"><i class="fa-solid fa-book-open"></i> Makaleler</a></li>
                <li><a href="iletisim.html" class="${activePage === 'iletisim' ? 'active' : ''}"><i class="fa-solid fa-envelope"></i> İletişim</a></li>
            </ul>
        </nav>
    </header>
`;

const floatingAndNav = (activePage) => `
    <!-- WhatsApp Floating Butonu (Sol Alt / Bottom-Left) -->
    <a href="https://wa.me/905325588865" class="whatsapp-float" target="_blank" rel="noopener noreferrer" title="WhatsApp İletişim Hattı" aria-label="WhatsApp İletişim Hattı">
        <i class="fa-brands fa-whatsapp"></i>
        <span class="whatsapp-tooltip">WhatsApp Danışma Hattı</span>
    </a>

    <!-- Sabit Alt Menü (Bottom Navigation - Mobil) -->
    <nav class="bottom-nav">
        <ul class="bottom-nav-items">
            <li><a href="index.html" class="bottom-nav-link ${activePage === 'index' ? 'active' : ''}"><i class="fa-solid fa-house"></i><span>Ana Sayfa</span></a></li>
            <li><a href="hakkimda.html" class="bottom-nav-link ${activePage === 'hakkimda' ? 'active' : ''}"><i class="fa-solid fa-user-tie"></i><span>Hakkımda</span></a></li>
            <li><a href="uzmanlik-alanlari.html" class="bottom-nav-link ${activePage === 'uzmanlik' ? 'active' : ''}"><i class="fa-solid fa-gavel"></i><span>Alanlar</span></a></li>
            <li><a href="makaleler.html" class="bottom-nav-link ${activePage === 'makaleler' ? 'active' : ''}"><i class="fa-solid fa-book-open"></i><span>Makaleler</span></a></li>
            <li><a href="iletisim.html" class="bottom-nav-link ${activePage === 'iletisim' ? 'active' : ''}"><i class="fa-solid fa-envelope"></i><span>İletişim</span></a></li>
        </ul>
    </nav>
`;

const footerCommon = `
    <footer>
        <p>&copy; 2026 Av. Barış Hezer - Avrupa Hukuk Bürosu. Bütün hakları saklıdır. | <a href="mailto:barishezer@gmail.com"><i class="fa-solid fa-envelope"></i> barishezer@gmail.com</a> | <a href="kvkk.html"><i class="fa-solid fa-shield-halved"></i> KVKK Aydınlatma Metni</a></p>
    </footer>
`;

module.exports = { headCommon, headerCommon, floatingAndNav, footerCommon };
