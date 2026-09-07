module.exports = `
/* 1. WHATSAPP FLOATING BUTTON (SOL ALT) */
.whatsapp-float { position: fixed; bottom: 28px; left: 28px; background: #25D366; color: #ffffff; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4); z-index: 999; transition: var(--transition); text-decoration: none; }
.whatsapp-float:hover { background: #20ba5a; transform: scale(1.08) translateY(-3px); box-shadow: 0 12px 28px rgba(37, 211, 102, 0.55); color: #ffffff; }
.whatsapp-float::before { content: ''; position: absolute; top: -5px; left: -5px; right: -5px; bottom: -5px; border-radius: 50%; border: 2px solid #25D366; opacity: 0.7; animation: wa-pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1); pointer-events: none; }
.whatsapp-tooltip { position: absolute; left: 72px; background: var(--primary); color: var(--white); padding: 0.45rem 0.9rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.3s ease, transform 0.3s ease; transform: translateX(-10px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); border-left: 3px solid #25D366; }
.whatsapp-float:hover .whatsapp-tooltip { opacity: 1; transform: translateX(0); }
@keyframes wa-pulse { 0% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.25); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }

/* 4. BOTTOM NAVBAR (MOBİL SABİT ALT GEZİNTİ) */
.bottom-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: var(--primary); border-top: 2px solid var(--accent); z-index: 1001; box-shadow: 0 -4px 15px rgba(0,0,0,0.25); }
.bottom-nav-items { display: flex; justify-content: space-around; align-items: center; padding: 0.5rem 0.25rem 0.6rem 0.25rem; margin: 0; list-style: none; }
.bottom-nav-link { display: flex; flex-direction: column; align-items: center; gap: 3px; color: #94a3b8; font-size: 0.7rem; font-weight: 500; transition: var(--transition); padding: 0.25rem 0.4rem; }
.bottom-nav-link i { font-size: 1.15rem; }
.bottom-nav-link:hover, .bottom-nav-link.active { color: var(--accent); }
`;