module.exports = `
/* 6. ADMIN DASHBOARD STYLES */
.admin-container { max-width: 1240px; margin: 2.5rem auto 4rem auto; padding: 0 1.5rem; }
.admin-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; }
.admin-header h1 { font-size: 1.8rem; color: var(--primary); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
.stat-card { background: var(--white); padding: 1.6rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 1.2rem; border-left: 4px solid var(--accent); }
.stat-icon { width: 50px; height: 50px; border-radius: 8px; background: var(--accent-light); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
.stat-info h3 { font-size: 1.7rem; color: var(--primary); line-height: 1; margin-bottom: 0.3rem; }
.stat-info p { font-size: 0.85rem; color: var(--text-muted); font-family: 'Inter', sans-serif; font-weight: 500; }
.admin-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid #e2e8f0; margin-bottom: 2rem; }
.tab-btn { padding: 0.85rem 1.5rem; font-size: 0.95rem; font-weight: 600; background: transparent; border: none; border-bottom: 3px solid transparent; color: var(--text-muted); cursor: pointer; transition: var(--transition); display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: -2px; }
.tab-btn:hover { color: var(--primary); }
.tab-btn.active { color: var(--primary); border-bottom-color: var(--accent); }
.tab-content { display: none; }
.tab-content.active { display: block; }
.admin-card { background: var(--white); padding: 2rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 2rem; }
.admin-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 0.8rem; border-bottom: 1px solid #e2e8f0; }
.admin-card-header h3 { font-size: 1.25rem; color: var(--primary); }
.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; text-align: left; }
.data-table th { background: #f1f5f9; padding: 0.9rem 1rem; color: var(--primary); font-weight: 600; border-bottom: 2px solid #cbd5e1; }
.data-table td { padding: 0.9rem 1rem; border-bottom: 1px solid #e2e8f0; vertical-align: middle; }
.data-table tr:hover { background-color: #f8fafc; }
.badge { display: inline-block; padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
.badge-success { background: #dcfce7; color: #166534; }
.badge-info { background: #e0f2fe; color: #075985; }

/* Toast Notifications */
.toast { position: fixed; top: 30px; right: 30px; background: var(--primary); color: var(--white); padding: 1rem 1.75rem; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 0.75rem; z-index: 9999; transform: translateY(-100px); opacity: 0; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease; border-left: 5px solid var(--accent); }
.toast.show { transform: translateY(0); opacity: 1; }
.toast.success { border-left-color: #2e7d32; }
.toast.error { border-left-color: #c62828; }
.toast i { font-size: 1.25rem; }
.toast.success i { color: #4caf50; }
.toast.error i { color: #f44336; }

footer { background-color: var(--primary); color: var(--white); text-align: center; padding: 2.5rem 2rem; margin-top: auto; font-size: 0.95rem; border-top: 3px solid var(--accent); }
footer a { color: var(--accent); font-weight: 500; }
footer a:hover { text-decoration: underline; }

@media (max-width: 992px) {
    .contact-wrapper { grid-template-columns: 1fr; padding: 2rem; }
}

@media (max-width: 768px) {
    body { padding-bottom: 65px; }
    .bottom-nav { display: block; }
    .whatsapp-float { bottom: 75px; left: 18px; width: 52px; height: 52px; font-size: 28px; }
    .nav-links { display: flex; flex-direction: column; position: fixed; top: 0; right: -100%; width: 280px; height: 100vh; background-color: var(--primary); padding: 5rem 2rem 2rem 2rem; box-shadow: -5px 0 25px rgba(0,0,0,0.3); transition: right 0.4s ease; z-index: 999; align-items: flex-start; gap: 1.5rem; }
    .nav-links.active { right: 0; }
    .hamburger { display: block; }
    .hero h1 { font-size: 2.1rem; }
    .hero h1 span { font-size: 1.5rem; }
    .hero-content { padding: 2rem 1.5rem; }
    .logo-text .lawyer-name { font-size: 1.05rem; }
    .logo-text .office-name { font-size: 0.65rem; }
}

/* İletişim Sayfası Beyaz Arka Plan Tema Ayarları (Kartlar Orijinal Koyu Kalacak) */
body.iletisim-page {
    background-color: #ffffff !important;
    color: #0d1b2a !important;
}
body.iletisim-page .section-title h2 {
    color: #0d1b2a !important;
}
body.iletisim-page .contact-wrapper {
    background: var(--card-dark) !important;
    color: var(--text-light) !important;
    border: 1px solid rgba(197, 160, 89, 0.2) !important;
    box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
}
body.iletisim-page .contact-wrapper h3 {
    color: var(--text-light) !important;
}
body.iletisim-page .contact-item div h4 {
    color: var(--text-light) !important;
}
body.iletisim-page .contact-item div p,
body.iletisim-page .contact-item div a {
    color: var(--text-muted) !important;
}
body.iletisim-page .contact-item div a:hover {
    color: var(--accent) !important;
}
body.iletisim-page .form-group label {
    color: var(--text-light) !important;
}
body.iletisim-page .form-group input,
body.iletisim-page .form-group textarea,
body.iletisim-page .form-group select {
    background: var(--bg-dark) !important;
    color: var(--text-light) !important;
    border: 1px solid rgba(197, 160, 89, 0.3) !important;
}
body.iletisim-page .form-group input:focus,
body.iletisim-page .form-group textarea:focus,
body.iletisim-page .form-group select:focus {
    border-color: var(--accent) !important;
    box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.15) !important;
}
body.iletisim-page .checkbox-group label {
    color: var(--text-muted) !important;
}
`;