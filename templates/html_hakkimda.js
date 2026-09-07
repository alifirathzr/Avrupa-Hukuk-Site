const { headCommon, headerCommon, floatingAndNav, footerCommon } = require('./common');

module.exports = `<!DOCTYPE html>
<html lang="tr">
<head>
${headCommon('Hakkımda', 'Av. Barış Hezer - Avrupa Hukuk Bürosu mesleki geçmişi, vizyonu, etik değerleri ve hukukun üstünlüğüne bağlı profesyonel duruşu hakkında bilgi edinin.')}
</head>
<body>
${headerCommon('hakkimda')}

    <main class="container">
        <div class="section-title">
            <h2>Hakkımda</h2>
            <div class="underline"></div>
        </div>
        <div style="max-width: 850px; margin: 0 auto; background: var(--white); padding: 3rem; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); margin-bottom: 5rem; border-top: 4px solid var(--accent);">
            <p style="margin-bottom: 1.5rem; font-size: 1.1rem; color: var(--primary); font-weight: 500;"><i class="fa-solid fa-quote-left" style="color: var(--accent); margin-right: 0.5rem; font-size: 1.5rem;"></i> Hukukun evrensel ilkelerine bağlı, şeffaf ve güvenilir savunma yaklaşımı.</p>
            <p style="margin-bottom: 1.5rem;">Av. Barış Hezer, Avrupa Hukuk Bürosu bünyesinde meslek hayatı boyunca hukukun üstünlüğü ve hak arama özgürlüğü prensiplerini rehber edinmiştir. Müvekkillerinin hukuki problemlerine rasyonel, hızlı ve sonuç odaklı çözümler sunmayı hedeflemektedir.</p>
            <p style="margin-bottom: 1.5rem;">TBB'nin belirlediği meslek kurallarına ve etik standartlara bağlı kalarak; gizlilik, dürüstlük ve şeffaflık ilkelerinden ödün vermeden hukuki danışmanlık ve savunmanlık faaliyetlerini sürdürmektedir.</p>
            <p>Hukuki uyuşmazlıkların henüz dava aşamasına gelmeden önlenmesini amaçlayan "Koruyucu Hukuk" anlayışını benimseyen ofisimiz, müvekkillerine uzun vadeli ve güvenli bir hukuki güvence sunar.</p>
        </div>

        <div class="section-title" style="margin-top: 5rem;">
            <h2>Sıkça Sorulan Sorular</h2>
            <div class="underline"></div>
        </div>
        
        <div class="accordion">
            <div class="accordion-item">
                <button class="accordion-header">
                    <span>Hukuki danışmanlık hizmeti almak ücretli midir?</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="accordion-content">
                    <p>Evet. 1136 Sayılı Avukatlık Kanunu ve TBB Meslek Kuralları uyarınca avukatların ücretsiz danışmanlık vermesi yasaktır. Danışmanlık ve dava ücretleri, her yıl yayınlanan Avukatlık Asgari Ücret Tarifesi esas alınarak belirlenmektedir.</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                    <span>Dava süreci ne kadar sürer ve ne sıklıkla bilgilendirme yapılır?</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="accordion-content">
                    <p>Dava süreçleri; ilgili mahkemenin iş yüküne, delillerin toplanma hızına, tebligat sürelerine ve uyuşmazlığın niteliğine göre değişmektedir. Ofisimiz, davanızdaki her önemli gelişmede sizi anlık olarak bilgilendirmektedir.</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                    <span>Avukata vekaletname nasıl ve nereden verilir?</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="accordion-content">
                    <p>Vekaletname, Türkiye'deki herhangi bir noterden, yurt dışında ise Türk Konsolosluklarından verilebilmektedir. Vekaletname çıkarılmadan önce avukatınızın belirteceği özel yetkilerin (örneğin sulh yetkisi, arabuluculuk yetkisi, feragat yetkisi vb.) vekaletnamede yer alması gerekmektedir.</p>
                </div>
            </div>
        </div>
    </main>

${floatingAndNav('hakkimda')}
${footerCommon}
    <script src="assets/js/main.js"></script>
</body>
</html>`;
