<?php

// Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';

// Use the Mailgun class from mailgun/mailgun-php v4.2
use Mailgun\Mailgun;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Instantiate the client.
//$mg = Mailgun::create(getenv('API_KEY') ?: 'API_KEY');
// When you have an EU-domain, you must specify the endpoint:
//$mg = Mailgun::create(getenv('MAILGUN_API_KEY') ?: 'API_KEY', 'https://api.eu.mailgun.net');
$mg = Mailgun::create($_ENV['MAILGUN_API_KEY'] ?: 'API_KEY');

// Compose and send your message.
$result = $mg->messages()->send(
	'sandboxf643be1c46e140a9aee98e3851a91637.mailgun.org',
	[
		'from' => 'Mailgun Sandbox <postmaster@sandboxf643be1c46e140a9aee98e3851a91637.mailgun.org>',
		'to' => 'Jakob Lingel <beratung@schluesselmomente-freiburg.de>',
		'subject' => 'Hello Jakob Lingel',
		'text' => 'Congratulations Jakob Lingel, you just sent an email with Mailgun! You are truly awesome!'
	]
);

print_r($result->getMessage());

?>
