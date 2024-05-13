const cutsLibrary = [
  ['©', '&copy;'], ['®', '&reg;'], ['TM', '&trade;'], ['£', '&pound;'], ['$', '&#36;'], ['€', '&euro;'], ['¥', '&yen;'],
  ['§', '&sect;'], ['†', '&dagger;'], ['‡', '&Dagger;'], ['¶', '&para;'], ['"', '&quot;'], ["'", '&#39;'], ['×', '&times;'],
  ['÷', '&divide;'], ['±', '&plusmn;'], ['¬', '&not;'], ['%', '&#37;'], ['>', '&gt;'], ['<', '&lt;'], ['~', '&#126;'],
  ['°', '&deg;'], ['·', '&bull;'], ['...', '&#8230;'], ['⁂', '&darr;'], ['⁃', '&uarr;'], ['⁄', '&rarr;'], ['⁅', '&larr;'],
  ['⁆', '&harr;'], ['⁇', '&crarr;'], ['⁈', '&lceil;'], ['⁉', '&rceil;'], ['⁊', '&lfloor;'], ['⁋', '&rfloor;'], ['⁌', '&loz;'],
  ['⁍', '&spades;'], ['⁎', '&clubs;'], ['⁏', '&hearts;'], ['⁐', '&diams;'], ['⁑', '&quot;'], ['⁒', '&#39;'], ['⁓', '&copy;'],
  ['⁔', '&reg;'], ['⁕', '&trade;'], ['⁖', '&pound;'], ['⁗', '&#36;'], ['⁘', '&euro;'], ['⁙', '&yen;'], ['⁚', '&sect;'],
  ['⁛', '&dagger;'], ['⁜', '&Dagger;'], ['⁝', '&para;'], ['⁞', '&quot;'],
  [' ', '&emsp;'], [' ', '&emsp13;'], [' ', '&ensp;'], [' ', '&nbsp;'],
];


$(document).on('full_data_loaded', function () {
  $('meta, title').each(function () {
    let key = $(this).attr('data-key');
    let newKey;
    if (!key) return;
    if (nk.url.mode && nk.url.select) {
      newKey = key.replace('default', nk.url.mode.toLowerCase() + nk.url.select.toLowerCase());
      nkLocale.get(`check:${newKey}`) ? $(this).attr('data-key', newKey) : null;
    } else if (nk.url.mode) {
      newKey = key.replace('default', nk.url.mode.toLowerCase());
      nkLocale.get(`check:${newKey}`) ? $(this).attr('data-key', newKey) : null;
    } else {
      return;
    }
  })
});

function uLang(keyMap) {
  const nestedKeys = keyMap.get('key').split('.');
  let sourceLink, sourceLang, localisedString;

  ((keyMap) => {
    const sourceName = keyMap.get('source');
    if (sourceName && window.hasOwnProperty(sourceName)) {
      sourceLink = window[sourceName];
      sourceLang = (keyMap.get('mode') !== null && (nk.langs.supported.includes(keyMap.get('mode')) || keyMap.get('mode') === 'common' || keyMap.get('mode') === 'templates')) ? sourceLink[keyMap.get('mode')] : sourceLink[nkSettings.get('lang')];
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
    let keyFound = false;
    if (k.includes('*')) {
      if (k === '*') {
        localisedString = sourceLang;
        keyFound = true;
      } else {
        const keys = k.split('*');
        let source = sourceLang;
        for (let j = 0; j < keys.length; j++) {
          if (source.hasOwnProperty(keys[j])) {
            source = source[keys[j]];
          } else {
            break;
          }
        }
        if (source) {
          localisedString = source;
          keyFound = true;
        }
      }
    }
    if (localisedString.hasOwnProperty(k)) {
      localisedString = localisedString[k];
      keyFound = true;
    }
    if (!keyFound) {
      const skippedLangs = new Set();
      let statusSended = false;
      function fallback(skippedLangs, currentKey) {
        for (let lang in sourceLink) {
          if (sourceLink.hasOwnProperty(lang) && !skippedLangs.has(lang)) {
            if (sourceLink[lang].hasOwnProperty(currentKey)) {
              localisedString = sourceLink[lang][currentKey];
              keyFound = true;
              break;
            } else {
              skippedLangs.add(lang);
              fallback(skippedLangs, currentKey);
              if (statusSended !== true && keyMap.get('mode') !== "check" &&  keyFound !== true) {
                let formattedSkipped = Array.from(skippedLangs).map(lang => `[${lang}]`).join(' : ').toUpperCase();
                formattedSkipped.length > 0 && console.buildType(`[LOCALE] → Ignored languages ${formattedSkipped} when trying to get “${keyMap.get('key')}”`, 'warning');
                console.buildType(`[LOCALE] → The sended key “${currentKey}” instead of “${keyMap.get('key')}” in cycle of Fallback(). When not identical then context is lost`, 'important');
                statusSended = true;
              }
            }
          }
        }
      }
      fallback(skippedLangs, k);
      
      if (!keyFound) {
        return null;
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
  if (typeof localisedString === 'object') {
    const resultArray = [];

    const processObject = (obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object') {
          const nestedResultArray = [];
          processObject(value);
          resultArray.push(nestedResultArray);
        } else {
          keyMap.get('raw') === true ? resultArray.push(`${key} : ${value}`) : resultArray.push(`${value}`);
        }
      });
    };

    if (Object.keys(localisedString).length > 0) {
      processObject(localisedString);
    }

    localisedString = resultArray;
  }

  return keyMap.get('raw') === true ? localisedString : localisedString.unpackText();
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
    if (cut === 'raw') { keyMap.set('raw', true) }

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

    result = (cut && cut !== 'raw') ? cutter(uLang(keyMap)) : uLang(keyMap);
    if (result === null && keyMap.get('mode') !== 'check') {
      console.buildType(`[LOCALE] → Key “${keyMap.get('key')}” not found in “${keyMap.get('source')}”`, 'error');
      return `${key}&nbsp;${NoAv}`;
    } else if (result === null && keyMap.get('mode') === 'check') {
      return;
    }
    if (keyMap.get('mode') !== '0' && keyMap.get('raw') !== true) return eval('`' + result + '`');
    return result;
  },
  entity: function (source) {
    let value;
    let found = false;
    for (let lang in source) {
      if (source.hasOwnProperty(lang) && lang === nkSettings.get('lang')) {
        value = source[lang];
        found = true;
        break;
      } else {
        for (let i = 0; i < nk.langs.supported.length; i++) {
          if (lang === nk.langs.supported[i]) {
            value = source[lang];
            found = true;
            break;
          }
        }
      }
    }

    return found ? value : null;
  }
}

window.nkLocale.langUpdate = function ({ target, source } = {}) {
  let sourceName;
  let keyElements = target ? $(target.selector) : $('[data-key], [alt-key], [eventLess-tooltip-key], [data-key-image]');
  $('*').filter(function () {
    return this.shadowRoot !== null;
  }).each(function () {
    const shadowElements = $(this.shadowRoot).find(target ? target.selector : '[data-key], [alt-key], [eventLess-tooltip-key], [data-key-image]');
    keyElements = keyElements.add(shadowElements);
  });


  function update () {
    keyElements.each(function () {
      if (!$(this).closestParent('[data-entity]').length && !$(this).closestParent('[data-entity-given]').length) {
        let sourceKey = $(this).attr('data-key-source');
        let dataKey = $(this).attr('data-key');
        let altKey = $(this).attr('alt-key');
        let eventLessKey = $(this).attr('eventLess-tooltip-key');
        let imageKey = $(this).attr('data-key-image');
        let cutKey = $(this).attr('data-key-cutter');
        let key = target ? $(this).attr(target.attrib) : (dataKey || altKey || eventLessKey || imageKey);
        let getLocale = cutKey ? nkLocale.get(sourceName ? `${key}>${sourceName}` : (sourceKey ? `${key}>${sourceKey}` : key), cutKey) : nkLocale.get(sourceName ? `${key}>${sourceName}` : (sourceKey ? `${key}>${sourceKey}` : key));
        let interpolatedLocale = eval('`' + getLocale + '`');

        if (getLocale === null) { console.log(`[LOCALE] → ${key} not found${sourceName ? ` in ${sourceName}` : `${sourceKey ? ` in ${sourceKey}` : ''}`}`); return };

        if ((dataKey || key) && !eventLessKey) $(this).tagName() !== 'META' ? $(this).html(interpolatedLocale) : $(this).attr('content', interpolatedLocale);
        if (altKey) $(this).attr('alt', interpolatedLocale);
        if (eventLessKey) $(this).attr('eventLess-tooltip', interpolatedLocale);
        if (imageKey) {
          $(this).attr('src', nkLocale.get(sourceName ? `${imageKey}>${sourceName}` : (sourceKey ? `${key}>${sourceKey}` : key)));
          let folder = imageKey.replace('.src', '');
          console.log(folder);
          nkLocale.get(`check:${folder}.shift`) ? $(this).css('--shift', nkLocale.get(`${folder}.shift`)) : $(this).css('--shift', '');
          nkLocale.get(`check:${folder}.opacity`) ? $(this).css('--image-opacity', nkLocale.get(`${folder}.opacity`)) : $(this).css('--image-opacity', '');
          nkLocale.get(`check:${folder}.h`) ? $(this).closest('.tooltip--previews__image-wrapper').css('--h', nkLocale.get(`${folder}.h`)) : $(this).closest('.tooltip--previews__image-wrapper').css('--h', '');
          nkLocale.get(`check:${folder}.blur`) ? $(this).closest('tooltip-preview').attr('data-blur', nkLocale.get(`${folder}.blur`)) : $(this).closest('tooltip-preview').removeAttr('data-blur');
        }
      } else {
        let entity = $(this).closestParent('[data-entity]')
        let entityProp = entity.attr('data-entity');

        if ($(this).closestParent('[data-entity-given]').length) {
          entity = $(this).closestParent('[data-entity-given]');
          entityProp = entity.attr('data-entity-given');
        }
        let entityType = entity.attr('data-prop-class');
        let entityCategory = entity.attr('data-prop-category');
        let localeSource = `${entityType}Item`;
        localeSource = eval(localeSource);
        if (localeSource) {
          $.each(localeSource.root, function (_, category) {
            if (entityCategory === category.category) {
              $.each(category.items, function (_, item) {
                if (entityProp === item.entity_prop) {
                  let collectDataKeys = entity.find('[data-key]');
                  collectDataKeys.each(function () {
                    let key = $(this).attr('data-key');
                    let value = item[key];
                    let found = false;
                    if (typeof item[key] === 'string' || Array.isArray(item[key])) {
                      value = item[key];
                      found = true;
                    }
                    if (!found) {
                      for (let lang in item[key]) {
                        if (item[key].hasOwnProperty(lang) && lang === nkSettings.get('lang')) {
                          value = item[key][lang];
                          found = true;
                          break;
                        }
                      }
                    }
                    if (!found) {
                      for (let lang in item[key]) {
                        if (nk.langs.supported.includes(lang)) {
                          value = item[key][lang];
                          found = true;
                          break;
                        }
                      }
                    }
                    if (!found) {
                      console.buildType(`[ITEMS] → Not found any key in ${JSON.stringify(item[key])}`, 'error');
                    }
                    value = value.unpackText();
                    let interpolate = eval('`' + value + '`');
                    $(this).html(interpolate);
                  });
                }
              });
            }
          });
        } else {
          console.buildType(`[ITEMS] → ${entityType}Item source not found for ${entityType}`, 'error');
        }
      }
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
      if (!nk.langs.supported.includes(language)) {
        reject(new Error(`Language “${language}” is not supported.`));
        return;
      }
      nk.setting('lang').save(language);
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
    nkLocale.switch(nk.langs.supported[index]);
    index = (index + 1) % nk.langs.supported.length;
  }, 1000);
}