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

  // --- 5. Secret Launch Overlay Dismiss ---
  const launchOverlay = document.querySelector('.launch-overlay');
  const launchFooter = document.querySelector('.launch-footer');
  if (launchOverlay && launchFooter) {
    launchFooter.addEventListener('click', () => {
      launchOverlay.style.opacity = '0';
      launchOverlay.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        launchOverlay.style.display = 'none';
      }, 600);
    });
  }

  // --- 6. Floating Blobs Parallax Cursor Effect ---
  const floatingBlobs = document.querySelectorAll('.floating-blob');
  window.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (e.clientX - centerX) * 0.08;
    const offsetY = (e.clientY - centerY) * 0.08;

    floatingBlobs.forEach((blob, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      blob.style.transform = `translate(${offsetX * direction}px, ${offsetY * direction}px)`;
    });
  });
});
