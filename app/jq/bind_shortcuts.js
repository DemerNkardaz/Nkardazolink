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
$(document).on('click', 'body', function () {
  $('[tabindex]').removeClass('on_focus');
});

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
    $('[tabindex]').removeClass('on_focus');
    $nextElement.focus().addClass('on_focus');
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

/* ------------------- SELECTS ------------------- */

if (savedSettings.save_selected_item !== 'true') {
  $(document).on('languageJSON_loaded', function () {
    $('item-prop').eq(0).click();
  });
}



/* ------------------- SELECTS ------------------- */



/* ------------------- TOOLTIPS ------------------- */

$(document).on('mouseenter', '[tooltip_key]', function () {
  var key = $(this).attr('tooltip_key');
  var pos = $(this).attr('tooltip_pos');

  var uniqId = 'tooltip-' + Math.random().toString(36).replace(/[.,]/g, '') + Math.floor(Math.random() * 1000);

  const tooltip = new tooltip_element({ tooltip: languageJSON[selectedLanguage][key], tooltip_key: key, tooltip_pos: pos, id: uniqId });
  function calcTooltipPos(id) {
    var tooltip = $(`#${id}`);
    var parent = $(`[data-tooltip_id="${id}"]`);

    var parentOffset = parent.offset();
    var calc_pos;
    if (pos === 'bottom') {
      calc_pos = { top: parentOffset.top + tooltip.outerHeight() - 5, left: parentOffset.left + parent.outerWidth() / 2 - tooltip.outerWidth() / 2 }
    } else if (pos === 'top') {
      calc_pos = { top: parentOffset.top - tooltip.outerHeight() - 25, left: parentOffset.left + parent.outerWidth() / 2 - tooltip.outerWidth() / 2 }
    } else if (pos === 'left') {
      calc_pos = { top: parentOffset.top + parent.outerHeight() / 2 - tooltip.outerHeight() / 2, left: parentOffset.left - tooltip.outerWidth() - 25 }
    } else if (pos === 'right') {
      calc_pos = { top: parentOffset.top + parent.outerHeight() / 2 - tooltip.outerHeight() / 2, left: parentOffset.left + parent.outerWidth() + 25 }
    }
    tooltip.css({
      top: calc_pos.top,
      left: calc_pos.left
    })
    
  }
  if ($(this).attr('data-tooltip_id') === $('tooltip-element').attr('id') ) {
    $(this).attr('data-tooltip_id', uniqId)
    $('body').append(tooltip);
    calcTooltipPos(uniqId);
    $(`#${uniqId}`).addClass('show').transition({ opacity: 1}, 300);
  }
});

var tooltipTimer;

$(document).on('mouseenter', 'tooltip-element', function () {
  $(this).css('opacity', 1);
});

$(document).on('mouseleave', '[tooltip_key], tooltip-element', function () {
  var uniqId = $(this).attr('data-tooltip_id');
  $(`#${uniqId}`).transition({ opacity: 0 }, 300);
  setTimeout(function () {
    $(`#${uniqId}`).remove();
    $(`[data-tooltip_id="${uniqId}"]`).removeAttr('data-tooltip_id');
  }, 400);
});

/* ------------------- TOOLTIPS ------------------- */