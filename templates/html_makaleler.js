module.exports = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hukuki Makaleler | Avukat Barış Hezer</title>
    <meta name="description" content="Avukat Barış Hezer'in güncel yasal düzenlemeler, yargıtay kararları ve hukuki analizler içeren bilgilendirici makalelerini okuyun.">
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://barishezer.av.tr/makaleler.html">
    <meta property="og:title" content="Hukuki Makaleler | Avukat Barış Hezer">
    <meta property="og:description" content="Güncel yasal haklar, kira tespiti, icra itiraz süreçleri ve iş hukuku üzerine makaleler.">
    <meta property="og:image" content="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80">
    <!-- FontAwesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <!-- Favicon link -->
    <link rel="icon" type="image/png" href="https://img.icons8.com/ios-filled/50/c5a059/scale.png">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body style="background-color: white;" class="makaleler-page">
    <div class="nav-overlay"></div>
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo"><i class="fa-solid fa-scale-balanced"></i> AV. BARIŞ HEZER</a>
            <div class="hamburger">
                <i class="fa-solid fa-bars"></i>
            </div>
            <ul class="nav-links">
                <li><a href="index.html"><i class="fa-solid fa-house"></i> Ana Sayfa</a></li>
                <li><a href="hakkimda.html"><i class="fa-solid fa-user-tie"></i> Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html"><i class="fa-solid fa-gavel"></i> Çalışma Alanları</a></li>
                <li><a href="makaleler.html" class="active"><i class="fa-solid fa-book-open"></i> Makaleler</a></li>
                <li><a href="iletisim.html"><i class="fa-solid fa-envelope"></i> İletişim</a></li>
            </ul>
        </nav>
    </header>
    <main class="container">
        <div class="section-title">
            <h2>Hukuki Makaleler</h2>
            <div class="underline"></div>
        </div>

        <div class="search-container">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="articleSearch" placeholder="Makaleler arasında canlı ara (örn: kira, icra, fesih)...">
        </div>

        <div class="grid-3" id="articles-container">
            <!-- Makaleler buraya dinamik olarak yüklenecek -->
        </div>
    </main>
    <footer>
        <p>&copy; 2026 Av. Barış Hezer. Bütün hakları saklıdır. | <a href="kvkk.html"><i class="fa-solid fa-shield-halved"></i> KVKK Aydınlatma Metni</a></p>
    </footer>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const grid = document.getElementById('articles-container');
            const searchInput = document.getElementById('articleSearch');
            let allArticles = [];

            try {
                const res = await fetch('/api/articles');
                allArticles = await res.json();

                function renderArticles(data) {
                    if (data.length === 0) {
                        grid.innerHTML = '<p style="text-align:center; width:100%;">Henüz makale bulunmuyor.</p>';
                        return;
                    }
                    grid.innerHTML = data.map(art => {
                        return \`
                        <a href="makale-detay.html?id=\${art.id}" class="card article-card" style="text-decoration: none; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between;">
                            <div class="card-icon"><i class="fa-solid fa-book-open"></i></div>
                            <h3 class="article-title">\${art.title}</h3>
                            <p class="article-desc">\${art.summary || ''}</p>
                            <span class="read-more">Makaleyi Oku <i class="fa-solid fa-arrow-right"></i></span>
                        </a>
                        \`;
                    }).join('');
                }

                renderArticles(allArticles);

                // Arama Filtreleme
                searchInput.addEventListener('input', (e) => {
                    const term = e.target.value.toLowerCase();
                    const filtered = allArticles.filter(a =>
                        a.title.toLowerCase().includes(term) ||
                        (a.summary && a.summary.toLowerCase().includes(term))
                    );
                    renderArticles(filtered);
                });

            } catch (err) {
                console.error(err);
                grid.innerHTML = '<p>Makaleler yüklenirken bir hata oluştu.</p>';
            }
        });
    </script>
    <script src="assets/js/main.js"></script>
</body>
</html>`
