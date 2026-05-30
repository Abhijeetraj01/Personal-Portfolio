
document.addEventListener('DOMContentLoaded', () => {

  Navbar.init();

  // rAF ensures layout is settled before GSAP measures positions
  requestAnimationFrame(() => {
    Animations.init();
    Projects.init();
    initMisc();
  });

});

/*  Miscellaneous site-wide interactions  */
function initMisc() {

  /* Smooth anchor scrolling   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id     = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height'),
        10
      ) || 68;

      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });

      // Move focus to target section for screen readers
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
  });

  /* ScrollTrigger refresh on resize
     Debounced — avoids thrashing during resize drag.          */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 200);
  }, { passive: true });

}
