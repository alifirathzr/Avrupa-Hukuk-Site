module.exports = `
:root {
    --bg-dark: #0d1b2a;
    --card-dark: #1b263b;
    --accent: #c5a059;
    --accent-hover: #dfb260;
    --text-light: #f8f9fa;
    --text-muted: #a0aec0;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', system-ui, sans-serif; background-color: var(--bg-dark); color: var(--text-light); line-height: 1.7; min-height: 100vh; display: flex; flex-direction: column; overflow-x: hidden; }
main { flex: 1; }
h1, h2, h3 { font-family: 'Playfair Display', serif; }
a { text-decoration: none; color: inherit; }

header { background: var(--bg-dark); position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid #c5a05933; backdrop-filter: blur(5px); }
.navbar { max-width: 1240px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; }
.logo { font-size: 1.5rem; color: var(--accent); font-weight: bold; }
.nav-links { display: flex; gap: 2rem; }
.nav-links a:hover { color: var(--accent-hover); }

.hero { padding: 90px 20px; text-align: center; background: linear-gradient(135deg, rgba(13, 27, 42, 0.95) 0%, rgba(27, 38, 59, 0.9) 100%), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat; }
.hero-content { max-width: 800px; margin: 0 auto; }
.hero-title { font-size: 3rem; font-weight: 800; color: var(--text-light); margin-bottom: 1.25rem; letter-spacing: -0.5px; }
.hero-subtitle { display: block; font-size: 1.3rem; font-weight: 600; color: var(--accent); margin-top: 0.5rem; letter-spacing: 1px; font-family: 'Inter', sans-serif; }
.hero-description { font-size: 1.15rem; color: var(--text-muted); max-width: 650px; margin: 0 auto 2.2rem auto; line-height: 1.7; }
.btn-hero { display: inline-flex; align-items: center; gap: 0.6rem; background: var(--accent); color: var(--bg-dark); padding: 0.9rem 2.2rem; border-radius: 8px; font-weight: 700; font-size: 1.05rem; box-shadow: 0 10px 25px rgba(197, 160, 89, 0.3); transition: var(--transition); }
.btn-hero:hover { background: var(--accent-hover); transform: translateY(-3px); box-shadow: 0 15px 30px rgba(197, 160, 89, 0.4); color: var(--bg-dark); }
.btn-gold { background: var(--accent); color: var(--bg-dark); padding: 0.8rem 2rem; border-radius: 5px; font-weight: bold; display: inline-block; }

.container { max-width: 1240px; margin: 0 auto; padding: 4rem 2rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
.card { background: var(--card-dark); padding: 2rem; border-radius: 12px; border: 1px solid #c5a05922; display: flex; flex-direction: column; justify-content: space-between; transition: 0.3s; }
.card:hover { transform: translateY(-5px); border-color: var(--accent); }
.article-img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; }
`;
