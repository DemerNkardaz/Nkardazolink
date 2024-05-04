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
  let key_elements = target ? $(target) : $('[data-key], [alt-key]');
  function update () {
    key_elements.each(function () {
      let key = $(this).attr('data-key') || $(this).attr('alt-key');
      let getLocale = languageJSON[selectedLanguage][key];
      if (!getLocale) {
        for (let lang in languageJSON) {
          if (languageJSON[lang][key]) {
            getLocale = languageJSON[lang][key];
            break;
          }
        }
      };

      let keyMSG = ``;

      $(this).attr('data-key') && (keyMSG += `DATA-KEY “${$(this).attr('data-key')}” ${NoAv}`);
      $(this).attr('alt-key') && (keyMSG += `ALT-KEY “${$(this).attr('alt-key')}” ${NoAv}`);

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
  }; update();

  $('*').filter(function () {
    return this.shadowRoot !== null;
  }).each(function () {
    key_elements = $(this.shadowRoot).find('[data-key], [alt-key]');
    update();
  });
  $('html').attr('lang', selectedLanguage);
};

window.switchLang = function (lang) {
  let language = lang.toLowerCase();
  toStorage('selectedLanguage', language);
  selectedLanguage = language;
  updateLanguageKeys();
}

window.cyclic_language = function () {
  let index = 0;

  setInterval(function () {
    switchLang(supportedLanguages[index]);
    index = (index + 1) % supportedLanguages.length;
  }, 1000);
}