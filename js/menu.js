const toggle = document.getElementById('toggle');
const menu   = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
});

// Close when a mobile link is clicked
menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    });
});

// Close on outside click
document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    }
});
  