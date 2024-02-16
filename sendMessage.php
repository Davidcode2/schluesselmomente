<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
  $mail->SMTPDebug = 0;
  $mail->Host = $_ENV['HOST'];
  $mail->Port = $_ENV['PORT'];
  $mail->SMTPAuth = true;
  $mail->Username = $_ENV['MAIL'];
  $mail->Password = $_ENV['PASSWORD'];

  $mail->CharSet = "UTF-8";
  $senderEmail = htmlspecialchars($_POST['email']);
  $mail->setFrom($_ENV['MAIL'], 'Theresa Kappus');
  $mail->addReplyTo($senderEmail, htmlspecialchars($_POST['name']));
  $mail->addAddress($_ENV['MAIL'], 'Theresa Kappus');

  $messagePlainText = $_POST['message'];

  // Read the HTML template
  $htmlTemplate = file_get_contents('message.html');

  // Replace the placeholder with the plain text message
  $htmlTemplate = str_replace('{MESSAGE}', $messagePlainText, $htmlTemplate);
  $htmlTemplate = str_replace('{NAME}', htmlspecialchars($_POST['name']), $htmlTemplate);
  $htmlTemplate = str_replace('{ABSENDER_EMAIL}', htmlspecialchars($_POST['email']), $htmlTemplate);
  $htmlTemplate = str_replace('{ABSENDER_TELEFON}', htmlspecialchars($_POST['phone']), $htmlTemplate);

  $mail->isHTML(true);                                  
  $mail->Subject = 'Nachricht von ' . htmlspecialchars($_POST['name']);
  $mail->Body = $htmlTemplate;
  $mail->AltBody = htmlspecialchars($_POST['message']);

  $mail->send();
  echo 'Message has been sent';

  // Send a confirmation email to the submitter
  $mail->clearAddresses();
  $mail->addAddress($senderEmail); // Sender's email
  $mail->Subject = 'Anfrage Schluesselmomente';
  $htmlTemplateConfirmation = file_get_contents('confirmation.html');
  $htmlTemplateConfirmation = str_replace('{MESSAGE}', htmlspecialchars($_POST['message']), $htmlTemplateConfirmation);
  $htmlTemplateConfirmation = str_replace('{NAME}', htmlspecialchars($_POST['name']), $htmlTemplateConfirmation);
  $mail->Body = $htmlTemplateConfirmation;
  $mail->AltBody = 'Vielen Dank für Ihre Nachricht. Ich werde mich so schnell wie möglich bei Ihnen melden.';

  if ($mail->send()) {
    echo 'Confirmation email sent to submitter successfully.';
  } else {
    echo 'Error sending confirmation email: ' . $mail->ErrorInfo;
  }
} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
