<?php if (!defined('APP_INIT')) exit; ?>

<footer class="footer">
  <div class="container footer-grid">
    <div>
      <b><?= SITE_NAME ?></b>
      <p>
        3e édition – <?= EVENT_DATES ?><br>
        <?= EVENT_LOCATION ?>
      </p>
    </div>

    <div>
      <b>Contact</b>
      <p>
        2850, Ouagadougou, Burkina Faso<br>
        +226 01 64 20 20<br>
        info@vitrinerse.org
      </p>
    </div>

    <div>
      <b>Liens</b><br>
      <a href="<?= BASE_URL ?>participer.php">Participer</a><br>
      <a href="<?= BASE_URL ?>partenaires.php">Partenaires</a>
    </div>
  </div>

  <div class="container small">
    © <?= date('Y') ?> <?= SITE_NAME ?> – Tous droits réservés
  </div>
</footer>

<script src="<?= BASE_URL ?>assets/js/main.js"></script>


<div class="modal" id="formModal" aria-hidden="true">
  <div class="modal__backdrop" data-close-form></div>

  <div class="modal__dialog" role="dialog" aria-modal="true" aria-label="Inscription Vitrine RSE">
    <div class="modal__header">
      <div class="modal__title">
        <b>Inscription – 3e édition</b>
        <div class="modal__subtitle"><?= EVENT_DATES ?> • <?= EVENT_LOCATION ?></div>
      </div>
      <button class="modal__close" type="button" aria-label="Fermer" data-close-form>✕</button>
    </div>

    <div class="modal__body">
      <div class="modal__loading" id="formLoading">Chargement du formulaire…</div>

      <iframe id="formFrame" class="modal__iframe" src="" title="Formulaire d'inscription"
              frameborder="0" loading="lazy"></iframe>

      <div class="modal__fallback" id="formFallback" hidden>
        <p><b>Le formulaire ne peut pas s’afficher ici.</b></p>
        <p class="small">Ouvrez-le dans un nouvel onglet :</p>
        <a class="btn btn-primary" id="fallbackLink" href="#" target="_blank" rel="noopener">
          Ouvrir le formulaire
        </a>
      </div>
    </div>
  </div>
</div>


</body>
</html>
