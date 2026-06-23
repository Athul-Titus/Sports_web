<?php
/**
 * api/upload.php — VantaGe Sports Consultancy
 *
 * Admin-only: Uploads an image to Cloudinary and saves the URL to MySQL.
 *
 * Expects multipart/form-data POST with:
 *   - image  (file)        required
 *   - caption (string)     optional
 *
 * Response: { "success": true, "image": { id, cloudinary_url, caption } }
 *
 * Requires: composer require cloudinary/cloudinary_php
 */

header('Content-Type: application/json');

/* ── Auth guard ──────────────────────────────────────────────────────────── */
require_once __DIR__ . '/../includes/auth.php';

if (!isLoggedIn()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized.']);
    exit;
}

/* ── Only allow POST ─────────────────────────────────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

/* ── Validate file upload ────────────────────────────────────────────────── */
if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'No valid image file received.']);
    exit;
}

$caption = trim($_POST['caption'] ?? '');

/* Verify MIME type */
$finfo    = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($_FILES['image']['tmp_name']);
$allowed  = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

if (!in_array($mimeType, $allowed, true)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid file type. Allowed: JPG, PNG, GIF, WebP.']);
    exit;
}

/* ── Upload to Cloudinary ────────────────────────────────────────────────── */
require_once __DIR__ . '/../includes/cloudinary.php';
require_once __DIR__ . '/../includes/db.php';

try {
    $result = $cloudinary->uploadApi()->upload(
        $_FILES['image']['tmp_name'],
        [
            'folder'         => 'vantage_gallery',
            'resource_type'  => 'image',
            'transformation' => [
                ['quality' => 'auto', 'fetch_format' => 'auto'],
            ],
        ]
    );
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Cloudinary upload failed: ' . $e->getMessage()]);
    exit;
}

$cloudinaryUrl    = $result['secure_url'];
$cloudinaryPubId  = $result['public_id'];

/* ── Save to database ────────────────────────────────────────────────────── */
try {
    $stmt = $pdo->prepare(
        'INSERT INTO gallery_images (cloudinary_url, caption) VALUES (?, ?)'
    );
    $stmt->execute([$cloudinaryUrl, $caption ?: null]);
    $newId = (int) $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'image'   => [
            'id'            => $newId,
            'cloudinary_url' => $cloudinaryUrl,
            'caption'       => $caption,
        ],
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database insert failed.']);
}
