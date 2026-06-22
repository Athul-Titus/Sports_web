/**
 * pages/index.jsx
 * Barrel file — exports all page components.
 * Home is fully built; other pages are styled placeholders.
 */

export { default as Home } from './Home';

/* ── Styled placeholder — About ──────────────────────────────────────────── */
export const About = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#131313] pt-20">
    <div className="text-center px-8">
      <div className="w-12 h-1 bg-[#e2231a] -skew-x-12 mx-auto mb-6" />
      <p className="font-label-bold text-[#e2231a] mb-4">— PAGE —</p>
      <h1
        className="text-white uppercase mb-6"
        style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(36px, 6vw, 80px)', letterSpacing: '0.02em' }}
      >
        About Us
      </h1>
      <p className="font-body-md text-[#b6b5b4] max-w-md mx-auto">
        Coming soon — the story of VantaGe Sports Consultancy.
      </p>
    </div>
  </div>
);

/* ── Styled placeholder — Services ───────────────────────────────────────── */
export const Services = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#131313] pt-20">
    <div className="text-center px-8">
      <div className="w-12 h-1 bg-[#e2231a] -skew-x-12 mx-auto mb-6" />
      <p className="font-label-bold text-[#e2231a] mb-4">— PAGE —</p>
      <h1
        className="text-white uppercase mb-6"
        style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(36px, 6vw, 80px)', letterSpacing: '0.02em' }}
      >
        Services
      </h1>
      <p className="font-body-md text-[#b6b5b4] max-w-md mx-auto">
        Full services page coming soon.
      </p>
    </div>
  </div>
);

/* ── Styled placeholder — Gallery ────────────────────────────────────────── */
export const Gallery = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#131313] pt-20">
    <div className="text-center px-8">
      <div className="w-12 h-1 bg-[#e2231a] -skew-x-12 mx-auto mb-6" />
      <p className="font-label-bold text-[#e2231a] mb-4">— PAGE —</p>
      <h1
        className="text-white uppercase mb-6"
        style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(36px, 6vw, 80px)', letterSpacing: '0.02em' }}
      >
        Gallery
      </h1>
      <p className="font-body-md text-[#b6b5b4] max-w-md mx-auto">
        Full photo gallery coming soon.
      </p>
    </div>
  </div>
);

/* ── Styled placeholder — Contact ────────────────────────────────────────── */
export const Contact = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#131313] pt-20">
    <div className="text-center px-8">
      <div className="w-12 h-1 bg-[#e2231a] -skew-x-12 mx-auto mb-6" />
      <p className="font-label-bold text-[#e2231a] mb-4">— PAGE —</p>
      <h1
        className="text-white uppercase mb-6"
        style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(36px, 6vw, 80px)', letterSpacing: '0.02em' }}
      >
        Contact
      </h1>
      <p className="font-body-md text-[#b6b5b4] max-w-md mx-auto">
        Contact form coming soon.
      </p>
    </div>
  </div>
);

/* ── Styled placeholder — Admin Login ────────────────────────────────────── */
export const AdminLogin = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0e0e0e]">
    <div
      className="bg-[#1c1b1b] border border-[#353534] p-12 w-full max-w-md mx-4"
      style={{ boxShadow: '0 0 30px rgba(226,35,26,0.1)' }}
    >
      <div className="w-12 h-1 bg-[#e2231a] -skew-x-12 mb-6" />
      <h1
        className="text-white uppercase mb-8"
        style={{ fontFamily: 'Anton, sans-serif', fontSize: '36px', lineHeight: '36px' }}
      >
        Admin Login
      </h1>
      <div className="space-y-6">
        <div>
          <label className="font-label-bold text-[#b6b5b4] block mb-2">EMAIL</label>
          <input
            type="email"
            id="admin-email"
            className="w-full bg-[#131313] border-b-2 border-[#353534] text-[#e5e2e1]
                       px-0 py-3 font-body-md focus:outline-none focus:border-[#e2231a]
                       transition-colors duration-200"
            placeholder="admin@vantage.com"
          />
        </div>
        <div>
          <label className="font-label-bold text-[#b6b5b4] block mb-2">PASSWORD</label>
          <input
            type="password"
            id="admin-password"
            className="w-full bg-[#131313] border-b-2 border-[#353534] text-[#e5e2e1]
                       px-0 py-3 font-body-md focus:outline-none focus:border-[#e2231a]
                       transition-colors duration-200"
            placeholder="••••••••"
          />
        </div>
        <button
          id="admin-login-btn"
          className="w-full bg-[#e2231a] text-white font-label-bold py-4
                     hover:brightness-110 transition-all duration-200 mt-4"
        >
          LOGIN
        </button>
      </div>
    </div>
  </div>
);
