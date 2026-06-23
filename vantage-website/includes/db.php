<?php
/**
 * includes/db.php — VantaGe Sports Consultancy
 *
 * Creates and returns a PDO connection to the MySQL database.
 * Uses constants defined in config.php.
 *
 * Usage:
 *   require_once __DIR__ . '/../includes/db.php';
 *   $stmt = $pdo->prepare('SELECT ...');
 */

require_once __DIR__ . '/../config.php';

try {
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=utf8mb4',
        DB_HOST,
        DB_NAME
    );

    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    /* Return a JSON error and halt — all API callers expect JSON */
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit;
}
