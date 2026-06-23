/**
 * assets/js/gallery.js — VantaGe Sports Consultancy
 * ====================================================
 * Fetches gallery images from /api/gallery.php (public JSON endpoint)
 * and renders them into #gallery-grid on gallery.html.
 *
 * Also powers the lightbox modal for image preview.
 */

(function () {
  'use strict';

  /* ── Run on DOM ready ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return; /* Not on the gallery page */

    loadGallery(grid);
    buildLightbox();
  });

  /* ══════════════════════════════════════════════════════════════════════════
     LOAD GALLERY — fetch from API and render cards
     ══════════════════════════════════════════════════════════════════════════ */
  function loadGallery(grid) {
    fetch('api/gallery.php')
      .then(function (res) {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(function (data) {
        var loading = document.getElementById('gallery-loading');
        if (loading) loading.remove();

        if (!data.images || data.images.length === 0) {
          grid.innerHTML = '<p style="color: var(--clr-muted); grid-column: 1/-1; text-align: center; padding: 48px 0;">No gallery images yet.</p>';
          return;
        }

        data.images.forEach(function (img) {
          grid.appendChild(createCell(img));
        });
      })
      .catch(function () {
        var loading = document.getElementById('gallery-loading');
        if (loading) loading.textContent = 'Failed to load gallery. Please try again later.';
      });
  }

  /* ── Build a single gallery cell ────────────────────────────────────────── */
  function createCell(img) {
    var cell = document.createElement('div');
    cell.className = 'gallery-full-cell';
    cell.setAttribute('tabindex', '0');
    cell.setAttribute('role', 'button');
    cell.setAttribute('aria-label', img.caption || 'Gallery image');
    cell.dataset.src     = img.cloudinary_url;
    cell.dataset.caption = img.caption || '';

    var photo = document.createElement('img');
    photo.src    = img.cloudinary_url;
    photo.alt    = img.caption || 'VantaGe Sports gallery image';
    photo.loading = 'lazy';

    var caption = document.createElement('div');
    caption.className   = 'gallery-full-cell__caption';
    caption.textContent = img.caption || '';

    cell.appendChild(photo);
    cell.appendChild(caption);

    /* Open lightbox on click or Enter key */
    cell.addEventListener('click', function () { openLightbox(img.cloudinary_url, img.caption); });
    cell.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') openLightbox(img.cloudinary_url, img.caption);
    });

    return cell;
  }

  /* ══════════════════════════════════════════════════════════════════════════
     LIGHTBOX — minimal overlay image preview
     ══════════════════════════════════════════════════════════════════════════ */
  var lightbox = null;
  var lbImg    = null;
  var lbCap    = null;

  function buildLightbox() {
    /* Overlay backdrop */
    lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    Object.assign(lightbox.style, {
      display:         'none',
      position:        'fixed',
      inset:           '0',
      zIndex:          '200',
      background:      'rgba(0,0,0,0.92)',
      alignItems:      'center',
      justifyContent:  'center',
      flexDirection:   'column',
      padding:         '32px',
    });

    /* Close button */
    var close = document.createElement('button');
    close.textContent = '✕';
    close.setAttribute('aria-label', 'Close lightbox');
    Object.assign(close.style, {
      position:   'absolute',
      top:        '24px',
      right:      '24px',
      background: 'none',
      border:     'none',
      color:      '#e5e2e1',
      fontSize:   '28px',
      cursor:     'pointer',
      lineHeight: '1',
    });
    close.addEventListener('click', closeLightbox);

    /* Image */
    lbImg = document.createElement('img');
    Object.assign(lbImg.style, {
      maxWidth:    '90vw',
      maxHeight:   '80vh',
      objectFit:   'contain',
      border:      '1px solid #353534',
    });

    /* Caption */
    lbCap = document.createElement('p');
    Object.assign(lbCap.style, {
      marginTop:    '16px',
      color:        '#b6b5b4',
      fontFamily:   "'Archivo Narrow', sans-serif",
      fontSize:     '14px',
      textAlign:    'center',
      maxWidth:     '600px',
    });

    lightbox.appendChild(close);
    lightbox.appendChild(lbImg);
    lightbox.appendChild(lbCap);

    /* Close on backdrop click */
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });

    document.body.appendChild(lightbox);
  }

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lbImg.src            = src;
    lbCap.textContent    = caption || '';
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

})();
