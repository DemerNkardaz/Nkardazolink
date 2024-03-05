/*-- --------------- INIT ---------------- --*/
import './core.js';
import './js/vars.js';
/*-- --------------- INIT ---------------- --*/
/*-- --------------- LIBS ---------------- --*/
import './libs/standalone/JQuery/jquery.js';
import './libs/standalone/JQuery/ui.js';
/*-- --------------- LIBS ---------------- --*/
/*-- --------------- AFTERINIT ---------------- --*/
import './init.js';
import './jq/jquery_core.js';
import './jq/bind_shortcuts.js';
import './jq/utils.js';
/*-- --------------- AFTERINIT ---------------- --*/

export async function HTMX_INIT() {
  await import('https://unpkg.com/htmx.org@latest/dist/htmx.min.js');
}

/*-- --------------- ENDPOINT_INIT ---------------- --*/
window.ENDPOINT_INIT = function() {
  import('./libs/standalone/Bootstrap/bootstrap.js');
  import('./libs/standalone/OverlayScrollbars.js');
  import('./libs/standalone/Howler.js');
  import('./libs/standalone/Vue/Vue-i18n.js');
  import('./libs/standalone/Vue/Vuex.js');
  import('./jq/init_settings.js');
  import('./jq/inputs.js');
}
/*-- --------------- ENDPOINT_INIT ---------------- --*/
