<?php
/**
 * api/logout.php — VantaGe Sports Consultancy
 *
 * Destroys the admin session and redirects to the login page.
 * Accepts GET or POST.
 */

require_once __DIR__ . '/../config.php';

if (session_status() === PHP_SESSION_NONE) {
    session_name(SESSION_NAME);
    session_start();
}

/* Destroy session data and the cookie */
$_SESSION = [];

if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', [
        'expires'  => time() - 3600,
        'path'     => '/',
        'secure'   => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

session_destroy();

header('Location: /admin/index.php');
exit;
