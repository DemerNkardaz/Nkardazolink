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
  languageLoaded(function () {
    $('item-prop').eq(0).click();
  });
}



/* ------------------- SELECTS ------------------- */



/* ------------------- TOOLTIPS ------------------- */
languageLoaded(function () {/*
  function tooltipOperations(target) {
    const key = target.attr('tooltip_key');
    const pos = target.attr('tooltip_pos');

    if (target.attr('data-tooltip_id') && target.attr('data-tooltip_id') === $('tooltip-element').attr('id')) {
      return;
    }

    const uniqId = 'tooltip-' + Math.random().toString(36).replace(/[.,]/g, '') + Math.floor(Math.random() * 1000);
    const tooltip = new tooltip_element({ tooltip: cLang[key] ? cLang[key] : key, tooltip_key: cLang[key] ? key : null, tooltip_pos: pos, id: uniqId });

    function calcTooltipPos(id) {
      const tooltip = $(`#${id}`);
      const parent = $(`[data-tooltip_id="${id}"]`);

      const parentOffset = parent.offset();
      const parentPosition = parent.position();
      let calc_pos;

      if (pos === 'bottom') {
        calc_pos = { top: parentPosition.top + parent.outerHeight(true) + 15, left: parentOffset.left + parent.outerWidth(true) / 2 - tooltip.outerWidth(true) / 2 }
      } else if (pos === 'top') {
        calc_pos = { top: parentPosition.top - tooltip.outerHeight(true) - 15, left: parentOffset.left + parent.outerWidth(true) / 2 - tooltip.outerWidth(true) / 2 }
      } else if (pos === 'left') {
        calc_pos = { top: parentPosition.top + parent.outerHeight(true) / 2 - tooltip.outerHeight(true) / 2, left: parentOffset.left - tooltip.outerWidth(true) - 15 }
      } else if (pos === 'right') {
        calc_pos = { top: parentPosition.top + parent.outerHeight(true) / 2 - tooltip.outerHeight(true) / 2, left: parentOffset.left + parent.outerWidth(true) + 15 }
      };

      tooltip.css({
        top: calc_pos.top,
        left: calc_pos.left
      });
    };

    target.attr('data-tooltip_id', uniqId)
    $('body').append(tooltip);
    calcTooltipPos(uniqId);
    $(`#${uniqId}`).addClass('show').transition({ opacity: 1}, 300);
  };

  pageTriggerCallback(function () {
    let tooltipElement = $('[tooltip_key]');
    $('*').filter(function () {
      return this.shadowRoot !== null;
    }).each(function () {
      $(this.shadowRoot).find('[tooltip_key]').each(function () {
        this.addEventListener('mouseenter', function () {
          tooltipOperations($(this));
        });
      });
    });
    tooltipElement.each(function () {
      this.addEventListener('mouseenter', function () {
        tooltipOperations($(this));
      })
    })
  });*/

  function tooltipOperations(target) {
    const key = target.getAttribute('tooltip_key');
    const pos = target.getAttribute('tooltip_pos');

    if (document.querySelector(`[id="${target.getAttribute('data-tooltip_id')}"]`)) {
      return;
    }

    const uniqId = 'tooltip-' + Math.random().toString(36).replace(/[.,]/g, '') + Math.floor(Math.random() * 1000);
    const tooltip = new tooltip_element({ tooltip: cLang[key] ? cLang[key] : key, tooltip_key: cLang[key] ? key : null, tooltip_pos: pos, id: uniqId });

    function calcTooltipPos(id) {
      const tooltip = document.getElementById(id);
      const parent = document.querySelector(`[data-tooltip_id="${id}"]`) || target.closest('[data-tooltip_id]');

      const parentOffset = parent.getBoundingClientRect();
      const parentPosition = parentOffset;
      let calc_pos;

      if (pos === 'bottom') {
        calc_pos = { top: parentPosition.top + parent.offsetHeight + 15, left: parentOffset.left + parent.offsetWidth / 2 - tooltip.offsetWidth / 2 }
      } else if (pos === 'top') {
        calc_pos = { top: parentPosition.top - tooltip.offsetHeight - 15, left: parentOffset.left + parent.offsetWidth / 2 - tooltip.offsetWidth / 2 }
      } else if (pos === 'left') {
        calc_pos = { top: parentPosition.top + parent.offsetHeight / 2 - tooltip.offsetHeight / 2, left: parentOffset.left - tooltip.offsetWidth - 15 }
      } else if (pos === 'right') {
        calc_pos = { top: parentPosition.top + parent.offsetHeight / 2 - tooltip.offsetHeight / 2, left: parentOffset.left + parent.offsetWidth + 15 }
      };

      tooltip.style.top = calc_pos.top + 'px';
      tooltip.style.left = calc_pos.left + 'px';
    };

    target.setAttribute('data-tooltip_id', uniqId);
    document.body.appendChild(tooltip);
    calcTooltipPos(uniqId);
    document.getElementById(uniqId).classList.add('show');
    document.getElementById(uniqId).style.opacity = 1;

  };

  window.updateTooltipPos = function() {
  const tooltips = document.querySelectorAll('[data-tooltip_id]');

  tooltips.forEach(tooltip => {
    const tooltipId = tooltip.getAttribute('data-tooltip_id');
    const target = document.getElementById(tooltipId);
    const pos = target.getAttribute('tooltip_pos');

    if (target) {
      calcTooltipPos(tooltipId, pos);
    }
  });
  };
  
  let timers_array = {};
  function tooltipLeave(target) {
    const targetTooltipOwner = target.getAttribute('data-tooltip_id');
    const targetTooltip = document.querySelector(`[id="${targetTooltipOwner}"]`);
    if (targetTooltip && targetTooltip !== null) {
      const timer = setTimeout(function () {
        const onProgress = new Promise((resolve) => {
          targetTooltip.style.opacity = 0;
          resolve();
        });

        onProgress.then(() => {
          setTimeout(() => targetTooltip.remove(), 320);
        });

      }, 300);
      timers_array[targetTooltipOwner] = timer;
    }
  };

  pageTriggerCallback(function () {
    const tooltipParent = document.querySelectorAll('[tooltip_key]');
    document.querySelectorAll('*').forEach(function (el) {
      if (el.shadowRoot !== null) {
        el.shadowRoot.querySelectorAll('[tooltip_key]').forEach(function (shadowEl) {
          shadowEl.addEventListener('mouseenter', function () {
            tooltipOperations(shadowEl);
          });
          shadowEl.addEventListener('mouseleave', function () {
            tooltipLeave(shadowEl);
          })
        });
      }
    });

    tooltipParent.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        tooltipOperations(el);
      });
      el.addEventListener('mouseleave', function () {
        tooltipLeave(el);
      })
    });
    
    document.addEventListener('mouseover', function (e) {
      let target = e.target;
      const tooltip = target.closest('tooltip-element');
      if (target.closest('tooltip-element')) {
        tooltip.style.opacity = 1;
        if (!tooltip.querySelector('.tl-close')) {
            tooltip.insertAdjacentHTML('beforeend', '<div class="tl-close">close</div>');
        }
        clearTimeout(timers_array[tooltip.getAttribute('id')]);
      };
    });

    document.addEventListener('click', function (e) {
      let target = e.target;
      if (target.classList.contains('tl-close')) {
        const tooltipElement = target.closest('tooltip-element');
        const uniqId = tooltipElement.getAttribute('id');
        const tooltipOwner = document.querySelector(`[data-tooltip_id="${uniqId}"]`);
        
        tooltipElement.style.opacity = 0;
        setTimeout(function () {
          tooltipElement.remove();
          if (tooltipOwner) {
            tooltipOwner.removeAttribute('data-tooltip_id');
          }
        }, 300);
      }
    });
  });
/*
  $(document).on('mouseenter', '[tooltip_key]', function () {
    var key = $(this).attr('tooltip_key');
    var pos = $(this).attr('tooltip_pos');

    var uniqId = 'tooltip-' + Math.random().toString(36).replace(/[.,]/g, '') + Math.floor(Math.random() * 1000);

    const tooltip = new tooltip_element({ tooltip: languageJSON[selectedLanguage][key] ? languageJSON[selectedLanguage][key] : key, tooltip_key: languageJSON[selectedLanguage][key] ? key : null, tooltip_pos: pos, id: uniqId });
    function calcTooltipPos(id) {
      var tooltip = $(`#${id}`);
      var parent = $(`[data-tooltip_id="${id}"]`);

      var parentOffset = parent.offset();
      var parentPosition = parent.position();
      var calc_pos;
      if (pos === 'bottom') {
        calc_pos = { top: parentPosition.top + parent.outerHeight(true) + 15, left: parentOffset.left + parent.outerWidth(true) / 2 - tooltip.outerWidth(true) / 2 }
      } else if (pos === 'top') {
        calc_pos = { top: parentPosition.top - tooltip.outerHeight(true) - 15, left: parentOffset.left + parent.outerWidth(true) / 2 - tooltip.outerWidth(true) / 2 }
      } else if (pos === 'left') {
        calc_pos = { top: parentPosition.top + parent.outerHeight(true) / 2 - tooltip.outerHeight(true) / 2, left: parentOffset.left - tooltip.outerWidth(true) - 15 }
      } else if (pos === 'right') {
        calc_pos = { top: parentPosition.top + parent.outerHeight(true) / 2 - tooltip.outerHeight(true) / 2, left: parentOffset.left + parent.outerWidth(true) + 15 }
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
  });*/

  //let timers_array = {};
/*
  $(document).on('mouseenter', 'tooltip-element', function () {
    $(this).css('opacity', 1);
    !$(this).find('.tl-close').length ? $(this).append(`
      <div class="tl-close">close</div>
      `
    ) : '';

    clearTimeout(timers_array[$(this).attr('id')]);
  });*/

  /*$(document).on('click', '.tl-close', function () {
    var uniqId = $(this).parent().attr('id');
    $(`#${uniqId}`).transition({ opacity: 0 }, 300);
    setTimeout(function () {
      $(`#${uniqId}`).remove();
      $(`[data-tooltip_id="${uniqId}"]`).removeAttr('data-tooltip_id');
    }, 300);
  });

  $(document).on('mouseleave', '[tooltip_key]', function () {
    var uniqId = $(this).attr('data-tooltip_id');
    $(`#${uniqId}`).transition({ opacity: 0 }, 300);
    const timer = setTimeout(function () {
      $(`#${uniqId}`).remove();
      $(`[data-tooltip_id="${uniqId}"]`).removeAttr('data-tooltip_id');
    }, 13040);

    timers_array[uniqId] = timer;
  });*/

  $(document).on('mouseenter', '.foot-note', function () {
    var key = $(this).attr('key');
    var target = $(`[tooltip_key="${key}"]`);

    target ? (target.addClass('show_note'), $(this).addClass('show_note')) : '';
  });

  $(document).on('click', '.foot-note', function () {
    var key = $(this).attr('key');
    var target = $(`[tooltip_key="${key}"]`);
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
      $(`[tooltip_key]`).removeClass('show_note');
      $(this).removeClass('show_note');
    }
  });
});
/* ------------------- TOOLTIPS ------------------- */


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
  var storedCommands = JSON.parse(fromStorage('latestCommands'));
  var limit_commands = 40;
  if (storedCommands.length > limit_commands) {
    storedCommands = storedCommands.slice(storedCommands.length - limit_commands);
    toStorage('latestCommands', JSON.stringify(storedCommands));
  }
}

window.clrcm = function () {
  removeStorage('latestCommands');
  return 'Latest commands cleared'
};
window.shwcm = function () {
  return fromStorage('latestCommands').replace('[', '').replace(']', '').replace(/"/g, '');
};
window.helpcmd = function () {
  return (`
  The console commands is:<br>
  shwcm() — show latest commands;<br>
  clrcm() — clear latest commands;<br>
  `).replace(/\n/g, '');
}


$(document).on('keydown', 'run-cmd .cmd_line textarea', function (e) {
  var getParentCMDID = $(this).parents('run-cmd').attr('id');
  var InputCMDField = $(this).parents('.cmd_input');
  if (!(e.shiftKey && e.which === 13) && e.which === 13) {
    e.preventDefault();
    const inputValue = $(this).val();
    $(`<span class="console_send"><span>${inputValue}</span></span>`).insertBefore($(`#${getParentCMDID}`).find('.cmd_line'));

    let existingCommands = JSON.parse(fromStorage('latestCommands')) || [];
    inputValue.length > 0 ? existingCommands = [...existingCommands, inputValue] : '';
    toStorage('latestCommands', JSON.stringify(existingCommands));
    clearOldCommand();
    try {
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
  var storedCommands = JSON.parse(fromStorage('latestCommands'));
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

$(document).on('click', '.trackProgress', function (e) {
  var offset = $(this).offset();
  var clickX = e.pageX - offset.left;
  var trackWidth = $(this).width();
  var percent = (clickX / trackWidth) * 100;
  var currentTime = (percent / 100) * ambient.duration();
  ambient.seek(currentTime);

  $('.trackTime').text(`${ambientTrackTime('current')} / ${ambientTrackTime()}`);
  $('.trackProgress').css('--progress', `${ambientTrackProgress()}%`);
});
/* ------------------- MUSIC CONTOLS ------------------- */



/* ------------------- OTHER BINDS ------------------- */

$(document).on('click', '.personBannerWrapper, .personAvatar', function () {
  $(this).addClass('clicked');
  setTimeout(() => {
    $(this).removeClass('clicked');
  }, 200);
});


/* ------------------- OTHER BINDS ------------------- */