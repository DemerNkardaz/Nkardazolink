window.items = {};
window.selectedSiteSkin = (fromStorage('selectedSiteSkin') ? fromStorage('selectedSiteSkin') : '');
window.supportedLanguages = ['ru', "en", "ja", "zh", "ko", "vi"];
window.navigatorLanguage = window.supportedLanguages.includes(navigator.language.toLowerCase()) ? navigator.language.toLowerCase() : 'en';
window.selectedLanguage = (fromStorage('selectedLanguage') ? fromStorage('selectedLanguage') : navigatorLanguage);

window.parseUrlParameter = function (name) {
  return new URLSearchParams(window.location.search).get(name)?.toLowerCase();
}

window.anUrlParameter = {
  mode: (parseUrlParameter('mode') ? parseUrlParameter('mode') : null),
  select: (parseUrlParameter('select') ? parseUrlParameter('select') : null)
}
