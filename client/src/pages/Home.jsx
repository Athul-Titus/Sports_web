/**
 * Home.jsx — VantaGe Sports Consultancy
 *
 * Faithfully copies the Stitch "Home | VantaGe Sports (Refined)" dark screen.
 * Sections:
 *  1. Hero         — full-screen bg image, dark overlay, Anton display headlines, red CTA
 *  2. Intro Strip  — dark surface-container-high, large Anton quote with red keywords
 *  3. What We Do   — 6 service cards, red corner diamond + icon, glow on hover
 *  4. Our Values   — 4-col icon strip, surface-container-highest
 *  5. Gallery      — masonry grid, dark overlays, hover scale
 *  6. CTA Banner   — red bg, clip-diagonal, speed-line pattern, dark button
 */

import { Link } from 'react-router-dom';

/* ── Service Cards data ───────────────────────────────────────────────────── */
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

/* ── Value pillars data ───────────────────────────────────────────────────── */
const VALUES = [
  { icon: 'speed',        label: 'Data-Driven Precision' },
  { icon: 'account_tree', label: 'End-to-End Solutions'  },
  { icon: 'groups',       label: 'Inclusivity'           },
  { icon: 'public',       label: 'Global Impact'         },
];

/* ── Gallery images (from Stitch design) ─────────────────────────────────── */
const GALLERY = [
  {
    // Large featured image — col-span-2, row-span-2
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKgp6lKML9El9OrFKtwzB5gbrGi_Cjv3D-15i1kxBDi2fAFn9XDyxr_bmLiDcf9QWn3avBsuyVbTPZ3JGxKVJgElzS0kJuDgyatvJLw8sL9EGAQWvMQmoS3piumIGcUqpq39-T509Bcp5U3jVmBySERiUco4UtBkFwZFV-rVeXp9VKLZjc8Ry8LamYVi2-dkFXo1vebixN2lVBqnIPawZFOXWUIYoRVpHhzehsEZgUZQzttP0iTUaxAWxRm8bjvpEghoo16C8yZbE',
    alt: 'Sprinter exploding from starting blocks, dramatic cinematic lighting',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCAD1mzzgKhyL8YoOGDveZ1j21Je0S_Cyq19O1xhyDWXnR8bUCXg_XiotTOBo5vZv9_kR7z5CueRbmVkizv5MSzO529T8cQfIriwexzWVdaU0uFgdpT_-CvJOOcpokN4rQbxQ22u6zrmcrRcxtps4vQRz9OHxDWrBRnbNF0dLfm91kIhJ0XsAXzXS4bFQe2Y2sDQf1HUioipaTc7JPXhyTe46FifFicRkb9YwQwIxwbdPzwFH9_QTwE8n2WLYZwrYbGvJNZjvl_Dc',
    alt: 'Para-athlete adjusting carbon-fiber running blade, industrial lighting',
    span: '',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd46tNUCxsQ8oGSMs2Qya4j2n4mQneTJyy1VYSWI3G_rIn7k0mUiN-96L2C7nw1MihY6_rJrXKxtIPj44XWgS_-TeObLE_K2z1Wkj5Eg_O02aKPH2UVgnjm9DGTPuwxaJrzhfxBHdX1dAL2KgSzUo-fIyYkuUHjLB0AUUP6BIDFaGJtFnvQswNcezNWlzIYKj8gqimR_0VejREtg69uz2O8zDnzphFtl8vC2FpuWckAgd8OC8cdYrLsx_L0M5hU82xSci5FZ7DDqI',
    alt: 'Sports telemetry data on glowing glass screens, futuristic analytics',
    span: '',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGfAiWkFJuYa-w_sS6zjNfkonCBRlHDO1derpeavCOut_-88O31GEM0o9UXBL_LJjCCBwQt32Srkm9EU5qflr65zDAON9JgUVVyzsJsQcSWhVCpJ9L3eTXYvGmig0ZME1PFttSvHifNmpFwdW92cVNkWzYk4T85yxTI2nIatVLRQsy0E1JPb5RlO0kSG8IAJLxDHH4jTrj5U7AbNyImwMJyl97xQa5LinccaJUtJyU6NX6rThnoSz-J7oA3wFb-IqBD-MwT-me4ZA',
    alt: 'Empty swimming pool at night, red lane line, anticipatory atmosphere',
    span: '',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe6aVN1_g2BouOHzmWujLc8kjflla-OEHXN3HeLTa6Hs1hMorXaLGlBz8xakXcop_wOJCbFPvZVieheM8kt9LoNkHFgLV7cgX-pRpjxiHD5Z9pn5ky3MDQkxjltZ44KRZN67ZlrUJJgXXvZaHgN-fVrh5F39x5-7ra7PWbp2v9iOZ1DE_C_ua2kV5yWdoMaSZHMP1bb-EanJzvFJET03sCJqT7oHHlGwVe0t7B7-IztnguA8AzZqFq7YnfuHvk-U2BWsTpIBELy8c',
    alt: 'Wheelchair rugby match, panning technique, red uniform accents',
    span: 'col-span-2',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Full viewport height, stadium background image, dark overlay.
          Anton display-lg headlines — white line 1, red line 2 with glow.
          ══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen w-full flex items-center pt-20" id="hero">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBycU_Cnptpr_jXMiYb-6C8C913kZz7rkrQCRNejHaUzEL0oon6mm14eRyhRwA-ZwsCoXE_X0bFX40yO7lfgCZlrgHOKSUXTzhNXb733LeK3uncx8yJjKcsoknxfCn8LAduHuOxfE3OpUMrXfYHrBp8VQwgy2um0xwI5faDf207GHFiEGR1iCRoxJddddTVR8IHfcfXmPJmonXUnSETpTytiBybE8DxI-LkvjXKkXSkEhymQ_LJ7D5H-upAsghR8vY8FCjucuPapRM')`,
          }}
          aria-hidden="true"
        />
        {/* Dark overlay — bg-background/80 */}
        <div className="absolute inset-0 bg-[#131313]/80 z-10" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-20 px-5 md:px-16 max-w-7xl mx-auto w-full">
          <h1
            className="text-white uppercase mb-2 leading-none"
            style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', letterSpacing: '0.02em' }}
          >
            WE DON'T JUST MANAGE SPORTS.
          </h1>
          <h2
            className="text-[#e2231a] uppercase text-glow mb-8 leading-none"
            style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', letterSpacing: '0.02em' }}
          >
            WE TRANSFORM THEM.
          </h2>
          <Link
            to="/services"
            id="hero-cta"
            className="inline-flex items-center bg-[#e2231a] text-white font-label-bold
                       px-8 py-4 hover:brightness-110 transition-all duration-200
                       shadow-[0_0_15px_rgba(226,35,26,0.2)]"
          >
            Explore Our Services
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — INTRO QUOTE
          surface-container-high bg, large Anton quote, red keyword highlights,
          subtle red radial glow top-right, top border red line.
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="intro"
        className="py-[120px] px-5 md:px-16 bg-[#2a2a2a] relative border-t-2 border-[#e2231a] overflow-hidden"
      >
        {/* Ambient red glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ background: 'rgba(226,35,26,0.05)' }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p
            className="text-[#e5e2e1] uppercase leading-tight"
            style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(24px, 4vw, 48px)', letterSpacing: '0.02em' }}
          >
            "In a world where passion meets competition, sports deserve more than just effort — they deserve{' '}
            <span className="text-[#e2231a]">precision</span>,{' '}
            <span className="text-[#e2231a]">innovation</span>, and{' '}
            <span className="text-[#e2231a]">heart</span>."
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — WHAT WE DO
          6 service cards on dark background.
          Each card: surface-container-high bg, thin border, red rotating
          diamond corner accent, filled red Material icon, hover red glow.
          ══════════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-[120px] px-5 md:px-16 bg-[#131313]">
        <div className="max-w-7xl mx-auto">
          {/* Section heading with skewed red dash accent */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-1 bg-[#e2231a] -skew-x-12" aria-hidden="true" />
            <h2
              className="text-white uppercase tracking-wider"
              style={{ fontFamily: 'Anton, sans-serif', fontSize: '32px', lineHeight: '32px' }}
            >
              What We Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#2a2a2a] border border-[#353534] p-8
                           border-glow-hover transition-colors duration-300
                           relative group overflow-hidden"
              >
                {/* Rotating corner diamond — red square rotated 45° */}
                <div
                  className="absolute top-0 right-0 w-8 h-8 bg-[#e2231a]
                             translate-x-4 -translate-y-4 rotate-45
                             group-hover:scale-150 transition-transform duration-300"
                  aria-hidden="true"
                />
                {/* Filled Material icon */}
                <span
                  className="material-symbols-outlined fill text-[#e2231a] text-4xl mb-6 block"
                  aria-hidden="true"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
                <h3
                  className="text-white uppercase mb-4"
                  style={{ fontFamily: 'Anton, sans-serif', fontSize: '24px', lineHeight: '28px' }}
                >
                  {title}
                </h3>
                <p className="text-[#b6b5b4] font-body-md">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — OUR VALUES
          surface-container-highest bg, 4-column icon grid,
          divided by vertical lines on md+.
          ══════════════════════════════════════════════════════════════════ */}
      <section
        id="values"
        className="py-[120px] px-5 md:px-16 bg-[#353534] border-y border-[#353534]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#353534]">
            {VALUES.map(({ icon, label }) => (
              <div key={label} className="p-8 text-center flex flex-col items-center">
                <span
                  className="material-symbols-outlined text-[#e2231a] mb-4"
                  style={{ fontSize: '48px' }}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <h4 className="font-label-bold text-white tracking-widest">{label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — GALLERY
          Masonry-style CSS grid, auto-rows 300px.
          First image: col-span-2 row-span-2 (large featured).
          Last image: col-span-2 (wide).
          Dark overlay on each cell, hover: overlay lightens + scale.
          ══════════════════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-[120px] px-5 md:px-16 bg-[#131313]">
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <div className="flex justify-between items-end mb-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-[#e2231a] -skew-x-12" aria-hidden="true" />
              <h2
                className="text-white uppercase tracking-wider"
                style={{ fontFamily: 'Anton, sans-serif', fontSize: '32px', lineHeight: '32px' }}
              >
                Gallery
              </h2>
            </div>
            <Link
              to="/gallery"
              id="gallery-view-all"
              className="font-label-bold text-[#e2231a] hover:text-white transition-colors
                         flex items-center gap-2"
            >
              View Gallery
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[300px]">
            {GALLERY.map(({ src, alt, span }, i) => (
              <div
                key={i}
                className={`relative group overflow-hidden border border-[#353534] ${span}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center
                             transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${src}')` }}
                  role="img"
                  aria-label={alt}
                />
                {/* Dark overlay — lightens on hover */}
                <div
                  className="absolute inset-0 bg-black/40
                             group-hover:bg-black/20 transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — CTA BANNER
          Red background (#e2231a), clip-diagonal chamfer, speed-line
          diagonal stripe pattern at 20% opacity, Anton headline,
          dark "CONTACT US" button.
          ══════════════════════════════════════════════════════════════════ */}
      <section id="cta" className="py-[120px] px-5 md:px-16 bg-[#131313] pb-32">
        <div className="max-w-7xl mx-auto">
          <div
            className="bg-[#e2231a] p-16 md:p-24 relative overflow-hidden clip-diagonal
                       flex flex-col md:flex-row items-center justify-between gap-12"
          >
            {/* Speed-line diagonal pattern */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 11px)',
              }}
              aria-hidden="true"
            />
            <h2
              className="text-white uppercase relative z-10 max-w-2xl leading-tight"
              style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '0.02em' }}
            >
              Join us in shaping the future of sports — one event, one athlete, one story at a time
            </h2>
            <Link
              to="/contact"
              id="cta-contact-btn"
              className="bg-[#131313] text-white font-label-bold uppercase
                         px-10 py-5 hover:bg-[#2a2a2a] transition-all duration-200
                         relative z-10 border border-[#353534] whitespace-nowrap"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
          surface-container-lowest (#0e0e0e) bg, top border red,
          VANTAGE wordmark, links in Archivo Narrow label-bold.
          ══════════════════════════════════════════════════════════════════ */}
      <footer
        id="site-footer"
        className="bg-[#0e0e0e] border-t-2 border-[#e2231a] px-5 md:px-16 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-2">
            <div
              className="text-[#e5e2e1] uppercase mb-4"
              style={{ fontFamily: 'Anton, sans-serif', fontSize: '48px', lineHeight: '48px' }}
            >
              VANTAGE
            </div>
            <p className="font-body-md text-[#b6b5b4] max-w-sm mb-8">
              Elevating human potential through precision engineering, actionable telemetry,
              and relentless dedication to athletic excellence.
            </p>
            <p className="font-label-bold text-[#b6b5b4]">
              © 2024 VANTAGE PERFORMANCE. ALL RIGHTS RESERVED.
            </p>
          </div>

          {/* Legal links */}
          <div className="col-span-1 flex flex-col gap-4">
            <h5 className="font-label-bold text-white mb-2">Legal</h5>
            <a href="#" className="font-label-bold text-[#b6b5b4] hover:text-[#e2231a] transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="font-label-bold text-[#b6b5b4] hover:text-[#e2231a] transition-colors">
              TERMS OF SERVICE
            </a>
          </div>

          {/* Connect links */}
          <div className="col-span-1 flex flex-col gap-4">
            <h5 className="font-label-bold text-white mb-2">Connect</h5>
            <a href="#" className="font-label-bold text-[#b6b5b4] hover:text-[#e2231a] transition-colors">
              GLOBAL CONTACT
            </a>
            <a href="#" className="font-label-bold text-[#b6b5b4] hover:text-[#e2231a] transition-colors">
              CAREERS
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
