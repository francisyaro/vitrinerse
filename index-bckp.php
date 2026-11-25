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

        <p class="hero-pro__lead">
          Deux jours pour découvrir des solutions, rencontrer des acteurs engagés et construire
          des partenariats à impact à Ouagadougou.
        </p>

        <div class="hero-pro__actions">
          <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">
            Inscription – 3e édition
          </a>

          <button class="btn btn-ghost hero-pro__play" type="button"
                  data-open-video="https://www.youtube.com/watch?v=K6dSzm2sR90">
            ▶ Voir la vidéo
          </button>
        </div>

        <div class="hero-pro__chips">
          <span class="chip">♻️ Économie circulaire</span>
          <span class="chip">🏢 Gouvernance & RSE</span>
          <span class="chip">🌍 Impact & climat</span>
          <span class="chip">🤝 Partenariats</span>
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
            <div class="info-sub">Ouaga 2000 • Ouagadougou</div>
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
          <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">
            Je m’inscris maintenant
          </a>
          <a class="btn btn-ghost" href="<?= BASE_URL ?>participer.php">Participer / Exposer</a>
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
            La Vitrine RSE réunit entreprises, institutions, ONG, startups et porteurs de projets
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
            <a class="btn btn-ghost" href="participer.php">Participer / Exposer / Sponsoriser</a>
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

  <!-- AXES / THEMES -->
  <section class="section">
    <div class="container">
      <div class="section-title">
        <div>
          <h2>Axes thématiques 2026</h2>
          <p>Des sujets prioritaires pour les entreprises et les territoires.</p>
        </div>
      </div>

      <div class="grid-2">
        <div class="card card-pad">
          <h3>♻️ Économie circulaire</h3>
          <ul class="list">
            <li>Éco-conception & réduction des déchets</li>
            <li>Tri, collecte, recyclage et valorisation</li>
            <li>Réemploi, réparation, seconde vie</li>
            <li>Chaînes d’approvisionnement responsables</li>
          </ul>
        </div>

        <div class="card card-pad">
          <h3>🏢 RSE & performance</h3>
          <ul class="list">
            <li>Gouvernance & transparence</li>
            <li>Impact social : inclusion, emploi, sécurité</li>
            <li>Climat, énergie, eau et biodiversité</li>
            <li>Mesure d’impact & reporting</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- PROGRAMME (APERÇU) -->
  <section class="section">
    <div class="container">
      <div class="section-title">
        <div>
          <h2>Aperçu du programme</h2>
          <p>Un format dynamique sur 2 jours.</p>
        </div>
      </div>

      <div class="grid-2">
        <div class="card card-pad">
          <h3>Jour 1 — Conférences & panels</h3>
          <div class="timeline">
            <div class="step"><span class="dot"></span><div><b>Ouverture officielle</b><span class="small" style="color:var(--muted)">Allocutions & présentation du thème</span></div></div>
            <div class="step"><span class="dot"></span><div><b>Panels RSE</b><span class="small" style="color:var(--muted)">Bonnes pratiques & retours d’expérience</span></div></div>
            <div class="step"><span class="dot"></span><div><b>Networking</b><span class="small" style="color:var(--muted)">Rencontres B2B/B2G/B2NGO</span></div></div>
          </div>
        </div>

        <div class="card card-pad">
          <h3>Jour 2 — Ateliers & solutions</h3>
          <div class="timeline">
            <div class="step"><span class="dot"></span><div><b>Ateliers pratiques</b><span class="small" style="color:var(--muted)">Méthodes, outils et mise en œuvre</span></div></div>
            <div class="step"><span class="dot"></span><div><b>Exposition / stands</b><span class="small" style="color:var(--muted)">Démonstrations & rencontres</span></div></div>
            <div class="step"><span class="dot"></span><div><b>Clôture & perspectives</b><span class="small" style="color:var(--muted)">Synthèse & annonces</span></div></div>
          </div>
        </div>
      </div>

      <p class="small" style="margin-top:10px;color:var(--muted);">
        (Le programme détaillé et les intervenants pourront être ajoutés dès validation.)
      </p>
    </div>
  </section>

<!-- VIDEO + ACTUALITÉS -->
<section class="section">
  <div class="container">
    <div class="section-title">
      <div>
        <h2>Découvrir la Vitrine RSE</h2>
        <p>Vidéo de présentation & dernières actualités.</p>
      </div>
    </div>

    <div class="grid-2">
      <!-- Zone vidéo -->
      <div class="card card-pad">
        <h3>🎥 Vidéo</h3>
        <p class="small" style="color:var(--muted);margin-top:-6px;">
          Présentation de l’événement, des enjeux et des opportunités.
        </p>

        <div class="video-embed">
          <iframe
            src="VIDEO_URL"
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
        <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <div>
            <h3>📰 Actualités</h3>
            <p class="small" style="color:var(--muted);margin-top:-6px;">
              Informations importantes sur l’édition 2026.
            </p>
          </div>
          <a class="btn btn-ghost" href="blog.php">Voir toutes</a>
        </div>

        <div class="news-list">
          <article class="news-item">
            <div class="news-date">Janvier 2026</div>
            <h4>Ouverture des inscriptions – 3e édition</h4>
            <p>Inscrivez-vous dès maintenant pour réserver votre place aux conférences, panels et ateliers.</p>
            <a class="news-link" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">S’inscrire</a>
          </article>

          <article class="news-item">
            <div class="news-date">Février 2026</div>
            <h4>Appel à exposants : stands & démonstrations</h4>
            <p>Entreprises et organisations : présentez vos solutions d’économie circulaire et vos engagements RSE.</p>
            <a class="news-link" href="participer.php">Participer en tant qu’exposant</a>
          </article>

          <article class="news-item">
            <div class="news-date">Mars 2026</div>
            <h4>Devenir partenaire / sponsor</h4>
            <p>Associez votre marque à un événement à fort impact et bénéficiez d’une visibilité ciblée.</p>
            <a class="news-link" href="partenaires.php">Voir les options</a>
          </article>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-title">
      <div>
        <h2>Actualités</h2>
        <p>Les dernières informations sur la Vitrine RSE 2026.</p>
      </div>
      <a class="btn btn-ghost" href="blog.php">Voir toutes</a>
    </div>

    <div class="news-layout">
      <!-- FEATURED (grand article) -->
      <article class="news-feature card">
        <div class="news-feature-media">
          <img src="assets/img/news/grappe-huilerie-bobo-dioulasso.jpg" alt="Actualité Vitrine RSE">
        </div>

        <div class="news-feature-body">
          <div class="news-date">30 déc. 2025</div>
          <h3 class="news-title">Vitrine RSE et Grappe Huilerie de Bobo-Dioulasso</h3>
          <p class="news-excerpt">
            Dans le cadre des préparatifs de la 3ᵉ édition de la Vitrine RSE (4–5 juin 2026), le Commissariat Général a échangé, le 8 novembre dernier, avec les membres de la Grappe Huilerie de Bobo, au siège de la faîtière.
          </p>

          <div class="news-actions">
            <a class="btn btn-primary" href="<?= GOOGLE_FORM_URL ?>" target="_blank" rel="noopener">
              S’inscrire
            </a>
            <a class="btn btn-ghost" href="blog.php">Lire l’article</a>
          </div>
        </div>
      </article>

      <!-- LIST (colonne droite) -->
      <aside class="news-side card">
        <div class="news-side-inner">
          <a class="news-item" href="blog.php">
            <div class="news-thumb">
              <img src="assets/img/news/faso-ecologie.jpg" alt="Actualité 1">
            </div>
            <div class="news-meta">
              <div class="news-item-title">FASO ÉCOLOGIE à Vitrine RSE 2026</div>
              <div class="news-item-date">02 déc. 2025</div>
            </div>
          </a>

          <a class="news-item" href="blog.php">
            <div class="news-thumb">
              <img src="assets/img/news/ksc-groupe.jpg" alt="Actualité 2">
            </div>
            <div class="news-meta">
              <div class="news-item-title">KSC Groupe à la 3ᵉ é𝐝𝐢𝐭𝐢𝐨𝐧 𝐝𝐞 𝐕𝐢𝐭𝐫𝐢𝐧𝐞 𝐑𝐒𝐄</div>
              <div class="news-item-date">09 nov. 2025</div>
            </div>
          </a>

          <a class="news-item" href="blog.php">
            <div class="news-thumb">
              <img src="assets/img/news/iamgold-essakane-vitrinerse.jpg" alt="Actualité 3">
            </div>
            <div class="news-meta">
              <div class="news-item-title">Remise officielle du Prix Spécial Vitrine RSE 2025!</div>
              <div class="news-item-date">21 oct. 2025</div>
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
        <div class="card kpi"><b>Ouaga 2000</b><span>Lieu</span></div>
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
      <a class="btn btn-ghost" href="partenaires.php">Voir tous</a>
    </div>

    <div class="partners-slider">
      <div class="partners-track">
        <!-- Logos (dupliqués pour effet infini) -->
        <div class="partner-logo"><img src="assets/img/partenaires/iam-gold-essakane.jpg" alt="Partenaire 1"></div>
        <div class="partner-logo"><img src="assets/img/partenaires/moov-africa.jpg" alt="Partenaire 2"></div>
        <div class="partner-logo"><img src="assets/img/partenaires/nestle.jpg" alt="Partenaire 3"></div>
        <div class="partner-logo"><img src="assets/img/partenaires/onea.jpg" alt="Partenaire 4"></div>
        <div class="partner-logo"><img src="assets/img/partenaires/sapiens.jpg" alt="Partenaire 5"></div>

        <!-- DUPLICATION (obligatoire pour le scroll infini) -->
        <div class="partner-logo"><img src="assets/img/partenaires/uba.jpg" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/cdi-bf.jpg" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/boa.jpg" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/aneve.jpg" alt=""></div>
        <div class="partner-logo"><img src="assets/img/partenaires/rcpb.jpg" alt=""></div>
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
