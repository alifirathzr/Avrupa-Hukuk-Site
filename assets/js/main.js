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
            const phoneEl = document.getElementById('phone');
            const phone = phoneEl ? phoneEl.value.trim() : '';
            const subjectEl = document.getElementById('subject');
            const subject = subjectEl ? subjectEl.value.trim() : '';
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

            const successAlert = document.getElementById('formSuccessAlert');
            if (successAlert) {
                successAlert.style.display = 'flex';
            }
            showToast('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçilecektir.', 'success');
            contactForm.reset();

            // Arka planda sunucuya gönder (hata verse bile kullanıcı bildirimini alır)
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone, subject, message })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.success && data.message) {
                    console.warn('Sunucu mesaj kaydı uyarısı:', data.message);
                }
            })
            .catch(err => {
                console.log('Sunucu API çağrısı yerel/statik modda atlandı:', err);
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

    // 5. Akordeon Yapısı (SSS - Sıkça Sorulan Sorular) ve Dinamik Yükleme
    const accordionContainers = document.querySelectorAll('.accordion');
    if (accordionContainers.length > 0) {
        fetch('/api/faqs')
            .then(res => res.json())
            .then(faqs => {
                if (Array.isArray(faqs) && faqs.length > 0) {
                    accordionContainers.forEach(container => {
                        container.innerHTML = faqs.map(f => `
                            <div class="accordion-item">
                                <button class="accordion-header">
                                    <span>${f.question}</span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </button>
                                <div class="accordion-content">
                                    <p>${f.answer}</p>
                                </div>
                            </div>
                        `).join('');
                    });
                }
            })
            .catch(err => console.log('SSS yüklenemedi:', err));
    }

    // Akordeon Tıklama Olayı (Event Delegation)
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;
        const item = header.closest('.accordion-item');
        if (!item) return;
        const accordion = item.closest('.accordion');
        if (!accordion) return;

        const isActive = item.classList.contains('active');
        accordion.querySelectorAll('.accordion-item').forEach(other => other.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });

    // 6. Navbar Scroll Behavior (Aşağı kaydırınca gizle, yukarı kaydırınca göster)
    let lastScroll = 0;
    const delta = 5;
    const headerEl = document.querySelector('header');

    if (headerEl) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll <= 80) {
                headerEl.classList.remove('nav-hidden');
                lastScroll = currentScroll;
                return;
            }

            if (Math.abs(currentScroll - lastScroll) <= delta) {
                return;
            }

            if (currentScroll > lastScroll) {
                // Aşağı kaydırma
                headerEl.classList.add('nav-hidden');
            } else {
                // Yukarı kaydırma (birazcık yukarı kaydırıldığında navbar açılır)
                headerEl.classList.remove('nav-hidden');
            }

            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }, { passive: true });
    }
});
