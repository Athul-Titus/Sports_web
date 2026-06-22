/**
 * App.jsx — VantaGe Sports Consultancy
 *
 * React Router v6 setup with all routes.
 * Navbar is rendered above the <Outlet /> on every page.
 * Admin route uses a separate layout (no navbar padding).
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, About, Services, Gallery, Contact, AdminLogin } from './pages/index';

/* ── Root layout — wraps all public pages with Navbar ─────────────────────── */
function PublicLayout() {
  return (
    <>
      {/* Navbar is fixed/sticky — main content gets top padding to clear it */}
      <Navbar />
      <main className="pt-[64px] md:pt-[72px]">
        {/* Each route renders its page component here */}
        <Routes>
          <Route path="/"        element={<Home />}     />
          <Route path="/about"   element={<About />}    />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />}  />
          <Route path="/contact" element={<Contact />}  />
        </Routes>
      </main>
    </>
  );
}

/* ── App — top-level router ───────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin login — standalone, no public navbar */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* All public pages — share the Navbar layout */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
