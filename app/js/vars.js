window.items = {};
window.selectedSiteSkin = (localStorage.getItem('selectedSiteSkin') ? localStorage.getItem('selectedSiteSkin') : '');
window.supportedLanguages = ['ru', "en", "ja", "zh", "ko", "vi"];
window.navigatorLanguage = window.supportedLanguages.includes(navigator.language.toLowerCase()) ? navigator.language.toLowerCase() : 'ja';
window.selectedLanguage = (localStorage.getItem('selectedLanguage') ? localStorage.getItem('selectedLanguage') : navigatorLanguage);

window.parseUrlParameter = function (name) {
  return new URLSearchParams(window.location.search).get(name)?.toLowerCase();
}

window.anUrlParameter = {
  mode: (parseUrlParameter('mode') ? parseUrlParameter('mode') : null),
  select: (parseUrlParameter('select') ? parseUrlParameter('select') : null)
}