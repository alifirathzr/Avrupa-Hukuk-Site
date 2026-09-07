const fs = require('fs');
const path = require('path');

const cssContent = require('./templates/css');
const jsContent = require('./templates/js');
const htmlPages = require('./templates/html');

console.log('=== [Av. Barış Hezer Web Sitesi Güncelleme Başlatıldı] ===\n');

// 1. Assets Klasörlerini Kontrol Et
if (!fs.existsSync('assets/css')) {
    fs.mkdirSync('assets/css', { recursive: true });
}
if (!fs.existsSync('assets/js')) {
    fs.mkdirSync('assets/js', { recursive: true });
}

// 2. CSS ve JS Dosyalarını Güncelle
fs.writeFileSync('assets/css/style.css', cssContent.trim() + '\n', 'utf-8');
console.log('[BAŞARILI] assets/css/style.css güncellendi.');

fs.writeFileSync('assets/js/main.js', jsContent.trim() + '\n', 'utf-8');
console.log('[BAŞARILI] assets/js/main.js güncellendi.');

// 3. Tüm HTML Sayfalarını Güncelle / Oluştur
Object.entries(htmlPages).forEach(([fileName, content]) => {
    fs.writeFileSync(fileName, content.trim() + '\n', 'utf-8');
    console.log(`[BAŞARILI] ${fileName} güncellendi/oluşturuldu.`);
});

console.log('\n=== [Tüm Dosyalar Başarıyla Güncellendi] ===');
