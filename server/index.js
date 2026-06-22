/**
 * server/index.js — VantaGe Sports Consultancy API Server
 *
 * Stack: Express.js + MySQL2 + JWT + Nodemailer + Cloudinary
 * Env:   All configuration via .env (see .env file for keys)
 */

import 'dotenv/config';
import express        from 'express';
import cors           from 'cors';

/* ── App Initialization ───────────────────────────────────────────────────── */
const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ───────────────────────────────────────────────────────────── */

// CORS — allow requests from the Vite dev server
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Parse incoming JSON bodies
app.use(express.json());

// Parse URL-encoded form bodies
app.use(express.urlencoded({ extended: true }));

/* ── Health Check ─────────────────────────────────────────────────────────── */
app.get('/', (_req, res) => {
  res.json({
    status:  'ok',
    message: 'VantaGe Sports API is running',
    version: '1.0.0',
  });
});

/* ── API Routes (to be added) ─────────────────────────────────────────────── */
// app.use('/api/auth',    authRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/gallery', galleryRoutes);

/* ── 404 Handler ──────────────────────────────────────────────────────────── */
app.use((_req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

/* ── Global Error Handler ─────────────────────────────────────────────────── */
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.stack);
  res.status(err.status || 500).json({
    status:  'error',
    message: err.message || 'Internal server error',
  });
});

/* ── Start Server ─────────────────────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`\n🏆 VantaGe Sports API`);
  console.log(`   Server running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
