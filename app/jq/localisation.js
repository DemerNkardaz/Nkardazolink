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
  let parts = key.split('.');
  let locale = languageJSON[nkSettings.get('lang')];
  for (let part of parts) {
    if (!locale || !locale[part]) {
      return null;
    }
    locale = locale[part];
  }
  return locale;
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
      saveSettings('selectedLanguage', language);
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