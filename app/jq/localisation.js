const cutsLibrary = [
  ['©', '&copy;'], ['®', '&reg;'], ['TM', '&trade;'], ['£', '&pound;'], ['$', '&#36;'], ['€', '&euro;'], ['¥', '&yen;'],
  ['§', '&sect;'], ['†', '&dagger;'], ['‡', '&Dagger;'], ['¶', '&para;'], ['"', '&quot;'], ["'", '&#39;'], ['×', '&times;'],
  ['÷', '&divide;'], ['±', '&plusmn;'], ['¬', '&not;'], ['%', '&#37;'], ['>', '&gt;'], ['<', '&lt;'], ['~', '&#126;'],
  ['°', '&deg;'], ['·', '&bull;'], ['...', '&#8230;'], ['⁂', '&darr;'], ['⁃', '&uarr;'], ['⁄', '&rarr;'], ['⁅', '&larr;'],
  ['⁆', '&harr;'], ['⁇', '&crarr;'], ['⁈', '&lceil;'], ['⁉', '&rceil;'], ['⁊', '&lfloor;'], ['⁋', '&rfloor;'], ['⁌', '&loz;'],
  ['⁍', '&spades;'], ['⁎', '&clubs;'], ['⁏', '&hearts;'], ['⁐', '&diams;'], ['⁑', '&quot;'], ['⁒', '&#39;'], ['⁓', '&copy;'],
  ['⁔', '&reg;'], ['⁕', '&trade;'], ['⁖', '&pound;'], ['⁗', '&#36;'], ['⁘', '&euro;'], ['⁙', '&yen;'], ['⁚', '&sect;'],
  ['⁛', '&dagger;'], ['⁜', '&Dagger;'], ['⁝', '&para;'], ['⁞', '&quot;']
];

/*
window.loi = {
  "ru": {
    "based": "Этот текст имеет $(place_0), а ещё это $(place_150)",
    "from": "Angular JS",
  }
}
! sample of call nkLocale.get({mode: 'ru', key: 'based', placements: [{ '0': `${nkLocale.get('ru:from>loi')}` }, { '150': 5+5 }], source: 'loi'});
*/

function uLang(keyMap) {
  const nestedKeys = keyMap.get('key').split('.');
  let sourceLink, sourceLang, localisedString;

  ((keyMap) => {
    const sourceName = keyMap.get('source');
    if (sourceName && window.hasOwnProperty(sourceName)) {
      sourceLink = window[sourceName];
      sourceLang = (keyMap.get('mode') !== null && (supportedLanguages.includes(keyMap.get('mode') || keyMap.get('mode') === 'common'))) ? sourceLink[keyMap.get('mode')] : sourceLink[nkSettings.get('lang')];
      if (!sourceLang) {
        for (let lang in sourceLink) {
          if (sourceLink.hasOwnProperty(lang)) {
            if (sourceLink[lang].hasOwnProperty(nestedKeys[0])) {
              sourceLang = sourceLink[lang];
              break;
            }
          }
        }
      }
    } else {
      console.buildType(`Variable ${sourceName} not found in global scope`, 'error');
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
        console.buildType(`Key '${k}' not found in ${keyMap.get('source')}`, 'error');
        return `“${k}”&nbsp;${NoAv}`;
      }
    }
  }

  if (keyMap.get('placement') !== null) {
    const placeholder = keyMap.get('placement_counter') !== null ? `$(place_${keyMap.get('placement_counter')})` : '$(place)';
    localisedString = localisedString.replace(placeholder, keyMap.get('placement'));
  }

  if ('placements' in keyMap || keyMap.has('placements')) {
    const placements = keyMap.get('placements');
    for (let i = 0; i < placements.length; i++) {
      const placement = placements[i];
      for (let j = 0; j < Object.keys(placement).length; j++) {
        const key = Object.keys(placement)[j];
        const value = Object.values(placement)[j];
        const placeholder = `$(place_${key})`;
        localisedString = localisedString.replace(placeholder, value);
      }
    }
  }

  return textUnPacker(localisedString);
}

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
    const keyMap = new Map();

    if (typeof key === 'object') {
      keyMap.set('mode', key.mode || null).set('key', key.key || null).set('source', key.source || 'languageJSON' || null);
      ('placement' in key) && keyMap.set('placement', key.placement || null).set('placement_counter', key.placement_counter || null);
      ('placements' in key) && keyMap.set('placements', key.placements || null);

    } else if (typeof key === 'string') {
      const parts = key.split(':');
      const mode = parts.length > 1 ? parts.shift() : null;
      const remainingKey = parts.join(':');
      
      keyMap.set('mode', mode)
        .set('key', remainingKey.includes('↓') ? remainingKey.split('↓')[0].split('>')[0] : remainingKey.split('>')[0])
        .set('placement', remainingKey.includes('↓') ? remainingKey.split('↓')[1].split('>')[0].split('$')[0] : null)
        .set('placement_counter', remainingKey.includes('$') ? remainingKey.split('$')[1].split('>')[0] : null)
        .set('source', remainingKey.split('>')[1] || 'languageJSON' || null);
    } else {
      return console.error('[LOCALE] → Wrong type of key');
    }
    //console.log(keyMap);

    result = cut ? cutter(uLang(keyMap)) : uLang(keyMap);

    if (keyMap.get('mode') !== '0') return eval('`' + result + '`');
    return result;
  }
}

window.updateItemsLanguage = function () {
  let item_props = $('item-prop');

  item_props.each(function () {
    if ($(this).attr('prop_class') === 'kamon') {
      let shadowRoot = this.shadowRoot;
      $(shadowRoot).find('.item_title_text').html("тест");
    }
  });
}

window.nkLocale.langUpdate = function ({ target, source } = {}) {
  let sourceName;
  let key_elements = target ? $(target.selector) : $('[data-key], [alt-key]');
  $('*').filter(function () {
    return this.shadowRoot !== null;
  }).each(function () {
    const shadowElements = $(this.shadowRoot).find(target ? target.selector : '[data-key], [alt-key]');
    key_elements = key_elements.add(shadowElements);
  });


  function update () {
    key_elements.each(function () {
      let dataKey = $(this).attr('data-key');
      let altKey = $(this).attr('alt-key');
      let cutKey = $(this).attr('data-keyCutter');
      let key = target ? $(this).attr(target.attrib) : (dataKey || altKey);
      let getLocale = cutKey ? nkLocale.get(sourceName ? `${key}>${sourceName}` : key, cutKey) : nkLocale.get(sourceName ? `${key}>${sourceName}` : key);
      let interpolatedLocale = eval('`' + getLocale + '`');

      if (getLocale === null) { console.log(`[LOCALE] → ${key} not found${sourceName ? ` in ${sourceName}` : ''}`); return };

      if (dataKey || key) $(this).html(interpolatedLocale);
      if (altKey) $(this).attr('alt', interpolatedLocale);
      
    });
  }; 

  const sourcePromise = new Promise((resolve, reject) => {
    try {
      if (source !== null && source !== undefined) {
        for (let key in window) {
          if (window[key] === source) {
            sourceName = key;
            break;
          }
        }
      };
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  sourcePromise.then(() => { update(); $('html').attr('lang', nkSettings.get('lang')) });
};


window.nkLocale.switch = function (lang) {
  const switchPromise = new Promise((resolve, reject) => {
    try {
      const language = lang.toLowerCase();
      if (!supportedLanguages.includes(language)) {
        reject(new Error(`Language “${language}” is not supported.`));
        return;
      }
      saveSettings('lang', language);
      nkSettings.set('lang', language);
      resolve();
    } catch (err) {
      console.error('Error while switching language:', err);
      reject(err);
    }
  });

  switchPromise.then(function () {
    nkLocale.langUpdate();
  }).catch(function (error) {
    console.error('Language switch failed:', error);
  });
}


window.cyclic_language = function () {
  let index = 0;

  setInterval(function () {
    nkLocale.switch(supportedLanguages[index]);
    index = (index + 1) % supportedLanguages.length;
  }, 1000);
}