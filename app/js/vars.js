window.items = {};
window.selectedSiteSkin = (fromStorage('selectedSiteSkin') ? fromStorage('selectedSiteSkin') : '');
window.supportedLanguages = ['ru', "en", "ja", "zh", "ko", "vi"];
window.navigatorLanguage = window.supportedLanguages.includes(navigator.language.toLowerCase()) ? navigator.language.toLowerCase() : 'en';
window.selectedLanguage = (fromStorage('selectedLanguage') ? fromStorage('selectedLanguage') : navigatorLanguage);

window.availableModes = ['kamon', 'banners', 'clans', 'cv', 'landing', 'tree', 'license', 'pattern'];
window.availableSelects = ['2d', '3d'];

/*
KAMON & BANNERS & CLANS & PATTERN IS A GALLERIES
TREE IS A LINKTREE
*/

window.savedSettings = {
  "save_search_result": (fromStorage('savedSettings.save_search_result') ? fromStorage('savedSettings.save_search_result') : 'true'),
  "save_selected_item": (fromStorage('savedSettings.save_selected_item') ? fromStorage('savedSettings.save_selected_item') : 'true'), 
  "turn_off_preloader": (fromStorage('savedSettings.turn_off_preloader') ? fromStorage('savedSettings.turn_off_preloader') : 'false'),
}

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
  }
}

if (savedSettings.save_selected_item === 'true') {
  window.selectedItems = {
    "kamon": (fromStorage('selectedItems.kamon') ? fromStorage('selectedItems.kamon') : null),
    "banners": (fromStorage('selectedItems.banners') ? fromStorage('selectedItems.banners') : null),
    "clans": (fromStorage('selectedItems.clans') ? fromStorage('selectedItems.clans') : null),
    "pattern": (fromStorage('selectedItems.pattern') ? fromStorage('selectedItems.pattern') : null),
  }
} else {
  if (window.selectedItems !== null || fromStorage('selectedItems')) {
    removeStorage('selectedItems');
  }
}

window.parseUrlParameter = function (name) {
  return new URLSearchParams(window.location.search).get(name)?.toLowerCase();
}

window.anUrlParameter = {
  mode: (parseUrlParameter('mode') ? parseUrlParameter('mode') : null),
  select: (parseUrlParameter('select') ? parseUrlParameter('select') : null)
}