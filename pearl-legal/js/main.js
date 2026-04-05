/**
 * PEARL INVESTMENT — main.js
 * International Legal Services
 */

// ============================================
// NAV SCROLL BEHAVIOR
// ============================================
const nav = document.getElementById('nav');

function handleNavScroll() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();


// ============================================
// MOBILE NAV
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = mobileNav?.querySelectorAll('.nav__mobile-link');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  hamburger.setAttribute('aria-expanded', isOpen);

  // Animate bars
  const bars = hamburger.querySelectorAll('span');
  if (isOpen) {
    bars[0].style.transform = 'translateY(6px) rotate(45deg)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity = '';
    bars[2].style.transform = '';
  }
});

mobileLinks?.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', false);
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity = '';
    bars[2].style.transform = '';
  });
});


// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link[data-section]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));


// ============================================
// SCROLL REVEAL
// ============================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => revealObserver.observe(el));


// ============================================
// LINE ANIMATIONS
// ============================================
const lineEls = document.querySelectorAll('.line-animate');

const lineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        lineObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

lineEls.forEach(el => lineObserver.observe(el));


// ============================================
// PRACTICE CARD EXPANDERS
// ============================================
const practiceCards = document.querySelectorAll('[data-practice-card]');

practiceCards.forEach(card => {
  const cardId = card.dataset.practiceCard;
  const toggle = card.querySelector(`[data-practice-card-toggle="${cardId}"]`);
  const content = card.querySelector(`[data-practice-card-content="${cardId}"]`);

  toggle?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = card.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));

    const label = toggle.querySelector('span');
    if (label) {
      label.textContent = isOpen ? 'Ver menos' : 'Ver más';
    }

    if (content) {
      content.hidden = !isOpen;
    }
  });

  if (content) {
    content.hidden = true;
  }
});


// ============================================
// MODAL
// ============================================
const modalOverlay = document.getElementById('modalOverlay');
const modalCloseBtns = document.querySelectorAll('[data-modal-close]');
const modalOpenBtns = document.querySelectorAll('[data-modal-open]');

function openModal() {
  modalOverlay?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay?.classList.remove('is-open');
  document.body.style.overflow = '';
}

modalOpenBtns.forEach(btn => btn.addEventListener('click', openModal));
modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));

modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ============================================
// FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('[type="submit"]');
  const originalText = btn.innerHTML;

  btn.innerHTML = 'Enviando…';
  btn.disabled = true;

  // Simulate async (replace with real endpoint)
  setTimeout(() => {
    btn.innerHTML = '✓ Enviado correctamente';
    btn.style.background = 'rgba(200, 169, 110, 0.2)';
    btn.style.color = 'var(--gold)';
    btn.style.border = '1px solid var(--gold-border)';

    setTimeout(() => {
      closeModal();
      contactForm.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style = '';
    }, 2500);
  }, 1200);
});


// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height') || '80', 10);
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();
  const isFloat = String(target).includes('.');

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = target * eased;
    el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterEls = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counterEls.forEach(el => counterObserver.observe(el));


// ============================================
// INIT
// ============================================
document.documentElement.classList.add('js-loaded');
