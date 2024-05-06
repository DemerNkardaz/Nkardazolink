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
  let sourceName;
  let key_elements = target ? $(target.selector) : $('[data-key], [alt-key]');
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
  

  function update () {
    key_elements.each(function () {
      let dataKey = $(this).attr('data-key');
      let altKey = $(this).attr('alt-key');
      let cutKey = $(this).attr('data-keyCutter');
      let key = target ? $(this).attr(target.attrib) : (dataKey || altKey);
      let getLocale = cutKey ? nkLocale.get(sourceName ? `${key}>${sourceName}` : key, cutKey) : nkLocale.get(sourceName ? `${key}>${sourceName}` : key);
      let interpolatedLocale = eval('`' + getLocale + '`');

      //if (getLocale === null) { console.log(`[LOCALE] → ${key} not found${sourceName ? ` in ${sourceName}` : ''}`); return };

      if (dataKey || key) $(this).html(interpolatedLocale);
      if (altKey) $(this).attr('alt', interpolatedLocale);
      
    });
  }; 

  sourcePromise.then(() => {
    update();
  
    $('*').filter(function () {
      return this.shadowRoot !== null;
    }).each(function () {
      key_elements = target ? $(this.shadowRoot).find(target.selector) : $(this.shadowRoot).find('[data-key], [alt-key]');
      update();
    });
  
    $('html').attr('lang', nkSettings.get('lang'));
  });
};


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