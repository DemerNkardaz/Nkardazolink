window.updateItemsLanguage = function () {
  let item_props = $('item-prop');

  item_props.each(function () {
    if ($(this).attr('prop_class') === 'kamon') {
      let shadowRoot = this.shadowRoot;
      $(shadowRoot).find('.item_title_text').html("тест");
    }
  });
}



window.updateLanguageKeys = function (target) {
  cLang = languageJSON[nkSettings.get('lang')];
  
  let key_elements = target ? $(target) : $('[data-key], [alt-key]');

  function update () {
    key_elements.each(function () {
      let key = $(this).attr('data-key') || $(this).attr('alt-key');
      let getLocale = getLocaleForKey(key);

      let keyMSG = '';

      if (!getLocale) {
        keyMSG = generateErrorMessage(key);
      }

      getLocale = getLocale ? textUnPacker(getLocale) : (key ? keyMSG : null);

      if ($(this).attr('data-key')) {
        let interpolatedLocale = getLocale ? eval('`' + getLocale + '`') : null;
        $(this).html(interpolatedLocale);
      }
      if ($(this).attr('alt-key')) {
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

function getLocaleForKey(key) {
  const keys = key.split('.');
  let currentLocale = languageJSON[nkSettings.get('lang')];

  for (const k of keys) {
    if (!currentLocale || !currentLocale.hasOwnProperty(k)) {
      const foundTranslation = Object.values(languageJSON).flatMap(langObj => {
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