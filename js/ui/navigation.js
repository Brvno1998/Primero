// ==========================================================================
// AURA ATELIER - NAVIGATION, ACCORDION & SCROLL UTILITIES
// ==========================================================================

import { FAQS, TESTIMONIALS } from '../data.js';
import { showToast } from './toast.js';

export function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-links');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const progressSvgCircle = document.getElementById('scroll-progress-circle');
  const newsletterForm = document.getElementById('newsletter-form');

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close menu when link is clicked & trigger category if specified
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';

        if (link.dataset.category) {
          const cat = link.dataset.category;
          const tabBtn = document.querySelector(`.category-tabs .tab-btn[data-category="${cat}"]`);
          if (tabBtn) tabBtn.click();
        }
      });
    });
  }

  // Scroll Progress & Back to Top
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

    // Show/hide Back to Top button
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollTop > 400);

      // Update SVG circle stroke offset if present
      if (progressSvgCircle) {
        const circumference = 2 * Math.PI * 20; // r=20
        const dashOffset = circumference * (1 - scrollPercent);
        progressSvgCircle.style.strokeDashoffset = dashOffset;
      }
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (scrollTop >= top && scrollTop < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Newsletter subscription
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('¡Gracias por suscribirte! Revisa tu email para tu código del 15% OFF.', 'success');
        input.value = '';
      }
    });
  }

  renderTestimonials();
  renderFaqs();
}

function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map(item => `
    <div class="testimonial-card">
      <div class="testimonial-rating">
        ${'<i class="fas fa-star"></i>'.repeat(item.rating)}
      </div>
      <p class="testimonial-text">"${item.comment}"</p>
      <div class="testimonial-author">
        <img src="${item.avatar}" alt="${item.name}" loading="lazy">
        <div>
          <h5 class="author-name">${item.name}</h5>
          <span class="author-role">${item.role}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFaqs() {
  const container = document.getElementById('faq-accordion');
  if (!container) return;

  container.innerHTML = FAQS.map((faq, index) => `
    <div class="faq-item">
      <button class="faq-question" data-index="${index}">
        <span>${faq.question}</span>
        <i class="fas fa-chevron-down faq-icon"></i>
      </button>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      container.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}
