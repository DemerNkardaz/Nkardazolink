window.items = {};
window.selectedSiteSkin = (localStorage.getItem('selectedSiteSkin') ? localStorage.getItem('selectedSiteSkin') : '');
window.supportedLanguages = ['ru', "en", "jp", "zh", "ko", "vi"];
window.navigatorLanguage = window.supportedLanguages.includes(window.navigator.language.toLowerCase()) ? window.navigator.language.toLowerCase() : 'en';
window.selectedLanguage = (localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : navigatorLanguage);

window.parseUrlParameter = function (name) {
  return new URLSearchParams(window.location.search).get(name)?.toLowerCase();
}

window.anUrlParameter = {
  mode: (parseUrlParameter('mode') ? parseUrlParameter('mode') : null),
  select: (parseUrlParameter('select') ? parseUrlParameter('select') : null)
}