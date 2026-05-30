

const Animations = (() => {

  /*  Configuration 
     Single place to tune timing across the whole site.      */
  const CONFIG = {
    reveal: {
      y:        40,
      opacity:  0,
      duration: 0.9,
      ease:     'power3.out',
    },
    stagger: {
      each:   0.14,
      from:   'start',
    },
    trigger: {
      start:         'top 88%',
      toggleActions: 'play none none none',
    },
    hero: {
      duration: 1.0,
      ease:     'power3.out',
      stagger:  0.16,
      initialDelay: 0.15,
    },
  };

  /*  GSAP matchMedia — motion-safe context 
     All animations live inside mm.add(noMotion) so GSAP
     automatically handles cleanup and reduced-motion.       */
  const mm = gsap.matchMedia();

  /*  Hero entrance 
     Runs once on page load. Elements animate from
     CONFIG.reveal defaults, staggered top-to-bottom.        */
  function animateHero() {
    const tl = gsap.timeline({
      defaults: {
        ease:     CONFIG.hero.ease,
        duration: CONFIG.hero.duration,
      },
      delay: CONFIG.hero.initialDelay,
    });

    // Navbar
    tl.from('.navbar', { opacity: 0, duration: 0.5 });

    // Hero content — overline, h1, paragraph, CTAs in order
    tl.from(
      ['.hero__overline', '.hero__headline', '.hero__paragraph', '.hero__cta'],
      {
        y:       CONFIG.reveal.y,
        opacity: CONFIG.reveal.opacity,
        stagger: CONFIG.hero.stagger,
        clearProps: 'transform,opacity',
      },
      '-=0.2'
    );

    // Decorative elements fade in last, slower
    tl.from('.scroll-indicator', { opacity: 0, duration: 0.8 }, '-=0.3');
    tl.from('.hero__watermark',  { opacity: 0, duration: 1.4 }, 0.4);
  }

  /*  Section marker animation 
     Number → line expands from left → label fades in.       */
  function animateSectionMarkers() {
    document.querySelectorAll('.section-marker').forEach((marker) => {
      const [num, line, label] = [
        marker.querySelector('.section-marker__number'),
        marker.querySelector('.section-marker__line'),
        marker.querySelector('.section-marker__label'),
      ];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       marker,
          start:         'top 90%',
          toggleActions: CONFIG.trigger.toggleActions,
        },
        defaults: { ease: 'power2.out' },
      });

      tl.from(num,  { opacity: 0, x: -8,  duration: 0.45 })
        .from(line, { scaleX: 0, transformOrigin: 'left center', duration: 0.65 }, '-=0.15')
        .from(label,{ opacity: 0, x:  8,  duration: 0.45 }, '-=0.45');
    });
  }

  /*  Generic scroll reveal 
     All elements with [data-reveal] are collected here.
     Cards (multiple siblings) use batch() for stagger.
     Everything else gets individual ScrollTrigger.          */
  function animateScrollReveals() {
    // Project cards — batched stagger
    ScrollTrigger.batch('.project-card', {
      start:  CONFIG.trigger.start,
      onEnter: (batch) => {
        gsap.from(batch, {
          y:          CONFIG.reveal.y,
          opacity:    CONFIG.reveal.opacity,
          duration:   CONFIG.reveal.duration,
          ease:       CONFIG.reveal.ease,
          stagger:    CONFIG.stagger.each,
          clearProps: 'transform,opacity',
        });
      },
      once: true,
    });

    // Timeline items — batched within each timeline
    document.querySelectorAll('.timeline').forEach((timeline) => {
      const items = timeline.querySelectorAll('.timeline__item');
      if (!items.length) return;

      gsap.from(items, {
        y:          24,
        opacity:    0,
        duration:   0.8,
        ease:       CONFIG.reveal.ease,
        stagger:    0.15,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger:       items[0],
          start:         CONFIG.trigger.start,
          toggleActions: CONFIG.trigger.toggleActions,
        },
      });
    });

    // All other [data-reveal] elements — per-element trigger
    const skipSelectors = new Set([
      ...Array.from(document.querySelectorAll('.section-marker')),
      ...Array.from(document.querySelectorAll('.project-card')),
      ...Array.from(document.querySelectorAll('.timeline__item')),
    ]);

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (skipSelectors.has(el)) return;

      gsap.from(el, {
        y:          CONFIG.reveal.y,
        opacity:    CONFIG.reveal.opacity,
        duration:   CONFIG.reveal.duration,
        ease:       CONFIG.reveal.ease,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger:       el,
          start:         CONFIG.trigger.start,
          toggleActions: CONFIG.trigger.toggleActions,
        },
      });
    });

    // Skill pills — micro stagger within groups
    document.querySelectorAll('.skills-grid, .skill-group__pills').forEach((group) => {
      const pills = group.querySelectorAll('.skill-pill');
      if (!pills.length) return;

      gsap.from(pills, {
        opacity:  0,
        y:        10,
        duration: 0.45,
        ease:     'power2.out',
        stagger:  0.04,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger:       group,
          start:         'top 92%',
          toggleActions: CONFIG.trigger.toggleActions,
        },
      });
    });

    // Dividers — scale from left
    document.querySelectorAll('hr.divider').forEach((hr) => {
      gsap.from(hr, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger:       hr,
          start:         'top 93%',
          toggleActions: CONFIG.trigger.toggleActions,
        },
      });
    });
  }

  /*  Availability dot pulse 
     Runs indefinitely — separate from scroll system.        */
  function animateAvailabilityDot() {
    const dot = document.querySelector('.badge-available__dot');
    if (!dot) return;

    gsap.to(dot, {
      scale:    1.5,
      opacity:  0.45,
      duration: 1.3,
      ease:     'sine.inOut',
      repeat:   -1,
      yoyo:     true,
    });
  }

  /*  Init 
     gsap.matchMedia splits into two contexts:
     - no-preference: full animations
     - reduce: reveal everything immediately, no motion      */
  function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Full motion context
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      animateHero();
      animateSectionMarkers();
      animateScrollReveals();
      animateAvailabilityDot();

      // Refresh ScrollTrigger after fonts load (prevents position errors)
      if (document.fonts) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }

      return () => {
        // Cleanup on context destroy (e.g. if user changes motion prefs live)
        ScrollTrigger.killAll();
      };
    });

    // Reduced motion context — make everything visible immediately
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('[data-reveal], .section-marker, .navbar', {
        opacity: 1,
        y:       0,
        clearProps: 'all',
      });
    });
  }

  return { init };

})();
