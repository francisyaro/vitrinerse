<?php if (!defined('APP_INIT')) exit; ?>

<header>
  <div class="topbar">
    <div class="container row">
      <div><?= EVENT_DATES ?> • <?= EVENT_LOCATION ?></div>
      <div>
        <a href="tel:+22601642020">+226 01 64 20 20</a> •
        <a href="mailto:info@vitrinerse.org">info@vitrinerse.org</a>
      </div>
    </div>
  </div>

  <div class="container nav">
    

    <a class="brand" href="<?= BASE_URL ?>">
	  <img
	    src="<?= BASE_URL ?>assets/img/logo-vitrine-rse.jpg"
	    alt="Vitrine RSE – Vitrine de la Responsabilité Sociale des Entreprises"
	    class="site-logo"
	  >
	  <span class="site-name"><?= SITE_NAME ?></span>
	</a>


    <nav class="navlinks">
      <a href="<?= BASE_URL ?>">Accueil</a>
      <a href="<?= BASE_URL ?>evenement.php">L’évènement</a>
      <a href="<?= BASE_URL ?>participer.php">Participer</a>

      <div class="dropdown">
        <a href="<?= BASE_URL ?>editions.php">Editions ▾</a>
        <div class="dropdown-menu">
          <a href="<?= BASE_URL ?>edition-1.php">1re édition</a>
          <a href="<?= BASE_URL ?>edition-2.php">2e édition</a>
        </div>
      </div>

      <a href="<?= BASE_URL ?>blog.php">Blog</a>
      <a href="<?= BASE_URL ?>partenaires.php">Partenaires</a>
      <a href="<?= BASE_URL ?>contact.php">Contact</a>
    </nav>

    <div class="cta">
      <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank">
        Inscription – 3e édition
      </a>
    </div>
  </div>
</header>
