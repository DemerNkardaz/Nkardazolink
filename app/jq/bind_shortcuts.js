$(document).on('click', '[nk-page]', function (e) {
  e.preventDefault();
  var page = $(this).attr('nk-page');
  if (savedSettings.turn_off_preloader !== 'true') {
    ui_components.preloader('noscroll', () => {
      $('#preloader').css('opacity', 0).transition({ opacity: 1}, 300);
      setTimeout(function () {
        redirTo({ url: page });
      }, 1000);
    }, true);
  } else {
    redirTo({ url: page });
  }
})

$(document).on('click', 'item-prop', function () {
  var item = $(this).attr('item-prop');
  var entity = $(this).attr('PROP_ENTITY');

  $('item-prop').removeClass('selected');
  $(this).addClass('selected');


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


/* ------------------- INPUT SETTINGS ------------------- */


$(document).on('click', '[option_type="checkbox"]:not([disabled="true"])', function () {
  var value = $(this).attr('aria-checked');
  !$(this).parent().parent('settings-check') ? ($(this).attr('aria-checked', typeof value === 'undefined' ? 'true' : value === 'false' ? 'true' : 'false')) : null;
});

$(document).on('click', 'settings-check', function () {
  var setting = $(this).attr('nk-setting');
  var value = $(this).find('[option_type="checkbox"]:not([disabled="true"])').attr('aria-checked');
  var set_check = (typeof value === 'undefined' ? 'true' : value === 'false' ? 'true' : 'false');
  $(this).find('[option_type="checkbox"]').attr('aria-checked', set_check);
  saveSettings(setting, set_check);
});


/* ------------------- INPUT SETTINGS ------------------- */


/* ------------------- KEYBOARD SHORTCUTS ------------------- */

$(document).on('keydown', '[tabindex]', function(e) {
  if (e.which === 13) {
      $(this).click();
      return false;
  }
  var currentIndex = $('[tabindex]').index(this);
  var nextIndex;
  if (e.keyCode == 37 || e.keyCode == 38) {
    nextIndex = currentIndex - 1;
  } else if (e.keyCode == 39 || e.keyCode == 40) { 
    nextIndex = currentIndex + 1;
  }

  var $nextElement = $('[tabindex]').eq(nextIndex);
  if ($nextElement.length) {
    $nextElement.focus();
  }
});

$(document).on('mouseleave', 'item-prop', function () {
  $(this).blur();
});

/* ------------------- KEYBOARD SHORTCUTS ------------------- */

/* ------------------- LANGUAGE ------------------- */


$(document).on('click', '[language_selector]', function () {
  var lang = $(this).attr('language_selector');
  switchLang(lang);
});


/* ------------------- LANGUAGE ------------------- */