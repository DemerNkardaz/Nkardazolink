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
  $('#rootContainer').children().eq(1).remove();
  
  if (modeUrlPar === 'kamon') {
    window.titleMode = 'Мон-дзōсё | Галерея Монсё';
  }
  
  $('#rootContainer').append('<div id="galleryModeMainWrapper"></div>').children().eq(1).load('modes.html #galleryModeMainWrapper > *', function() {
    $('#titleMode').html(titleMode);
    window.setRLTBPositions();
    window.setWidthFromChildren();
  });



  $(document).on('mouseover', '#galleryInfoSelectedTitle', function(){
    var $element = $(this)[0];
    if ($element.offsetWidth < $element.scrollWidth) {
      $("#galleryFullTitle").addClass('active');
      $("#galleryFullTitle").text($element.textContent);
    }
  });
  $(document).on('mouseover', '[data-transcript]', function(){
    var transcript = $(this).attr('data-transcript');
      $("#galleryFullTitle").addClass('active');
      $("#galleryFullTitle").html(transcript);
  });


  $(document).on('mouseleave', '#galleryFullTitle', function(){
    $("#galleryFullTitle").removeClass('active');
    $("#galleryFullTitle").text('');
  });

  $(document).on('click', '#gallerySelectedItemImg', function(){
      var $this = $(this);
      var src = $this.attr('src');

      if (src.endsWith('.png')) {
        src = src.replace('.png', '.svg');
        $('[data-imgprop="SVG"]').css('display', 'block');
      } else if (src.endsWith('.svg')) {
        src = src.replace('.svg', '.png');
        $('[data-imgprop="SVG"]').css('display', 'none');
      }
      $this.attr('src', src);
  });

}



