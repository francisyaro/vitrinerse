<?php if (!defined('APP_INIT')) exit; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= SITE_NAME ?> – Économie circulaire & RSE</title>

  <meta name="description" content="3e édition de la Vitrine RSE – <?= EVENT_DATES ?> – <?= EVENT_LOCATION ?>">

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="<?= BASE_URL ?>assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="<?= BASE_URL ?>assets/favicon/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="<?= BASE_URL ?>assets/favicon/apple-touch-icon.png">
  <link rel="manifest" href="<?= BASE_URL ?>assets/favicon/site.webmanifest">

  <link rel="stylesheet" href="<?= BASE_URL ?>assets/css/style.css">
</head>
<body data-form-url="<?= htmlspecialchars(GOOGLE_FORM_URL, ENT_QUOTES) ?>"
      data-form-embed-url="<?= htmlspecialchars(GOOGLE_FORM_EMBED_URL, ENT_QUOTES) ?>">

