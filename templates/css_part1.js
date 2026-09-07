module.exports = `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

:root {
    --primary: #0d1b2a;
    --primary-light: #1b263b;
    --primary-dark: #070d15;
    --accent: #c5a059;
    --accent-hover: #d4af37;
    --accent-light: rgba(197, 160, 89, 0.12);
    --bg-light: #f8f9fa;
    --text-dark: #1e293b;
    --text-muted: #64748b;
    --white: #ffffff;
    --whatsapp: #25D366;
    --whatsapp-hover: #20ba5a;
    --danger: #ef4444;
    --danger-hover: #dc2626;
    --success: #10b981;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background-color: var(--bg-light); color: var(--text-dark); line-height: 1.7; min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; }
h1, h2, h3, h4, h5, h6 { font-family: 'Cinzel', serif; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }

/* Header & Navigation */
header { background-color: var(--primary); color: var(--white); position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
.navbar { max-width: 1240px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0.9rem 2rem; }
.logo { display: flex; align-items: center; gap: 0.85rem; color: var(--white); transition: var(--transition); }
.logo:hover { opacity: 0.95; }
.logo-icon-wrapper { font-size: 1.85rem; color: var(--accent); display: flex; align-items: center; justify-content: center; }
.logo-text { display: flex; flex-direction: column; }
.lawyer-name { font-family: 'Cinzel', serif; font-size: 1.25rem; font-weight: 700; letter-spacing: 1.2px; color: var(--accent); line-height: 1.15; }
.office-name { font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 1.8px; color: #cbd5e1; text-transform: uppercase; margin-top: 2px; }

.nav-links { display: flex; gap: 1.8rem; align-items: center; }
.nav-links a { font-size: 0.95rem; font-weight: 500; transition: var(--transition); display: flex; align-items: center; gap: 0.45rem; color: #e2e8f0; }
.nav-links a:hover, .nav-links a.active { color: var(--accent); }
.hamburger { display: none; cursor: pointer; font-size: 1.5rem; color: var(--accent); z-index: 1002; }

/* Mobile Overlay */
.nav-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 998; backdrop-filter: blur(4px); opacity: 0; transition: opacity 0.3s ease; }
.nav-overlay.active { display: block; opacity: 1; }

/* Hero Banner with Glassmorphism */
.hero { background: linear-gradient(135deg, rgba(13, 27, 42, 0.93), rgba(27, 38, 59, 0.93)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat; color: var(--white); padding: 7.5rem 2rem; text-align: center; position: relative; }
.hero-content { max-width: 850px; margin: 0 auto; background: rgba(13, 27, 42, 0.75); padding: 3rem; border-radius: 12px; backdrop-filter: blur(12px); border: 1px solid rgba(197, 160, 89, 0.3); box-shadow: 0 15px 35px rgba(0,0,0,0.3); }
.hero h1 { font-size: 2.8rem; margin-bottom: 1.2rem; color: var(--white); font-weight: 700; }
.hero h1 span { color: var(--accent); display: block; font-size: 2rem; margin-top: 0.5rem; }
.hero p { font-size: 1.15rem; margin-bottom: 2.5rem; color: #e2e8f0; font-weight: 300; }

.btn { display: inline-flex; align-items: center; gap: 0.5rem; background-color: var(--accent); color: var(--primary); padding: 0.85rem 2rem; border-radius: 6px; font-weight: 600; transition: var(--transition); box-shadow: 0 4px 12px rgba(197, 160, 89, 0.3); cursor: pointer; border: none; font-size: 0.95rem; }
.btn:hover { background-color: var(--accent-hover); transform: translateY(-2px); box-shadow: 0 6px 18px rgba(197, 160, 89, 0.4); }
.btn-sm { padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: 4px; }
.btn-danger { background-color: var(--danger); color: var(--white); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25); }
.btn-danger:hover { background-color: var(--danger-hover); }
.btn-outline { background: transparent; border: 1px solid var(--accent); color: var(--accent); box-shadow: none; }
.btn-outline:hover { background: var(--accent); color: var(--primary); }

.container { max-width: 1240px; margin: 0 auto; padding: 4.5rem 2rem; }
.section-title { text-align: center; margin-bottom: 3.5rem; }
.section-title h2 { font-size: 2.2rem; color: var(--primary); margin-bottom: 0.75rem; font-weight: 700; }
.section-title .underline { height: 4px; width: 70px; background: linear-gradient(90deg, var(--accent), var(--accent-hover)); margin: 0 auto; border-radius: 2px; }
`;
