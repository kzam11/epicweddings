(() => {
  const nav = document.querySelector('.nav');

  // Nav scroll state
  const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 48);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Mobile menu
  const burger = document.querySelector('.nav__burger');
  const mobile = document.querySelector('.nav__mobile');
  const mClose = document.querySelector('.nav__mobile-close');
  const toggleMenu = (open) => {
    mobile?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    burger?.setAttribute('aria-expanded', String(open));
  };
  burger?.addEventListener('click', () => toggleMenu(!mobile?.classList.contains('open')));
  mClose?.addEventListener('click', () => toggleMenu(false));
  mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  // Hero bg entrance
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) window.addEventListener('load', () => heroBg.classList.add('loaded'), { once: true });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });
    reveals.forEach(el => ro.observe(el));
  }

  // Contact form submission
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      btn.textContent = 'Message sent — we\'ll be in touch soon.';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    });
  }
})();
