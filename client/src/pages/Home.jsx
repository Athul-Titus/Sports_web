/**
 * Home.jsx — VantaGe Sports Consultancy
 *
 * Full home page matching Stitch "Home | VantaGe Sports (Refined)" dark screen.
 * Layout fixes applied based on visual audit:
 *  - Hero: proper horizontal padding, CTA button with correct spacing
 *  - Services: proper card internal padding, icon sizing, heading gap
 *  - Gallery: correct 3-col grid with proper row heights
 *  - Values: breathing room between sections
 *  - All sections: max-w-7xl centered with consistent desktop margins
 */

import { Link } from 'react-router-dom';

/* ── Data ─────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: 'stadium',
    title: 'Sports Event Management',
    desc:  'Flawless execution for high-stakes athletic competitions, ensuring seamless logistics and unforgettable experiences.',
  },
  {
    icon: 'analytics',
    title: 'Sports Science & Biomechanics',
    desc:  'Data-driven performance analysis leveraging cutting-edge telemetry to optimize athlete mechanics.',
  },
  {
    icon: 'diversity_3',
    title: 'Inclusive Sports Events',
    desc:  'Pioneering accessible platforms that champion para-athletes and elevate inclusive competition standards.',
  },
  {
    icon: 'health_and_safety',
    title: 'Sports Medicine & Nutrition',
    desc:  'Comprehensive protocols for injury prevention, recovery, and peak physiological conditioning.',
  },
  {
    icon: 'architecture',
    title: 'Sports Engineering & Facility Design',
    desc:  'Architecting elite training environments and competitive arenas engineered for maximum performance.',
  },
  {
    icon: 'school',
    title: 'Educational Consultancy & Placements',
    desc:  'Strategic career pathways and institutional guidance for the next generation of sports professionals.',
  },
];

const VALUES = [
  { icon: 'speed',        label: 'Data-Driven Precision' },
  { icon: 'account_tree', label: 'End-to-End Solutions'  },
  { icon: 'groups',       label: 'Inclusivity'           },
  { icon: 'public',       label: 'Global Impact'         },
];

/* ── Component ────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — full viewport, stadium bg, dark overlay, headlines + CTA
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative w-full flex items-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBycU_Cnptpr_jXMiYb-6C8C913kZz7rkrQCRNejHaUzEL0oon6mm14eRyhRwA-ZwsCoXE_X0bFX40yO7lfgCZlrgHOKSUXTzhNXb733LeK3uncx8yJjKcsoknxfCn8LAduHuOxfE3OpUMrXfYHrBp8VQwgy2um0xwI5faDf207GHFiEGR1iCRoxJddddTVR8IHfcfXmPJmonXUnSETpTytiBybE8DxI-LkvjXKkXSkEhymQ_LJ7D5H-upAsghR8vY8FCjucuPapRM')`,
          }}
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 z-10" style={{ background: 'rgba(19,19,19,0.78)' }} aria-hidden="true" />

        {/* Hero text content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-24">
          <h1
            className="text-white uppercase leading-none mb-3"
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(36px, 5.5vw, 80px)',
              letterSpacing: '0.02em',
            }}
          >
            WE DON'T JUST MANAGE SPORTS.
          </h1>
          <h2
            className="text-glow uppercase leading-none mb-12"
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(36px, 5.5vw, 80px)',
              letterSpacing: '0.02em',
              color: '#e2231a',
            }}
          >
            WE TRANSFORM THEM.
          </h2>
          <Link
            to="/services"
            id="hero-cta"
            className="inline-block font-label-bold text-white bg-[#e2231a]
                       px-10 py-4 hover:brightness-110 transition-all duration-200"
            style={{ boxShadow: '0 0 15px rgba(226,35,26,0.25)' }}
          >
            Explore Our Services
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. INTRO QUOTE — dark panel, Anton headline, red keywords
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="intro"
        className="relative overflow-hidden border-t-2 border-[#e2231a]"
        style={{ background: '#2a2a2a', padding: '96px 24px' }}
      >
        {/* Ambient red glow top-right */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 320, height: 320,
            borderRadius: '50%',
            background: 'rgba(226,35,26,0.06)',
            filter: 'blur(80px)',
            transform: 'translate(40%, -40%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p
            className="text-[#e5e2e1] uppercase leading-tight"
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(22px, 3.2vw, 46px)',
              letterSpacing: '0.02em',
            }}
          >
            "In a world where passion meets competition, sports deserve more than just effort — they deserve{' '}
            <span style={{ color: '#e2231a' }}>precision</span>,{' '}
            <span style={{ color: '#e2231a' }}>innovation</span>, and{' '}
            <span style={{ color: '#e2231a' }}>heart</span>."
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. WHAT WE DO — 6-card grid
          ════════════════════════════════════════════════════════════════════ */}
      <section id="services" style={{ background: '#131313', padding: '96px 24px' }}>
        <div className="max-w-7xl mx-auto">

          {/* Section heading */}
          <div className="flex items-center gap-4 mb-14">
            <div
              style={{
                width: 48, height: 4,
                background: '#e2231a',
                transform: 'skewX(-12deg)',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <h2
              className="text-white uppercase"
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 32,
                lineHeight: '32px',
                letterSpacing: '0.05em',
              }}
            >
              What We Do
            </h2>
          </div>

          {/* Cards grid — strict 3-col on lg+, 2-col md, 1-col sm */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="relative group overflow-hidden border border-glow-hover transition-all duration-300"
                style={{
                  background: '#2a2a2a',
                  borderColor: '#353534',
                  padding: '36px 32px 32px',
                }}
              >
                {/* Corner diamond accent */}
                <div
                  className="absolute top-0 right-0 group-hover:scale-150 transition-transform duration-300"
                  style={{
                    width: 32, height: 32,
                    background: '#e2231a',
                    transform: 'translate(50%, -50%) rotate(45deg)',
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <span
                  className="material-symbols-outlined block mb-6"
                  style={{
                    fontSize: 40,
                    color: '#e2231a',
                    fontVariationSettings: "'FILL' 1, 'wght' 400",
                  }}
                  aria-hidden="true"
                >
                  {icon}
                </span>

                {/* Title */}
                <h3
                  className="text-white uppercase mb-4"
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 20,
                    lineHeight: '24px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p
                  className="font-body-md"
                  style={{ color: '#b6b5b4', lineHeight: '1.55' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. OUR VALUES — 4-column icon strip
          ════════════════════════════════════════════════════════════════════ */}
      <section
        id="values"
        style={{ background: '#353534', padding: '80px 24px', borderTop: '1px solid #474746', borderBottom: '1px solid #474746' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#474746]">
            {VALUES.map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center justify-center text-center px-6 py-8">
                <span
                  className="material-symbols-outlined mb-5"
                  style={{ fontSize: 48, color: '#e2231a' }}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <h4
                  className="text-white uppercase tracking-widest"
                  style={{ fontFamily: 'Archivo Narrow, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em' }}
                >
                  {label}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. GALLERY — masonry-style CSS grid
          3-column layout: first cell spans 2 cols + 2 rows (featured),
          last cell spans 2 cols (wide panoramic). Dark hover overlay.
          ════════════════════════════════════════════════════════════════════ */}
      <section id="gallery" style={{ background: '#131313', padding: '96px 24px' }}>
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex items-end justify-between mb-14">
            <div className="flex items-center gap-4">
              <div
                style={{ width: 48, height: 4, background: '#e2231a', transform: 'skewX(-12deg)', flexShrink: 0 }}
                aria-hidden="true"
              />
              <h2
                className="text-white uppercase"
                style={{ fontFamily: 'Anton, sans-serif', fontSize: 32, lineHeight: '32px', letterSpacing: '0.05em' }}
              >
                Gallery
              </h2>
            </div>
            <Link
              to="/gallery"
              id="gallery-view-all"
              className="flex items-center gap-2 font-label-bold transition-colors duration-200 hover:text-white"
              style={{ color: '#e2231a' }}
            >
              View Gallery
              <span className="material-symbols-outlined" style={{ fontSize: 18 }} aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          {/* Gallery grid — explicit CSS grid so spans work reliably */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 260px)',
              gap: 16,
            }}
          >
            {/* Featured — 2 cols × 2 rows */}
            <GalleryCell
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKgp6lKML9El9OrFKtwzB5gbrGi_Cjv3D-15i1kxBDi2fAFn9XDyxr_bmLiDcf9QWn3avBsuyVbTPZ3JGxKVJgElzS0kJuDgyatvJLw8sL9EGAQWvMQmoS3piumIGcUqpq39-T509Bcp5U3jVmBySERiUco4UtBkFwZFV-rVeXp9VKLZjc8Ry8LamYVi2-dkFXo1vebixN2lVBqnIPawZFOXWUIYoRVpHhzehsEZgUZQzttP0iTUaxAWxRm8bjvpEghoo16C8yZbE"
              alt="Sprinter exploding from starting blocks, cinematic lighting"
              style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}
            />
            {/* Top-right */}
            <GalleryCell
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCAD1mzzgKhyL8YoOGDveZ1j21Je0S_Cyq19O1xhyDWXnR8bUCXg_XiotTOBo5vZv9_kR7z5CueRbmVkizv5MSzO529T8cQfIriwexzWVdaU0uFgdpT_-CvJOOcpokN4rQbxQ22u6zrmcrRcxtps4vQRz9OHxDWrBRnbNF0dLfm91kIhJ0XsAXzXS4bFQe2Y2sDQf1HUioipaTc7JPXhyTe46FifFicRkb9YwQwIxwbdPzwFH9_QTwE8n2WLYZwrYbGvJNZjvl_Dc"
              alt="Para-athlete with carbon-fiber running blade"
              style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}
            />
            {/* Mid-right */}
            <GalleryCell
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd46tNUCxsQ8oGSMs2Qya4j2n4mQneTJyy1VYSWI3G_rIn7k0mUiN-96L2C7nw1MihY6_rJrXKxtIPj44XWgS_-TeObLE_K2z1Wkj5Eg_O02aKPH2UVgnjm9DGTPuwxaJrzhfxBHdX1dAL2KgSzUo-fIyYkuUHjLB0AUUP6BIDFaGJtFnvQswNcezNWlzIYKj8gqimR_0VejREtg69uz2O8zDnzphFtl8vC2FpuWckAgd8OC8cdYrLsx_L0M5hU82xSci5FZ7DDqI"
              alt="Sports telemetry analytics on glass screens"
              style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}
            />
            {/* Bottom-left */}
            <GalleryCell
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGfAiWkFJuYa-w_sS6zjNfkonCBRlHDO1derpeavCOut_-88O31GEM0o9UXBL_LJjCCBwQt32Srkm9EU5qflr65zDAON9JgUVVyzsJsQcSWhVCpJ9L3eTXYvGmig0ZME1PFttSvHifNmpFwdW92cVNkWzYk4T85yxTI2nIatVLRQsy0E1JPb5RlO0kSG8IAJLxDHH4jTrj5U7AbNyImwMJyl97xQa5LinccaJUtJyU6NX6rThnoSz-J7oA3wFb-IqBD-MwT-me4ZA"
              alt="Empty swimming pool, red lane line, night"
              style={{ gridColumn: '1 / 2', gridRow: '3 / 4' }}
            />
            {/* Bottom wide — spans 2 cols */}
            <GalleryCell
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe6aVN1_g2BouOHzmWujLc8kjflla-OEHXN3HeLTa6Hs1hMorXaLGlBz8xakXcop_wOJCbFPvZVieheM8kt9LoNkHFgLV7cgX-pRpjxiHD5Z9pn5ky3MDQkxjltZ44KRZN67ZlrUJJgXXvZaHgN-fVrh5F39x5-7ra7PWbp2v9iOZ1DE_C_ua2kV5yWdoMaSZHMP1bb-EanJzvFJET03sCJqT7oHHlGwVe0t7B7-IztnguA8AzZqFq7YnfuHvk-U2BWsTpIBELy8c"
              alt="Wheelchair rugby match, speed blur, red accents"
              style={{ gridColumn: '2 / 4', gridRow: '3 / 4' }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. CTA BANNER — red bg, chamfered corner, diagonal speed lines
          ════════════════════════════════════════════════════════════════════ */}
      <section id="cta" style={{ background: '#131313', padding: '0 24px 96px' }}>
        <div className="max-w-7xl mx-auto">
          <div
            className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
            style={{
              background: '#e2231a',
              padding: '80px 64px',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
            }}
          >
            {/* Speed-line diagonal pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.18,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 11px)',
              }}
              aria-hidden="true"
            />
            <h2
              className="text-white uppercase relative z-10 max-w-2xl leading-tight"
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(26px, 3.5vw, 48px)',
                letterSpacing: '0.02em',
              }}
            >
              Join us in shaping the future of sports — one event, one athlete, one story at a time
            </h2>
            <Link
              to="/contact"
              id="cta-contact-btn"
              className="relative z-10 font-label-bold text-white uppercase whitespace-nowrap
                         border border-[#353534] hover:bg-[#2a2a2a] transition-all duration-200"
              style={{ background: '#131313', padding: '20px 40px' }}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════════ */}
      <footer
        id="site-footer"
        style={{ background: '#0e0e0e', borderTop: '2px solid #e2231a', padding: '64px 24px' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div
              className="text-[#e5e2e1] uppercase mb-5"
              style={{ fontFamily: 'Anton, sans-serif', fontSize: 48, lineHeight: '48px', letterSpacing: '0.02em' }}
            >
              VANTAGE
            </div>
            <p className="font-body-md mb-8" style={{ color: '#b6b5b4', maxWidth: 340, lineHeight: 1.65 }}>
              Elevating human potential through precision engineering, actionable telemetry,
              and relentless dedication to athletic excellence.
            </p>
            <p className="font-label-bold" style={{ color: '#b6b5b4', fontSize: 11 }}>
              © 2024 VANTAGE PERFORMANCE. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h5
              className="text-white uppercase mb-2"
              style={{ fontFamily: 'Archivo Narrow, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em' }}
            >
              Legal
            </h5>
            {['PRIVACY POLICY', 'TERMS OF SERVICE'].map(l => (
              <a key={l} href="#" className="font-label-bold transition-colors duration-200 hover:text-[#e2231a]"
                style={{ color: '#b6b5b4' }}>
                {l}
              </a>
            ))}
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h5
              className="text-white uppercase mb-2"
              style={{ fontFamily: 'Archivo Narrow, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em' }}
            >
              Connect
            </h5>
            {['GLOBAL CONTACT', 'CAREERS'].map(l => (
              <a key={l} href="#" className="font-label-bold transition-colors duration-200 hover:text-[#e2231a]"
                style={{ color: '#b6b5b4' }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ── GalleryCell sub-component ────────────────────────────────────────────── */
function GalleryCell({ src, alt, style }) {
  return (
    <div
      className="relative group overflow-hidden"
      style={{ border: '1px solid #353534', ...style }}
    >
      {/* Photo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${src}')` }}
        role="img"
        aria-label={alt}
      />
      {/* Dark overlay — lightens on hover */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{ background: 'rgba(0,0,0,0.38)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.18)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.38)')}
        aria-hidden="true"
      />
    </div>
  );
}
