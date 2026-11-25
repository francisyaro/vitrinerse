<?php
// Empêche l’accès direct
if (!defined('APP_INIT')) {
    define('APP_INIT', true);
}

// Base URL (adapter si sous-dossier)
$base = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
define('BASE_URL', ($base === '' ? '/' : $base . '/'));


// Infos globales
define('SITE_NAME', 'Vitrine RSE');
define('EVENT_DATES', '04 – 05 juin 2026');
define('EVENT_LOCATION', 'Azalaï Hôtel Ouagadougou');

// Google Form
define('GOOGLE_FORM_URL', 'https://forms.gle/t5KBHNqRCxaYu3mCA');
define('GOOGLE_FORM_EMBED_URL', 'https://docs.google.com/forms/d/e/1FAIpQLSfl4qSo-WkbP3rd6zboOiL4vgckzwsCBUuGS2IdLyvUU0NZrw/viewform?embedded=true');


