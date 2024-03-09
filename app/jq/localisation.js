window.updateItemsLanguage = function () {
  var item_props = $('item-prop');

  item_props.each(function () {
    if ($(this).attr('prop_class') === 'kamon') {
      var shadowRoot = this.shadowRoot;
      $(shadowRoot).find('.item_title_text').html("тест");
    }
  });
}

window.updateLanguageKeys = function () {
  var key_elements = $('[data-key]');
  function update () {
    key_elements.each(function () {
      var key = $(this).attr('data-key');
      var getLocale = languageJSON[selectedLanguage][key];
      if (!getLocale) {
        for (var lang in languageJSON) {
          if (languageJSON[lang][key]) {
            getLocale = languageJSON[lang][key];
            break;
          }
        }
      }

      getLocale = (getLocale ? textUnPacker(getLocale) : null);

      $(this).html(getLocale);
    });
  } update();

  $('*').filter(function () {
    return this.shadowRoot !== null;
  }).each(function () {
    key_elements = $(this.shadowRoot).find('[data-key]');
    update();
  });
  $('html').attr('lang', selectedLanguage);
};

window.switchLang = function (lang) {
  var language = lang.toLowerCase();
  toStorage('selectedLanguage', language);
  selectedLanguage = language;
  updateLanguageKeys();
}

window.cyclic_language = function () {
  var index = 0;

  setInterval(function () {
    switchLang(supportedLanguages[index]);
    index = (index + 1) % supportedLanguages.length;
  }, 1000);
}

$(document).on('languageJSON_loaded', function () {
  updateLanguageKeys();
})


function create_selector () {
  return `<select>
    <option value="ru">Русский</option>
    <option value="en">English</option>
  </select>`
}

const test_html = `
  <div>
    ${create_selector()}
    ${create_selector()}
    ${create_selector()}
    ${create_selector()}
  </div>
`


$(`body`).append(test_html)