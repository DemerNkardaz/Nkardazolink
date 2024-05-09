let privateConfig = {
  'enabled': true,
  'animation': 'default',
  'observe': true,
};

if ($Setting('enableTooltips').load() === 'false') privateConfig['enabled'] = false;

window.nkTooltips = {};
nkTooltips.opts = function (config) {
  for (let key in config) {
    privateConfig[key] = config[key];
    if (key === 'enabled') {
      if (config[key] === false) {
        $Setting('enableTooltips').save(false);
      }
    }
  }
  console.log(privateConfig);
};



pageTriggerCallback(function () {
  let tooltipParents = collectTargets('[data-tooltip-key]');
  let tooltipParentsIdes = collectTargets('[data-tooltip-id]');
  let timers_array = {};
  let offsetInterval;
  let detectedTooltips = false;

  const tooltipObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' || mutation.type === 'childList') {
        const newTooltipParents = collectTargets('[data-tooltip-key]');
        const newTooltipParentsIdes = collectTargets('[data-tooltip-id]');

        if (!areCollectionsEqual(tooltipParentsIdes, newTooltipParentsIdes)) {
          tooltipParentsIdes = newTooltipParentsIdes;
        }

        if (!areCollectionsEqual(tooltipParents, newTooltipParents)) {
          tooltipParents = newTooltipParents;

          tooltipParents.off('mouseenter').off('mouseleave');
          tooltipParents.on('mouseenter', function () { tooltipOperations(this) });
          tooltipParents.on('mouseleave', function () { tooltipLeave(this) });

  
          console.buildType('[TOOLTIP] → Collection of tooltips is updated', 'warning');
        }
        
        const tooltipElements = $('tooltip-element');
        tooltipElements.each(function () {
          const tooltipId = $(this).attr('id');
          const found = tooltipParentsIdes.toArray().some(parent => parent.getAttribute('data-tooltip-id') === tooltipId);
          if (!found) {
            $(this).css('opacity', 0);
            setTimeout(() => {
              $(this).remove();
            }, 300);
          }
        });
        
      }
    });
  });

  tooltipObserver.observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-tooltip-key'] });

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
    const ownerId = $(owner).attr('data-tooltip-id');
    const targetPromise = new Promise((resolve, reject) => {
      try {
        target.on('mousedown', function () { if (!$(this).hasClass('tl-highlight') && !$(this).attr('data-prevent_close')) { $(this).addClass('tl-highlight') } });
        //target.on('mousemove', function () { if ($(this).hasClass('tl-highlight')) { $(this).removeClass('tl-highlight') } });
        target.on('click', function (e) {
          if ($(this).hasClass('tl-highlight')) { $(this).removeClass('tl-highlight') }
          if (!$(e.target).closest('.tl-close').length && ($(this).attr('data-prevent_close') === null || $(this).attr('data-prevent_close') === 'false' || $(this).attr('data-prevent_close') === undefined)) {
            $(this).attr('data-prevent_close', 'true').addClass('tl-pinned tl-highlight');
            setTimeout(() => $(this).removeClass('tl-highlight'), 100);
          }
          if (!$(this).find('.tl-close').length) {
            $(this).append('<div class="tl-close">close</div>');
          }
        });
        target.on('mouseenter', function () {
          $(this).css('opacity', 1);
          (!$(this).find('.tl-close').length && !$(this).find('tooltip-preview').length) ? $(this).append('<div class="tl-close">close</div>') : null;
          clearTimeout(timers_array[ownerId]);
        });
        target.on('mouseleave', function () {
          if ($(this).attr('data-prevent_close') !== 'true') {
            const timer = setTimeout(() => {
              const onProgress = new Promise((resolve) => { $(this).css('opacity', 0); resolve(); });
              onProgress.then(() => { setTimeout(() => $(this).remove(), 320); });
              $(ownerId).removeAttr('data-tooltip-id').removeAttr('aria-describedby');
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
          $(owner).removeAttr('data-tooltip-id').removeAttr('aria-describedby');
        }, 300);
      });
    }).catch(function (error) {
      console.error(error);
    });
  };

  function tooltipLeave(target) {
    const ownerId = $(target).attr('data-tooltip-id');
    const childTooltipId = $(`#${ownerId}`);

    if (childTooltipId && childTooltipId !== null) {
      const timer = setTimeout(function () {
        const onProgress = new Promise((resolve) => { childTooltipId.css('opacity', 0); resolve(); });
        onProgress.then(() => { setTimeout(() => childTooltipId.remove(), 320); });
        $(target).removeAttr('data-tooltip-id').removeAttr('aria-describedby');
      }, 300);

      timers_array[ownerId] = timer;
    }
  };



  function tooltipOperations(target) {
    const key = $(target).attr('data-tooltip-key');
    const pos = $(target).attr('data-tooltip-pos') || 'top';
    const role = $(target).attr('data-tooltip-role') || null;
    const href = $(target).attr('href') || null;
    const hrefTarget = $(target).attr('target') || null;
    const customs = $(target).attr('data-tooltip-customs') || null;
    const classes = $(target).attr('data-tooltip-classes') || null;
    let tooltip, previewEntity;

    if ($(`#${$(target).attr('data-tooltip-id')}`).length) {
      $(`#${$(target).attr('data-tooltip-id')}`).removeAttr('data-prevent_close');
      clearTimeout(timers_array[$(target).attr('data-tooltip-id')]);
      return;
    }

    //if ((key !== null || key !== undefined) && (pos === null || pos === undefined)) {
    //  console.buildType(`[TOOLTIP] → Can't create tooltip without position : [data-tooltip-pos] attribute not exists in <${$(target).tagName()}> with KEY “${key}”`, 'error');
    //  return;
    //}

    const uniqId = 'tooltip-' + Math.random().toString(36).replace(/[.,]/g, '') + Math.floor(Math.random() * 1000);

    if (role !== undefined && role === 'preview') {
      let previewParams = {};
      nkLocale.get(`check:${key}.preview.image.src`) ? (previewParams.image = { src: nkLocale.get(`${key}.preview.image.src`) }) : null;
      nkLocale.get(`check:${key}.preview.image.shift`) ? (previewParams.image.shift = nkLocale.get(`${key}.preview.image.shift`)) : null;
      nkLocale.get(`check:${key}.preview.image.h`) ? (previewParams.image.h = nkLocale.get(`${key}.preview.image.h`)) : null;
      nkLocale.get(`check:${key}.preview.content`) ? (previewParams.content = {
        text: nkLocale.get(`check:${key}.preview.content`),
        key: `${key}.preview.content`
      }) : null;
      nkLocale.get(`check:${key}.preview.subscript`) ? (previewParams.subscript = {
        text: nkLocale.get(`check:${key}.preview.subscript`),
        key: `${key}.preview.subscript`
      }) : null;
      href && (previewParams.link = {
        src: href,
        target: hrefTarget || '_blank'
      });
      previewEntity = new tooltip_preview(previewParams);
      tooltip = new tooltip_element({
        tooltip: previewEntity,
        tooltip_role: 'preview',
        tooltip_pos: pos, id: uniqId, tooltip_customs: customs ? customs : null, tooltip_classes: classes ? classes : null
      });
    } else {
      tooltip = new tooltip_element({
        tooltip: nkLocale.get(key) ? nkLocale.get(key) : key,
        tooltip_key: nkLocale.get(`${key}`) ? key : null,
        tooltip_pos: pos, id: uniqId, tooltip_customs: customs ? customs : null, tooltip_classes: classes ? classes : null
      });
    }

    const tooltipBorn = new Promise((resolve, reject) => {
      try {
        $(target).attr({ 'data-tooltip-id': uniqId, 'aria-describedby': uniqId });
        $('body').append(tooltip);
        calcTooltipPos(uniqId, pos, target);
        $(`#${uniqId}`).addClass('show');
        $(`#${uniqId}`).css('opacity', 1);
        //(role === 'preview') && $(`#${uniqId}`).find('.tl-content').html(previewEntity || 'No entity assigned');

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
  function isElementInViewport(el) {
    let isVisible = true;
    let parent = el.parentElement;
  
    while (parent !== null) {
      const parentRect = parent.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const parentStyle = window.getComputedStyle(parent);

      const parentOverflowX = parentStyle.overflowX;
      const parentOverflowY = parentStyle.overflowY;
      const parentScrollableX = parentOverflowX === 'auto' || parentOverflowX === 'scroll';
      const parentScrollableY = parentOverflowY === 'auto' || parentOverflowY === 'scroll';

      if (parentScrollableX && (elRect.left < parentRect.left || elRect.right > parentRect.right)) {
        isVisible = false;
        break;
      }

      if (parentScrollableY && (elRect.top < parentRect.top || elRect.bottom > parentRect.bottom)) {
        isVisible = false;
        break;
      }

      parent = parent.parentElement;
    }
    if (isVisible) {
      const rect = el.getBoundingClientRect();
      const buffer = 100;
      isVisible = (
        rect.top >= -(el.offsetHeight + buffer) &&
        rect.left >= -(el.offsetWidth + buffer) &&
        rect.bottom <= (window.innerHeight + (el.offsetHeight + buffer) || document.documentElement.clientHeight + (el.offsetHeight + buffer)) &&
        rect.right <= (window.innerWidth + (el.offsetWidth + buffer) || document.documentElement.clientWidth + (el.offsetWidth + buffer))
      );
    }
    return isVisible;
  }

function calcTooltipPos(id, pos) {
  const tooltip = document.getElementById(id);
  const parent = tooltipParents.toArray().find(parent => parent.getAttribute('data-tooltip-id') === id);

  const parentOffset = parent.getBoundingClientRect();
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const children = $(tooltip).children('.tl-arrow');
  let calc_pos;

  const defCalcs = {
    bottom: { top: parentOffset.top + parent.offsetHeight + 15, left: parentOffset.left + parent.offsetWidth / 2 - tooltip.offsetWidth / 2 },
    top: { top: parentOffset.top - tooltip.offsetHeight - 15, left: parentOffset.left + parent.offsetWidth / 2 - tooltip.offsetWidth / 2 },
    left: { top: parentOffset.top + parent.offsetHeight / 2 - tooltip.offsetHeight / 2, left: parentOffset.left - tooltip.offsetWidth - 15 },
    right: { top: parentOffset.top + parent.offsetHeight / 2 - tooltip.offsetHeight / 2, left: parentOffset.left + parent.offsetWidth + 15 }
  };

  if (pos.includes('-start')) {
    pos = pos.split('-')[0];
    if (pos === 'bottom' || pos === 'top') {
      defCalcs[pos].left = parentOffset.left - 12;
    } else {
      defCalcs[pos].top = parentOffset.top - tooltipHeight + 33;
    }
  } else if (pos.includes('-end')) {
    pos = pos.split('-')[0];
    if (pos === 'bottom' || pos === 'top') {
      defCalcs[pos].left = parentOffset.left + parent.offsetWidth - tooltipWidth + 18;
    } else {
      defCalcs[pos].top = parentOffset.top + parent.offsetHeight - 34;
    }
  }

  function returnPoses() {
    if (pos === 'bottom') {
      if ((defCalcs.bottom.top + tooltipHeight) > window.innerHeight) {
        calc_pos = defCalcs.top;
        children.attr('data-parent-tooltip-pos', 'top');
      } else {
        calc_pos = defCalcs.bottom;
      }
    } else if (pos === 'top') {
      if (defCalcs.top.top < 5) {
        calc_pos = defCalcs.bottom;
        children.attr('data-parent-tooltip-pos', 'bottom');
      } else {
        calc_pos = defCalcs.top;
      }
    } else if (pos === 'left') {
      if (defCalcs.left.left < 5) {
        calc_pos = defCalcs.right;
        children.attr('data-parent-tooltip-pos', 'right');
      } else {
        calc_pos = defCalcs.left;
      }
    } else if (pos === 'right') {
      if (defCalcs.right.left + tooltipWidth > window.innerWidth) {
        calc_pos = defCalcs.left;
        children.attr('data-parent-tooltip-pos', 'left');
      } else {
        calc_pos = defCalcs.right;
      }
    }
  }

  returnPoses();

  const ownerId = tooltipParents.toArray().find(parent => parent.getAttribute('data-tooltip-id') === id);
  if (ownerId) {
    const owner = ownerId;
    let ownerVisible = isElementInViewport(owner);
    if (!ownerVisible) {
      const timer = setTimeout(() => {
        const onProgress = new Promise((resolve) => { $(tooltip).css('opacity', 0); resolve(); });
        onProgress.then(() => { setTimeout(() => $(tooltip).remove(), 200); });
        $(ownerId).removeAttr('data-tooltip-id').removeAttr('aria-describedby');
      }, 200);
      timers_array[`${id}Unbreak`] = timer;
    }
  
    let ownerPos = $(ownerId).attr('data-tooltip-pos');
    if (ownerPos === 'top' && children.attr('data-parent-tooltip-pos') !== 'top' && calc_pos.top > (tooltip.offsetHeight)) {
      calc_pos = defCalcs.top;
      children.attr('data-parent-tooltip-pos', 'top');
    }
    if (ownerPos === 'bottom' && children.attr('data-parent-tooltip-pos') !== 'bottom' && calc_pos.top > (tooltip.offsetHeight)) {
      calc_pos = defCalcs.bottom;
      children.attr('data-parent-tooltip-pos', 'bottom');
    }
    if (ownerPos === 'left' && children.attr('data-parent-tooltip-pos') !== 'left' && calc_pos.left < (tooltip.offsetWidth * tooltipWidth)) {
      calc_pos = defCalcs.left;
      children.attr('data-parent-tooltip-pos', 'left');
    }
    if (ownerPos === 'right' && children.attr('data-parent-tooltip-pos') !== 'right' && calc_pos.left < (tooltip.offsetWidth * tooltipWidth)) {
      calc_pos = defCalcs.right;
      children.attr('data-parent-tooltip-pos', 'right');
    }
    if (ownerPos === 'top-start' && children.attr('data-parent-tooltip-pos') !== 'top-start' && calc_pos.top > (tooltip.offsetHeight)) {
      defCalcs.top.left = parentOffset.left;
      children.attr('data-parent-tooltip-pos', 'top-start');
    }
    if (ownerPos === 'top-end' && children.attr('data-parent-tooltip-pos') !== 'top-end' && calc_pos.top > (tooltip.offsetHeight)) {
      defCalcs.top.left = parentOffset.left + parent.offsetWidth - tooltipWidth;
      children.attr('data-parent-tooltip-pos', 'top-end');
    }
    if (ownerPos === 'bottom-start' && children.attr('data-parent-tooltip-pos') !== 'bottom-start' && calc_pos.top > (tooltip.offsetHeight)) {
      defCalcs.bottom.left = parentOffset.left;
      children.attr('data-parent-tooltip-pos', 'bottom-start');
    }
    if (ownerPos === 'bottom-end' && children.attr('data-parent-tooltip-pos') !== 'bottom-end' && calc_pos.top > (tooltip.offsetHeight)) {
      defCalcs.bottom.left = parentOffset.left + parent.offsetWidth - tooltipWidth;
      children.attr('data-parent-tooltip-pos', 'bottom-end');
    }
  }
  if (calc_pos) {
    const tooltipRightPos = calc_pos.left + tooltip.offsetWidth;
    const tooltipBottomPos = calc_pos.top + tooltip.offsetHeight;

    if (calc_pos.top < 5) {
      calc_pos = defCalcs.bottom;
      children.attr('data-parent-tooltip-pos', 'bottom');
    } else if ((tooltipBottomPos + 15) > window.innerHeight) {
      calc_pos = defCalcs.top;
      children.attr('data-parent-tooltip-pos', 'top');
    } else if (calc_pos.left < 5) {
      calc_pos = defCalcs.right;
      children.attr('data-parent-tooltip-pos', 'right');
    } else if ((tooltipRightPos + 15) > window.innerWidth) {
      calc_pos = defCalcs.left;
      children.attr('data-parent-tooltip-pos', 'left');
    }
  }

  if (calc_pos) {
    tooltip.style.top = calc_pos.top + 'px';
    tooltip.style.left = calc_pos.left + 'px';
  }
}
  

  function updateTooltipPos() {
    //! MAKE RESTRICTIONS ON WINDOW SIZE
    const tooltips = $('tooltip-element');
    tooltips.each(function () {
      const tooltip = this;
      const tooltipId = $(tooltip).attr('id');
      let target = tooltipParents.toArray().find(parent => parent.getAttribute('data-tooltip-id') === tooltipId);
      if (target) {
        const pos = $(tooltip).children('.tl-arrow').attr('data-parent-tooltip-pos') || 'left';
        calcTooltipPos(tooltipId, pos, target);
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

  checkForLivingTooltips.observe(document.body, { childList: true, subtree: false });
  function tooltipOffsetInterval(close) { (close && close === true) ? clearInterval(offsetInterval) : offsetInterval = setInterval(updateTooltipPos, 50) };

  tooltipParents.on('mouseenter', function () { tooltipOperations(this) });
  tooltipParents.on('mouseleave', function () { tooltipLeave(this) });
    
  console.buildType('[TOOLTIP] → Tooltips Initialized', 'success');
});
