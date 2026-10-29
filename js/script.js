(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = [...document.querySelectorAll('.nav-link')];
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3400);
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      navLinks.classList.toggle('open', !isOpen);
    });
    navAnchors.concat([...navLinks.querySelectorAll('.nav-contact')]).forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
      }
    });
  }

  // Reveal sections as they enter the viewport. Content stays visible without JS or reduced motion.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Highlight the section currently in view.
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Desktop-only pointer effects. They never intercept clicks or text selection.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !reducedMotion) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const spotlight = document.querySelector('.mouse-spotlight');
    let ringX = 0, ringY = 0, targetX = 0, targetY = 0, rafId = null;
    document.addEventListener('pointermove', event => {
      targetX = event.clientX; targetY = event.clientY;
      if (dot) { dot.style.opacity = '1'; dot.style.left = `${targetX}px`; dot.style.top = `${targetY}px`; }
      if (ring) ring.style.opacity = '1';
      if (spotlight) {
        spotlight.style.setProperty('--mouse-x', `${targetX}px`);
        spotlight.style.setProperty('--mouse-y', `${event.clientY}px`);
      }
      if (!rafId) rafId = requestAnimationFrame(animateRing);
    }, { passive: true });
    function animateRing() {
      ringX += (targetX - ringX) * 0.19;
      ringY += (targetY - ringY) * 0.19;
      if (ring) { ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`; }
      if (Math.abs(targetX-ringX) > .5 || Math.abs(targetY-ringY) > .5) rafId = requestAnimationFrame(animateRing);
      else rafId = null;
    }
    document.addEventListener('pointerout', event => {
      if (!event.relatedTarget) {
        if (dot) dot.style.opacity = '0';
        if (ring) ring.style.opacity = '0';
      }
    });
    document.querySelectorAll('a,button,.project-card,.skill-card').forEach(item => {
      item.addEventListener('pointerenter', () => ring?.classList.add('hovering'));
      item.addEventListener('pointerleave', () => ring?.classList.remove('hovering'));
    });
    const portrait = document.querySelector('[data-parallax]');
    const heroVisual = document.querySelector('.hero-visual');
    if (portrait && heroVisual) {
      heroVisual.addEventListener('pointermove', event => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        portrait.style.transform = `translate(${x * 12}px, ${y * 12}px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
      });
      heroVisual.addEventListener('pointerleave', () => { portrait.style.transform = ''; });
    }
  }

  // This is a mailto composer, not a backend submission. Set the real address below before launch.
  const ADrian_EMAIL = 'adrianlapez07@gmail.com';
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        showToast('Please complete all fields with a valid email address.');
        return;
      }
      if (!ADrian_EMAIL.trim()) {
        showToast('Please email Adrian directly if your email app does not open.');
        return;
      }
      const data = new FormData(contactForm);
      const subject = encodeURIComponent(String(data.get('subject')).trim());
      const body = encodeURIComponent(`From: ${String(data.get('name')).trim()}\nReply email: ${String(data.get('email')).trim()}\n\n${String(data.get('message')).trim()}`);
      window.location.href = `mailto:${ADrian_EMAIL}?subject=${subject}&body=${body}`;
      showToast('Opening your email app to prepare the message.');
    });
  }

  document.querySelectorAll('.placeholder-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      showToast('Replace this placeholder with a real project URL before publishing.');
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
