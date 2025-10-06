/* ===================================================
   script.js — Full site script
   Purpose: contains dark-mode toggle, connect button,
            scroll animations (IO), lucide init, and
            helper code. Removes the previous custom
            cursor + zoom lens logic entirely.
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ===================================================
     0. LOADING SCREEN (4-5 seconds)
     =================================================== */
  
  /* ===================================================
     1. SAFETY CHECKS & DOM SHORTCUTS
     =================================================== */
  const root = document.documentElement;
  const connectBtn = document.getElementById('final-connect-btn');

  /* ===================================================
     2. DARK MODE TOGGLE (persist preference)
     =================================================== */
  // NOTE: This section has been updated to support the new checkbox toggle.
  const toggleContainer = document.getElementById('dark-mode-toggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('site-theme', theme); } catch(_) {}
  }

  if (toggleContainer) {
    const toggleCheckbox = toggleContainer.querySelector('input[type="checkbox"]');

    (function initTheme() {
      try {
        const savedTheme = localStorage.getItem('site-theme');
        // Default to dark theme if nothing is saved or the value is not 'light'
        const currentTheme = (savedTheme === 'light') ? 'light' : 'dark';
        
        root.setAttribute('data-theme', currentTheme);
        
        if (toggleCheckbox) {
          // Sync checkbox state: checked means dark mode is on.
          toggleCheckbox.checked = (currentTheme === 'dark');
        }

      } catch (err) {
        // Fallback if localStorage is disabled or fails
        if (!root.hasAttribute('data-theme')) {
          root.setAttribute('data-theme', 'dark');
        }
        if (toggleCheckbox) {
          toggleCheckbox.checked = (root.getAttribute('data-theme') === 'dark');
        }
      }
    })();

    if (toggleCheckbox) {
      toggleCheckbox.addEventListener('change', () => {
        const newTheme = toggleCheckbox.checked ? 'dark' : 'light';
        setTheme(newTheme);
      });
    }
  }


  /* ===================================================
     3. CONNECT BUTTON
     =================================================== */
  if (connectBtn) {
    connectBtn.addEventListener('click', (e) => {
      const email = connectBtn.getAttribute('data-email') || 'jhonafework@gmail.com';
      // use mailto to open email client
      window.location.href = `mailto:${email}`;
    });
  }

  /* ===================================================
     4. REMOVE LENS ZOOM — NOOP (explicit, in case other scripts added it)
     =================================================== */
  // If any prior code created a lens, remove it now.
  (function removeLensIfExists(){
    const existing = document.getElementById('zoom-lens');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    // Also remove any lingering listeners that may have been attached to .about-bio
    // (we can't directly remove anonymous listeners, but we can re-bind safe ones)
    const aboutBio = document.querySelector('.about-bio');
    if (aboutBio) {
      // ensure it has no inline mouse handlers
      aboutBio.onmouseenter = null;
      aboutBio.onmouseleave = null;
      aboutBio.onmousemove = null;
      // ensure style resets
      aboutBio.style.transform = 'none';
    }
  })();

  /* ===================================================
     5. SCROLL ANIMATIONS (IntersectionObserver)
     =================================================== */
  (function initScrollAnimations(){
    const animated = document.querySelectorAll('[data-scroll-animation]');
    if (!animated || animated.length === 0) return;

    const opts = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          obs.unobserve(entry.target);
        }
      });
    }, opts);

    animated.forEach(el => io.observe(el));
  })();

  /* ===================================================
     6. LUCIDE ICONS
     =================================================== */
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    try { lucide.createIcons(); } catch (err) { /* ignore */ }
  }

  /* ===================================================
     7. ADDITIONAL ACCESSIBILITY HELPERS (optional)
     =================================================== */
  // Ensure keyboard focus outlines are visible and sensible.
  (function accessibilityTuning(){
    // Prefer showing focus outlines only when using keyboard navigation.
    let mouseUsed = false;
    window.addEventListener('mousedown', () => { mouseUsed = true; document.body.classList.add('using-mouse'); }, { once: true });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
      }
    });

    // Add skip-link for keyboard users (if not present)
    if (!document.getElementById('skip-to-content')) {
      const skip = document.createElement('a');
      skip.id = 'skip-to-content';
      skip.href = '#main';
      skip.innerText = 'Skip to content';
      skip.style.position = 'absolute';
      skip.style.left = '-9999px';
      skip.style.top = 'auto';
      skip.style.width = '1px';
      skip.style.height = '1px';
      skip.style.overflow = 'hidden';
      skip.setAttribute('aria-hidden', 'false');
      document.body.insertBefore(skip, document.body.firstChild);
    }
  })();

  /* ===================================================
     8. SAFEGUARD: If any old cursor logic is present
     (e.g., from other scripts), attempt to disable it.
     =================================================== */
  (function disableLegacyCursorScripts(){
    // Many implementations add a #custom-cursor element; if present, remove it.
    const el = document.getElementById('custom-cursor');
    if (el && el.parentNode) el.parentNode.removeChild(el);

    // Remove event listeners that were used for custom cursor movement by overwriting handlers
    window.onmousemove = null;
    window.onpointermove = null;
    document.onmousemove = null;
    document.onpointermove = null;
  })();

  /* ===================================================
     9. UTILS: Simple debug flag (toggle in dev)
     =================================================== */
  window.__siteDebug = window.__siteDebug || false;
  if (window.__siteDebug) console.log('Site script initialized');

  /* ===================================================
     10. CLEANUP: remove inline 'zoom' CSS if any
     =================================================== */
  (function cleanupStyles() {
    const targets = document.querySelectorAll('.about-bio, .about-section, #about p');
    targets.forEach(t => {
      if (t.style && t.style.transform) t.style.transform = 'none';
      // ensure pointer is default (system)
      t.style.cursor = 'auto';
    });
  })();

  /* ===================================================
     End of DOMContentLoaded logic
     =================================================== */
});
// if (connectBtn) {
//   connectBtn.addEventListener('click', (e) => {
//     const email = connectBtn.getAttribute('data-email') || 'jhonafework@gmail.com';
//     // use mailto to open email client
//     window.location.href = `mailto:${email}`;
//   });
// }
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('final-connect-btn');
    if (button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const email = this.getAttribute('data-email');
            const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
            window.open(url, '_blank');
        });
    }
});


