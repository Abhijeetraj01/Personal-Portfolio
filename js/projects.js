
const Projects = (() => {

  function init() {
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.project-card, .project-featured');

    cards.forEach((card) => {
      let rect = null;

      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
        gsap.to(card, {
          y: -4,
          duration: 0.35,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      });

      card.addEventListener('mousemove', (e) => {
        if (!rect) return;

        // Normalize cursor position to -0.5…+0.5 range
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;

        gsap.to(card, {
          y:                   -4,
          rotateY:             x * 2.5,
          rotateX:            -y * 2.5,
          transformPerspective: 900,
          duration:             0.35,
          ease:                 'power1.out',
          overwrite:            'auto',
        });
      });

      card.addEventListener('mouseleave', () => {
        rect = null;
        gsap.to(card, {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.55,
          ease:     'power3.out',
          overwrite: 'auto',
        });
      });
    });
  }

  return { init };

})();
