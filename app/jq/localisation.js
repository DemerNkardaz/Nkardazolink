window.updateItemsLanguage = function () {
  let item_props = $('item-prop');

  item_props.each(function () {
    if ($(this).attr('prop_class') === 'kamon') {
      let shadowRoot = this.shadowRoot;
      $(shadowRoot).find('.item_title_text').html("тест");
    }
  });
}

window.updateLanguageKeys = function ({ target, source } = {}) {
  (source === null || source === undefined) && (cLang = languageJSON[nkSettings.get('lang')]);
  
  let key_elements = target ? $(target.selector) : $('[data-key], [alt-key]');

  function update () {
    key_elements.each(function () {
      let dataKey = $(this).attr('data-key');
      let altKey = $(this).attr('alt-key');
      let key = target ? $(this).attr(target.attrib) : (dataKey || altKey);
      let getLocale = getLocaleForKey({ key: key, source: source });

      let keyMSG = '';

      if (!getLocale) {
        keyMSG = generateErrorMessage(key);
      }

      getLocale = getLocale ? textUnPacker(getLocale) : (key ? keyMSG : null);

      if (dataKey || key) {
        let interpolatedLocale = getLocale ? eval('`' + getLocale + '`') : null;
        $(this).html(interpolatedLocale);
      }
      if (altKey) {
        let interpolatedLocale = getLocale ? eval('`' + getLocale + '`') : null;
        $(this).attr('alt', interpolatedLocale);
      }
    });
  }; 
  update();

  $('*').filter(function () {
    return this.shadowRoot !== null;
  }).each(function () {
    key_elements = $(this.shadowRoot).find('[data-key], [alt-key]');
    update();
  });

  $('html').attr('lang', nkSettings.get('lang'));
};


function getLocaleForKey({ key, source } = {}) {
  const keys = key.split('.');
  source = (source !== null && source !== undefined) ? source : languageJSON;
  let currentLocale = source[nkSettings.get('lang')];

  for (const k of keys) {
    if (!currentLocale || !currentLocale.hasOwnProperty(k)) {
      const foundTranslation = Object.values(source).flatMap(langObj => {
        let tempLocale = langObj;
        for (const k of keys) {
          if (!tempLocale || !tempLocale.hasOwnProperty(k)) {
            tempLocale = null;
            break;
          }
          tempLocale = tempLocale[k];
        }
        return tempLocale ? [tempLocale] : [];
      })[0];
      
      return foundTranslation ? foundTranslation : null;
    }
    currentLocale = currentLocale[k];
  }
  return currentLocale;
}


function generateErrorMessage(key) {
  let parts = key.split('.');
  let errorMessage = '';
  let currentKey = '';
  for (let part of parts) {
    currentKey += (currentKey ? '.' : '') + part;
    errorMessage += `${currentKey} ${NoAv}`;
  }
  return errorMessage;
}


window.switchLang = function (lang) {
  const switchPromise = new Promise((resolve, reject) => {
    try {
      const language = lang.toLowerCase();
      saveSettings('lang', language);
      nkSettings.set('lang', language);
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  switchPromise.then(function () {
    updateLanguageKeys();
  });
}

window.cyclic_language = function () {
  let index = 0;

  setInterval(function () {
    switchLang(supportedLanguages[index]);
    index = (index + 1) % supportedLanguages.length;
  }, 1000);
}