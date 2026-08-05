/* ===== Shared JS: mobile menu, nav scroll, reveal ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Nav scroll effect
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Mobile menu
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.mobile-menu__close');

  const openMenu = () => { menu?.classList.add('open'); overlay?.classList.add('show'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { menu?.classList.remove('open'); overlay?.classList.remove('show'); document.body.style.overflow = ''; };

  toggle?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu__links a').forEach(a => a.addEventListener('click', closeMenu));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
