<?php
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
$query_string = $_POST['query_string'];
$consent_sms = strip_tags(htmlspecialchars($_POST['consent_sms']));
$consent_mail = strip_tags(htmlspecialchars($_POST['consent_mail']));
   
// Create the email and send the message
$to = 'studiomanagerpol003@orangetheoryfitness.pl'; // Add your email address in between the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Wiadomość z OTF LP Klif HEALTHCHECK:  $name";
$email_body = "Nowa wiadomość z landingu Klif HEALTHCHECK.\n\n"."Dane użytkownika:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@otfpolska.pl\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
// mail($to,$email_subject,$email_body,$headers);

$lp2leader = array(
   'studio'=>514885,
   'full_name'=>$name,
   'email'=>$email_address,
   'phone'=>$phone,
   'notes'=>$message,
   'query_string'=>$query_string,
   'consent_sms'=>$consent_sms,
   'consent_mail'=>$consent_mail
);

include '../../../inc.php';
sendMail($to, $email_subject, $email_body, $fromName = 'OTF Lead Healthcheck Klif', $fromAddress='sys@tuf.pl', $attachementPath = '');
return true;         
?>