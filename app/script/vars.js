//window.languageJSON = {};
//window.licenseJSON = {};
//window.kamonItem = {};

window.nkPreferences = {
  banner: {
    asanoha: { url: '../../../resources/svg/pattern_asanoha_90deg.svg', name: 'Asa-no ha', },
    kanprovince: { url: '../../../resources/png/china/jiangu_full_bg_golden v2_thumb512.avif', name: 'The Kan Province', }
  }
}

nk.url = {
  mode: (parseUrlParameter('mode') ? parseUrlParameter('mode') : null),
  select: (parseUrlParameter('select') ? parseUrlParameter('select') : null),
  lang: (parseUrlParameter('lang') ? parseUrlParameter('lang') : null)
}
nk.langs = {};
nk.langs.list = {
  ru: { emoji: '🇷🇺', name: 'Русский' },
  en: { emoji: '🇬🇧', name: 'English' },
  ja: { emoji: '🇯🇵', name: '日本語' },
  zh: { emoji: '🇨🇳', name: '简体中文' },
  ko: { emoji: '🇰🇷', name: '한국어' },
  vi: { emoji: '🇻🇳', name: 'Tiếng Việt' },
  mo: { emoji: '🇲🇩', name: 'Молдовеняскэ' },
  ro: { emoji: '🇷🇴', name: 'Română' },
};
nk.langs.supported = Object.keys(nk.langs.list);
const navigatorLanguae = navigator.language.includes('-') ? navigator.language.split('-')[0].toLowerCase() : navigator.language.toLowerCase();
window.navigatorLanguage = nk.langs.supported.includes(navigatorLanguae) ? navigatorLanguae : 'en';

window.availableModes = ['kamon', 'banners', 'clans', 'cv', 'landing', 'tree', 'license', 'pattern', 'reader'];
window.availableSelects = ['2d', '3d'];
nk.skins.themes = {
  azumatsuyu:     {name: 'Azumatsuyu',        url: 'azumatsuyu',    emoji: '🌸'},
  byakujou:       {name: 'Byakujou',          url: 'byakujou',      emoji: '🏯'},
  sekiban:        {name: 'Sekiban',           url: 'sekiban',       emoji: '⛩️'},
  aogurogetsu:    {name: 'Aoguro-no Getsu',   url: 'aogurogetsu',   emoji: '🌕'},
  akatsukikurai:  {name: 'Akatsuki-no Kurai', url: 'akatsukikurai', emoji: '🌙'},
}

window.NoAv = 'N/A';

/*
KAMON & BANNERS & CLANS & PATTERN IS A GALLERIES
TREE IS A LINKTREE
*/

function randomDefaultBanner() { let randomNumber = Math.floor(Math.random() * 100); if (randomNumber <= 64) { return 'asanoha'; } else { return 'kanprovince'; } }

nk.settingConfig = new Map([
  ["save_search_result", (nk.setting('save_search_result').load() ? nk.setting('save_search_result').load() : true)],
  ["save_selected_item", (nk.setting('save_selected_item').load() ? nk.setting('save_selected_item').load() : true)],
  ["turn_off_preloader", (nk.setting('turn_off_preloader').load() ? nk.setting('turn_off_preloader').load() : false)],
  ["ambience_off", (nk.setting('ambience_off').load() ? nk.setting('ambience_off').load() : false)],
  // Skin Settings
  ["skin", (nk.setting('skin').load() ? nk.setting('skin').load() : 'byakujou')],
  ["change_skin_by_time", (nk.setting('change_skin_by_time').load() ? nk.setting('change_skin_by_time').load() : false)],
  // Other customizations
  ["current_banner", (nk.setting('current_banner').load() ? nk.setting('current_banner').load() : randomDefaultBanner())],
  // Lang
  ["lang", (nk.setting('lang').load() ? nk.setting('lang').load() : navigatorLanguage)],
]);


if (nk.settingConfig.get('save_search_result') === true) {
  window.latestSearches = {
    "kamon": (nk.store('latestSearches.kamon').load() ? nk.store('latestSearches.kamon').load() : null),
    "banners": (nk.store('latestSearches.banners').load() ? nk.store('latestSearches.banners').load() : null),
    "clans": (nk.store('latestSearches.clans').load() ? nk.store('latestSearches.clans').load() : null),
    "pattern": (nk.store('latestSearches.pattern').load() ? nk.store('latestSearches.pattern').load() : null),
  };
} else {
  if (window.latestSearches !== null || nk.store('latestSearches').load()) {
    nk.store('latestSearches').remove();
  };
};

if (nk.settingConfig.get('save_selected_item') === true) {
  window.selectedItems = {
    "kamon": (nk.store('selectedItems.kamon').load() ? nk.store('selectedItems.kamon').load() : null),
    "banners": (nk.store('selectedItems.banners').load() ? nk.store('selectedItems.banners').load() : null),
    "clans": (nk.store('selectedItems.clans').load() ? nk.store('selectedItems.clans') : null),
    "pattern": (nk.store('selectedItems.pattern').load() ? nk.store('selectedItems.pattern').load() : null),
  };
} else {
  if (window.selectedItems !== null || nk.store('selectedItems').load()) {
    nk.store('selectedItems').remove();
  };
};





(nk.url.lang && nk.langs.supported.includes(nk.url.lang)) && nk.settingConfig.set('lang', nk.url.lang);

