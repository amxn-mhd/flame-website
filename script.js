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

  // --- 7. Social Feed Tab Switcher ---
  const tabButtons = document.querySelectorAll('.social-tab-btn');
  const feedPanels = document.querySelectorAll('.social-feed-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');

      feedPanels.forEach(panel => {
        panel.classList.remove('active');
      });

      const activePanel = document.getElementById(`${targetTab}-feed`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // --- 8. Achievements Timeline & Graph Handler ---
  const growthData = {
    "2022-23": {
      year: "Academic Year 2022-23 (Launch)",
      title: "Lighting the Spark of Opportunity",
      desc: "In our inaugural year, FLAME identified key learning gaps in Mannarkkad's government schools. We set up initial digital libraries and distributed foundational scholarship guides to students.",
      lss: 120, uss: 30, nmms: 20, sslc: 65, plustwo: 55,
      features: [
        { icon: "🌱", title: "FLAME Initiative Founded", desc: "Launched under Adv. N Samsudheen with a core focus on underprivileged student mentorship." },
        { icon: "📚", title: "12 Digital Libraries Setup", desc: "Distributed initial educational computer kiosks across primary government schools." }
      ]
    },
    "2023-24": {
      year: "Academic Year 2023-24",
      title: "Expanding Our Footprint",
      desc: "Our second year was focused on scaling. We introduced specialized mentorship camps for LSS/USS entrance preparation and launched the first-ever student merit incentive grants.",
      lss: 210, uss: 55, nmms: 38, sslc: 110, plustwo: 95,
      features: [
        { icon: "🏫", title: "Mentorship Preparation Camps", desc: "Organized weekly weekend entrance guidance sessions led by expert educators." },
        { icon: "🎁", title: "Free Study Kit Distribution", desc: "Provided comprehensive curriculum support kits to over 25 rural divisions." }
      ]
    },
    "2024-25": {
      year: "Academic Year 2024-25",
      title: "Digital Integration & Skill Camps",
      desc: "The digital shift. We initiated coder camps and advanced interactive screen setups in multiple schools while scaling our academic achievements significantly.",
      lss: 320, uss: 80, nmms: 58, sslc: 160, plustwo: 140,
      features: [
        { icon: "💻", title: "Student Coder Workshops", desc: "Introduced foundational software training and robotics camps to primary students." },
        { icon: "📺", title: "5 Smart Classroom Models", desc: "Installed premium interactive LED displays in select municipal high schools." }
      ]
    },
    "2025-26": {
      year: "Academic Year 2025-26 (Peak)",
      title: "Scaling Educational Transformation",
      desc: "This academic year marks the peak of the FLAME initiative. Along with historic scholarship achievements, we launched specialized digital learning portals and established dedicated career counseling clinics across the Mannarkkad constituency.",
      lss: 400, uss: 100, nmms: 80, sslc: 246, plustwo: 185,
      features: [
        { icon: "🌟", title: "Minister's Merit Conclave", desc: "Constituency-wide recognition event honoring all A+ achievers in Mannarkkad." },
        { icon: "⚡", title: "100% Digital Screen Integration", desc: "Completed digital infrastructure setup across select government school divisions." }
      ]
    }
  };

  const timelineBtns = document.querySelectorAll('.timeline-year-btn');
  const yearIndicator = document.getElementById('graph-year-indicator');
  const milestoneYear = document.getElementById('milestone-year');
  const milestoneTitle = document.getElementById('milestone-title');
  const milestoneDesc = document.getElementById('milestone-desc');
  const milestoneFeatures = document.getElementById('milestone-features');

  const bars = {
    lss: { element: document.getElementById('bar-lss'), max: 500 },
    uss: { element: document.getElementById('bar-uss'), max: 500 },
    nmms: { element: document.getElementById('bar-nmms'), max: 500 },
    sslc: { element: document.getElementById('bar-sslc'), max: 500 },
    plustwo: { element: document.getElementById('bar-plustwo'), max: 500 }
  };

  function updateDashboard(yearKey) {
    const data = growthData[yearKey];
    if (!data) return;

    yearIndicator.textContent = yearKey;
    milestoneYear.textContent = data.year;
    milestoneTitle.textContent = data.title;
    milestoneDesc.textContent = data.desc;

    milestoneFeatures.innerHTML = data.features.map(f => `
      <div class="milestone-item">
        <span class="milestone-icon">${f.icon}</span>
        <div>
          <h6>${f.title}</h6>
          <p>${f.desc}</p>
        </div>
      </div>
    `).join('');

    Object.keys(bars).forEach(key => {
      const barInfo = bars[key];
      const val = data[key];
      const heightPercent = (val / barInfo.max) * 100;
      
      barInfo.element.style.height = `${heightPercent}%`;
      
      const valSpan = barInfo.element.querySelector('.bar-value');
      if (valSpan) {
        valSpan.textContent = val;
      }
    });
  }

  timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timelineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedYear = btn.getAttribute('data-year');
      updateDashboard(selectedYear);
    });
  });
});
