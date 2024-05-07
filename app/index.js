/*-- --------------- INIT ---------------- --*/
import './core.js';
import './js/vars.js';
/*-- --------------- INIT ---------------- --*/
/*-- --------------- LIBS ---------------- --*/


/*-- --------------- LIBS ---------------- --*/
/*-- --------------- AFTERINIT ---------------- --*/
import './rules/rules.js';
import './howler_init.js';
import './jq/selectors.js';
import './jq/skins.js';
import './jq/ui_diacrit.js';
import './jq/ui_tags.js';
import './jq/ui_components.js';
import './init.js';
import './jq/jquery_core.js';
import './jq/bind_shortcuts.js';
import './jq/tooltips.js';
import './jq/utils.js';
import './jq/localisation.js';
import './jq/genpage.js';
/*-- --------------- AFTERINIT ---------------- --*/

//export async function HTMX_INIT() {
//  await import('https://unpkg.com/htmx.org@latest/dist/htmx.min.js');
//}

/*-- --------------- ENDPOINT_INIT ---------------- --*/
window.ENDPOINT_INIT = function() {
  import('./libs/standalone/OverlayScrollbars.js');
  import('./jq/inputs.js');
  import('./jq/init_settings.js');
}
/*-- --------------- ENDPOINT_INIT ---------------- --*/
