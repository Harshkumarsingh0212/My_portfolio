// ===================================================================
// Harsh Kumar Singh — Portfolio interactions
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinksEl = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main .section, .hero');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 60 % 300);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Typing effect ---------- */
  const typedEl = document.getElementById('typed');
  const phrases = [
    'Backend & API Builder',
    'GenAI / RAG Enthusiast',
    'Graph Neural Network Researcher',
    'Competitive Programmer',
    'Computer Engineering Undergrad'
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      charIdx++;
      typedEl.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIdx--;
      typedEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isDecimal = String(target).includes('.');
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = (isDecimal ? value.toFixed(2) : Math.round(value)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Cursor glow (desktop pointer only) ---------- */
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(pointer: fine)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let gx = mx, gy = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
    });

    function animateGlow() {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      glow.style.transform = `translate(${gx - 210}px, ${gy - 210}px)`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  } else {
    glow.style.display = 'none';
  }

  /* ---------- Smooth anchor scroll w/ navbar offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
