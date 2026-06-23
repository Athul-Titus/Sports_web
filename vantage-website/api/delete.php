<?php
/**
 * api/delete.php — VantaGe Sports Consultancy
 *
 * Admin-only: Deletes an image from Cloudinary and removes the row from MySQL.
 *
 * POST body (JSON): { "id": <int> }
 *
 * Steps:
 *   1. Auth check
 *   2. Fetch row from DB to get cloudinary_url
 *   3. Extract public_id from URL and call Cloudinary destroy
 *   4. Delete the DB row
 */

header('Content-Type: application/json');

/* ── Auth guard ──────────────────────────────────────────────────────────── */
require_once __DIR__ . '/../includes/auth.php';

if (!isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

/* ── Parse body ──────────────────────────────────────────────────────────── */
$body = json_decode(file_get_contents('php://input'), true);
$id   = (int) ($body['id'] ?? 0);

if ($id <= 0) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid image ID.']);
    exit;
}

require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/cloudinary.php';

/* ── Fetch record ────────────────────────────────────────────────────────── */
try {
    $stmt = $pdo->prepare('SELECT id, cloudinary_url FROM gallery_images WHERE id = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error.']);
    exit;
}

if (!$row) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Image not found.']);
    exit;
}

/* ── Extract Cloudinary public_id from URL ───────────────────────────────── */
/* Cloudinary URLs look like: https://res.cloudinary.com/<cloud>/image/upload/v123/vantage_gallery/abc.jpg
   The public_id is everything after /upload/<version>/ without the extension */
$url      = $row['cloudinary_url'];
$pattern  = '/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/';
$publicId = null;

if (preg_match($pattern, $url, $matches)) {
    $publicId = $matches[1];
}

/* ── Delete from Cloudinary ──────────────────────────────────────────────── */
if ($publicId) {
    try {
        $cloudinary->uploadApi()->destroy($publicId);
    } catch (Exception $e) {
        /* Log but continue — still remove from DB */
        error_log('Cloudinary delete failed for ' . $publicId . ': ' . $e->getMessage());
    }
}

/* ── Delete from database ────────────────────────────────────────────────── */
try {
    $stmt = $pdo->prepare('DELETE FROM gallery_images WHERE id = ?');
    $stmt->execute([$id]);

    echo json_encode(['success' => true, 'message' => 'Image deleted.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database delete failed.']);
}
