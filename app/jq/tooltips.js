pageTriggerCallback(function () {
  let tooltipParents = collectTargets('[tooltip_key]');
  let timers_array = {};
  let offsetInterval;
  let detectedTooltips = false;

  const tooltipOberserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const newTooltipParents = collectTargets('[tooltip_key]');

        if (!areCollectionsEqual(tooltipParents, newTooltipParents)) {
          tooltipParents = newTooltipParents;

          tooltipParents.off('mouseenter').off('mouseleave');
          tooltipParents.on('mouseenter', function () { tooltipOperations(this) });
          tooltipParents.on('mouseleave', function () { tooltipLeave(this) });

          console.buildType('[TOOLTIP] → Collection of tooltips is updated', 'warning');
        }
      }
    });
  });

  tooltipOberserver.observe(document, { childList: true, subtree: true });

  function areCollectionsEqual(collection1, collection2) {
    if (collection1.length !== collection2.length) {
      return false;
    }
    for (let i = 0; i < collection1.length; i++) {
      if (collection1[i] !== collection2[i]) {
        return false;
      }
    }
    return true;
  }



  function addEvent_TooltipClearTimer(target, owner) {
    const targetId = target.attr('id');;
    const ownerId = $(owner).attr('data-tooltip_id');
    const targetPromise = new Promise((resolve, reject) => {
      try {
        target.on('click', function (e) {
          if (!$(e.target).closest('.tl-close').length && ($(this).attr('data-prevent_close') === null || $(this).attr('data-prevent_close') === 'false' || $(this).attr('data-prevent_close') === undefined)) {
            $(this).attr('data-prevent_close', 'true').addClass('tl-pinned tl-highlight');
            setTimeout(() => $(this).removeClass('tl-highlight'), 150);
          }
        });
        target.on('mouseenter', function () {
          $(this).css('opacity', 1);
          !$(this).find('.tl-close').length ? $(this).append('<div class="tl-close">close</div>') : null;
          clearTimeout(timers_array[ownerId]);
        });
        target.on('mouseleave', function () {
          if ($(this).attr('data-prevent_close') !== 'true') {
            const timer = setTimeout(() => {
              const onProgress = new Promise((resolve) => { $(this).css('opacity', 0); resolve(); });
              onProgress.then(() => { setTimeout(() => $(this).remove(), 320); });
              $(ownerId).removeAttr('data-tooltip_id');
            }, 750);
            timers_array[ownerId] = timer;
          }
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    targetPromise.then(() => {
      target.on('click', '.tl-close', function () {
        $(this).parent().css('opacity', 0);
        setTimeout(() => {
          $(this).parent().remove();
          $(owner).removeAttr('data-tooltip_id');
        }, 300);
      });
    }).catch(function (error) {
      console.error(error);
    });
  };

  function tooltipLeave(target) {
    const ownerId = $(target).attr('data-tooltip_id');
    const childTooltipId = $(`#${ownerId}`);

    if (childTooltipId && childTooltipId !== null) {
      const timer = setTimeout(function () {
        const onProgress = new Promise((resolve) => { childTooltipId.css('opacity', 0); resolve(); });
        onProgress.then(() => { setTimeout(() => childTooltipId.remove(), 320); });
        $(target).removeAttr('data-tooltip_id');
      }, 300);

      timers_array[ownerId] = timer;
    }
  };


  function tooltipOperations(target) {
    const key = $(target).attr('tooltip_key');
    const pos = $(target).attr('tooltip_pos');

    if ($(`#${$(target).attr('data-tooltip_id')}`).length) {
      $(`#${$(target).attr('data-tooltip_id')}`).removeAttr('data-prevent_close');
      clearTimeout(timers_array[$(target).attr('data-tooltip_id')]);
      return;
    }

    const uniqId = 'tooltip-' + Math.random().toString(36).replace(/[.,]/g, '') + Math.floor(Math.random() * 1000);
    const tooltip = new tooltip_element({ tooltip: nkLocale.get(key) ? nkLocale.get(key) : key, tooltip_key: nkLocale.get(`c:${key}`) ? key : null, tooltip_pos: pos, id: uniqId });

    const tooltipBorn = new Promise((resolve, reject) => {
      try {
        $(target).attr('data-tooltip_id', uniqId);
        $('body').append(tooltip);
        calcTooltipPos(uniqId, pos, target);
        $(`#${uniqId}`).addClass('show');
        $(`#${uniqId}`).css('opacity', 1);

        resolve();
      } catch (error) {
        reject(error);
      }
    });

    tooltipBorn.then(function () {
      addEvent_TooltipClearTimer($(`#${uniqId}`), target);
      //console.buildType('[TOOLTIP] → Tooltip is created', 'success');
    }).catch(function (error) {
      console.error(error);
    });
  };

  function calcTooltipPos(id, pos, target) {
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

  function updateTooltipPos() {
    //! MAKE RESTRICTIONS ON WINDOW SIZE
    const tooltips = document.querySelectorAll('tooltip-element');

    tooltips.forEach(tooltip => {
      const id = tooltip.getAttribute('id');
      let target = document.querySelector(`[data-tooltip_id="${id}"]`);

      document.querySelectorAll('*').forEach(function (el) {
        if (el.shadowRoot !== null) {
          el.shadowRoot.querySelectorAll('[data-tooltip_id]').forEach(function (shadowEl) {
            if (shadowEl.getAttribute('data-tooltip_id') === id) {
              target = shadowEl;
            }
          });
        }
      });

      if (target) {
        const pos = target.getAttribute('tooltip_pos');
        calcTooltipPos(id, pos, target);
      }
    });
  };

  window.addEventListener('resize', updateTooltipPos);
  window.addEventListener('scroll', updateTooltipPos);

  const checkForLivingTooltips = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const tooltips = $('tooltip-element');
        if (tooltips.length > 0 && detectedTooltips === false) {
          //console.buildType('[TOOLTIP] → There are more tooltips', 'info');
          detectedTooltips = true;
          tooltipOffsetInterval();
        } else if (tooltips.length === 0 && detectedTooltips === true) {
          //console.buildType('[TOOLTIP] → No more tooltips', 'warning');
          detectedTooltips = false;
          tooltipOffsetInterval(true);
        } else {
          return;
        }
      }
    });
  });

  checkForLivingTooltips.observe(document.body, { childList: true, subtree: true });
  function tooltipOffsetInterval(close) { (close && close === true) ? clearInterval(offsetInterval) : offsetInterval = setInterval(updateTooltipPos, 50) };

  tooltipParents.on('mouseenter', function () { tooltipOperations(this) });
  tooltipParents.on('mouseleave', function () { tooltipLeave(this) });
    

});
