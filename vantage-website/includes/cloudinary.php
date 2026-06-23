<?php
/**
 * includes/cloudinary.php — VantaGe Sports Consultancy
 *
 * Initialises the Cloudinary PHP SDK (v2) using constants from config.php.
 * Exposes a $cloudinary instance for upload/delete operations.
 *
 * Requires: composer require cloudinary/cloudinary_php
 *
 * Usage:
 *   require_once __DIR__ . '/../includes/cloudinary.php';
 *   $result = $cloudinary->uploadApi()->upload($filePath, ['folder' => 'vantage']);
 */

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config.php';

use Cloudinary\Cloudinary;

$cloudinary = new Cloudinary([
    'cloud' => [
        'cloud_name' => CLOUDINARY_CLOUD_NAME,
        'api_key'    => CLOUDINARY_API_KEY,
        'api_secret' => CLOUDINARY_API_SECRET,
    ],
    'url' => [
        'secure' => true,   /* Always use HTTPS URLs */
    ],
]);
