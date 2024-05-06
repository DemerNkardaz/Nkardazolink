window.nkPreferences = {
  skin: fromStorage('selectedSiteSkin') ? fromStorage('selectedSiteSkin') : null,
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
  ["skin", (loadSettings('skin') ? loadSettings('skin') : 'byakujou')],
  ["change_skin_by_time", (loadSettings('change_skin_by_time') ? loadSettings('change_skin_by_time') : 'false')],
  // Other customizations
  ["current_banner", (loadSettings('current_banner') ? loadSettings('current_banner') : 'asanoha')],
  // Lang
  ["lang", (loadSettings('lang') ? loadSettings('lang') : navigatorLanguage)],
]);

/*
{
  let isFilled = false;
  let navLang = false;
  const insertDefault = new Promise((resolve, reject) => { 
    try {
      for (const [key, value] of nkSettings) {
        if (loadSettings(key) === null || loadSettings(key) === undefined) saveSettings(key, value), isFilled = true;
        if (key === 'lang' && value !== navigatorLanguage) saveSettings(key, navigatorLanguage), navLang = true;
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  insertDefault.then(function () {
    isFilled && console.log(`[SETTING] → Inserted default settings to localStorage`);
    navLang && console.log(`[SETTING] → Detected change of navigator language. Assigned to new language`);
  });
}*/



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

const cutsLibrary = [
  ['©', '&copy;'],
  ['®', '&reg;'],
  ['TM', '&trade;'],
  ['£', '&pound;'],
  ['$', '&#36;'],
  ['€', '&euro;'],
  ['¥', '&yen;'],
  ['§', '&sect;'],
  ['†', '&dagger;'],
  ['‡', '&Dagger;'],
  ['¶', '&para;'],
  ['"', '&quot;'],
  ["'", '&#39;'],
  ['×', '&times;'],
  ['÷', '&divide;'],
  ['±', '&plusmn;'],
  ['¬', '&not;'],
  ['%', '&#37;'],
  ['>', '&gt;'],
  ['<', '&lt;'],
  ['~', '&#126;'],
  ['°', '&deg;'],
  ['·', '&bull;'],
  ['...', '&#8230;'],
  ['⁂', '&darr;'],
  ['⁃', '&uarr;'],
  ['⁄', '&rarr;'],
  ['⁅', '&larr;']
];
languageLoaded(function () {
  function uLang(keyMap) {    
    const nestedKeys = keyMap.get('key').split('.');
    let sourceLink, sourceLang, localisedString;

    ((keyMap) => {
      const sourceName = keyMap.get('source');
      if (sourceName && window.hasOwnProperty(sourceName)) {
        sourceLink = window[sourceName];
        sourceLang = (keyMap.get('mode') !== null && (supportedLanguages.includes(keyMap.get('mode') || keyMap.get('mode') === 'common'))) ? sourceLink[keyMap.get('mode')] : sourceLink[nkSettings.get('lang')];
        
      } else {
        console.error(`Variable ${sourceName} not found in global scope`);
      }
    })(keyMap);
    
    localisedString = sourceLang;
    for (let i = 0; i < nestedKeys.length; i++) {
      const k = nestedKeys[i];
      if (localisedString.hasOwnProperty(k)) {
        localisedString = localisedString[k];
      } else {
        let keyFound = false;
      
        for (let lang in sourceLink) {
          if (sourceLink.hasOwnProperty(lang)) {
            if (sourceLink[lang].hasOwnProperty(k)) {
              localisedString = sourceLink[lang][k];
              keyFound = true;
              break;
            }
          }
        }
      
        if (!keyFound) {
          console.error(`Key '${k}' not found in ${keyMap.get('source')}`);
          return `“${k}”&nbsp;${NoAv}`;
        }
      }
    }

    if (keyMap.get('placement') !== null) {
      localisedString = localisedString.replace('$(place)', keyMap.get('placement'));
    }

    return textUnPacker(localisedString);
  };

  window.nkLocale = {
    get: function (key, cut) {
    function cutter(str) {
      cutsLibrary.forEach(pair => {
        const [original, replacement] = pair;
        const regex = new RegExp(replacement);
        str = str.replace(regex, original);
      });
      return str.replace(cut, '');
    }
      let result;
      const parts = key.split(':');
      const mode = parts.length > 1 ? parts.shift() : null;
      const remainingKey = parts.join(':');
      
      const keyMap = new Map([
        ['mode', mode],
        ['key', remainingKey.includes('↓') ? remainingKey.split('↓')[0].split('>')[0] : remainingKey.split('>')[0]],
        ['placement', remainingKey.includes('↓') ? remainingKey.split('↓')[1].split('>')[0] : null],
        ['source', remainingKey.split('>')[1] || 'languageJSON' || null]
      ]);

      result = cut ? cutter(uLang(keyMap)) : uLang(keyMap);

      if (keyMap.get('mode') !== '0') return eval('`' + result + '`');
      return result;
    }
  }
});
