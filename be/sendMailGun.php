<?php

use Mailgun\Mailgun;

// Ensure the Mailgun SDK is installed (via Composer: composer require mailgun/mailgun-php)
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Initialize Mailgun with your API key and domain
$mailgunApiKey = $_ENV['MAILGUN_API_KEY']; // Store your API key in an environment variable
$schluessel_mailgunApiKey = $_ENV['SCHLUESSELMOMENTE_SENDKEY']; // Store your API key in an environment variable
//$mg = Mailgun::create($mailgunApiKey);
$mg = Mailgun::create($schluessel_mailgunApiKey ?: 'API_KEY', 'https://api.eu.mailgun.net');


function sendMainMailgunMessage(Mailgun $mg, array $postData, string $recipientEmail, string $recipientName): object
{
    $senderEmail = htmlspecialchars($postData['email']);
    $senderName = htmlspecialchars($postData['name']);
    $subject = 'Nachricht von ' . $senderName;
    $messagePlainText = $postData['message'];

    // Read the HTML template
    $htmlTemplate = file_get_contents('public/message.html');
    $htmlTemplate = str_replace('{MESSAGE}', $messagePlainText, $htmlTemplate);
    $htmlTemplate = str_replace('{NAME}', $senderName, $htmlTemplate);
    $htmlTemplate = str_replace('{ABSENDER_EMAIL}', $senderEmail, $htmlTemplate);
    $htmlTemplate = str_replace('{ABSENDER_TELEFON}', htmlspecialchars($postData['phone']), $htmlTemplate);

    $result = $mg->messages()->send(
      'schluesselmomente-freiburg.de',
      [
        'from' => 'Beratung Schluesselmomente <postmaster@schluesselmomente-freiburg.de>',
        'to' => "{$recipientName} <{$recipientEmail}>",
        'subject' => $subject,
        'text' => $messagePlainText,
        'html' => $htmlTemplate,
        'h:Reply-To' => $senderEmail,
      ]
    );
    return $result;
}

function sendMailgunConfirmationEmail(Mailgun $mg, string $recipientEmail, string $recipientName, array $postData): object
{
    $htmlTemplateConfirmation = file_get_contents('public/confirmation.html');
    $htmlTemplateConfirmation = str_replace('{MESSAGE}', htmlspecialchars($postData['message']), $htmlTemplateConfirmation);
    $htmlTemplateConfirmation = str_replace('{NAME}', $recipientName, $htmlTemplateConfirmation);

    $result = $mg->messages()->send(
      'schluesselmomente-freiburg.de',
      [
        'from' => 'Beratung Schluesselmomente <postmaster@schluesselmomente-freiburg.de>',
        'to' => "{$recipientName} <{$recipientEmail}>",
        'subject' => 'Anfrage Schluesselmomente',
        'html' => $htmlTemplateConfirmation,
        'text' => 'Vielen Dank für Ihre Nachricht. Ich werde mich so schnell wie möglich bei Ihnen melden.',
      ]
    );
    return $result;
}

// Main execution block
try {
    $recipientEmailMain = $_ENV['MAIL'];
    $recipientNameMain = 'Theresa Kappus';

    $resultMain = sendMainMailgunMessage($mg, $_POST, $recipientEmailMain, $recipientNameMain);

    if ($resultMain->getId()) {
        echo 'Message has been sent';
    } else {
        error_log("Mailgun Error (Main): " . print_r($resultMain, true), 3, "errors.log");
        echo 'Error sending message.';
    }

    // Send confirmation email to the submitter
    $senderEmail = htmlspecialchars($_POST['email']);
    $senderName = htmlspecialchars($_POST['name']);
    $resultConfirmation = sendMailgunConfirmationEmail($mg, $senderEmail, $senderName, $_POST);

    if ($resultConfirmation->getId()) {
        echo 'Confirmation email sent to submitter successfully.';
    } else {
        error_log("Mailgun Error (Confirmation): " . print_r($resultConfirmation, true), 3, "errors.log");
        echo 'Error sending confirmation email.';
    }

} catch (\Exception $e) {
    echo "Message could not be sent. Mailgun Error: {$e->getMessage()}";
    error_log("Mailgun Exception: " . $e->getMessage(), 3, "errors.log");
}

?>
