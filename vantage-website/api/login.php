<?php
/**
 * api/login.php — VantaGe Sports Consultancy
 *
 * Admin login endpoint.
 * POST: { username, password }
 *
 * Verifies credentials against the admins table using password_verify().
 * On success: starts a named session and stores admin_id + username.
 * Returns JSON with success/failure.
 */

header('Content-Type: application/json');

/* Only allow POST */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';

/* ── Start session ───────────────────────────────────────────────────────── */
if (session_status() === PHP_SESSION_NONE) {
    session_name(SESSION_NAME);
    session_start();
}

/* ── Read JSON body ──────────────────────────────────────────────────────── */
$body     = json_decode(file_get_contents('php://input'), true);
$username = trim($body['username'] ?? '');
$password = trim($body['password'] ?? '');

if (!$username || !$password) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Username and password are required.']);
    exit;
}

/* ── Lookup admin ────────────────────────────────────────────────────────── */
try {
    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM admins WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $admin = $stmt->fetch();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error.']);
    exit;
}

/* Constant-time comparison prevents user enumeration */
if (!$admin || !password_verify($password, $admin['password_hash'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
    exit;
}

/* ── Create session ──────────────────────────────────────────────────────── */
session_regenerate_id(true); /* Prevent session fixation */
$_SESSION['admin_id']       = $admin['id'];
$_SESSION['admin_username'] = $admin['username'];

echo json_encode([
    'success'  => true,
    'message'  => 'Login successful.',
    'redirect' => '/admin/dashboard.php',
]);
