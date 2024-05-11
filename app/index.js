//? ------------------------------- CORE INITIALISATION -------------------------------
import './core.js';
import './jq/jquery_core.js';
import './js/vars.js';
import './jq/utils.js';
import './jq/reporequests.js';

//? ------------------------------- MAIN INITIALISATION -------------------------------
import './rules/rules.js';
import './jq/selectors.js';
import './jq/skins.js';
import './jq/ui_tags.js';
import './jq/ui_components.js';
import './init.js';

import './jq/bind_shortcuts.js';
import './jq/localisation.js';
import './jq/genpage.js';
import './jq/tooltips.js';
import './howler_init.js';

//? ------------------------------- ENDPOINT INITIALISATION -------------------------------
window.addEventListener('DOMContentLoaded', async () => {
  await import('./libs/standalone/OverlayScrollbars.js');
  await import('./jq/inputs.js');
  await import('./jq/init_settings.js')
});
