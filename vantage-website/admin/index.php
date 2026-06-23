<?php
/**
 * admin/index.php — VantaGe Sports Consultancy
 *
 * Admin login page.
 * If already logged in, redirects to dashboard.
 */

require_once __DIR__ . '/../includes/auth.php';

/* Redirect if already logged in */
if (isLoggedIn()) {
    header('Location: /admin/dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Login — VANTAGE</title>
  <meta name="robots" content="noindex, nofollow" />
  <link rel="stylesheet" href="../assets/css/style.css" />
</head>
<body>

<main class="admin-login-page" id="admin-login-page">
  <div class="admin-login-card">

    <!-- Wordmark -->
    <div style="text-align: center; margin-bottom: 40px;">
      <div style="font-family: var(--font-headline); font-size: 40px; text-transform: uppercase; letter-spacing: 0.02em; color: var(--clr-on-surface);">
        VAN<span style="color: var(--clr-red);">TA</span>GE
      </div>
      <p class="text-label" style="color: var(--clr-muted); margin-top: 8px;">Admin Portal</p>
    </div>

    <!-- Login form -->
    <form id="admin-login-form" novalidate onsubmit="handleLogin(event)">

      <div class="form-group">
        <label class="form-label" for="admin-username">Username</label>
        <input
          class="form-input"
          type="text"
          id="admin-username"
          name="username"
          placeholder="admin"
          required
          autocomplete="username"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="admin-password">Password</label>
        <input
          class="form-input"
          type="password"
          id="admin-password"
          name="password"
          placeholder="••••••••"
          required
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="form-submit" id="login-btn" style="width: 100%;">
        Sign In
      </button>

      <div class="form-alert" id="login-error" role="alert"></div>

    </form>
  </div>
</main>

<script>
  function handleLogin(e) {
    e.preventDefault();

    var btn   = document.getElementById('login-btn');
    var error = document.getElementById('login-error');
    error.style.display = 'none';
    error.className     = 'form-alert';

    btn.disabled    = true;
    btn.textContent = 'Signing in…';

    fetch('../api/login.php', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: document.getElementById('admin-username').value.trim(),
        password: document.getElementById('admin-password').value,
      }),
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          window.location.href = json.redirect || '/admin/dashboard.php';
        } else {
          error.textContent = json.message || 'Login failed.';
          error.className   = 'form-alert error';
          error.style.display = 'block';
        }
      })
      .catch(function () {
        error.textContent   = 'Network error. Please try again.';
        error.className     = 'form-alert error';
        error.style.display = 'block';
      })
      .finally(function () {
        btn.disabled    = false;
        btn.textContent = 'Sign In';
      });
  }
</script>

</body>
</html>
