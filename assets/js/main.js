document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobil Menü & Slide-in Overlay
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (hamburger && navLinks && navOverlay) {
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        };

        hamburger.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) toggleMenu();
            });
        });
    }

    // 2. Toast Bildirim Sistemi
    function showToast(message, type = 'success') {
        let existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // 3. İletişim Formu Kontrolü & Toast Gösterimi
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const kvkkCheck = document.getElementById('kvkkCheck').checked;

            if (!name || !email || !message) {
                showToast('Lütfen tüm zorunlu alanları doldurunuz.', 'error');
                return;
            }
            if (!kvkkCheck) {
                showToast('Lütfen KVKK Aydınlatma Metni\'ni onaylayınız.', 'error');
                return;
            }

            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, subject, message })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showToast('Mesajınız başarıyla iletildi. En kısa sürede dönüş yapılacaktır.', 'success');
                    contactForm.reset();
                } else {
                    showToast('Mesaj gönderilirken bir hata oluştu: ' + data.message, 'error');
                }
            })
            .catch(err => {
                console.error(err);
                showToast('Sunucuya ulaşılamadı.', 'error');
            });
        });
    }

    // 4. Canlı Makale Arama (makaleler.html)
    const articleSearch = document.getElementById('articleSearch');
    const articlesGrid = document.getElementById('articlesGrid');

    if (articleSearch && articlesGrid) {
        const cards = articlesGrid.querySelectorAll('.article-card');
        articleSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            cards.forEach(card => {
                const title = card.querySelector('.article-title').textContent.toLowerCase();
                const desc = card.querySelector('.article-desc').textContent.toLowerCase();
                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 5. Akordeon Yapısı (SSS - Sıkça Sorulan Sorular)
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                accordionItems.forEach(other => other.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        });
    }
});
