
const Navbar = (() => {

  /*  Element refs  */
  const el         = document.getElementById('navbar');
  const hamburger  = document.getElementById('navHamburger');
  const overlay    = document.getElementById('navOverlay');
  const navLinks   = document.querySelectorAll('.navbar__link');
  const overlayLinks = document.querySelectorAll('[data-overlay-link]');
  const sections   = document.querySelectorAll('main section[id]');

  /*  State  */
  let menuOpen = false;
  let ticking  = false;

  /*  Scroll blur  */
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollState);
  }

  function updateScrollState() {
    el.classList.toggle('is-scrolled', window.scrollY > 56);
    ticking = false;
  }

  /*  Active link tracker  */
  function initSectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive(entry.target.id);
        });
      },
      {
        // Fires when section crosses upper 40% of viewport
        rootMargin: `-${el.offsetHeight}px 0px -55% 0px`,
        threshold:  0,
      }
    );

    sections.forEach((s) => observer.observe(s));
  }

  function setActive(id) {
    navLinks.forEach((link) => {
      const matches = link.dataset.nav === id;
      link.classList.toggle('is-active', matches);
      link.toggleAttribute('aria-current', matches);
      if (matches) link.setAttribute('aria-current', 'location');
    });
  }

  /*  Mobile menu  */
  function openMenu() {
    menuOpen = true;
    overlay.hidden  = false;
    overlay.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';

    // Move focus into overlay
    const firstLink = overlay.querySelector('a');
    firstLink?.focus();
  }

  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    overlay.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';

    // Small delay before hiding — lets CSS transition play out
    setTimeout(() => { overlay.hidden = true; }, 320);

    hamburger.focus();
  }

  function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
  }

  /*  Focus trap inside overlay  */
  function trapFocus(e) {
    if (!menuOpen) return;
    if (e.key !== 'Tab') return;

    const focusable = Array.from(
      overlay.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
    ).filter((el) => !el.disabled);

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  /*  Events  */
  function bindEvents() {
    window.addEventListener('scroll',  onScroll, { passive: true });

    hamburger.addEventListener('click', toggleMenu);

    // Close on overlay link click
    overlayLinks.forEach((link) => link.addEventListener('click', closeMenu));

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
      trapFocus(e);
    });

    // Close on overlay background click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });
  }
  /*  Init  */
  function init() {
    if (!el) return;
    bindEvents();
    initSectionObserver();
    updateScrollState(); // Sync on load (e.g. if user refreshes mid-page)
  }

  return { init };

})();
