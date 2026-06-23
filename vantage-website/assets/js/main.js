/**
 * assets/js/main.js — VantaGe Sports Consultancy
 * =================================================
 * Core JavaScript for every public page.
 *
 * Responsibilities:
 *   1. Navbar scroll shadow  — adds .scrolled when page is scrolled > 8px
 *   2. Hamburger toggle      — open / close mobile drawer + backdrop
 *   3. Active link detection — marks the current page's nav link as .active
 *   4. Smooth scroll         — handles #performance and #science anchor links:
 *        • On index.html  → scrolls to the matching section element
 *        • On other pages → navigates to index.html#<anchor>
 *   5. Body scroll lock      — prevents background scroll when mobile nav is open
 *
 * Depends on: includes/navbar.html being present in the DOM
 */

(function () {
  'use strict';

  /* ── Wait for DOM to be ready ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupScrollShadow();
    setupHamburger();
    markActiveLink();
    setupSmoothScroll();
  }

  /* ══════════════════════════════════════════════════════════════════════════
     1. NAVBAR SCROLL SHADOW
        Adds the .scrolled class to #navbar when the user has scrolled > 8px.
        The CSS then applies a deep drop-shadow.
     ══════════════════════════════════════════════════════════════════════════ */
  function setupScrollShadow() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 8) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    /* Run once on load in case page is already scrolled */
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ══════════════════════════════════════════════════════════════════════════
     2. HAMBURGER MENU TOGGLE
        Toggles .open on #hamburger-btn and #mobile-nav.
        Shows/hides the semi-transparent backdrop.
        Closes the drawer when:
          • Hamburger is clicked again
          • Backdrop is clicked
          • Any mobile nav link is clicked
          • Window is resized to desktop (≥ 900px)
     ══════════════════════════════════════════════════════════════════════════ */
  function setupHamburger() {
    var btn      = document.getElementById('hamburger-btn');
    var mobileNav = document.getElementById('mobile-nav');
    var backdrop  = document.getElementById('mobile-nav-backdrop');

    if (!btn || !mobileNav) return;

    /* Toggle open/close */
    btn.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));

      if (backdrop) {
        backdrop.style.display = isOpen ? 'block' : 'none';
      }

      /* Lock body scroll when drawer is open */
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Click backdrop → close */
    if (backdrop) {
      backdrop.addEventListener('click', closeNav);
    }

    /* Click any mobile link → close */
    var mobileLinks = mobileNav.querySelectorAll('.mobile-nav__link, .mobile-nav__cta');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    /* Resize to desktop → close */
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) {
        closeNav();
      }
    });

    function closeNav() {
      mobileNav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      if (backdrop) backdrop.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  /* ══════════════════════════════════════════════════════════════════════════
     3. ACTIVE LINK DETECTION
        Reads window.location.pathname to determine the current page.
        Adds class="active" to matching .navbar__link and .mobile-nav__link
        elements based on their data-page attribute.

        Page name mapping:
          /index.html or /    → "index"
          /about.html         → "about"
          /services.html      → "services"
          /gallery.html       → "gallery"
          /contact.html       → "contact"
     ══════════════════════════════════════════════════════════════════════════ */
  function markActiveLink() {
    var path = window.location.pathname;

    /* Derive a simple page key from the path */
    var pageKey = 'index'; // default

    if (path.endsWith('about.html'))    pageKey = 'about';
    else if (path.endsWith('services.html')) pageKey = 'services';
    else if (path.endsWith('gallery.html'))  pageKey = 'gallery';
    else if (path.endsWith('contact.html'))  pageKey = 'contact';

    /* Mark all nav links whose data-page matches */
    var allLinks = document.querySelectorAll('[data-page]');
    allLinks.forEach(function (link) {
      if (link.getAttribute('data-page') === pageKey) {
        link.classList.add('active');
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════════════════
     4. SMOOTH SCROLL
        Links with data-scroll="performance" or data-scroll="science":

        Case A — On index.html:
          Intercept the click, find #<sectionId> in the DOM, and smoothly
          scroll to it (offset by the navbar height so the section isn't
          hidden behind the fixed header).

        Case B — On any other page:
          Let the browser navigate to index.html#<sectionId> normally.
          The browser handles the anchor jump after page load.
     ══════════════════════════════════════════════════════════════════════════ */
  function setupSmoothScroll() {
    /* Determine if we are on the home page */
    var path   = window.location.pathname;
    var isHome = path === '/' || path.endsWith('index.html') || path === '';

    /* Navbar height in px (must match --navbar-h CSS variable: 80px) */
    var NAVBAR_HEIGHT = 80;

    /* Select all anchor links with a data-scroll attribute */
    var scrollLinks = document.querySelectorAll('[data-scroll]');

    scrollLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var sectionId = link.getAttribute('data-scroll');
        var target    = document.getElementById(sectionId);

        if (isHome && target) {
          /* ─── Case A: we are on the home page — smooth scroll ─────────── */
          e.preventDefault();

          var targetTop = target.getBoundingClientRect().top
                        + window.scrollY
                        - NAVBAR_HEIGHT;

          window.scrollTo({
            top:      targetTop,
            behavior: 'smooth',
          });

          /* Update the URL hash without jumping */
          history.pushState(null, '', '#' + sectionId);

          /* Close mobile nav if open */
          var mobileNav = document.getElementById('mobile-nav');
          if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            var btn = document.getElementById('hamburger-btn');
            if (btn) {
              btn.classList.remove('open');
              btn.setAttribute('aria-expanded', 'false');
            }
            var backdrop = document.getElementById('mobile-nav-backdrop');
            if (backdrop) backdrop.style.display = 'none';
            document.body.style.overflow = '';
          }
        } else if (!isHome) {
          /* ─── Case B: not on home page — navigate to index.html#section ─ */
          /* Let the default href="#<section>" resolve naturally; main.js does
             nothing here. The link href already points to #performance etc.,
             so we update it to be fully-qualified for cross-page navigation. */
          e.preventDefault();
          window.location.href = 'index.html#' + sectionId;
        }
      });
    });

    /* ── On-load anchor handling ─────────────────────────────────────────── */
    /* If we land on index.html with a hash (e.g. from another page),
       scroll to the correct section after a short delay so the page can settle. */
    if (isHome && window.location.hash) {
      var hash    = window.location.hash.slice(1); // remove '#'
      var section = document.getElementById(hash);
      if (section) {
        setTimeout(function () {
          var top = section.getBoundingClientRect().top
                  + window.scrollY
                  - NAVBAR_HEIGHT;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }, 300);
      }
    }
  }

})();
