<?php
define('APP_INIT', true);
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/includes/head.php';
require_once __DIR__ . '/includes/header.php';
?>
<section class="hero-pro">
  <div class="hero-pro__media">
    <img src="<?= BASE_URL ?>assets/img/hero-vitrine-rse.jpg" alt="Vitrine RSE – 3e édition 2026">
  </div>

  <div class="hero-pro__overlay"></div>

  <div class="hero-pro__wrap container">
    <div class="hero-pro__grid">
      <!-- Colonne texte -->
      <div class="hero-pro__content">
        <div class="hero-pro__badge">3e édition • 2026</div>

        <h1>Économie circulaire & Responsabilité Sociale des Entreprises</h1>

        

        <div class="hero-pro__actions">
          <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">
            Inscription – 3e édition
          </a>

          <button class="btn btn-ghost hero-pro__play" type="button"
                  data-open-video="https://www.youtube.com/embed/K6dSzm2sR90">
            Voir la vidéo
          </button>
        </div>
      </div>

      <!-- Carte infos -->
      <aside class="hero-pro__info card">
        <div class="info-row">
          <div class="info-ico">📅</div>
          <div>
            <div class="info-label">Dates</div>
            <div class="info-value"><?= EVENT_DATES ?></div>
          </div>
        </div>

        <div class="info-row">
          <div class="info-ico">📍</div>
          <div>
            <div class="info-label">Lieu</div>
            <div class="info-value"><?= EVENT_LOCATION ?></div>
            <div class="info-sub">Ouagadougou</div>
          </div>
        </div>

        <div class="info-row">
          <div class="info-ico">☎️</div>
          <div>
            <div class="info-label">Contact</div>
            <div class="info-value"><a href="tel:+22601642020">+226 01 64 20 20</a></div>
            <div class="info-sub"><a href="mailto:info@vitrinerse.org">info@vitrinerse.org</a></div>
          </div>
        </div>

        <div class="info-cta">
          <button class="btn btn-primary" type="button" data-open-form data-form-embed="<?= htmlspecialchars(GOOGLE_FORM_EMBED_URL, ENT_QUOTES) ?>"  data-form-url="<?= htmlspecialchars(GOOGLE_FORM_URL, ENT_QUOTES) ?>" >
Je m’inscris maintenant
</button>
          <a class="btn btn-ghost" href="https://forms.gle/t5KBHNqRCxaYu3mCA" target="_blank">Participer / Exposer</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<!-- Modal Vidéo -->
<div class="video-modal" id="videoModal" aria-hidden="true">
  <div class="video-modal__backdrop" data-close-video></div>

  <div class="video-modal__dialog" role="dialog" aria-modal="true" aria-label="Vidéo Vitrine RSE">
    <button class="video-modal__close" type="button" aria-label="Fermer" data-close-video>✕</button>
    <div class="video-modal__frame">
      <iframe id="videoFrame" src="" title="Vidéo Vitrine RSE" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
    </div>
  </div>
</div>


<main>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <div class="hero-grid">
        <div class="card hero-card">
          <div class="badge">3e édition • 2026</div>
          <h1>Économie circulaire & Responsabilité Sociale des Entreprises</h1>

          <p class="small" style="margin-top:8px;color:var(--muted);">
            Vitrine RSE réunit entreprises, institutions, ONG, startups et porteurs de projets
            pour accélérer des solutions responsables et créer des partenariats concrets.
          </p>

          <div class="meta" style="margin-top:12px;">
            <span>📅 <?= EVENT_DATES ?></span>
            <span>📍 <?= EVENT_LOCATION ?></span>
            <span>📌 Ouagadougou • Ouaga 2000</span>
          </div>

          <div class="hero-actions">
            <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">
              Inscription – 3e édition
            </a>
            <a class="btn btn-ghost" href="#">Participer / Exposer / Sponsoriser</a>
          </div>

          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
            <span class="pill">♻️ Économie circulaire</span>
            <span class="pill">🤝 Partenariats</span>
            <span class="pill">🌍 Impact social & environnemental</span>
            <span class="pill">💡 Innovation</span>
          </div>
        </div>

        <aside class="card hero-aside">
          <h3>Infos pratiques</h3>
          <ul class="list">
            <li><b>Dates :</b> <?= EVENT_DATES ?></li>
            <li><b>Lieu :</b> <?= EVENT_LOCATION ?></li>
            <li><b>Contact :</b> +226 01 64 20 20</li>
            <li><b>Email :</b> info@vitrinerse.org</li>
          </ul>
          <hr style="border:none;border-top:1px solid var(--line);margin:14px 0;">
          <h3>Vous êtes…</h3>
          <ul class="list">
            <li>Entreprise / Institution</li>
            <li>ONG / Association</li>
            <li>Startup / Entrepreneur</li>
            <li>Média / Étudiant</li>
          </ul>

          <div style="margin-top:12px;">
            <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">
              Je m’inscris
            </a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- POURQUOI PARTICIPER -->
  <section class="section">
    <div class="container">
      <div class="section-title">
        <div>
          <h2>Pourquoi participer ?</h2>
          <p>Un événement orienté solutions, visibilité et collaborations.</p>
        </div>
      </div>

      <div class="grid-3">
        <div class="card feature">
          <h4>Solutions concrètes</h4>
          <p>Découvrir des initiatives d’économie circulaire (réduction, réutilisation, recyclage, valorisation) et des pratiques RSE applicables.</p>
        </div>
        <div class="card feature">
          <h4>Réseautage utile</h4>
          <p>Rencontrer des décideurs, experts, partenaires techniques et financiers, et créer des collaborations durables.</p>
        </div>
        <div class="card feature">
          <h4>Visibilité & impact</h4>
          <p>Valoriser vos engagements et vos projets (stands, prises de parole, contenus, retombées médiatiques).</p>
        </div>
      </div>
    </div>
  </section>

<!-- AFFICHES / PROGRAMME -->
<section class="section affiches-section">
  <div class="container">
    <div class="section-title">
      <div>
        <h2>Programme & temps forts</h2>
        <p>Découvrez les activités clés de la 3e édition de la Vitrine RSE.</p>
      </div>
    </div>

    <div class="affiches-grid">
      <div class="affiche-item">
        <img src="assets/img/affiches/visuel-officiel.jpg" alt="Prix Vitrine RSE 2026">
      </div>

      <div class="affiche-item">
        <img src="assets/img/affiches/prix-vitrine-rse.jpg" alt="Inscription Vitrine RSE">
      </div>

      <div class="affiche-item">
        <img src="assets/img/affiches/inscription-participation-vitrine-rse.jpg" alt="Panel 1 Vitrine RSE">
      </div>

      <div class="affiche-item">
        <img src="assets/img/affiches/panel-1.jpg" alt="Panel 1 Vitrine RSE">
      </div>
      <div class="affiche-item">
        <img src="assets/img/affiches/panel-2.jpg" alt="Panel 2 Vitrine RSE">
      </div>
    </div>
  </div>
</section>  

<!-- VIDEO + ACTUALITÉS -->
<section class="section">
  <div class="container">
    <div class="section-title">
      <div>
        <h2>Découvrir la Vitrine RSE en image</h2>
       
      </div>
      <a class="btn btn-toutvoir" href="https://www.youtube.com/watch?v=rnMKunRKAzE&list=PLSmOZRlbQ6z8Wcm2uUtuZGLcQd3HVFbRr&pp=0gcJCbYEOCosWNin" target="_blank">Voir toutes les vidéos</a>
    </div>

    <div class="grid-2">
      <!-- Zone vidéo -->
      <div class="card card-pad">
       
        

        <div class="video-embed">
          <iframe
            src="https://www.youtube.com/embed/pgaYKfbbvQ8"
            title="Vitrine RSE – Vidéo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"></iframe>
        </div>

        <p class="small" style="color:var(--muted);margin-top:10px;">
          Vous souhaitez publier une vidéo officielle ? Envoyez-nous le lien à <b>info@vitrinerse.org</b>.
        </p>
      </div>

      <!-- Zone actualités -->
      <div class="card card-pad">
        <div class="video-embed">
          <iframe
            src="https://www.youtube.com/embed/hj_reK0QRC4"
            title="Vitrine RSE – Vidéo"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"></iframe>
        </div>

        
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-title">
      <div>
        <h2>Actualités</h2>
        <p>Les dernières informations sur Vitrine RSE 2026.</p>
      </div>
      <a class="btn btn-toutvoir" href="https://web.facebook.com/profile.php?id=61555531560204" target="_blank">Voir toutes les actualités</a>
    </div>

    <div class="news-layout">
      <!-- FEATURED (grand article) -->
      <article class="news-feature card">
        <div class="news-feature-media">
          <img src="assets/img/news/20260520-le-pds-de-la-commune-de-ouagadougou-confirme-sa-presence-a-vitrine-rse-2026.jpg" alt="Actualité Vitrine RSE">
        </div>

        <div class="news-feature-body">
          <div class="news-date">15 mai 2026</div>
          <h3 class="news-title">Le PDS de la commune de Ouagadougou confirme sa présence à Vitrine RSE 2026 !</h3>
          <p class="news-excerpt">
           Le PDS a affirmé son entière disponibilité ainsi que celle de ses services techniques pour accompagner l’édition 2026 de cette importante activité.
          </p>
          <div class="news-actions">
            <a class="btn btn-ghost" href="https://web.facebook.com/share/p/175b3tqmKj/" target="_blank">Lire l’article</a>
          </div>
          
        </div>
      </article>

      <!-- LIST (colonne droite) -->
      <aside class="news-side card">
        <div class="news-side-inner">
          <a class="news-item" href="https://web.facebook.com/share/p/18tz3cpDLr/" target="_blank">
            <div class="news-thumb">
              <img src="assets/img/news/20260506-vitrine-rse-et-ansseat.jpg" alt="Actualité 1">
            </div>
            <div class="news-meta">
              <div class="news-item-title">Vitrine RSE et Ansseat - Ex Laboratoire National De Sante Publique - Burkina Faso renforcent leur partenariat</div>
              <div class="news-item-date">06 mai 2026</div>
            </div>
          </a>

          <a class="news-item" href="https://web.facebook.com/share/p/18m9PBW2bx/" target="_blank">
            <div class="news-thumb">
              <img src="assets/img/news/20260414-association-monde-rural-et-vitrine-rse.jpg" alt="Actualité 2">
            </div>
            <div class="news-meta">
              <div class="news-item-title">Mobilisation des acteurs pour Vitrine RSE 2026</div>
              <div class="news-item-date">14 mars 2026</div>
            </div>
          </a>

          <a class="news-item" href="https://web.facebook.com/share/p/1GuuqvxphM/" target="_blank">
            <div class="news-thumb">
              <img src="assets/img/news/20260303-rencontre-strategique-avec-faso-zom-cap-sur-vitrine-rse-3.jpg" alt="Actualité 3">
            </div>
            <div class="news-meta">
              <div class="news-item-title">Rencontre stratégique avec FASO ZOM - cap sur vitrine rse 3</div>
              <div class="news-item-date">03 mars 2026</div>
            </div>
          </a>
        </div>
      </aside>
    </div>

  </div>
</section>


  <!-- MODALITÉS DE PARTICIPATION -->
  <section class="section">
    <div class="container">
      <div class="section-title">
        <div>
          <h2>Participer à la Vitrine RSE</h2>
          <p>Choisissez votre formule : participant, exposant ou partenaire.</p>
        </div>
      </div>

      <div class="grid-3">
        <div class="card feature">
          <h4>👥 Participants</h4>
          <p>Accès aux conférences, panels, ateliers et networking.</p>
          <div style="margin-top:10px;">
            <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">S’inscrire</a>
          </div>
        </div>

        <div class="card feature">
          <h4>🧩 Exposants (stands)</h4>
          <p>Présentez vos solutions et projets (économie circulaire, RSE, innovations).</p>
          <div style="margin-top:10px;">
            <a class="btn btn-ghost" href="participer.php">Demander un stand</a>
          </div>
        </div>

        <div class="card feature">
          <h4>🤝 Partenaires / Sponsors</h4>
          <p>Associez votre marque à un événement d’impact (visibilité, prises de parole, stands).</p>
          <div style="margin-top:10px;">
            <a class="btn btn-ghost" href="partenaires.php">Devenir partenaire</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CHIFFRES / IMPACT -->
  <section class="section">
    <div class="container">
      <div class="section-title">
        <div>
          <h2>Chiffres & repères</h2>
          <p>Quelques repères sur l’événement (à affiner avec vos données réelles).</p>
        </div>
      </div>

      <div class="kpis">
        <div class="card kpi"><b>2</b><span>Éditions réalisées</span></div>
        <div class="card kpi"><b>2</b><span>Jours d’activités</span></div>
        <div class="card kpi"><b>Azalaï Hôtel Ouagadougou</b><span>Lieu</span></div>
        <div class="card kpi"><b>2026</b><span>3e édition</span></div>
      </div>
    </div>
  </section>

  <!-- PARTENAIRES (placeholder) -->
<section class="section">
  <div class="container">
    <div class="section-title">
      <div>
        <h2>Partenaires</h2>
        <p>Ils soutiennent la Vitrine RSE</p>
      </div>
      <a class="btn btn-toutvoir" href="partenaires.php">Voir tous les partenaires</a>
    </div>

    <div class="partners-slider">
      <div class="partners-track">
        <!-- Logos (dupliqués pour effet infini) -->
        <div class="partner-logo"><img src="assets/img/partenaires/sapiens.jpg" alt="Partenaire 5"></div>

        <!-- DUPLICATION (obligatoire pour le scroll infini) -->
        <div class="partner-logo"><img src="assets/img/partenaires/ansseat.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/association.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/audeu.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/cegeci.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/circulaire.gif" alt=""></div>

        <!-- DUPLICATION (obligatoire pour le scroll infini) -->
        <div class="partner-logo"><img src="assets/img/partenaires/coca-cola.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/dgi.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/dgper.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/endeavour.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/fasoecologie.gif" alt=""></div>

        <!-- DUPLICATION (obligatoire pour le scroll infini) -->
        <div class="partner-logo"><img src="assets/img/partenaires/fasom-zoom.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/irsat.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/itie-bf.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/maison-de-l-entreprise.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/miensai.gif" alt=""></div>

        <!-- DUPLICATION (obligatoire pour le scroll infini) -->
        <div class="partner-logo"><img src="assets/img/partenaires/neemba.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/safase.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/sbfa.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/sibalub.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/sn-citec.gif" alt=""></div>

        <!-- DUPLICATION (obligatoire pour le scroll infini) -->
        <div class="partner-logo"><img src="assets/img/partenaires/sodibo-burkina.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/sonatur.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/soud-saka.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/sp-contenu-local.gif" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/waasa-edition.gif" alt=""></div>

      </div>
    </div>
  </div>
</section>


  <!-- CTA FINAL -->
  <section class="section">
    <div class="container">
      <div class="card cta-wide">
        <div>
          <h2 style="margin:0 0 6px;">Inscrivez-vous à la 3e édition</h2>
          <p class="small" style="margin:0;color:var(--muted);">
            <?= EVENT_DATES ?> • <?= EVENT_LOCATION ?> — Rejoignez l’écosystème RSE et économie circulaire.
          </p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">Inscription – 3e édition</a>
          <a class="btn btn-ghost" href="contact.php">Nous contacter</a>
        </div>
      </div>
    </div>
  </section>

</main>


<?php require_once __DIR__ . '/includes/footer.php'; ?>
