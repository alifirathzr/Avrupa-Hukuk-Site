const fs = require('fs');
const path = require('path');

// 1. Dizinleri kontrol et
['assets/css', 'assets/js'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Ortak Elemanlar
const headerHTML = (activePage) => `
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
            <div class="hamburger">
                <i class="fa-solid fa-bars"></i>
            </div>
            <ul class="nav-links">
                <li><a href="index.html" class="${activePage === 'index' ? 'active' : ''}"><i class="fa-solid fa-house"></i> Ana Sayfa</a></li>
                <li><a href="hakkimda.html" class="${activePage === 'hakkimda' ? 'active' : ''}"><i class="fa-solid fa-user-tie"></i> Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html" class="${activePage === 'uzmanlik' ? 'active' : ''}"><i class="fa-solid fa-gavel"></i> Çalışma Alanları</a></li>
                <li><a href="makaleler.html" class="${activePage === 'makaleler' ? 'active' : ''}"><i class="fa-solid fa-book-open"></i> Makaleler</a></li>
                <li><a href="iletisim.html" class="${activePage === 'iletisim' ? 'active' : ''}"><i class="fa-solid fa-envelope"></i> İletişim</a></li>
                <li><a href="admin.html" class="${activePage === 'admin' ? 'active' : ''}" style="color: var(--accent);"><i class="fa-solid fa-lock"></i> Panel</a></li>
            </ul>
        </nav>
    </header>
`;

const whatsappAndBottomNav = (activePage) => `
    <!-- WhatsApp Floating Action Button -->
    <a href="https://wa.me/905325588865" class="whatsapp-float" target="_blank" rel="noopener noreferrer" title="WhatsApp İletişim Hattı" aria-label="WhatsApp İletişim">
        <i class="fa-brands fa-whatsapp"></i>
        <span class="whatsapp-tooltip">WhatsApp Danışma Hattı</span>
    </a>

    <!-- Fixed Bottom Navigation (Mobile) -->
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

const footerHTML = `
    <footer>
        <p>&copy; 2026 Av. Barış Hezer - Avrupa Hukuk Bürosu. Bütün hakları saklıdır. | <a href="mailto:barishezer@gmail.com"><i class="fa-solid fa-envelope"></i> barishezer@gmail.com</a> | <a href="kvkk.html"><i class="fa-solid fa-shield-halved"></i> KVKK Aydınlatma Metni</a></p>
    </footer>
`;

console.log("update_v2.js altyapısı hazırlandı.");
