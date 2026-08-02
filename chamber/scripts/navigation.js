
// scripts/navigation.js
const primaryNav = document.querySelector('#primary-nav');
const hamburgerBtn = document.querySelector('#hamburger-btn');

if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');

        // Toggle icon between hamburger and X
        if (hamburgerBtn.classList.contains('open')) {
            hamburgerBtn.textContent = 'X'; // or '✕'
        } else {
            hamburgerBtn.textContent = '☰';
        }
    });
}