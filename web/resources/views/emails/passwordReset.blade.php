<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Password Reset</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #F6F6F6;
    }
    .content {
      width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
    }
    .text-center {
      text-align: center;
    }
    a {
      color: #ec4899;
      text-decoration: none;
      padding: 10px 20px;
    }
  </style>
</head>
  <div class="content">
    <img src="https://your-website.com/images/welcome.png" alt="Welcome">
    <p>We received a password reset request for your account. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, please click the button below:</p>
    <p>If the link doesn't work, copy and paste the following URL into your browser:</p>
    <p><a href="{{url('')}}/email/verification/{{ $token }}"</p>
    <p>If you have any questions or problems, don't hesitate to contact us at support@your-website.com.</p>
    <p>Sincerely,</p>
    <p>The Your Website Support Team</p>
  </div>
</html>
