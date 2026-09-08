const fs = require('fs');
const path = require('path');
const baseDir = __dirname;
const files = ['index.html', 'hakkimda.html', 'uzmanlik-alanlari.html', 'makaleler.html', 'iletisim.html', 'kvkk.html'];

const whatsapp = '\n<a href="https://wa.me/905325588865" class="whatsapp-float" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>\n';
const bnav = '\n<nav class="mobile-bottom-nav"><a href="index.html"><i class="fa-solid fa-house"></i><span>Ana Sayfa</span></a><a href="uzmanlik-alanlari.html"><i class="fa-solid fa-gavel"></i><span>Alanlar</span></a><a href="iletisim.html"><i class="fa-solid fa-envelope"></i><span>İletişim</span></a></nav>\n';

files.forEach(f => {
    if(!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    // Clean
    c = c.replace(/<a href=" https:\/\/wa\.me\/905325588865\\ class=\\whatsapp-float\\ target=\\_blank\\>.*?<\/a>/g, '');
    c = c.replace(/<a href="https:\/\/wa\.me\/905325588865".*?<\/a>/g, '');
    // Insert
    if(c.includes('</body>')) c = c.replace('</body>', whatsapp + bnav + '</body>');
    // Logo
    c = c.replace(/<a href="index\.html" class="logo">.*?<\/a>/, '<a href="index.html" class="logo"><div style="display:flex;flex-direction:column;line-height:1.2;"><span><i class="fa-solid fa-scale-balanced"></i> AV. BARIŞ HEZER</span><small style="font-size:0.6em;color:#c5a059;margin-left:30px;">Avrupa Hukuk Bürosu</small></div></a>');
    // Email
    c = c.replace(/info@barishezer\.av\.tr/g, 'barishezer@gmail.com');
    if(f === 'index.html') {
        c = c.replace('Hukuki Danışmanlık & Savunma', 'Hukuki Danışmanlık');
        c = c.replace('<h3>Gayrimenkul Hukuku</h3>', '<h3>Tazminat Hukuku</h3>');
    }
    fs.writeFileSync(f, c, 'utf8');
});

// CSS
const cssPath = 'assets/css/style.css';
let css = fs.readFileSync(cssPath, 'utf8').split('/* WhatsApp Button */')[0].split('/ *   W h a t s A p p')[0];
css += '\n.whatsapp-float { position: fixed; bottom: 30px; left: 30px; background-color: #25d366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 30px; z-index: 10000; animation: pulse 2s infinite; }\n@keyframes pulse { 0% { transform: scale(0.95); } 70% { transform: scale(1); } 100% { transform: scale(0.95); } }\n.mobile-bottom-nav { display: none; position: fixed; bottom: 0; left: 0; width: 100%; background: #0d1b2a; border-top: 2px solid #c5a059; justify-content: space-around; padding: 10px 0; z-index: 9999; }\n.mobile-bottom-nav a { color: white; display: flex; flex-direction: column; align-items: center; font-size: 12px; text-decoration: none; }\n@media (max-width: 768px) { .mobile-bottom-nav { display: flex; } .whatsapp-float { bottom: 80px; } }\n';
fs.writeFileSync(cssPath, css, 'utf8');

// JS
const jsPath = 'assets/js/main.js';
let js = fs.readFileSync(jsPath, 'utf8').replace(/const msgs = JSON\.parse\(localStorage\.getItem\(" contactMsgs\\\).*?;/g, '');
fs.writeFileSync(jsPath, js, 'utf8');
