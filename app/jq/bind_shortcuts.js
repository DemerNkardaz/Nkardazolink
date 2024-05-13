$(document).on('click', '[nk-page]', function (e) {
  e.preventDefault();
  var page = $(this).attr('nk-page');
  if (nk.settingConfig.get('turn_off_preloader') !== true) {
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

$(document).on('click', '[nk-skin]', function () { 
  var skin = $(this).attr('nk-skin');
  var link = $('#skinLoader');
  link.attr('href', `app/style/skins/${skin}.css`);
  nk.setting('skin', skin).save();
  $(this).reapplyClass('active', '[nk-skin]');
});

$(document).on('click', '[nk-banner]', function () {
  var banner = $(this).attr('nk-banner');
  var target = $('[nk-banner="target"]');
  if (banner && banner !== 'target') {
    target.addClass(banner);
    nk.setting('current_banner', banner).save();
    $(this).reapplyClass('active', '[nk-banner]');
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
  //saveSettings(setting, set_check);
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


$(document).on('click', '[data-language_selector]', function () {
  const lang = $(this).attr('value').toLowerCase();
  $('[data-language_selector]').attr('data-language_selector', '');
  $(this).attr('data-language_selector', 'selected');
  nk.locale.switch(lang);
});


/* ------------------- LANGUAGE ------------------- */

/* ------------------- SELECTS ------------------- */

if (nk.settingConfig.get('save_selected_item') !== true) {
  $(document).on('full_data_loaded', function () {
    $('item-prop').eq(0).click();
  });
}



/* ------------------- SELECTS ------------------- */



/* ------------------- FOOTNOTE ------------------- */
$(document).on('mouseenter', '.foot-note', function () {
  var key = $(this).attr('key');
  var target = $(`[data-tooltip-key="${key}"]`);

  target ? (target.addClass('show_note'), $(this).addClass('show_note')) : '';
});

$(document).on('click', '.foot-note', function () {
  var key = $(this).attr('key');
  var target = $(`[data-tooltip-key="${key}"]`);
  var scroll_body = $(this).attr('scroll_body');
  (target && target.length ?
    (target.addClass('note_active show_note'),
      $(this).addClass('note_active show_note'),
      setTimeout(() => {
        target.removeClass('note_active show_note');
        $(this).removeClass('note_active show_note');
      }, 1000))
    : alert(`Таргет с ключом ${key} не найден`)
  );
  (scroll_body ? $(scroll_body).animate({ scrollTop: $(target).offset().top - $(scroll_body).offset().top / 2 }, 'slow', 'swing') : `alert('Скроллбади с ключом ${key} не найден')`);
  return false;
});


$(document).on('mouseleave', '.foot-note', function () {
  if (!$(this).hasClass('note_active')) {
    $(`[data-tooltip-key]`).removeClass('show_note');
    $(this).removeClass('show_note');
  }
});
/* ------------------- FOOTNOTE ------------------- */


/* ------------------- CONSOLE ------------------- */

$(document).on('keydown', function (e) {
  if (e.ctrlKey && e.which === 192) {
    var cmd = new consoleElement();
    $('body').append(cmd);
    return false;
  }
});
$(document).on('click', 'run-cmd .close', function () {
  $(this).parents('run-cmd').remove();
  return false;
})


$(document).on('mousedown', 'run-cmd', function () {
  var cmds = $('run-cmd');
  if (cmds.length > 0 && $(this).length > 0) {
    $(this).insertAfter(cmds.last());
  }
});

$(document).on('click', 'run-cmd .cmd_input', function (e) {
  if (!$(e.target).is('run-cmd .cmd_input span')) {
    $(this).closest('run-cmd').find('textarea').focus();
  }
  return false;
});

function clearOldCommand () {
  var storedCommands = JSON.parse(nk.store('latestCommands').load());
  var limit_commands = 40;
  if (storedCommands.length > limit_commands) {
    storedCommands = storedCommands.slice(storedCommands.length - limit_commands);
    nk.store('latestCommands', JSON.stringify(storedCommands)).save();
  }
}

window.clrcm = function () {
  nk.store('latestCommands').remove();
  return 'Latest commands cleared'
};
window.shwcm = function () {
  return nk.store('latestCommands').load().replace('[', '').replace(']', '').replace(/"/g, '');
};
window.helpcmd = function () {
  return (`<div>
  The console commands is:<br>
  /help — you already written this;<br>
  /story — show latest commands;<br>
  /clear — clear latest commands;<br>
  </div>`).replace(/\n/g, '');
}

const CMD_COMMANDS_LIBRARY = {
  '/clear': clrcm,
  '/help': helpcmd,
  '/story': shwcm
  
}

$(document).on('keydown', 'run-cmd .cmd_line textarea', function (e) {
  var getParentCMDID = $(this).parents('run-cmd').attr('id');
  var InputCMDField = $(this).parents('.cmd_input');
  if (!(e.shiftKey && e.which === 13) && e.which === 13) {
    e.preventDefault();
    const inputValue = $(this).val();
    $(`<span class="console_send"><span>${inputValue}</span></span>`).insertBefore($(`#${getParentCMDID}`).find('.cmd_line'));

    let existingCommands = JSON.parse(nk.store('latestCommands').load()) || [];
    inputValue.length > 0 ? existingCommands = [...existingCommands, inputValue] : '';
    nk.store('latestCommands', JSON.stringify(existingCommands)).save();
    clearOldCommand();
    try {
      if (inputValue in CMD_COMMANDS_LIBRARY) {
        CMD_COMMANDS_LIBRARY[inputValue]();
        $(`<span class="console_response"><span>${CMD_COMMANDS_LIBRARY[inputValue]()}</span></span>`).insertBefore($(`#${getParentCMDID}`).find('.cmd_line'));
        $(this).val('').trigger('input');
        return;
      }
      eval(inputValue);
      function getConsoleResponse() {
        return (inputValue.length > 0 ? JSON.stringify(eval(inputValue)).replace(/\,/g, ', ').replace(/\:/g, ': ').replace(/"/g, '') : JSON.stringify(eval(inputValue)));
      }
      $(`<span class="console_response"><span>${getConsoleResponse()}</span></span>`).insertBefore($(`#${getParentCMDID}`).find('.cmd_line'));

    } catch (error) {
      console.error('Error executing command:', error);
      $(`<span class="console_response"><span>${error}</span></span>`).insertBefore($(`#${getParentCMDID}`).find('.cmd_line'));
    }
    
    $(this).val('').trigger('input');
    $(InputCMDField).animate({ scrollTop: $(InputCMDField).height() }, 0);
  }
  let storedCommands = JSON.parse(nk.store('latestCommands').load());
  if ((e.ctrlKey && e.which === 38)) {
    if (storedCommands.length > 1) {
      const currentIndex = storedCommands.indexOf($(this).val());
      const prevIndex = (currentIndex - 1 + storedCommands.length) % storedCommands.length;
      $(this).val(storedCommands[prevIndex]).trigger('input');
    } else {
      $(this).val(storedCommands[0]);
    }
  } else if (e.ctrlKey && e.which === 40) {
    if (storedCommands.length > 1) {
      const currentIndex = storedCommands.indexOf($(this).val());
      const nextIndex = (currentIndex + 1) % storedCommands.length;
      $(this).val(storedCommands[nextIndex]).trigger('input');
    } else {
      $(this).val(storedCommands[0]);
    }
  }
});

$(document).on('input', 'run-cmd textarea', function () {
  const index = $(this).val().split('\n').length;
  if (index > 1) {
    $(this).attr('rows', index);
  } else {
    $(this).attr('rows', 1);
  }
});

/* ------------------- CONSOLE ------------------- */

/* ------------------- MUSIC CONTOLS ------------------- */
$(document).on('click', '[nk-music="pause/play"]', function () {
  $(this).children().text(function (index, text) {
    return text === 'pause' ? 'play_arrow' : 'pause';
  }).each(function () {
    $(this).text() === 'pause' ? resumeAmbient() : pauseAmbient();
  });
});

$(document).on('click', '[nk-music="random"]', function () {
  randomAmbient();
})

$(document).on('click', '.track-info__player-progress', function (e) {
  var offset = $(this).offset();
  var clickX = e.pageX - offset.left;
  var trackWidth = $(this).width();
  var percent = (clickX / trackWidth) * 100;
  var currentTime = (percent / 100) * ambient.duration();
  ambient.seek(currentTime);

  $('.track-info__time').text(`${ambientTrackTime('current')} / ${ambientTrackTime()}`);
  $('.track-info__player-progress').css('--progress', `${ambientTrackProgress()}%`);
});
/* ------------------- MUSIC CONTOLS ------------------- */


/* ------------------- OPEN IMAGE IN LIGHTBOX ------------------- */

function bornLightbox(array) {
  if (array.target.length > 0) {
    let boxEntity;
    const cat = array.target.closest('[nk-pf]').getAttribute('nk-pf');
    const ent = array.target.getAttribute('ent_prop');
    $.each(portfolioJSON.root, function (_, category) {
      $.each(category.items, function (_, item) {
        if (category === cat && item.entity_prop === ent) {
          boxEntity = new nkUI.lightbox({
            Image: {
              src: item.img.src ? item.img.src : '',
              alt: item.img.alt ? item.img.alt : '',
              label: item.name ? item.name : null,
              labelKey : item.nameKey ? item.nameKey : null
            },
            Controls: item.extra ? {
              extra: {
                maxres: item.extra.maxres ? item.extra.maxres : null,
                pdf: item.extra.pdf ? item.extra.pdf : null,
                ytube: item.extra.ytube ? item.extra.ytube : null
              }
            } : null
          });
          return false;
        }
      });
      if (boxEntity) return false;
    });
    return boxEntity;
  }
}




/* ------------------- OPEN IMAGE IN LIGHTBOX ------------------- */


/* ------------------- OTHER BINDS ------------------- */

$(document).on('click', '.person-banner-wrapper, .person-avatar', function () { $(this).timedClass('clicked', 200) });


/* ------------------- OTHER BINDS ------------------- */