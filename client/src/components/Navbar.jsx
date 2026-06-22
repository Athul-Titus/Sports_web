/**
 * Navbar.jsx — VantaGe Sports Consultancy
 *
 * Matches Stitch "Home | VantaGe Sports (Refined)" dark screen exactly:
 * - Dark bg (#131313), thin border-b (surface-variant)
 * - Anton wordmark "VANTAGE" uppercase
 * - Archivo Narrow label-bold nav links, hover → red (#e2231a)
 * - Solid red CTA button "GET IN TOUCH"
 * - Mobile: lucide-react Menu/X hamburger with slide-down drawer
 */

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/* ── Nav link definitions ─────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'HOME',     to: '/'         },
  { label: 'SERVICES', to: '/services' },
  { label: 'GALLERY',  to: '/gallery'  },
  { label: 'ABOUT US', to: '/about'    },
  { label: 'CONTACT',  to: '/contact'  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  /* Detect scroll to apply stronger separator */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile drawer on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Desktop link styles ────────────────────────────────────────────────── */
  const desktopLinkClass = ({ isActive }) =>
    [
      'font-label-bold transition-colors duration-200',
      isActive ? 'text-[#e2231a]' : 'text-[#e5e2e1] hover:text-[#e2231a]',
    ].join(' ');

  /* ── Mobile link styles ─────────────────────────────────────────────────── */
  const mobileLinkClass = ({ isActive }) =>
    [
      'font-label-bold block px-6 py-4 border-b border-[#353534]',
      'transition-colors duration-200',
      isActive
        ? 'text-[#e2231a] border-l-4 border-l-[#e2231a] pl-5 bg-[#1c1b1b]'
        : 'text-[#e5e2e1] hover:text-[#e2231a] hover:bg-[#1c1b1b]',
    ].join(' ');

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
          - bg: #131313 (background token)
          - border-b: surface-variant (#353534) — 1px, same as Stitch
          - h-20 (80px) matching the design
          ═══════════════════════════════════════════════════════════════════ */}
      <header
        id="site-navbar"
        className={[
          'fixed top-0 left-0 right-0 z-50 w-full h-20',
          'bg-[#131313] border-b border-[#353534]',
          'transition-shadow duration-300',
          scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.6)]' : '',
        ].join(' ')}
      >
        <div className="flex items-center justify-between h-full max-w-[1440px] mx-auto px-5 md:px-16">

          {/* ── Wordmark ────────────────────────────────────────────────────
              Anton font, 32px (headline-md), all-caps "VANTAGE"
              ─────────────────────────────────────────────────────────────── */}
          <Link
            to="/"
            id="navbar-brand"
            className="font-headline-md text-[#e5e2e1] uppercase tracking-tight
                       hover:text-[#e2231a] transition-colors duration-200"
            style={{ fontFamily: 'Anton, sans-serif', fontSize: '32px', lineHeight: 1 }}
            aria-label="VANTAGE home"
          >
            VANTAGE
          </Link>

          {/* ── Desktop Nav links ────────────────────────────────────────────
              hidden on mobile, flex on ≥ md, gap-8 (32px)
              ─────────────────────────────────────────────────────────────── */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={desktopLinkClass}
                id={`nav-link-${label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA ─────────────────────────────────────────────────
              Solid red (#e2231a) button, white text, Archivo Narrow label-bold
              Matches exactly: bg-primary-container text-white uppercase
              ─────────────────────────────────────────────────────────────── */}
          <Link
            to="/contact"
            id="navbar-cta"
            className="hidden md:inline-flex items-center justify-center
                       bg-[#e2231a] text-white font-label-bold
                       px-6 py-3 hover:brightness-110 transition-all duration-200"
            aria-label="Get in touch with VANTAGE"
          >
            GET IN TOUCH
          </Link>

          {/* ── Mobile hamburger ────────────────────────────────────────────
              lucide-react Menu / X, visible only on mobile
              ─────────────────────────────────────────────────────────────── */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden flex items-center justify-center w-10 h-10
                       text-[#e5e2e1] hover:text-[#e2231a] transition-colors duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e2231a]"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          >
            <span
              className="transition-transform duration-200"
              style={{ transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              {mobileOpen ? <X size={26} strokeWidth={2} /> : <Menu size={26} strokeWidth={2} />}
            </span>
          </button>

        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE BACKDROP + DRAWER
          ═══════════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          id="mobile-nav-backdrop"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        id="mobile-nav"
        className={[
          'fixed left-0 right-0 z-40 md:hidden',
          'bg-[#131313] border-b border-[#353534]',
          'overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        ].join(' ')}
        style={{ top: '80px' }}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {/* Red top accent line */}
        <div className="h-[2px] w-full bg-[#e2231a]" aria-hidden="true" />

        {NAV_LINKS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={mobileLinkClass}
            id={`mobile-nav-link-${label.toLowerCase().replace(/\s/g, '-')}`}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </NavLink>
        ))}

        {/* Mobile CTA */}
        <div className="px-6 py-5">
          <Link
            to="/contact"
            id="mobile-nav-cta"
            className="block w-full text-center bg-[#e2231a] text-white
                       font-label-bold py-4 hover:brightness-110 transition-all duration-200"
            onClick={() => setMobileOpen(false)}
            aria-label="Get in touch with VANTAGE"
          >
            GET IN TOUCH
          </Link>
        </div>
      </nav>
    </>
  );
}
