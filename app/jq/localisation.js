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
  key_elements.each(function () {
    var key = $(this).attr('data-key');
    var getLocale = languageJSON[selectedLanguage][key];
    
    if (Array.isArray(getLocale)) {
      getLocale = getLocale.join('\n');
    }
    var getLocale = (getLocale ? textUnPacker(getLocale) : null);
    
    $(this).html(getLocale);
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
  var languages = ['ru', 'en', 'ja', 'zh', 'ko', 'vi'];
  var index = 0;

  setInterval(function () {
    switchLang(languages[index]);
    index = (index + 1) % languages.length;
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