$(document).on('click', '[nk-page]', function (e) {
  e.preventDefault();
  var page = $(this).attr('nk-page');

  $('body').insertFrom('preloader', '#preloader').then(function ($clonedElement) {
    $clonedElement.hide().fadeIn('fast');
    $('body').prepend($clonedElement);
    initPreloader('noscroll');
    setTimeout(function () {
      redirTo({ url: page });
    }, 1000);
  });
})

$(document).on('click', '[nk-item]', function () {
  var item = $(this).attr('nk-item');
  var entity = $(this).attr('entity');
  if (savedSettings.save_selected_item === 'true') {
    if (entity) {
      if (item === 'kamon') {
        toStorage('selectedItems.kamon', entity);
      } else if (item === 'banners') {
        toStorage('selectedItems.banners', entity);
      } else if (item === 'clans') {
        toStorage('selectedItems.clans', entity);
      } else if (item === 'pattern') {
        toStorage('selectedItems.pattern', entity);
      }
    }
  }
});

$(document).on('click', '[nk-skin]', function () { 
  var skin = $(this).attr('nk-skin');
  var link = $('#skinLoader');
  link.attr('href', `app/style/skins/${skin}.css`);
  toStorage('selectedSiteSkin', skin);
  $('[nk-skin]').removeClass('active');
  $(this).addClass('active');
});

$(document).on('click', '[nk-banner]', function () {
  var banner = $(this).attr('nk-banner');
  var target = $('[nk-banner="target"]');
  if (banner && banner !== 'target') {
    target.addClass(banner);
    toStorage('selectedBanner', banner);
    $('[nk-banner]').removeClass('active');
    $(this).addClass('active');
  }
});