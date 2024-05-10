window.nkPreferences = {
  banner: {
    asanoha: {
      url: '../../../resources/svg/pattern_asanoha_90deg.svg',
      name: 'Asa-no ha',
    }
  }
}


window.languagesList = {
  ru: { emoji: '🇷🇺', name: 'Русский' },
  en: { emoji: '🇬🇧', name: 'English' },
  ja: { emoji: '🇯🇵', name: '日本語' },
  zh: { emoji: '🇨🇳', name: '简体中文' },
  ko: { emoji: '🇰🇷', name: '한국어' },
  vi: { emoji: '🇻🇳', name: 'Tiếng Việt' },
  mo: { emoji: '🇲🇩', name: 'Молдовеняскэ' },
  ro: { emoji: '🇷🇴', name: 'Română' },
};
window.supportedLanguages = Object.keys(window.languagesList);
window.navigatorLanguage = supportedLanguages.includes(navigator.language.toLowerCase()) ? navigator.language.toLowerCase() : 'en';

window.availableModes = ['kamon', 'banners', 'clans', 'cv', 'landing', 'tree', 'license', 'pattern', 'reader'];
window.availableSelects = ['2d', '3d'];
window.availableSkins = {
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


window.nkSettings = new Map([
  ["save_search_result", ($Setting('save_search_result').load() ? $Setting('save_search_result').load() : 'true')],
  ["save_selected_item", ($Setting('save_selected_item').load() ? $Setting('save_selected_item').load() : 'false')],
  ["turn_off_preloader", ($Setting('turn_off_preloader').load() ? $Setting('turn_off_preloader').load() : 'false')],
  ["ambience_off", ($Setting('ambience_off').load() ? $Setting('ambience_off').load() : 'false')],
  // Skin Settings
  ["skin", ($Setting('skin').load() ? $Setting('skin').load() : 'byakujou')],
  ["change_skin_by_time", ($Setting('change_skin_by_time').load() ? $Setting('change_skin_by_time').load() : 'false')],
  // Other customizations
  ["current_banner", ($Setting('current_banner').load() ? $Setting('current_banner').load() : 'asanoha')],
  // Lang
  ["lang", ($Setting('lang').load() ? $Setting('lang').load() : navigatorLanguage)],
]);


if (nkSettings.get('save_search_result') === 'true') {
  window.latestSearches = {
    "kamon": ($Store('latestSearches.kamon').load() ? $Store('latestSearches.kamon').load() : null),
    "banners": ($Store('latestSearches.banners').load() ? $Store('latestSearches.banners').load() : null),
    "clans": ($Store('latestSearches.clans').load() ? $Store('latestSearches.clans').load() : null),
    "pattern": ($Store('latestSearches.pattern').load() ? $Store('latestSearches.pattern').load() : null),
  };
} else {
  if (window.latestSearches !== null || $Store('latestSearches').load()) {
    $Store('latestSearches').remove();
  };
};

if (nkSettings.get('save_selected_item') === 'true') {
  window.selectedItems = {
    "kamon": ($Store('selectedItems.kamon').load() ? $Store('selectedItems.kamon').load() : null),
    "banners": ($Store('selectedItems.banners').load() ? $Store('selectedItems.banners').load() : null),
    "clans": ($Store('selectedItems.clans').load() ? $Store('selectedItems.clans') : null),
    "pattern": ($Store('selectedItems.pattern').load() ? $Store('selectedItems.pattern').load() : null),
  };
} else {
  if (window.selectedItems !== null || $Store('selectedItems').load()) {
    $Store('selectedItems').remove();
  };
};

window.parseUrlParameter = function (name) {
  return new URLSearchParams(window.location.search).get(name)?.toLowerCase();
};

window.anUrlParameter = {
  mode: (parseUrlParameter('mode') ? parseUrlParameter('mode') : null),
  select: (parseUrlParameter('select') ? parseUrlParameter('select') : null),
  lang: (parseUrlParameter('lang') ? parseUrlParameter('lang') : null)
};
(anUrlParameter.lang && supportedLanguages.includes(anUrlParameter.lang)) && nkSettings.set('lang', anUrlParameter.lang);

