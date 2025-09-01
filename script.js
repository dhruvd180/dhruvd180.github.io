// Wildlife AI - Interactive Animations and Functionality

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  initSmoothScrolling();
  
  // Intersection Observer for animations
  initScrollAnimations();
  
  // Header scroll effects
  initHeaderEffects();
  
  // Counter animations for stats
  initCounterAnimations();
  
  // Active navigation highlighting
  initNavigationHighlighting();
  
  // Parallax effects
  initParallaxEffects();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add delay based on data-delay attribute
        const delay = entry.target.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
          entry.target.classList.add('show');
        }, parseInt(delay));
        
        // Trigger counter animation for stat numbers
        if (entry.target.classList.contains('stat-item')) {
          animateCounter(entry.target.querySelector('.stat-number'));
        }
        
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
    observer.observe(el);
  });
}

// Header scroll effects
function initHeaderEffects() {
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Change header appearance on scroll
    if (currentScrollY > 100) {
      header.style.background = 'rgba(255, 255, 249, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(255, 140, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 249, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(255, 140, 0, 0.05)';
    }
    
    // Hide/show header on scroll direction (optional)
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Counter animations for statistics
function initCounterAnimations() {
  function animateCounter(element) {
    if (!element || element.classList.contains('animated')) return;
    
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    element.classList.add('animated');
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format numbers with appropriate suffixes
      let displayValue = Math.floor(current);
      if (target >= 1000) {
        displayValue = Math.floor(current / 1000) + 'K+';
        if (current < 1000) displayValue = Math.floor(current);
      }
      
      element.textContent = displayValue;
    }, 16);
  }
  
  // Make animateCounter available globally for intersection observer
  window.animateCounter = animateCounter;
}

// Active navigation highlighting
function initNavigationHighlighting() {
  const navLinks = document.querySelectorAll('nav a[href^="#"], nav a[href$=".html"]');
  
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      
      // Check for hash links
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
      
      // Check for page links (current page highlighting)
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (link.getAttribute('href') === currentPage || 
          (currentPage === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      }
    });
  });
}

// Parallax effects for hero sections
function initParallaxEffects() {
  const heroSections = document.querySelectorAll('.hero');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    heroSections.forEach(hero => {
      const rate = scrolled * -0.5;
      const heroContent = hero.querySelector('.hero-content');
      
      if (heroContent && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${rate}px)`;
      }
    });
  });
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    // Add ripple effect on click
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Scroll-triggered animations for cards
function initCardAnimations() {
  const cards = document.querySelectorAll('.feature-card, .process-card, .value-card, .team-card, .involvement-card, .partnership-card');
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
        entry.target.classList.add('card-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach(card => {
    cardObserver.observe(card);
  });
}

// Initialize card animations
document.addEventListener('DOMContentLoaded', initCardAnimations);

// Smooth page transitions (for better UX)
function initPageTransitions() {
  // Add loading animation for page switches
  const pageLinks = document.querySelectorAll('a[href$=".html"]');
  
  pageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.hostname === window.location.hostname) {
        e.preventDefault();
        
        // Add fade out effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          window.location.href = this.href;
        }, 300);
      }
    });
  });
  
  // Fade in on page load
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', initPageTransitions);

// Enhanced scroll indicator functionality
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const firstSection = document.querySelector('section:nth-of-type(2)');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    // Hide scroll indicator when user scrolls
    let hideTimer;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    });
  }
}

// Initialize scroll indicator
document.addEventListener('DOMContentLoaded', initScrollIndicator);

// Form handling (for contact forms if added later)
function initFormHandling() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
          submitBtn.textContent = 'Message Sent!';
          submitBtn.style.background = '#4CAF50';
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            this.reset();
          }, 2000);
        }, 1500);
      }
    });
  });
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', initFormHandling);

// Image lazy loading (for better performance)
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Mobile menu toggle (if mobile menu is added later)
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('nav');
  
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      }
    });
  }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
  // Scroll-dependent functions can be called here
  // This reduces the frequency of scroll event handling
}, 10));

// Add CSS for ripple effect and card animations
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .card-animate {
    animation: cardSlideUp 0.6s ease-out forwards;
  }
  
  @keyframes cardSlideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Enhanced hover effects */
  .feature-card, .process-card, .value-card, .team-card, .involvement-card, .partnership-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .feature-card:hover, .process-card:hover, .value-card:hover, .team-card:hover, .involvement-card:hover, .partnership-card:hover {
    transform: translateY(-8px) scale(1.02);
  }
  
  /* Smooth page transitions */
  body {
    transition: opacity 0.3s ease;
  }
  
  /* Enhanced scroll indicator */
  .scroll-indicator {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .scroll-indicator:hover .scroll-arrow {
    animation: bounce 1s infinite;
  }
`;
document.head.appendChild(style);

// Easter egg: Konami code for fun animation
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    // Easter egg animation
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    setTimeout(() => {
      document.body.style.animation = '';
    }, 2000);
    
    konamiCode = [];
  }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    25% { filter: hue-rotate(90deg); }
    50% { filter: hue-rotate(180deg); }
    75% { filter: hue-rotate(270deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(rainbowStyle);