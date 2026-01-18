/**
 * SecureGuard - Minimal JavaScript
 * Accessibility-focused interactions
 * WCAG 2.2 AA compliant
 */

(function() {
  'use strict';

  /**
   * Initialize when DOM is ready
   */
  document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSkipLink();
    initFormValidation();
    initCurrentPageHighlight();
  });

  /**
   * Navbar accessibility enhancements
   */
  function initNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    if (!navbarToggler || !navbarCollapse) return;

    // Handle navbar toggle with proper focus management
    navbarToggler.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Bootstrap handles aria-expanded, but we ensure focus management
      if (!isExpanded) {
        // Menu is opening - focus first nav item after animation
        navbarCollapse.addEventListener('shown.bs.collapse', function onShown() {
          const firstLink = navbarCollapse.querySelector('.nav-link');
          if (firstLink) {
            firstLink.focus();
          }
          navbarCollapse.removeEventListener('shown.bs.collapse', onShown);
        });
      }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse && navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
          navbarToggler.focus();
        }
      }
    });

    // Return focus to toggler when menu closes
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
      // Only return focus if we're on mobile (toggler is visible)
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.focus();
      }
    });
  }

  /**
   * Skip link enhancement
   */
  function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');

    if (!skipLink || !mainContent) return;

    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Ensure main content can receive focus
      if (!mainContent.hasAttribute('tabindex')) {
        mainContent.setAttribute('tabindex', '-1');
      }
      
      mainContent.focus();
      
      // Scroll into view respecting reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      mainContent.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /**
   * Form validation with accessible error messages
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(function(form) {
      const statusRegion = form.querySelector('[aria-live]');
      
      form.addEventListener('submit', function(e) {
        // Clear previous status
        if (statusRegion) {
          statusRegion.textContent = '';
        }

        // Check validity
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
          
          // Find first invalid field and focus it
          const firstInvalid = form.querySelector(':invalid');
          if (firstInvalid) {
            firstInvalid.focus();
            
            // Announce error to screen readers
            if (statusRegion) {
              statusRegion.textContent = 'Παρακαλούμε διορθώστε τα σφάλματα στη φόρμα.';
            }
          }
        } else {
          // Form is valid - show submitting state
          const submitBtn = form.querySelector('[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Αποστολή...';
          }
          
          if (statusRegion) {
            statusRegion.textContent = 'Η φόρμα υποβάλλεται...';
          }
        }

        form.classList.add('was-validated');
      });

      // Real-time validation feedback
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
          validateField(this);
        });

        input.addEventListener('input', function() {
          // Only validate on input if field was previously invalid
          if (this.classList.contains('is-invalid')) {
            validateField(this);
          }
        });
      });
    });
  }

  /**
   * Validate a single field
   */
  function validateField(field) {
    const isValid = field.checkValidity();
    const errorElement = document.getElementById(field.getAttribute('aria-describedby'));

    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      if (errorElement) {
        errorElement.textContent = '';
      }
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      if (errorElement) {
        errorElement.textContent = getErrorMessage(field);
      }
    }
  }

  /**
   * Get appropriate error message for field
   */
  function getErrorMessage(field) {
    if (field.validity.valueMissing) {
      return 'Αυτό το πεδίο είναι υποχρεωτικό.';
    }
    if (field.validity.typeMismatch) {
      if (field.type === 'email') {
        return 'Παρακαλούμε εισάγετε μια έγκυρη διεύθυνση email.';
      }
      if (field.type === 'tel') {
        return 'Παρακαλούμε εισάγετε έναν έγκυρο αριθμό τηλεφώνου.';
      }
    }
    if (field.validity.tooShort) {
      return 'Παρακαλούμε εισάγετε τουλάχιστον ' + field.minLength + ' χαρακτήρες.';
    }
    if (field.validity.patternMismatch) {
      return field.title || 'Παρακαλούμε ακολουθήστε την απαιτούμενη μορφή.';
    }
    return 'Παρακαλούμε εισάγετε μια έγκυρη τιμή.';
  }

  /**
   * Highlight current page in navigation
   */
  function initCurrentPageHighlight() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      
      // Check if this link matches current page
      if (href === currentPath || 
          (href && currentPath.endsWith(href)) ||
          (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Handle URL parameters for form status (Formspree redirect)
   */
  (function handleFormStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const statusRegion = document.getElementById('form-status');
    
    if (urlParams.has('submitted') && statusRegion) {
      statusRegion.innerHTML = '<div class="alert alert-success" role="alert">' +
        '<strong>Ευχαριστούμε!</strong> Το μήνυμά σας στάλθηκε με επιτυχία. Θα επικοινωνήσουμε μαζί σας σύντομα.' +
        '</div>';
      statusRegion.focus();
      
      // Clean up URL
      if (window.history.replaceState) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  })();

})();
