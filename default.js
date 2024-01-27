function siteTitleOnLang() {

    var userLanguage = navigator.language || navigator.userLanguage;

    if (userLanguage.toLowerCase() === 'ru') {
        $('#siteTitle').text('Нкардазолинк');
    } else {
        $('#siteTitle').text('Nkardazolink');
    }
}



$(document).ready(function () {
    siteTitleOnLang();
})