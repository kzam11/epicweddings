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

  // Contact form submission (Web3Forms)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const btnLabel = btn.innerHTML;

      // Honeypot: if the hidden botcheck is filled, silently drop
      if (form.querySelector('[name=botcheck]')?.checked) return;

      btn.disabled = true;
      btn.style.opacity = '0.7';
      btn.innerHTML = 'Sending…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          form.innerHTML = '<div style="text-align:center;padding:48px 24px;">'
            + '<div style="font-size:40px;color:var(--gold);margin-bottom:16px;">✓</div>'
            + '<h3 style="font-size:24px;margin-bottom:12px;">Thank you — your enquiry is on its way.</h3>'
            + '<p style="font-size:15px;color:var(--warm-gray);line-height:1.7;">Bernard will be in touch shortly, usually within the hour. '
            + 'For anything urgent, call <a href="tel:+61459236333" style="color:var(--gold);">0459 236 333</a>.</p>'
            + '</div>';
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.innerHTML = btnLabel;
        let note = form.querySelector('.form-error');
        if (!note) {
          note = document.createElement('p');
          note.className = 'form-error';
          note.style.cssText = 'color:#c0392b;font-size:14px;margin-top:12px;text-align:center;';
          btn.closest('.form-submit')?.appendChild(note);
        }
        note.textContent = 'Something went wrong sending your enquiry. Please try again, or email bernard@epicweddingent.com.au directly.';
      }
    });
  }
})();
