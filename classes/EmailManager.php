<?php


namespace App;

use PHPMailer\PHPMailer;
use PHPUnit\Runner\Exception;

require_once "../vendor/autoload.php";

class EmailManager
{
    public function sendMail($userName, $userEmail, $userPassword)
    {
        try {

            $mail = new PHPMailer\PHPMailer;
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            // change these information
            $mail->Username = 'zizoahmed980@gmail.com';
            $mail->Password = 'tempPassword';
            $mail->SMTPSecure = "ssl";
            $mail->Port = 456;

            $mail->isHTML(true);
            $mail->Subject = "Email for password recovery";
            $mail->Body =
                "
                            <i>Hello, $userName</i>
                            <p>Email: $userEmail</p>
                            This is an email for password recovery...<br>
                            your password is <mark>$userPassword</mark>
                ";

            $mail->setFrom('zizoahmed980@gmail.com', 'Online Cafe Admin');
            $mail->addAddress($userEmail, $userName);
            if (!$mail->send()) {
                return $mail->ErrorInfo;
            } else {
                return true;
            }
        } catch (\PHPMailer\PHPMailer\Exception $exception) {
            return $exception->getMessage();
        }
    }
}