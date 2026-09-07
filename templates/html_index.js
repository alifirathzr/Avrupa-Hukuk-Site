const { headCommon, headerCommon, floatingAndNav, footerCommon } = require('./common');

module.exports = `<!DOCTYPE html>
<html lang="tr">
<head>
${headCommon('Avukat Barış Hezer', 'Avukat Barış Hezer - Avrupa Hukuk Bürosu; Ceza, İcra, Tazminat, İş, İdare ve Sözleşmeler Hukuku alanlarında modern, etik ve güvenilir danışmanlık hizmetleri sunmaktadır.')}
</head>
<body>
${headerCommon('index')}

    <section class="hero">
        <div class="hero-content">
            <h1 class="hero-title">
                Avukat Barış Hezer
                <span class="hero-subtitle">AVRUPA HUKUK BÜROSU</span>
            </h1>
            <p class="hero-description">
                Türkiye Barolar Birliği meslek kurallarına uygun, objektif, şeffaf ve güvenilir hukuki hizmetler.
            </p>
            <a href="iletisim.html" class="btn-hero">
                <i class="fa-solid fa-paper-plane"></i> İletişime Geçin
            </a>
        </div>
    </section>

    <main class="container">
        <div class="section-title">
            <h2>Öne Çıkan Çalışma Alanları</h2>
            <div class="underline"></div>
        </div>
        <div class="grid-3">
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-gavel"></i></div>
                <h3>Ceza Hukuku</h3>
                <p>Soruşturma ve kovuşturma süreçlerinde anayasal hakların ve savunmanın etkin şekilde korunması, ceza davalarının takibi.</p>
                <a href="uzmanlik-alanlari.html" class="card-link">Detaylı Bilgi <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-building-columns"></i></div>
                <h3>İcra ve İflas Hukuku</h3>
                <p>Alacak tahsili, icra takipleri, borç yapılandırma ve iflas süreçlerinin yasal zemin çerçevesinde hızlıca yönetilmesi.</p>
                <a href="uzmanlik-alanlari.html" class="card-link">Detaylı Bilgi <i class="fa-solid fa-arrow-right"></i></a>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
                <h3>Tazminat Hukuku</h3>
                <p>Trafik kazaları, iş kazaları, tıbbi malpraktis ve haksız fiillerden doğan maddi ve manevi tazminat davalarının takibi ve tazminat hesaplamaları.</p>
                <a href="uzmanlik-alanlari.html" class="card-link">Detaylı Bilgi <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </div>
    </main>

${floatingAndNav('index')}
${footerCommon}
    <script src="assets/js/main.js"></script>
</body>
</html>`;
