function siteTitleOnLang() {

    var userLanguage = navigator.language || navigator.userLanguage;

    if (userLanguage.toLowerCase() === 'ru') {
        $('#siteTitle').text('Нкардазолинк');
    } else {
        $('#siteTitle').text('Nkardazolink');
    }
}


function updateSvgStyles() {
    var $personBanner = $('#personBanner');
    var svgBackgroundScale = $personBanner.css('--svg_background-scale');
    var svgBackgroundColor = $personBanner.css('--svg_background-color');
    var svgBackgroundRotate = $personBanner.css('--svg_background-rotate');

    $personBanner.css('--svg_background', 'scale(' + svgBackgroundScale + ') rotate(' + svgBackgroundRotate + ')');
    $personBanner.css('--pattern_color', svgBackgroundColor);
}


$(document).ready(function () {
    siteTitleOnLang();


    updateSvgStyles();

    $('#personBanner').on('change', function () {
        updateSvgStyles();
    });

})