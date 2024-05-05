window.items = {};
window.nkPreferences = {
  skin: fromStorage('selectedSiteSkin') ? fromStorage('selectedSiteSkin') : null,
  banner: {
    asanoha: {
      url: '../../../resources/svg/pattern_asanoha_90deg.svg',
      name: 'Asa-no ha',
    }
  }
}
window.supportedLanguages = ['ru', "en", "ja", "zh", "ko", "vi", "mo", "ro"];


window.languagesList = {
  ru: { emoji: '🇷🇺', name: 'Русский' },
  en: { emoji: '🇬🇧', name: 'English' },
  ja: { emoji: '🇯🇵', name: '日本語' },
  zh: { emoji: '🇨🇳', name: '简体中文' },
  ko: { emoji: '🇰🇷', name: '한국어' },
  vi: { emoji: '🇻🇳', name: 'Tiếng Việt' },
  mo: { emoji: '🇲🇩', name: 'Молдовеняскэ' },
  ro: { emoji: '🇷🇴', name: 'Română' },
}
window.navigatorLanguage = Object.keys(window.languagesList).includes(navigator.language.toLowerCase()) ? navigator.language.toLowerCase() : 'en';

window.availableModes = ['kamon', 'banners', 'clans', 'cv', 'landing', 'tree', 'license', 'pattern', 'reader'];
window.availableSelects = ['2d', '3d'];
window.availableSkins = {
  azumatsuyu:     {name: 'Azumatsuyu',      url: 'azumatsuyu'},
  byakujou:       {name: 'Byakujou',        url: 'byakujou'},
  sekiban:        {name: 'Sekiban',         url: 'sekiban'},
  aogurogetsu:    {name: 'Aoguro-no Getsu', url: 'aogurogetsu'},
}

window.NoAv = 'N/A';

/*
KAMON & BANNERS & CLANS & PATTERN IS A GALLERIES
TREE IS A LINKTREE
*/


window.nkSettings = new Map([
  ["save_search_result", (loadSettings('save_search_result') ? loadSettings('save_search_result') : 'true')],
  ["save_selected_item", (loadSettings('save_selected_item') ? loadSettings('save_selected_item') : 'false')],
  ["turn_off_preloader", (loadSettings('turn_off_preloader') ? loadSettings('turn_off_preloader') : 'false')],
  ["ambience_off", (loadSettings('ambience_off') ? loadSettings('ambience_off') : 'false')],
  // Skin Settings
  ["skin", (loadSettings('selectedSiteSkin') ? loadSettings('selectedSiteSkin') : 'byakujou')],
  ["change_skin_by_time", (loadSettings('change_skin_by_time') ? loadSettings('change_skin_by_time') : 'false')],
  // Other customizations
  ["current_banner", (loadSettings('current_banner') ? loadSettings('current_banner') : 'asanoha')],
  // Lang
  ["lang", (loadSettings('selectedLanguage') ? loadSettings('selectedLanguage') : navigatorLanguage)],
]);

if (nkSettings.get('save_search_result') === 'true') {
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

if (nkSettings.get('save_selected_item') === 'true') {
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
  select: (parseUrlParameter('select') ? parseUrlParameter('select') : null),
  lang: (parseUrlParameter('lang') ? parseUrlParameter('lang') : null)
};
(anUrlParameter.lang && supportedLanguages.includes(anUrlParameter.lang)) && nkSettings.set('lang', anUrlParameter.lang);


languageLoaded(function () {
  function reservedKey(key) {
    for (const lang in languageJSON) {
      if (languageJSON[lang][key]) {
        return languageJSON[lang][key];
      }
    }
    return null;
  }

  window.cLang = languageJSON[nkSettings.get('lang')];
  window.fromLang = function (key, lang) {
      const err = `<span>Ключ “${key}” не найден в языке “${lang}”<br/>Функция <b>fromLang(key, lang)</b></span>`;
      const keys = key.split('.');
      let currentObj = languageJSON[lang];
      for (const k of keys) {
          if (!currentObj || !currentObj[k]) {
              return textUnPacker(err);
          }
          currentObj = currentObj[k];
      }
      const locale = textUnPacker(currentObj);
      return eval('`' + locale + '`');
  };

window.uLang = function (key) {
    const err = `<span>Ключ “${key}” ${NoAv}<br/>Функция <b>uLang(key)</b></span>`;
    const keys = key.split('.');
    let currentObj = cLang;
    
    for (const k of keys) {
        if (!currentObj || !currentObj[k]) {
            const foundTranslation = Object.values(languageJSON).flatMap(langObj => {
                let tempObj = langObj;
                for (const k of keys) {
                    if (!tempObj || !tempObj[k]) {
                        tempObj = null;
                        break;
                    }
                    tempObj = tempObj[k];
                }
                return tempObj ? [tempObj] : [];
            })[0];
            
            return foundTranslation ? textUnPacker(foundTranslation) : textUnPacker(err);
        }
        currentObj = currentObj[k];
    }
    
    return textUnPacker(currentObj);
};


  window.iLang = function (key) {
    return eval('`' + uLang(key) + '`');
  };
});