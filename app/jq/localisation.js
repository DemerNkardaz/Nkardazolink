window.updateLanguageKeys = function () {
  var key_elements = $('[data-key]');
  key_elements.each(function () {
    $(this).html(languageJSON[selectedLanguage][$(this).attr('data-key')]);
  });
  $('html').attr('lang', selectedLanguage);
};

window.switchLang = function (lang) {
  var language = lang.toLowerCase();
  toStorage('selectedLanguage', language);
  selectedLanguage = language;
  updateLanguageKeys();
}

window.cyclic_language = function() {
  var languages = ['ru', 'en', 'ja', 'zh', 'ko', 'vi'];
  var index = 0;

  setInterval(function () {
    switchLang(languages[index]);
    index = (index + 1) % languages.length;
  }, 1000);
}