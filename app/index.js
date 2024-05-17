//? ------------------------------- CORE INITIALISATION -------------------------------
import './core.js';
import './script/vars.js';
import './script/utils.js';
import './script/reporequests.js';

//? ------------------------------- MAIN INITIALISATION -------------------------------
import './component/preloader/preloader.js';
import './rules/rules.js';
import './script/selectors.js';
import './script/skins.js';
import './script/ui_tags.js';
import './script/ui_components.js';
import './component/components.index.js';
//import './script/item_prop.js';
import './init.js';

import './script/bind_events.js';
import './script/localisation.js';
import './script/page_generation.js';
//import './jq/tooltips.js';
import './script/howler_init.js';

//? ------------------------------- ENDPOINT INITIALISATION -------------------------------
window.addEventListener('DOMContentLoaded', async () => { await import('./script/init_settings.js') });
