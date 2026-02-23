/* ============================================================
   The Digital Experts — Main JS
   Skills used from Claude-skills/web/:
     · initScrollReveal    (scrollReveal.js)
     · initCounters        (animateCounter.js)
     · initFaqAccordion    (faqAccordion.js)
     · initNavbarScroll    (navbarUtils.js)
     · initHamburgerMenu   (navbarUtils.js)
     · initActiveNavOnScroll (navbarUtils.js)
     · initSmoothScroll    (smoothScroll.js)
     · validateForm, showError, clearErrors, initLiveValidation (formValidation.js)
   ============================================================ */

/* ── 1. SCROLL REVEAL ───────────────────────────────────────── */
function initScrollReveal({ threshold = 0.1, rootMargin = '0px 0px -60px 0px', staggerMs = 100 } = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('visible'), Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold, rootMargin });

  document.querySelectorAll('.reveal').forEach((el) => {
    const siblings = Array.from(el.parentElement.querySelectorAll(':scope > .reveal'));
    const index = siblings.indexOf(el);
    if (siblings.length > 1) el.dataset.revealDelay = index * staggerMs;
    observer.observe(el);
  });
}

/* ── 2. ANIMATE COUNTER ─────────────────────────────────────── */
function animateCounter(el, duration = 1800) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  const start = performance.now();
  function step(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

function initCounters({ selector = '.counter[data-target]', duration = 1800, threshold = 0.5 } = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, duration);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });
  document.querySelectorAll(selector).forEach((el) => observer.observe(el));
}

/* ── 3. FAQ ACCORDION ───────────────────────────────────────── */
function initFaqAccordion({ itemSelector = '.faq-item', triggerSelector = '.faq-question', activeClass = 'active' } = {}) {
  document.querySelectorAll(triggerSelector).forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest(itemSelector);
      const isOpen = item.classList.contains(activeClass);
      document.querySelectorAll(`${itemSelector}.${activeClass}`).forEach((openItem) => {
        openItem.classList.remove(activeClass);
        openItem.querySelector(triggerSelector)?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add(activeClass);
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ── 4. NAVBAR SCROLL ───────────────────────────────────────── */
function initNavbarScroll(navbarId = 'navbar', threshold = 40) {
  const navbar = document.getElementById(navbarId);
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > threshold);
  }, { passive: true });
}

/* ── 5. HAMBURGER MENU ──────────────────────────────────────── */
function initHamburgerMenu(hamburgerId = 'hamburger', navLinksId = 'navLinks') {
  const hamburger = document.getElementById(hamburgerId);
  const navLinks  = document.getElementById(navLinksId);
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── 6. ACTIVE NAV ON SCROLL ────────────────────────────────── */
function initActiveNavOnScroll(offset = 100) {
  const sections    = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinksAll.length) return;
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - offset) current = section.getAttribute('id');
    });
    navLinksAll.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}

/* ── 7. SMOOTH SCROLL ───────────────────────────────────────── */
function initSmoothScroll(offset = 80) {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── 8. FORM VALIDATION ─────────────────────────────────────── */
const VALIDATORS = {
  required:  (val) => val.trim().length > 0 || 'This field is required.',
  email:     (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) || 'Enter a valid email address.',
  phone:     (val) => !val || /^[6-9]\d{9}$/.test(val.trim()) || 'Enter a valid 10-digit mobile number.',
  minLength: (val, n) => !val || val.trim().length >= Number(n) || `Must be at least ${n} characters.`,
  maxLength: (val, n) => !val || val.trim().length <= Number(n) || `Must be ${n} characters or fewer.`,
};

function validateForm(formEl, rules) {
  const errors = {};
  for (const [name, fieldRules] of Object.entries(rules)) {
    const field = formEl.elements[name];
    if (!field) continue;
    const val = field.value || '';
    for (const rule of fieldRules) {
      const [ruleName, ruleArg] = rule.split(':');
      const validator = VALIDATORS[ruleName];
      if (!validator) continue;
      const result = validator(val, ruleArg);
      if (result !== true) { errors[name] = result; break; }
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

function showError(fieldEl, message) {
  if (!fieldEl) return;
  fieldEl.classList.add('field-error');
  const existing = fieldEl.parentElement.querySelector('.error-message');
  if (existing) existing.remove();
  const span = document.createElement('span');
  span.className = 'error-message';
  span.textContent = message;
  fieldEl.insertAdjacentElement('afterend', span);
}

function clearErrors(formEl) {
  formEl.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
  formEl.querySelectorAll('.error-message').forEach(el => el.remove());
}

function initLiveValidation(formEl, rules) {
  for (const name of Object.keys(rules)) {
    const field = formEl.elements[name];
    if (!field) continue;
    const eventType = field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(eventType, () => {
      field.classList.remove('field-error');
      const sibling = field.nextElementSibling;
      if (sibling && sibling.classList.contains('error-message')) sibling.remove();
    });
  }
}

/* ── 9. PORTFOLIO FILTER ────────────────────────────────────── */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ── 10. CONTACT FORM ───────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const rules = {
    name:    ['required', 'minLength:2'],
    email:   ['required', 'email'],
    phone:   ['phone'],
    service: ['required'],
    message: ['required', 'minLength:10'],
  };

  initLiveValidation(form, rules);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(form);
    const { valid, errors } = validateForm(form, rules);
    if (!valid) {
      Object.entries(errors).forEach(([name, msg]) => showError(form.elements[name], msg));
      const firstError = form.querySelector('.field-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // Simulate form submission
    const btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) success.classList.add('show');
    }, 1200);
  });
}

/* ── INIT ALL ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll('navbar', 40);
  initHamburgerMenu('hamburger', 'navLinks');
  initSmoothScroll(80);
  initScrollReveal({ staggerMs: 120 });
  initCounters({ duration: 2000 });
  initFaqAccordion();
  initPortfolioFilter();
  initContactForm();

  // Only run on single-page layouts
  if (document.querySelectorAll('section[id]').length > 2) {
    initActiveNavOnScroll(90);
  }

  // Mark current page nav link as active
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) link.classList.add('active');
  });
});
