<?php
/**
 * includes/auth.php — VantaGe Sports Consultancy
 *
 * Session authentication helper.
 * Call requireAuth() at the top of any admin-only PHP file.
 *
 * Usage:
 *   require_once __DIR__ . '/../includes/auth.php';
 *   requireAuth();   // Redirects to admin login if session is invalid
 */

require_once __DIR__ . '/../config.php';

/* Start (or resume) the named session */
if (session_status() === PHP_SESSION_NONE) {
    session_name(SESSION_NAME);
    session_start();
}

/**
 * requireAuth()
 *
 * Checks that a valid admin session exists.
 * If not, redirects to the admin login page and halts execution.
 *
 * @return void
 */
function requireAuth(): void
{
    if (empty($_SESSION['admin_id'])) {
        /* Determine the path depth to build the correct redirect URL */
        $loginPath = '/admin/index.php';
        header('Location: ' . $loginPath);
        exit;
    }
}

/**
 * isLoggedIn()
 *
 * Returns true if an admin session is active.
 *
 * @return bool
 */
function isLoggedIn(): bool
{
    return !empty($_SESSION['admin_id']);
}
