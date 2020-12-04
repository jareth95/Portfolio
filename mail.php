<?php
//email settings
ini_set('SMTP','mailout.one.com');
ini_set('smtp_port','25');
//ini_set('verify_peer','false');
 
// check if fields passed are empty
if(empty($_POST['name'])   ||
   empty($_POST['email']) ||
   empty($_POST['message']) ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
echo "No arguments Provided!";
return false;
   }
 
$name = $_POST['name'];
$phone = $_POST['phone'];
$email_address = $_POST['email'];
$message = $_POST['message'];
 
// create email body and send it
$to = 'Jareth_smith@hotmail.com'; // PUT YOUR EMAIL ADDRESS HERE
$email_subject = "Website email from:  $name"; // EDIT THE EMAIL SUBJECT LINE HERE
$email_body = "You have received a new message from your website's contact form.\n\n"."Here are the details:\n\nName: $name\n\nPhone: $phone\n\nEmail: $email_address\n\nMessage:\n$message";
$headers = "From: jarethsmith@vdb.dai.mybluehost.me\n";
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
return true;
?>