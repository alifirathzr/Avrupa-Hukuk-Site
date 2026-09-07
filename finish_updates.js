const fs = require('fs');
const path = require('path');

// 1. KVKK Full Text
const kvkkText = `
<div style="background: var(--white); padding: 3rem; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-top: 4px solid var(--accent); line-height: 1.8;">
    <h2 style="color: var(--primary); margin-bottom: 2rem; text-align: center;">KİŞİSEL VERİLERİN KORUNMASI KANUNU (KVKK) AYDINLATMA METNİ</h2>
    <p><strong>1. Veri Sorumlusu:</strong> Av. Barış Hezer - Avrupa Hukuk Bürosu</p>
    <p><strong>2. İşlenme Amacı:</strong> Kişisel verileriniz; hukuki danışmanlık hizmetlerimizin yürütülmesi, randevu süreçlerinin planlanması ve müvekkil iletişiminin sağlanması amaçlarıyla işlenmektedir.</p>
    <p><strong>3. Veri Sahibi Hakları:</strong> 6698 Sayılı Kanun'un 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, düzeltme isteme ve silinmesini talep etme haklarına sahipsiniz.</p>
    <p>Detaylı bilgi ve başvurularınız için <strong>barishezer@gmail.com</strong> üzerinden bizimle iletişime geçebilirsiniz.</p>
</div>`;

let kvkk = fs.readFileSync('kvkk.html', 'utf8');
kvkk = kvkk.replace(/<main class="container">[\s\S]*?<\/main>/, `<main class="container"><div class="section-title"><h2>KVKK Aydınlatma Metni</h2><div class="underline"></div></div>${kvkkText}</main>`);
fs.writeFileSync('kvkk.html', kvkk, 'utf8');

// 2. Uzmanlık Alanları
let uzm = fs.readFileSync('uzmanlik-alanlari.html', 'utf8');
if(!uzm.includes('Aile Hukuku')) {
    const newCards = `
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
                <h3>Tazminat Hukuku</h3>
                <p>Trafik kazaları, iş kazaları ve haksız fiillerden doğan maddi ve manevi tazminat süreçlerinin takibi.</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-people-roof"></i></div>
                <h3>Aile Hukuku</h3>
                <p>Boşanma, velayet, nafaka ve mal rejimi tasfiyesi uyuşmazlıklarında hukuki destek.</p>
            </div>`;
    uzm = uzm.replace(/<\/div>\s*<\/main>/, newCards + '</div></main>');
}
fs.writeFileSync('uzmanlik-alanlari.html', uzm, 'utf8');

// 3. Admin Page
const adminHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8"><title>Admin Paneli</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body style="padding:40px; background:#f4f7f6;">
    <h1 style="margin-bottom:20px;">Gelen Mesajlar</h1>
    <div id="msgs"></div>
    <script>
        const msgs = JSON.parse(localStorage.getItem('contactMsgs') || '[]');
        const container = document.getElementById('msgs');
        if(msgs.length === 0) container.innerHTML = '<p>Mesaj yok.</p>';
        msgs.reverse().forEach(m => {
            const d = document.createElement('div');
            d.style = "background:white; padding:20px; margin-bottom:10px; border-radius:8px; box-shadow:0 2px 5px rgba(0,0,0,0.1)";
            d.innerHTML = '<strong>' + m.name + '</strong> (' + m.email + ')<br><p>' + m.message + '</p><small>' + (m.date || '') + '</small>';
            container.appendChild(d);
        });
    </script>
</body>
</html>`;
fs.writeFileSync('admin.html', adminHtml, 'utf8');

// 4. JS Logic for LocalStorage
let js = fs.readFileSync('assets/js/main.js', 'utf8');
if(!js.includes('localStorage.setItem')) {
    const logic = "const msgs = JSON.parse(localStorage.getItem('contactMsgs') || '[]'); msgs.push({name, email, message, date: new Date().toLocaleString()}); localStorage.setItem('contactMsgs', JSON.stringify(msgs)); showToast('Mesaj iletildi', 'success'); contactForm.reset();";
    js = js.replace(/showToast\('Mesajınız başarıyla iletildi.*?\);\s*contactForm\.reset\(\);/, logic);
}
fs.writeFileSync('assets/js/main.js', js, 'utf8');
