<?php
/*
 * includes/navbar.php — VantaGe Sports Consultancy
 * Same content as navbar.html, exposed as a .php include so any PHP page
 * can use: <?php include 'includes/navbar.php'; ?>
 *
 * See navbar.html for full inline documentation.
 */
?>
<!--
  Shared navigation fragment.
  Active-link class="active" is applied at runtime by assets/js/main.js
  based on window.location.pathname + data-page attributes.
  Smooth-scroll links use data-scroll attributes handled by main.js.
-->

<!-- ════════════════════════════════════════════════════════════════════════
     TOP NAVBAR
     ════════════════════════════════════════════════════════════════════════ -->
<header class="navbar" id="navbar" role="banner">
  <div class="navbar__inner">

    <!-- Wordmark -->
    <a href="/index.html" class="navbar__brand" id="navbar-brand" aria-label="VantaGe — Home">
      VANTAGE
    </a>

    <!-- Desktop nav links -->
    <nav aria-label="Primary navigation">
      <ul class="navbar__links" id="desktop-nav-links">
        <li>
          <a href="#performance" class="navbar__link" id="nav-performance"
             data-page="index" data-scroll="performance">Performance</a>
        </li>
        <li>
          <a href="#science" class="navbar__link" id="nav-science"
             data-page="index" data-scroll="science">Science</a>
        </li>
        <li>
          <a href="services.html" class="navbar__link" id="nav-events"
             data-page="services">Events</a>
        </li>
        <li>
          <a href="services.html" class="navbar__link" id="nav-consultancy"
             data-page="services">Consultancy</a>
        </li>
        <li>
          <a href="about.html" class="navbar__link" id="nav-about"
             data-page="about">About</a>
        </li>
      </ul>
    </nav>

    <!-- CTA button -->
    <a href="contact.html" class="navbar__cta" id="navbar-cta"
       aria-label="Get in touch with VantaGe">Get In Touch</a>

    <!-- Hamburger button — mobile only -->
    <button class="navbar__hamburger" id="hamburger-btn"
            aria-label="Toggle mobile navigation"
            aria-expanded="false" aria-controls="mobile-nav" type="button">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

  </div>
</header>

<!-- ════════════════════════════════════════════════════════════════════════
     MOBILE NAV DRAWER
     ════════════════════════════════════════════════════════════════════════ -->
<nav class="mobile-nav" id="mobile-nav"
     aria-label="Mobile navigation" aria-hidden="true">
  <div class="mobile-nav__accent" aria-hidden="true"></div>
  <ul class="mobile-nav__links">
    <li>
      <a href="#performance" class="mobile-nav__link" id="mobile-nav-performance"
         data-page="index" data-scroll="performance">Performance</a>
    </li>
    <li>
      <a href="#science" class="mobile-nav__link" id="mobile-nav-science"
         data-page="index" data-scroll="science">Science</a>
    </li>
    <li>
      <a href="services.html" class="mobile-nav__link" id="mobile-nav-events"
         data-page="services">Events</a>
    </li>
    <li>
      <a href="services.html" class="mobile-nav__link" id="mobile-nav-consultancy"
         data-page="services">Consultancy</a>
    </li>
    <li>
      <a href="about.html" class="mobile-nav__link" id="mobile-nav-about"
         data-page="about">About</a>
    </li>
  </ul>
  <div class="mobile-nav__cta-wrap">
    <a href="contact.html" class="mobile-nav__cta" id="mobile-nav-cta">Get In Touch</a>
  </div>
</nav>

<!-- Semi-transparent backdrop (click-to-close) -->
<div id="mobile-nav-backdrop" aria-hidden="true"
     style="display:none;position:fixed;inset:0;z-index:98;background:rgba(0,0,0,0.55);"></div>
