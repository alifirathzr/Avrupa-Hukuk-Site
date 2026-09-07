const { headCommon, headerCommon, floatingAndNav, footerCommon } = require('./common');

module.exports = `<!DOCTYPE html>
<html lang="tr">
<head>
${headCommon('Çalışma Alanları', 'Avukat Barış Hezer - Avrupa Hukuk Bürosu; Ceza, İcra, Aile, Tazminat, Gayrimenkul, Sözleşmeler, İş ve İdare Hukuku alanlarında uzman çözümler sunar.')}
</head>
<body style="background-color: white;">
${headerCommon('uzmanlik')}

    <main class="container">
        <div class="section-title">
            <h2 style="color: #0d1b2a;">Çalışma Alanları</h2>
            <div class="underline"></div>
        </div>
        <div class="grid-3">
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-gavel"></i></div>
                <h3>Ceza Hukuku</h3>
                <p>Şüpheli ve sanık müdafiiliği, mağdur ve katılan vekilliği, ağır ceza ve asliye ceza mahkemelerinde savunma hazırlığı ve duruşma takibi.</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-building-columns"></i></div>
                <h3>İcra ve İflas Hukuku</h3>
                <p>İlamsız ve ilamlı icra takipleri, karşılıksız çek davaları, ihtiyati haciz kararları, borçlunun malvarlığı araştırması ve tahsilat süreçleri.</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-people-roof"></i></div>
                <h3>Aile Hukuku</h3>
                <p>Anlaşmalı ve çekişmeli boşanma davaları, nafaka talepleri, velayet uyuşmazlıkları, ziynet eşyası, mal rejimi tasfiyesi ve soybağı davaları.</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
                <h3>Tazminat Hukuku</h3>
                <p>Trafik ve iş kazalarından kaynaklanan tazminatlar, tıbbi uygulama hataları (malpraktis), destekten yoksun kalma ve haksız fiil davaları.</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-house-chimney"></i></div>
                <h3>Gayrimenkul Hukuku</h3>
                <p>Tapu iptal ve tescil davaları, ortaklığın giderilmesi (izale-i şüyu), ecrimisil davaları, kira bedelinin tespiti ve tahliye davaları.</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-file-contract"></i></div>
                <h3>Sözleşmeler Hukuku</h3>
                <p>Ticari sözleşmeler, kat karşılığı inşaat sözleşmeleri, kira sözleşmeleri, ortaklık ve hisse devri sözleşmelerinin hukuki analizi ve hazırlanması.</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-briefcase"></i></div>
                <h3>İş Hukuku</h3>
                <p>Kıdem ve ihbar tazminatı, fazla mesai, işe iade davaları, iş kazalarından kaynaklanan tazminat talepleri ve arabuluculuk süreçleri.</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-landmark"></i></div>
                <h3>İdare Hukuku</h3>
                <p>İdari işlemlerin iptali davaları, tam yargı (tazminat) davaları, imar mevzuatından kaynaklanan uyuşmazlıklar ve idari para cezalarına itiraz.</p>
            </div>
        </div>
    </main>

${floatingAndNav('uzmanlik')}
${footerCommon}
    <script src="assets/js/main.js"></script>
</body>
</html>`;
