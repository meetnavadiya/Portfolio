// ===== DOM ELEMENTS =====
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');
const modalCaption = document.getElementById('modal-caption');
const certificateImages = document.querySelectorAll('.certificate-img');
const allImages = document.querySelectorAll('img[src*="assets/"]');
const contactForm = document.getElementById('contact-form');
const cursor = document.getElementById('cursor');
const cursorBorder = document.getElementById('cursor-border');
const backToTop = document.getElementById('back-to-top');

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const typingText = document.querySelector('.typing-text');
  const roleText = document.querySelector('.role-text');
  
  if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
  }
  
  if (roleText) {
    const roles = ['Full-Stack Developer', 'Python Developer', 'Problem Solver'];
    let roleIndex = 0;
    
    function changeRole() {
      roleText.style.opacity = '0';
      setTimeout(() => {
        roleText.textContent = roles[roleIndex];
        roleText.style.opacity = '1';
        roleIndex = (roleIndex + 1) % roles.length;
      }, 500);
    }
    
    // Change role every 3 seconds
    setInterval(changeRole, 3000);
  }
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current);
    }, 16);
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  counters.forEach(counter => observer.observe(counter));
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
  const floatingElements = document.querySelectorAll('.float-element');
  
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 1;
      const x = (mouseX - 0.5) * speed * 50;
      const y = (mouseY - 0.5) * speed * 50;
      
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// ===== NAVIGATION =====
function initNavigation() {
  // Mobile menu toggle
  menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.setAttribute('aria-expanded', navbar.classList.contains('active'));
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuIcon.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      navbar.classList.remove('active');
      menuIcon.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== ACTIVE NAVIGATION =====
function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

// ===== TAB SYSTEM =====
function initTabs() {
  const tabGroups = document.querySelectorAll('.tabs');

  if (!tabGroups.length) return;

  tabGroups.forEach(group => {
    const container = group.closest('.about-content') || group.parentElement || document;
    const links = group.querySelectorAll('.tab-link');
    const contents = container.querySelectorAll('.tab-content');

    function activateTab(targetId, clickedLink) {
      links.forEach(l => l.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      const target = container.querySelector(`#${targetId}`);
      if (target) target.classList.add('active');
      if (clickedLink) clickedLink.classList.add('active');
    }

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-tab');
        if (!targetId) return;
        activateTab(targetId, link);
      });
    });
  });
}

// ===== IMAGE MODAL SYSTEM =====
function initModal() {
  // Open modal when clicking on any image
  allImages.forEach(img => {
    img.addEventListener('click', () => {
      openModal(img);
    });
    
    // Add cursor pointer to indicate clickable
    img.style.cursor = 'pointer';
  });

  // Close modal with close button
  modalClose.addEventListener('click', closeModal);

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}

function openModal(img) {
  modal.style.display = 'block';
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  
  // Set caption based on image alt text or parent context
  let caption = img.alt || 'Image';
  
  // Special handling for certificates
  if (img.classList.contains('certificate-img')) {
    caption = 'Certificate - Click to view full size';
  } else if (img.src.includes('profile')) {
    caption = 'Meet Navadiya - Full-Stack Developer';
  } else if (img.src.includes('image1')) {
    caption = 'Blog Post Platform - Django Project';
  } else if (img.src.includes('image2')) {
    caption = 'Student Management System - Django Project';
  } else if (img.src.includes('image3')) {
    caption = 'Weather App - JavaScript Project';
  }
  
  modalCaption.textContent = caption;
  document.body.style.overflow = 'hidden';
  
  // Add smooth fade-in animation
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
}

function closeModal() {
  // Add smooth fade-out animation
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  const cursorPos = { x: 0, y: 0 };
  const cursorBorderPos = { x: 0, y: 0 };

  // Update cursor position
  document.addEventListener('mousemove', (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Animate cursor border
  function animateCursorBorder() {
    const easing = 8;
    cursorBorderPos.x += (cursorPos.x - cursorBorderPos.x) / easing;
    cursorBorderPos.y += (cursorPos.y - cursorBorderPos.y) / easing;

    cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
    requestAnimationFrame(animateCursorBorder);
  }

  animateCursorBorder();

  // Handle cursor effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .skill-pill, .certificate-img, img[src*="assets/"]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorBorder.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      cursorBorder.style.setProperty('--size', '80px');
      cursor.style.transform = 'scale(1.5)';
    });

    element.addEventListener('mouseleave', () => {
      cursorBorder.style.backgroundColor = 'transparent';
      cursorBorder.style.setProperty('--size', '50px');
      cursor.style.transform = 'scale(1)';
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const subject = (formData.get('subject') || 'New Portfolio Inquiry').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    // Enhanced validation
    if (!name || name.length < 2) {
      showNotification('Please enter a valid name (at least 2 characters).', 'error');
      return;
    }

    if (!email || !isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    if (!subject || subject.length < 3) {
      showNotification('Please enter a subject (at least 3 characters).', 'error');
      return;
    }

    if (!message || message.length < 10) {
      showNotification('Please enter a message (at least 10 characters).', 'error');
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      // Try to send to backend API first
      const apiUrl = 'http://localhost:8000/api/contact/submit/'; // Change this to your backend URL
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Failed to send message');
      }

    } catch (error) {
      console.error('API Error:', error);
      
      // Fallback to mailto if API fails
      try {
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        const mailto = `mailto:meetnavadiya08@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        window.location.href = mailto;
        showNotification('Opening your email app as fallback...', 'info');
        contactForm.reset();
      } catch (fallbackError) {
        showNotification('Could not send message. Please try again later.', 'error');
      }
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}

// Email validation helper function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  `;
  
  // Set background color based on type
  const colors = {
    success: '#00ff88',
    error: '#ff4757',
    info: '#2089eb'
  };
  
  notification.style.backgroundColor = colors[type] || colors.info;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .project-card, .skill-pill');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
  // Lazy loading for images
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Debounced scroll handler
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavigation, 10);
  });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== SCROLL INDICATOR =====
function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  indicator.addEventListener('click', () => {
    const about = document.getElementById('about');
    if (!about) return;
    const headerHeight = document.querySelector('.header').offsetHeight || 0;
    const top = about.offsetTop - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initNavigation();
  initTabs();
  initModal();
  initCustomCursor();
  initContactForm();
  initScrollAnimations();
  initPerformanceOptimizations();
  initBackToTop();
  initTypingAnimation();
  initCounterAnimation();
  initParallaxEffects();
  initScrollIndicator();
  
  // Initial active navigation update
  updateActiveNavigation();
  
  // Add scroll event listener for active navigation
  window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
  
  console.log('🚀 Portfolio website initialized successfully!');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initNavigation,
    initTabs,
    initModal,
    initCustomCursor,
    initContactForm,
    showNotification,
    debounce,
    throttle
  };
}


