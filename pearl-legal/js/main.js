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
let modalLastFocusedEl = null;

function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute('hidden'));
}

function openModal(triggerEl = document.activeElement) {
  modalLastFocusedEl = triggerEl;
  modalOverlay?.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  const focusables = getFocusableElements(modalOverlay);
  if (focusables.length) {
    focusables[0].focus();
  }
}

function closeModal() {
  modalOverlay?.classList.remove('is-open');
  document.body.style.overflow = '';

  if (modalLastFocusedEl && typeof modalLastFocusedEl.focus === 'function') {
    modalLastFocusedEl.focus();
  }
}

modalOpenBtns.forEach(btn => {
  btn.addEventListener('click', () => openModal(btn));
});
modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));

modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (!modalOverlay?.classList.contains('is-open')) return;

  if (e.key === 'Escape') closeModal();

  if (e.key === 'Tab') {
    const focusables = getFocusableElements(modalOverlay);
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// ============================================
// FORM SUBMISSION
// ============================================
const contactForm = document.getElementById('contactForm');
const contactFormStatus = document.getElementById('contactFormStatus');
const whatsappNumber = contactForm?.dataset.whatsappNumber || '';
const web3formsAccessKey = (contactForm?.dataset.web3formsKey || '').trim();

function setContactStatus(message, type = 'info') {
  if (!contactFormStatus) return;
  contactFormStatus.textContent = message;
  contactFormStatus.dataset.state = type;
}

function buildWhatsAppUrl(formData) {
  const message = [
    'Hola, quiero hacer una consulta legal inicial.',
    `Nombre: ${formData.get('name') || 'No indicado'}`,
    `Correo: ${formData.get('email') || 'No indicado'}`,
    `Teléfono: ${formData.get('phone') || 'No indicado'}`,
    `País: ${formData.get('country') || 'No indicado'}`,
    `Servicio: ${formData.get('service') || 'No indicado'}`,
    `Descripción: ${formData.get('description') || 'No indicada'}`
  ].join('\n');

  if (!whatsappNumber) {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  }

  const phone = whatsappNumber.replace(/\D/g, '');

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function sendWithFormSubmitIframe(formData) {
  const sinkFrame = document.getElementById('formSubmitSink');
  if (!sinkFrame) {
    return Promise.reject(new Error('Missing form submission sink iframe.'));
  }

  return new Promise((resolve, reject) => {
    const tempForm = document.createElement('form');
    tempForm.method = 'POST';
    tempForm.action = contactForm.action;
    tempForm.target = 'formSubmitSink';
    tempForm.style.display = 'none';

    const payload = {
      ...Object.fromEntries(formData.entries()),
      _subject: 'Nuevo contacto desde Pearl Investment',
      _template: 'table',
      submitted_at: new Date().toISOString(),
      event_id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      source: 'website_modal_whatsapp_flow'
    };

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value ?? '');
      tempForm.appendChild(input);
    });

    const onLoad = () => {
      clearTimeout(timeoutId);
      sinkFrame.removeEventListener('load', onLoad);
      resolve();
    };

    const timeoutId = setTimeout(() => {
      sinkFrame.removeEventListener('load', onLoad);
      reject(new Error('Internal email submission timeout.'));
    }, 15000);

    sinkFrame.addEventListener('load', onLoad, { once: true });
    document.body.appendChild(tempForm);
    tempForm.submit();
    tempForm.remove();
  });
}

function sendWithWeb3Forms(formData) {
  if (!web3formsAccessKey) {
    return Promise.reject(new Error('Missing Web3Forms access key.'));
  }

  const payload = {
    access_key: web3formsAccessKey,
    subject: 'Nuevo contacto desde Pearl Investment',
    from_name: 'Pearl Investment Website',
    name: String(formData.get('name') || ''),
    email: String(formData.get('email') || ''),
    phone: String(formData.get('phone') || ''),
    country: String(formData.get('country') || ''),
    service: String(formData.get('service') || ''),
    message: String(formData.get('description') || ''),
    submitted_at: new Date().toISOString(),
    source: 'website_modal_whatsapp_flow'
  };

  function postOnce(timeoutMs = 12000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result || result.success !== true) {
          throw new Error('Web3Forms rejected submission.');
        }
      })
      .finally(() => clearTimeout(timeoutId));
  }

  return postOnce().catch(() => postOnce());
}

function sendInternalEmail(formData) {
  return sendWithWeb3Forms(formData).catch(() => sendWithFormSubmitIframe(formData));
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('[type="submit"]');
  const originalText = btn.innerHTML;
  const formData = new FormData(contactForm);

  if (!contactForm.reportValidity()) {
    setContactStatus('Revisa los campos obligatorios antes de continuar.', 'error');
    return;
  }

  const whatsAppUrl = buildWhatsAppUrl(formData);
  window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');

  btn.innerHTML = 'Abriendo WhatsApp…';
  btn.disabled = true;
  setContactStatus('WhatsApp se abrió con el mensaje prellenado. Continúa allí para enviarlo.', 'success');

  sendInternalEmail(formData)
    .catch(() => {
      // Internal fallback only: keep user flow focused on WhatsApp.
      console.warn('No se pudo enviar el correo interno automáticamente.');
    });

  setTimeout(() => {
    closeModal();
    contactForm.reset();
    btn.innerHTML = originalText;
    btn.disabled = false;
    btn.style = '';
    setContactStatus('', 'info');
  }, 1300);
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
