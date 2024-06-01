const CUTS_LIBRARY = [
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
      nk.locale.get(`check:${newKey}`) ? $(this).attr('data-key', newKey) : null;
    } else if (nk.url.mode) {
      newKey = key.replace('default', nk.url.mode.toLowerCase());
      nk.locale.get(`check:${newKey}`) ? $(this).attr('data-key', newKey) : null;
    } else {
      return;
    }
  })
});

function iLang(keyMap, checking) {
  const keysArray = keyMap.get('key').parsePathDepth();
  const language = keyMap.get('mode') !== null ? keyMap.get('mode') : nk.settingConfig.get('lang');
  let sourceName = nk.locale[keyMap.get('source')];
  if (sourceName === undefined || sourceName === null) sourceName = eval(`window${keyMap.get('source').parsePathDepth()}`);
  let found = false;
  let localisedString = jsonpath.query(sourceName, `$['${language}']${keysArray}`);
  (localisedString.length === 0) && (localisedString = jsonpath.query(sourceName, `$..${keysArray}`));
  (localisedString.length > 0) && (localisedString = localisedString[0], found = true);
  if (found) {
    if (typeof localisedString === 'object') {
      const resultArray = [];
      const processObject = (obj) => {
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === 'object') { const nestedResultArray = []; processObject(value); resultArray.push(nestedResultArray); }
          else { keyMap.get('raw') === true ? resultArray.push(`${key} : ${value}`) : resultArray.push(`${value}`); }
        });
      };
      (Object.keys(localisedString).length > 0) && processObject(localisedString);
      localisedString = keyMap.get('raw') === true ? resultArray : resultArray.unpackText();
    }
    else {
      localisedString = keyMap.get('raw') === true ? localisedString : localisedString.unpackText();
    }
  } else {
    if (keyMap.get('mode') !== 'check' && checking !== true) {
      console.buildType(`[LOCALE] → Key “${keysArray}” not found in source “${keyMap.get('source')}”`, 'error');
    }
    return null;
  }

  if (keyMap.has('placements')) {
    const placements = keyMap.get('placements');
    placements.forEach(placement => {
      Object.entries(placement).forEach(([key, value]) => { const placeholder = `$(place_${key})`; localisedString = localisedString.replace(placeholder, value); });
    });
  }

  if (checking === true) { return found ? true : false; }
  return found ? localisedString : null;
}

window.nk.locale = {
  get: function (key, cut) {
    function cutter(str) {
      CUTS_LIBRARY.forEach(pair => {
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
      ('placements' in key) && keyMap.set('placements', key.placements || null);

    } else if (typeof key === 'string') {
      const parts = key.split(':');
      const mode = parts.length > 1 ? parts.shift() : null;
      const remainingKey = parts.join(':');
      
      keyMap.set('mode', mode)
        .set('key', remainingKey.includes('↓') ? remainingKey.split('↓')[0].split('>')[0] : remainingKey.split('>')[0])
        .set('source', remainingKey.split('>')[1] || 'languageJSON' || null);
    } else {
      return console.error('[LOCALE] → Wrong type of key');
    }

    result = (cut && cut !== 'raw') ? cutter(iLang(keyMap)) : iLang(keyMap);
    if (result === null && keyMap.get('mode') !== 'check') { return `${key}&nbsp;${NoAv}`; }
    else if (result === null && keyMap.get('mode') === 'check') { return; };
    if (keyMap.get('mode') !== '0' && keyMap.get('raw') !== true) return eval('`' + result + '`');
    return result;
  },
  entity: function (source) {
    const language = nk.settingConfig.get('lang');
    let found = false;
    let localisedString = jsonpath.query(source, `$['${language}']`);
    (localisedString.length === 0) && (localisedString = jsonpath.query(sourceName, `$..`));
    (localisedString.length > 0) && (localisedString = localisedString[0].unpackText(), found = true, localisedString = eval('`' + localisedString + '`'));
    return found ? localisedString : null;
  },
  check: function (key) {
    let result;
    const keyMap = new Map();
    if (typeof key === 'object') {
      keyMap.set('mode', key.mode || null).set('key', key.key || null).set('source', key.source || 'languageJSON' || null);
      ('placements' in key) && keyMap.set('placements', key.placements || null);

    } else if (typeof key === 'string') {
      const parts = key.split(':');
      const mode = parts.length > 1 ? parts.shift() : null;
      const remainingKey = parts.join(':');
      
      keyMap.set('mode', mode)
        .set('key', remainingKey.includes('↓') ? remainingKey.split('↓')[0].split('>')[0] : remainingKey.split('>')[0])
        .set('source', remainingKey.split('>')[1] || 'languageJSON' || null);
    } else {
      return console.error('[LOCALE] → Wrong type of key');
    }
    result = iLang(keyMap, true);
    return result;
  }
}

window.nk.locale.update = function ({ target, source} = {}) {
  let sourceName;
  let keyElements = nk.collectTargets(target ? target.selector : '[data-key], [alt-key], [data-eless-tooltip-key], [data-key-image], [title-key]');

  function update () {
    keyElements.each(function () {
      if (!$(this).closestParent('[data-entity]').length && !$(this).closestParent('[data-entity-given]').length) {
        let sourceKey = $(this).attr('data-key-source');
        let dataKey = $(this).attr('data-key');
        let altKey = $(this).attr('alt-key');
        let titleKey = $(this).attr('title-key');
        let eventLessKey = $(this).attr('data-eless-tooltip-key');
        let imageKey = $(this).attr('data-key-image');
        let cutKey = $(this).attr('data-key-cutter');
        let key = target ? $(this).attr(target.attrib) : (dataKey || titleKey || altKey || eventLessKey || imageKey);
        let getLocale = cutKey ? nk.locale.get(sourceName ? `${key}>${sourceName}` : (sourceKey ? `${key}>${sourceKey}` : key), cutKey) : nk.locale.get(sourceName ? `${key}>${sourceName}` : (sourceKey ? `${key}>${sourceKey}` : key));
        let interpolatedLocale = eval('`' + getLocale + '`');

        if (getLocale === null) { console.log(`[LOCALE] → ${key} not found${sourceName ? ` in ${sourceName}` : `${sourceKey ? ` in ${sourceKey}` : ''}`}`); return };

        if ((dataKey || key) && !eventLessKey && !titleKey) {
          ($.inArray($(this).tagName(), ['META', 'INPUT', 'LINK']) !== -1) ? $(this).attr($(this).tagName() === 'META' ? 'content' : ($(this).tagName() === 'INPUT' ? 'placeholder' : 'href'), interpolatedLocale)
            : $(this).html(interpolatedLocale);
        }

        if (titleKey) $(this).attr('title', interpolatedLocale);
        if (altKey) $(this).attr('alt', interpolatedLocale);
        if (eventLessKey) $(this).attr('data-tooltip', interpolatedLocale);
        if (imageKey) {
          $(this).attr('src', nk.locale.get(sourceName ? `${imageKey}>${sourceName}` : (sourceKey ? `${key}>${sourceKey}` : key)));
          let folder = imageKey.replace('.src', '');
          nk.locale.check(`${folder}.shift`) ? $(this).css('--shift', nk.locale.get(`${folder}.shift`)) : $(this).css('--shift', '');
          nk.locale.check(`${folder}.opacity`) ? $(this).css('--image-opacity', nk.locale.get(`${folder}.opacity`)) : $(this).css('--image-opacity', '');
          nk.locale.check(`${folder}.h`) ? $(this).closest('.tooltip--previews__image-wrapper').css('--h', nk.locale.get(`${folder}.h`)) : $(this).closest('.tooltip--previews__image-wrapper').css('--h', '');
          nk.locale.check(`${folder}.blur`) ? $(this).closest('tooltip-preview').attr('data-blur', nk.locale.get(`${folder}.blur`)) : $(this).closest('tooltip-preview').removeAttr('data-blur');
        }
      } else {
        let entity = $(this).closestParent('[data-entity], [data-entity-given]');
        let entityProp =  entity.attr('data-entity') || entity.attr('data-entity-given');
        let entityType = entity.attr('data-prop-class');
        
        let localeSource = `nk.items.${entityType}`;
        localeSource = eval(localeSource);
        if (localeSource) {
          let collectDataKeys = entity.find('[data-key]');
          collectDataKeys.each(function () {
            let key = $(this).attr('data-key');
            let found = false;
            let path = jsonpath.query(localeSource.root, `$..items[?(@.entity_prop=='${entityProp}')]`)[0];
            let localisedString = path[key];
            if (typeof localisedString === 'string' || Array.isArray(localisedString)) { found = true; }
            else {
              for (let lang in localisedString) {
                localisedString = nk.settingConfig.get('lang') && localisedString[nk.settingConfig.get('lang')] ? localisedString[nk.settingConfig.get('lang')] : nk.langs.supported.includes(lang) && localisedString[lang];
                found = true;
                break;
              }
            }
            if (!found) { console.buildType(`[ITEMS] → Not found “${key}” in “{ entity_prop: "${path.entity_prop}" }” of “nk.items.${entityType}”`, 'error'); }
            else { localisedString = localisedString.unpackText(); let interpolate = eval('`' + localisedString + '`'); $(this).html(interpolate); }
          });
        } else {
          console.buildType(`[ITEMS] → nk.items.${entityType} source not found for ${entityType}`, 'error');
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

  sourcePromise.then(() => { update(); $('html').attr('lang', nk.settingConfig.get('lang')) });
};


window.nk.locale.switch = function (lang) {
  const switchPromise = new Promise((resolve, reject) => {
    try {
      const language = lang.toLowerCase();
      if (!nk.langs.supported.includes(language)) {
        reject(new Error(`Language “${language}” is not supported.`));
        return;
      }
      nk.setting('lang').save(language);
      nk.settingConfig.set('lang', language);
      resolve();
    } catch (err) {
      console.error('Error while switching language:', err);
      reject(err);
    }
  });

  switchPromise.then(function () {
    nk.locale.update();
  }).catch(function (error) {
    console.error('Language switch failed:', error);
  });
}


nk.locale.cyclicSwitch = function () {
  let index = 0;

  setInterval(function () {
    nk.locale.switch(nk.langs.supported[index]);
    index = (index + 1) % nk.langs.supported.length;
  }, 1000);
}