document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const kvkkCheck = document.getElementById('kvkkCheck').checked;

            if (!name || !email || !message) {
                alert('Lütfen tüm zorunlu alanları doldurunuz.');
                return;
            }
            if (!kvkkCheck) {
                alert('Lütfen KVKK Aydınlatma Metni\'ni onaylayınız.');
                return;
            }
            alert('Mesajınız başarıyla iletilmiştir.');
            contactForm.reset();
        });
    }
});