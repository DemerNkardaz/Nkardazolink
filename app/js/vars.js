window.items = {};
window.nkPreferences = {
  skin: fromStorage('selectedSiteSkin') ? fromStorage('selectedSiteSkin') : null,
  banner: fromStorage('selectedBanner') ? fromStorage('selectedBanner') : '../../../resources/svg/pattern_asanoha_90deg.svg',
}
window.supportedLanguages = ['ru', "en", "ja", "zh", "ko", "vi"];
window.navigatorLanguage = window.supportedLanguages.includes(navigator.language.toLowerCase()) ? navigator.language.toLowerCase() : 'en';
window.selectedLanguage = (fromStorage('selectedLanguage') ? fromStorage('selectedLanguage') : navigatorLanguage);

window.availableModes = ['kamon', 'banners', 'clans', 'cv', 'landing', 'tree', 'license', 'pattern', 'reader'];
window.availableSelects = ['2d', '3d'];
window.availableSkins = {
  byakujou:     {name: 'Byakujou',        url: 'byakujou'},
  aogurogetsu:  {name: 'Aoguro-no Getsu', url: 'aogurogetsu'},
  sekiban:      {name: 'Sekiban',         url: 'sekiban'},
}

window.NoAv = 'N/A';

/*
KAMON & BANNERS & CLANS & PATTERN IS A GALLERIES
TREE IS A LINKTREE
*/


window.savedSettings = {
  "save_search_result": (loadSettings('save_search_result') ? loadSettings('save_search_result') : 'true'),
  "save_selected_item": (loadSettings('save_selected_item') ? loadSettings('save_selected_item') : 'false'),
  "turn_off_preloader": (loadSettings('turn_off_preloader') ? loadSettings('turn_off_preloader') : 'false'),
  "change_skin_by_time": (loadSettings('change_skin_by_time') ? loadSettings('change_skin_by_time') : 'false'),
};

if (savedSettings.save_search_result === 'true') {
  window.latestSearches = {
    "kamon": (fromStorage('latestSearches.kamon') ? fromStorage('latestSearches.kamon') : null),
    "banners": (fromStorage('latestSearches.banners') ? fromStorage('latestSearches.banners') : null),
    "clans": (fromStorage('latestSearches.clans') ? fromStorage('latestSearches.clans') : null),
    "pattern": (fromStorage('latestSearches.pattern') ? fromStorage('latestSearches.pattern') : null),
  };
} else {
  if (window.latestSearches !== null || fromStorage('latestSearches')) {
    removeStorage('latestSearches');
  };
};

if (savedSettings.save_selected_item === 'true') {
  window.selectedItems = {
    "kamon": (fromStorage('selectedItems.kamon') ? fromStorage('selectedItems.kamon') : null),
    "banners": (fromStorage('selectedItems.banners') ? fromStorage('selectedItems.banners') : null),
    "clans": (fromStorage('selectedItems.clans') ? fromStorage('selectedItems.clans') : null),
    "pattern": (fromStorage('selectedItems.pattern') ? fromStorage('selectedItems.pattern') : null),
  };
} else {
  if (window.selectedItems !== null || fromStorage('selectedItems')) {
    removeStorage('selectedItems');
  };
};

window.parseUrlParameter = function (name) {
  return new URLSearchParams(window.location.search).get(name)?.toLowerCase();
};

window.anUrlParameter = {
  mode: (parseUrlParameter('mode') ? parseUrlParameter('mode') : null),
  select: (parseUrlParameter('select') ? parseUrlParameter('select') : null)
};

$(document).on('languageJSON_loaded', function () {
  window.cLang = languageJSON[selectedLanguage];
});