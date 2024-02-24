const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode')?.toLowerCase();

if (mode === 'cv') {
  $('#miniFolioBlock').remove();
  $('#personLinksBlock').remove();
  $('.personFlexButton').remove();
  $('#personName').parent().addClass('cv_mode');

  $('#personInformationBlock').children('.personDescription').eq(0).load('cv.html #cv_main_description');
  $('#personInformationBlock').children('.personDescription').eq(0).clone().insertAfter('#personInformationBlock .personDescription:eq(0)').load('cv.html #cv_main_socials');

}
