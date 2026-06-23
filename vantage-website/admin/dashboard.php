<?php
/**
 * admin/dashboard.php — VantaGe Sports Consultancy
 *
 * Protected admin dashboard.
 * Session guard runs first — any unauthenticated request is redirected to login.
 *
 * Features:
 *   • Gallery management: upload image + caption, view grid, delete
 */

require_once __DIR__ . '/../includes/auth.php';
requireAuth(); /* Halt + redirect if not logged in */
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard — VANTAGE Admin</title>
  <meta name="robots" content="noindex, nofollow" />
  <link rel="stylesheet" href="../assets/css/style.css" />
</head>
<body style="background: var(--clr-bg);">

<div class="admin-layout" id="admin-layout">

  <!-- ── Sidebar ─────────────────────────────────────────────────────────── -->
  <aside class="admin-sidebar" role="navigation" aria-label="Admin navigation">
    <div class="admin-sidebar__brand">
      VAN<span>TA</span>GE
    </div>
    <ul class="admin-sidebar__nav">
      <li>
        <a href="dashboard.php" class="admin-sidebar__link active">
          <span class="material-symbols-outlined" style="font-size:20px;">photo_library</span>
          Gallery
        </a>
      </li>
      <li>
        <a href="../index.html" class="admin-sidebar__link" target="_blank">
          <span class="material-symbols-outlined" style="font-size:20px;">open_in_new</span>
          View Site
        </a>
      </li>
    </ul>
  </aside>

  <!-- ── Main content ───────────────────────────────────────────────────── -->
  <main class="admin-main">

    <!-- Topbar -->
    <div class="admin-topbar">
      <h1 class="admin-topbar__title">Gallery Management</h1>
      <a href="../api/logout.php" class="btn-logout" id="logout-btn">Sign Out</a>
    </div>

    <!-- Upload zone -->
    <div class="upload-zone" id="upload-zone">
      <span class="material-symbols-outlined upload-zone__icon">cloud_upload</span>
      <p style="color: var(--clr-muted); margin-bottom: 24px;">
        Drag &amp; drop an image here, or click to browse
      </p>
      <form id="upload-form" enctype="multipart/form-data">
        <input
          type="file"
          id="upload-file"
          name="image"
          accept="image/jpeg,image/png,image/gif,image/webp"
          style="display:none"
          required
        />
        <button
          type="button"
          class="form-submit"
          id="browse-btn"
          style="margin-bottom: 16px;"
        >Browse File</button>

        <div id="upload-preview" style="display:none; margin-bottom: 16px;">
          <img id="preview-img" src="" alt="Preview" style="max-height:120px; border: 1px solid var(--clr-border);" />
        </div>

        <div class="form-group" style="max-width: 400px; margin-inline: auto;">
          <label class="form-label" for="upload-caption">Caption (optional)</label>
          <input
            class="form-input"
            type="text"
            id="upload-caption"
            name="caption"
            placeholder="e.g. National Athletics Championship 2024"
          />
        </div>

        <button type="submit" class="form-submit" id="upload-btn">Upload Image</button>
        <div class="form-alert" id="upload-status" role="alert"></div>
      </form>
    </div>

    <!-- Gallery grid -->
    <div class="admin-gallery-grid" id="admin-gallery-grid" aria-label="Uploaded gallery images">
      <p id="gallery-load-msg" style="color: var(--clr-muted); grid-column:1/-1;">Loading…</p>
    </div>

  </main>
</div>

<script>
  /* ── Upload: browse button triggers hidden file input ──────────────────── */
  document.getElementById('browse-btn').addEventListener('click', function () {
    document.getElementById('upload-file').click();
  });

  /* ── Preview selected image ────────────────────────────────────────────── */
  document.getElementById('upload-file').addEventListener('change', function () {
    var file = this.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('preview-img').src = e.target.result;
      document.getElementById('upload-preview').style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  /* ── Upload form submit ────────────────────────────────────────────────── */
  document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var fileInput = document.getElementById('upload-file');
    var status    = document.getElementById('upload-status');
    var btn       = document.getElementById('upload-btn');
    status.style.display = 'none';
    status.className     = 'form-alert';

    if (!fileInput.files[0]) {
      status.textContent    = 'Please select a file.';
      status.className      = 'form-alert error';
      status.style.display  = 'block';
      return;
    }

    var formData = new FormData();
    formData.append('image',   fileInput.files[0]);
    formData.append('caption', document.getElementById('upload-caption').value.trim());

    btn.disabled    = true;
    btn.textContent = 'Uploading…';

    fetch('../api/upload.php', {
      method: 'POST',
      body:   formData,
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          status.textContent   = '✓ Image uploaded successfully.';
          status.className     = 'form-alert success';
          status.style.display = 'block';
          document.getElementById('upload-form').reset();
          document.getElementById('upload-preview').style.display = 'none';
          loadGallery(); /* Refresh grid */
        } else {
          status.textContent   = '✗ ' + (json.message || 'Upload failed.');
          status.className     = 'form-alert error';
          status.style.display = 'block';
        }
      })
      .catch(function () {
        status.textContent   = '✗ Network error.';
        status.className     = 'form-alert error';
        status.style.display = 'block';
      })
      .finally(function () {
        btn.disabled    = false;
        btn.textContent = 'Upload Image';
      });
  });

  /* ── Load gallery images ───────────────────────────────────────────────── */
  function loadGallery() {
    var grid = document.getElementById('admin-gallery-grid');

    fetch('../api/gallery.php')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        document.getElementById('gallery-load-msg').remove();

        /* Clear existing items */
        grid.querySelectorAll('.admin-gallery-item').forEach(function (el) { el.remove(); });

        if (!data.images || data.images.length === 0) {
          grid.innerHTML = '<p style="color: var(--clr-muted); grid-column:1/-1;">No images yet.</p>';
          return;
        }

        data.images.forEach(function (img) {
          var item = document.createElement('div');
          item.className = 'admin-gallery-item';
          item.dataset.id = img.id;

          var photo = document.createElement('img');
          photo.src     = img.cloudinary_url;
          photo.alt     = img.caption || '';
          photo.loading = 'lazy';

          var delBtn = document.createElement('button');
          delBtn.className = 'admin-gallery-item__delete';
          delBtn.setAttribute('aria-label', 'Delete image');
          delBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">delete</span>';
          delBtn.addEventListener('click', function () { deleteImage(img.id, item); });

          item.appendChild(photo);
          item.appendChild(delBtn);
          grid.appendChild(item);
        });
      })
      .catch(function () {
        document.getElementById('gallery-load-msg').textContent = 'Failed to load gallery.';
      });
  }

  /* ── Delete image ──────────────────────────────────────────────────────── */
  function deleteImage(id, itemEl) {
    if (!confirm('Delete this image? This cannot be undone.')) return;

    fetch('../api/delete.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id: id }),
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          itemEl.style.opacity = '0';
          itemEl.style.transition = 'opacity 0.3s';
          setTimeout(function () { itemEl.remove(); }, 300);
        } else {
          alert('Delete failed: ' + (json.message || 'Unknown error.'));
        }
      })
      .catch(function () {
        alert('Network error while deleting.');
      });
  }

  /* ── Init ──────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', loadGallery);
</script>

</body>
</html>
