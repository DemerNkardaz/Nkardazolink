window.clearModesURL = function() {
    var currentUrl = location.href;
    var urlWithoutParams = currentUrl.split('?')[0];
    window.open(urlWithoutParams);
}

window.executeTooltipsCVLeft = function() {
      $('.cv_main_description [data-bs-toggle="tooltip"]').tooltip();
}

if (modeUrlPar === 'cv') {
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
  if (selUrlPar === '3d') {
    cv_description = '#cv_main_description_3d';
    cv_contents = '#cv_contents_3d';
  } else if (selUrlPar === '2d') {
    cv_description = '#cv_main_description_2d';
    cv_contents = '#cv_contents_2d';
  }
  
  $('#personInformationBlock').children('.personDescription').eq(0).load('cv.html ' + cv_description);
  $('#personInformationBlock').children('.personDescription').eq(0).clone().insertAfter('#personInformationBlock .personDescription:eq(0)').load('cv.html #cv_main_socials');
  $('#personInformationBlock').children('.personDescription').eq(0).clone().insertAfter('#personInformationBlock .personDescription:eq(1)').load('cv.html #cv_second_socials').addClass('cv_mode');


  $('#linkBlock').prepend('<div id="CVList" class="cv_page"><div id="CVListWrapper"></div></div>');
  $('#CVListWrapper').eq(0).load('cv.html ' + cv_contents);
  $(document).ready(function(){
    executeTooltipsCVLeft();
  });
}

window.titleMode = '';
if (modeUrlPar === 'kamon' || modeUrlPar === 'pattern' || modeUrlPar === 'mods' || modeUrlPar === 'webs') {
  $('#personBlock').children().remove();
  $('#personLinksBlock').remove();

  $('#linkBlock').addClass('galleryMode');

  $('#rootContainer > .contentContainerBlock').append($('#personBlock'));
  $('#personBlock').addClass('kamon_mode');

  if (modeUrlPar === 'kamon') {
    window.titleMode = 'Мон-дзōсё | Галерея Монсё';

    $('[data-key="DemerNkardaz"]').attr('id', 'SelectedEntityTitle').removeAttr('data-key').text('Мару-ни мицуаой').attr('data-key', 'Mon_Tokugawa_Title');
    $('[data-key="SaitamaOnmyoji"]').attr('id', 'SelectedEntitySubTitle').removeAttr('data-key').text('Камон рода Токугава').attr('data-key', 'Mon_Tokugawa');
  }

  $('#linkBlock').prepend('<div class="modeGalleryWrapper"></div>').find('.modeGalleryWrapper').load('modes.html #titleModeNBack', function() {
    $('#titleMode').html(titleMode);
  });

}