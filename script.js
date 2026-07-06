document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Interactive Cursor Spotlight Effect ---
  const htmlElement = document.documentElement;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  
  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth mouse interpolation (lerp) for smooth trailing effect
  function updateCursorSpotlight() {
    const lerpFactor = 0.08; // Control speed of trailing (lower = smoother)
    currentX += (mouseX - currentX) * lerpFactor;
    currentY += (mouseY - currentY) * lerpFactor;
    
    htmlElement.style.setProperty('--cursor-x', `${currentX}px`);
    htmlElement.style.setProperty('--cursor-y', `${currentY}px`);
    
    requestAnimationFrame(updateCursorSpotlight);
  }
  updateCursorSpotlight();

  // --- 2. Dynamic Scroll Header State ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 3. Scroll Reveal Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep behavior smooth
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- 4. Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('nav');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
});
