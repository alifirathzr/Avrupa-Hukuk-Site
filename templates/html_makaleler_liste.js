module.exports = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Makaleler | Avukat Barış Hezer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body style="background-color: white;">
    <header>
        <nav class="navbar">
            <a href="index.html" class="logo"><i class="fa-solid fa-scale-balanced"></i> AV. BARIŞ HEZER</a>
            <ul class="nav-links">
                <li><a href="index.html">Ana Sayfa</a></li>
                <li><a href="hakkimda.html">Hakkımda</a></li>
                <li><a href="uzmanlik-alanlari.html">Çalışma Alanları</a></li>
                <li><a href="makaleler.html" class="active">Makaleler</a></li>
                <li><a href="iletisim.html">İletişim</a></li>
            </ul>
        </nav>
    </header>
    <main class="container" style="padding-top: 2rem;">
        <h2 id="cat-title" style="color: var(--accent); margin-bottom: 2rem;"></h2>
        <a href="makaleler.html" class="btn" style="margin-bottom: 2rem; display: inline-block; background: var(--bg-dark); color: white; padding: 0.5rem 1rem; border-radius: 5px;"><i class="fa-solid fa-arrow-left"></i> Kategorilere Geri Dön</a>
        <div class="grid-3" id="articles-list"></div>
    </main>
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            const params = new URLSearchParams(window.location.search);
            const category = params.get('kategori');
            document.getElementById('cat-title').textContent = category;
            
            const res = await fetch('/api/articles');
            const allArticles = await res.json();
            const filtered = allArticles.filter(a => a.category === category);
            
            const list = document.getElementById('articles-list');
            list.innerHTML = filtered.length > 0 ? filtered.map(art => \`
                <a href="makale-detay.html?id=\${art.id}" class="card article-card" style="text-decoration: none; display: flex; flex-direction: column;">
                    <h3 style="color: white;">\${art.title}</h3>
                    <p style="color: var(--text-muted);">\${art.summary || ''}</p>
                    <span style="color: var(--accent);">Makaleyi Oku <i class="fa-solid fa-arrow-right"></i></span>
                </a>
            \`).join('') : '<p>Bu kategoride henüz makale bulunmuyor.</p>';
        });
    </script>
</body>
</html>`;