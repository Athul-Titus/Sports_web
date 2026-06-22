/**
 * Navbar.jsx — VantaGe Sports Consultancy
 *
 * Design: Matches Stitch project "VantaGe Athletic Excellence"
 * - Fixed header, bg-background/90 with backdrop-blur
 * - 2px solid black bottom border
 * - Anton wordmark (uppercase)
 * - Archivo Narrow label-caps nav links
 * - Active state: text-secondary (burnt orange) + underline accent
 * - Desktop CTA button with action-slant (skewX -10deg)
 * - Mobile: lucide-react Menu/X hamburger with smooth slide-down drawer
 */

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/* ── Navigation link definitions ──────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',     to: '/'        },
  { label: 'About',    to: '/about'   },
  { label: 'Services', to: '/services'},
  { label: 'Gallery',  to: '/gallery' },
  { label: 'Contact',  to: '/contact' },
];

export default function Navbar() {
  /* ── State ─────────────────────────────────────────────────────────────── */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  /* ── Scroll detection — adds shadow cue when page is scrolled ─────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu on route change / resize ───────────────────────── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Helpers ───────────────────────────────────────────────────────────── */

  /**
   * Desktop NavLink class factory
   * Active link gets burnt-orange color + a 2px bottom underline accent
   */
  const desktopLinkClass = ({ isActive }) =>
    [
      'font-label-caps relative pb-1 transition-colors duration-200',
      'hover:text-[#9a4612]',
      isActive
        ? 'text-[#9a4612] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#9a4612]'
        : 'text-[#1a1c1c]',
    ].join(' ');

  /**
   * Mobile NavLink class factory
   * Active link gets a left burnt-orange border + orange text
   */
  const mobileLinkClass = ({ isActive }) =>
    [
      'font-label-caps block px-6 py-4 border-b border-[#e2e2e2]',
      'transition-colors duration-200',
      isActive
        ? 'text-[#9a4612] border-l-4 border-l-[#9a4612] pl-5 bg-[#f3f3f4]'
        : 'text-[#1a1c1c] hover:text-[#9a4612] hover:bg-[#f3f3f4]',
    ].join(' ');

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER — fixed, full-width, z-50
          - bg-background/90 + backdrop-blur for frosted glass effect
          - 2px solid black bottom border (brand signature)
          - Adds subtle shadow when scrolled
          ═══════════════════════════════════════════════════════════════════ */}
      <header
        id="site-navbar"
        className={[
          'fixed top-0 left-0 right-0 z-50 w-full',
          'bg-[#f9f9f9]/90 backdrop-blur-md',
          'border-b-2 border-[#000000]',
          'transition-shadow duration-300',
          scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.12)]' : '',
        ].join(' ')}
      >
        {/* Inner container — max-width 1440px, horizontal padding from spacing tokens */}
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-4 md:px-16 py-2">

          {/* ── Brand Wordmark ──────────────────────────────────────────────
              Anton font, uppercase, primary (black)
              Switches to headline-lg-mobile (32px) on small screens
              ─────────────────────────────────────────────────────────────── */}
          <Link
            to="/"
            id="navbar-brand"
            className="font-headline-md md:font-headline-lg text-[#000000] uppercase tracking-tight hover:text-[#9a4612] transition-colors duration-200"
            style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(24px, 3vw, 48px)', lineHeight: 1 }}
            aria-label="VantaGe — home"
          >
            vantaGe
          </Link>

          {/* ── Desktop Navigation ──────────────────────────────────────────
              Hidden on mobile (< md), displayed as flex row on ≥ md
              24px gap between links (spacing-gutter token)
              ─────────────────────────────────────────────────────────────── */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center gap-6"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={desktopLinkClass}
                id={`nav-link-${label.toLowerCase()}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA Button ──────────────────────────────────────────
              Anton font, uppercase, action-slant (skewX -10deg)
              Solid black → burnt orange on hover
              ─────────────────────────────────────────────────────────────── */}
          <Link
            to="/contact"
            id="navbar-cta"
            className="hidden md:inline-flex items-center justify-center action-slant
                       bg-[#000000] text-[#ffffff] hover:bg-[#9a4612]
                       px-8 py-3 transition-colors duration-300"
            style={{ fontFamily: 'Anton, sans-serif', fontSize: '16px' }}
            aria-label="Get in touch with VantaGe"
          >
            {/* Counter-skew the text to keep it upright */}
            <span className="action-slant-reverse uppercase tracking-wide">Get in Touch</span>
          </Link>

          {/* ── Mobile Hamburger / Close Toggle ─────────────────────────────
              Only visible on mobile (< md)
              Uses lucide-react Menu / X icons
              ─────────────────────────────────────────────────────────────── */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center w-10 h-10 text-[#000000]
                       hover:text-[#9a4612] transition-colors duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9a4612]"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {/* Animate icon swap with a tiny scale transition */}
            <span
              className="transition-transform duration-200"
              style={{ transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {mobileOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
            </span>
          </button>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE DRAWER — slides down from the header
          - Full-width, bg-background, 2px black border at bottom
          - Backdrop overlay to close on outside click
          ═══════════════════════════════════════════════════════════════════ */}

      {/* Backdrop overlay — tap to close */}
      {mobileOpen && (
        <div
          id="mobile-nav-backdrop"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-down mobile menu panel */}
      <nav
        id="mobile-nav"
        className={[
          'fixed left-0 right-0 z-40 md:hidden',
          'bg-[#f9f9f9] border-b-2 border-[#000000]',
          /* Slide animation via max-height transition */
          'overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        ].join(' ')}
        /* Push down below the header (~60px tall) */
        style={{ top: '60px' }}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {/* Track lane accent at top of drawer — brand signature */}
        <div className="track-lane-horizontal w-full" aria-hidden="true" />

        {NAV_LINKS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={mobileLinkClass}
            id={`mobile-nav-link-${label.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </NavLink>
        ))}

        {/* Mobile CTA — full-width black button */}
        <div className="px-6 py-5">
          <Link
            to="/contact"
            id="mobile-nav-cta"
            className="block w-full text-center bg-[#000000] text-[#ffffff]
                       hover:bg-[#9a4612] transition-colors duration-300 py-4
                       font-label-caps uppercase tracking-widest"
            onClick={() => setMobileOpen(false)}
            aria-label="Get in touch with VantaGe"
          >
            Get in Touch
          </Link>
        </div>
      </nav>
    </>
  );
}
