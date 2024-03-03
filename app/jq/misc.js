$(document).ready(function () {
  if (scrollTopEntity.length > 0) {
    $(document).on('click', scrollTopEntity, function () {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 200) {
        scrollTopEntity.show();
      } else {
        scrollTopEntity.hide();
      }
    });
  }
});




window.gotoEntity = function(selector) {
  var $target = $(selector);
  if ($target.length && $target.is(':visible')) {
    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 'slow');
  }
};

