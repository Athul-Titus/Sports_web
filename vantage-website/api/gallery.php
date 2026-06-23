<?php
/**
 * api/gallery.php — VantaGe Sports Consultancy
 *
 * Public GET endpoint.
 * Returns all gallery images as JSON, ordered newest first.
 *
 * Response: { "success": true, "images": [ { id, cloudinary_url, caption, uploaded_at } ] }
 */

header('Content-Type: application/json');
header('Cache-Control: public, max-age=60');

/* Only allow GET */
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/../includes/db.php';

try {
    $stmt = $pdo->query(
        'SELECT id, cloudinary_url, caption, uploaded_at
           FROM gallery_images
          ORDER BY uploaded_at DESC'
    );
    $images = $stmt->fetchAll();

    echo json_encode([
        'success' => true,
        'images'  => $images,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to fetch images.']);
}
