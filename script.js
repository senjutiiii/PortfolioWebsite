/* ====================================
   SENJUTI DAS PORTFOLIO - JAVASCRIPT
   ==================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initTheme();
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
  initFormHandling();
  initCustomCursor();
  setCurrentYear();
  initImageReveal();
  initParallax();
});

/* --- Theme Toggle --- */
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = prefersDark.matches ? 'dark' : 'light';
  const currentTheme = savedTheme || systemTheme;
  
  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  // Toggle theme on click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  // Listen for system preference changes
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
    }
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>`;
  
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>`;
  
  themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

/* --- Header Scroll Effect --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  const announcementBar = document.querySelector('.announcement-bar');
  
  if (!header) return;
  
  // Add class if announcement bar exists
  if (announcementBar) {
    header.classList.add('has-announcement');
  }
  
  let lastScroll = 0;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    lastScroll = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(header, announcementBar, lastScroll);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function handleScroll(header, announcementBar, scrollY) {
  const threshold = announcementBar ? 32 : 0;
  
  if (scrollY > threshold) {
    header.classList.add('scrolled');
    if (announcementBar) {
      header.classList.remove('has-announcement');
    }
  } else {
    header.classList.remove('scrolled');
    if (announcementBar) {
      header.classList.add('has-announcement');
    }
  }
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking a link
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

/* --- Scroll Reveal Animation --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .stagger-children');
  
  if (reveals.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  reveals.forEach(el => observer.observe(el));
}

/* --- Image Reveal Animation --- */
function initImageReveal() {
  const images = document.querySelectorAll('.image-reveal');
  
  if (images.length === 0) return;
  
  const observerOptions = {
    threshold: 0.3
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  images.forEach(img => observer.observe(img));
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --- Form Handling (Improved) --- */
function initFormHandling() {
  // Only target intended contact/demo forms.
  // Recommended: add data attribute to your form: <form data-demo-contact ...>
  const forms = document.querySelectorAll('form.contact-form, form[data-demo-contact]');

  forms.forEach((form) => {
    // Prevent double-binding if init runs multiple times
    if (form.dataset.formBound === "true") return;
    form.dataset.formBound = "true";

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate
      const { isValid, firstInvalid } = validateForm(form);

      if (!isValid) {
        showNotification('Please fill in all required fields correctly.', 'error');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Collect form data (if you need it)
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

      // Demo success
      showNotification(
        'Thank you! Your message has been sent. This is a demo form — please reach out via email or LinkedIn for actual contact.',
        'success'
      );

      form.reset();
    });
  });

  // Remove error styling when user fixes input
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el && (el.matches('input, textarea, select'))) {
      el.classList.remove('error');
    }
  });

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && (el.matches('input, textarea, select'))) {
      el.classList.remove('error');
    }
  });
}

function validateForm(form) {
  let isValid = true;
  let firstInvalid = null;

  // Handle required fields including radios/checkbox groups
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach((field) => {
    let fieldValid = true;

    const tag = field.tagName.toLowerCase();
    const type = (field.getAttribute('type') || '').toLowerCase();

    if (type === 'checkbox') {
      fieldValid = field.checked;
    } else if (type === 'radio') {
      // Validate the entire radio group by name
      const name = field.name;
      if (name) {
        const group = form.querySelectorAll(`input[type="radio"][name="${CSS.escape(name)}"]`);
        fieldValid = Array.from(group).some(r => r.checked);
        // mark all radios in group if invalid
        if (!fieldValid) {
          group.forEach(r => r.classList.add('error'));
        } else {
          group.forEach(r => r.classList.remove('error'));
        }
      } else {
        fieldValid = field.checked;
      }
    } else if (tag === 'select') {
      fieldValid = !!field.value;
    } else {
      fieldValid = !!field.value.trim();
    }

    // Basic email validation if it's an email field
    if (fieldValid && type === 'email') {
      fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    }

    if (!fieldValid) {
      isValid = false;
      field.classList.add('error');
      if (!firstInvalid) firstInvalid = field;
    } else {
      // avoid removing for radio groups handled above
      if (type !== 'radio') field.classList.remove('error');
    }
  });

  return { isValid, firstInvalid };
}

/* --- Notification System (Safer) --- */
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.setAttribute('role', 'status');
  notification.setAttribute('aria-live', 'polite');

  const p = document.createElement('p');
  p.textContent = message; // SAFE (no HTML injection)

  const btn = document.createElement('button');
  btn.className = 'notification-close';
  btn.setAttribute('aria-label', 'Close notification');
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  `;

  notification.appendChild(p);
  notification.appendChild(btn);

  notification.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    background-color: ${type === 'success' ? 'var(--color-accent)' : type === 'error' ? '#D64545' : 'var(--color-text)'};
    color: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 9999;
    animation: slideIn 0.4s var(--ease-out);
    max-width: 400px;
  `;

  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      .notification p { margin: 0; font-size: 0.875rem; }
      .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      .notification-close:hover { opacity: 1; }
      .error { outline: 2px solid #D64545; outline-offset: 2px; }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  btn.addEventListener('click', () => {
    notification.style.animation = 'slideOut 0.3s var(--ease-out) forwards';
    setTimeout(() => notification.remove(), 300);
  });

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOut 0.3s var(--ease-out) forwards';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

/* --- Custom Cursor --- */
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  
  // Check if it's a touch device
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    return;
  }
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('visible');
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('visible');
  });
  
  // Interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .highlight-card');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  // Smooth cursor animation
  function animateCursor() {
    const ease = 0.15;
    
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
}

/* --- Set Current Year --- */
function setCurrentYear() {
  const yearElements = document.querySelectorAll('#year, .current-year');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

/* --- Parallax Effect --- */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.hero-decoration');
  
  if (parallaxElements.length === 0) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((el, index) => {
          const speed = 0.2 + (index * 0.1);
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* --- Text Splitting for Animations (Optional) --- */
function splitText(element) {
  const text = element.textContent;
  element.innerHTML = '';
  
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${i * 0.03}s`;
    span.className = 'char';
    element.appendChild(span);
  });
}

/* --- Typing Effect (Optional) --- */
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

/* --- Counter Animation (Optional) --- */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

/* --- Lazy Loading Images --- */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

/* --- Export functions for external use --- */
window.Portfolio = {
  showNotification,
  splitText,
  typeWriter,
  animateCounter
};
