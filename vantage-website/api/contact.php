<?php
/**
 * api/contact.php — VantaGe Sports Consultancy
 *
 * Handles the contact form POST.
 * Validates input, then sends an email to ADMIN_EMAIL via PHP mail().
 * Returns JSON with success or error.
 *
 * For production, replace mail() with PHPMailer + SMTP:
 *   composer require phpmailer/phpmailer
 */

header('Content-Type: application/json');

/* Only allow POST */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/../config.php';

/* ── Read JSON body ──────────────────────────────────────────────────────── */
$body = json_decode(file_get_contents('php://input'), true);

$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$subject = trim($body['subject'] ?? '');
$message = trim($body['message'] ?? '');

/* ── Validate ────────────────────────────────────────────────────────────── */
if (!$name || !$email || !$subject || !$message) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

/* ── Sanitise for email headers (prevent header injection) ───────────────── */
$safeName    = preg_replace('/[\r\n]/', '', $name);
$safeEmail   = preg_replace('/[\r\n]/', '', $email);
$safeSubject = preg_replace('/[\r\n]/', '', $subject);

/* ── Build email ─────────────────────────────────────────────────────────── */
$to      = ADMIN_EMAIL;
$headers = implode("\r\n", [
    'From: VantaGe Website <noreply@vantagesports.com>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
]);

$emailBody = <<<TXT
New contact form submission from the VantaGe website.

Name:    {$safeName}
Email:   {$safeEmail}
Subject: {$safeSubject}

Message:
{$message}
TXT;

/* ── Send ────────────────────────────────────────────────────────────────── */
$sent = mail($to, '[VantaGe Enquiry] ' . $safeSubject, $emailBody, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.']);
}
