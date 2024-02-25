const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode')?.toLowerCase();
const sel = urlParams.get('sel')?.toLowerCase();

window.clearModesURL = function() {
    var currentUrl = location.href;
    var urlWithoutParams = currentUrl.split('?')[0];
    window.open(urlWithoutParams);
}

if (mode === 'cv') {
  /*
  $(document).ready(function () {
    var userLanguage = navigator.language || navigator.userLanguage;
    if (userLanguage.toLowerCase() === 'ru') {
      $('title').text('Демер Нкардаз・2D/3D Художник');
    } else {
      $('title').text('Demer Nkardaz・2D/3D Artist');
    }
    $('meta[name="description"]').attr('content', 'CV Демера Нкардаза, художника в областях 2D/3D');
    $('meta[property="og:url"]').attr('content', 'https://demernkardaz.github.io/Nkardazolink?mode=CV');
    $('meta[property="og:title"]').attr('content', 'Демер Нкардаз・2D/3D Художник');
    $('meta[property="og:description"]').attr('content', 'CV Демера Нкардаза, художника в областях 2D/3D');
    $('meta[property="og:image"]').attr('content', 'https://demernkardaz.github.io/Nkardazolink/resources/seo/img_cv.png');

    $('meta[property="twitter:url"]').attr('content', 'https://demernkardaz.github.io/Nkardazolink?mode=CV');
    $('meta[name="twitter:title"]').attr('content', 'Демер Нкардаз・2D/3D Художник');
    $('meta[name="twitter:description"]').attr('content', 'CV Демера Нкардаза, художника в областях 2D/3D');
    $('meta[name="twitter:image"]').attr('content', 'https://demernkardaz.github.io/Nkardazolink/resources/seo/img_cv_en.png');
  });
  */


  $('#miniFolioBlock').remove();
  $('#personLinksBlock').remove();
  $('.personFlexButton').remove();
  $('.personKamon').remove();
  $('#personInformationBlock').children('.personDescription').eq(0).children().remove();
  $('#personBlock').children('.blockumInformatorum').eq(0).remove();
  $('#personInformationBlock').addClass('cv_mode');
  $('#personName').parent().addClass('cv_mode');
  $('[data-key="SaitamaOnmyoji"]').after($('<span>').text('Bălți, Republica Moldova'));
  $('[data-key="SaitamaOnmyoji"').remove();

  var cv_description;
  var cv_contents;
  if (sel === '3d') {
    cv_description = '#cv_main_description_3d';
    cv_contents = '#cv_contents_3d';
  } else if (sel === '2d') {
    cv_description = '#cv_main_description_2d';
    cv_contents = '#cv_contents_2d';
  }
  
  $('#personInformationBlock').children('.personDescription').eq(0).load('cv.html ' + cv_description);
  $('#personInformationBlock').children('.personDescription').eq(0).clone().insertAfter('#personInformationBlock .personDescription:eq(0)').load('cv.html #cv_main_socials');
  $('#personInformationBlock').children('.personDescription').eq(0).clone().insertAfter('#personInformationBlock .personDescription:eq(1)').load('cv.html #cv_second_socials').addClass('cv_mode');


  $('#linkBlock').prepend('<div id="CVList" class="cv_page"><div id="CVListWrapper"></div></div>');
  $('#CVListWrapper').eq(0).load('cv.html ' + cv_contents);
}
