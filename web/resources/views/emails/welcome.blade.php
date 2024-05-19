<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            color: #000000;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
    </style>
</head>
    <div class="container">
        <img src="{{ asset('images/welcome.png') }}" alt="Welcome" style="width: 100%; height: auto; border: 0;">
        <p>Bienvenue sur {{$siteName}} ! Nous sommes ravis de vous compter parmi nous. Sur notre plateforme, vous pouvez rechercher et réserver des sessions dans divers commerces de beauté tels que des salons de coiffure, instituts de beauté et plus encore.</p>
        <p>Pour commencer, merci de confirmer votre adresse e-mail en cliquant sur le lien ci-dessous. Cela nous aidera à maintenir le contact avec vous et à vous envoyer des mises à jour importantes et des informations.</p>
        <a href="{{ route('user.register.mail.confirm', ['hash' => $userMailToken]) }}">Confirmez votre e-mail</a>
        <p>Une fois votre e-mail confirmé, vous pourrez profiter pleinement des services de {{$siteName}}. N’hésitez pas à explorer notre site et à réserver votre première session !</p>
        <p>Si vous avez des questions ou si vous avez besoin d'aide, n'hésitez pas à contacter notre équipe de support à {{$appMail}}.</p>
        <p>Merci de nous avoir rejoints et nous avons hâte de vous voir sur le site !</p>
    </div>
</html>
