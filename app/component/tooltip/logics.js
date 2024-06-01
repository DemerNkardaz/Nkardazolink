nk.initTooltips = function () {
  let privateConfig = {
    'enabled': true,
    'animation': 'default',
    'observe': true,
  };

  if (nk.setting('enableTooltips').load() === 'false') privateConfig['enabled'] = false;

  window.nkTooltips = {};
  nkTooltips.opts = function (config) {
    for (let key in config) {
      privateConfig[key] = config[key];
      if (key === 'enabled') {
        if (config[key] === false) {
          nk.setting('enableTooltips').save(false);
        }
      }
    }
    console.log(privateConfig);
  };





  let tooltipParents = nk.collectTargets('[data-tooltip-key]');
  let tooltipParentsIdes = nk.collectTargets('[data-tooltip-id]');
  let tooltipMetaAnchors = nk.collectTargets('[data-meta-tooltip]');
  let timers_array = {};
  let offsetInterval;
  let detectedTooltips = false;

  const tooltipObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' || mutation.type === 'childList') {
        const newTooltipParents = nk.collectTargets('[data-tooltip-key]');
        const newTooltipParentsIdes = nk.collectTargets('[data-tooltip-id]');
        const newTooltipMetaAnchors = nk.collectTargets('[data-meta-tooltip]');

        if (!areCollectionsEqual(tooltipParentsIdes, newTooltipParentsIdes)) {
          tooltipParentsIdes = newTooltipParentsIdes;
        }

        if (!areCollectionsEqual(tooltipMetaAnchors, newTooltipMetaAnchors)) {
          tooltipMetaAnchors = newTooltipMetaAnchors;
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
          let $this = $(this);
          const tooltipId = $(this).attr('id');
          const tooltipMeta = $(this).attr('data-meta-anchor');
          const found = tooltipParentsIdes.toArray().some(parent => parent.getAttribute('data-tooltip-id') === tooltipId);
          const regeneratedTooltip = tooltipMetaAnchors.toArray().some(parent => parent.getAttribute('data-meta-tooltip') === tooltipMeta);
          if (!found) {
            const removeTimer = setTimeout(() => {
              $(this).css('opacity', 0);
              setTimeout(() => {
                $(this).remove();
              }, 300);
            }, 10);
            timers_array[tooltipId] = removeTimer;
          }
          if (regeneratedTooltip) {
            clearTimeout(timers_array[tooltipId]);
            if (tooltipMeta && $(`[data-meta-tooltip="${tooltipMeta}"]`).length) {
              let anchoredParent = $(`[data-meta-tooltip="${tooltipMeta}"]`).closestParent('tooltip-element');
              if (anchoredParent && anchoredParent.length && anchoredParent.prevAll().filter($this).length) {
                anchoredParent.after($this);
              }
            }

            setTimeout(function () {
              tooltipMetaAnchors.toArray().some(parent => parent.getAttribute('data-meta-tooltip') === tooltipMeta && parent.setAttribute('data-tooltip-id', tooltipId));
              const checkDuplicated = tooltipMetaAnchors.toArray().filter(duplicated => duplicated.getAttribute('data-meta-tooltip') === tooltipMeta);
              const count = checkDuplicated.length;
              let duplicate;

              if (checkDuplicated.length > 1) {
                const firstDuplicateIndex = Array.from(tooltipMetaAnchors).findIndex(duplicated => duplicated.getAttribute('data-meta-tooltip') === tooltipMeta);
                if (firstDuplicateIndex !== -1) {
                  tooltipMetaAnchors[firstDuplicateIndex].setAttribute('data-tooltip-id', tooltipId);
                }
                let message = `<span class="w-100 meta-duplicate-alert mb-3" style="max-width: 512px; max-height: 100px; overflow: auto;">[${tooltipMeta}] : Найдены дубликаты якора : ${count} : `;
                checkDuplicated.forEach((duplicated, index) => {
                  if (index !== firstDuplicateIndex) {
                    duplicate = duplicated;
                    message += `<br><span class="fs--1 em lh-1">&lt;${duplicate.nodeName} ${nk.extractAttributes(duplicate).toUpperCase().replace(`DATA-META-TOOLTIP="${tooltipMeta.toUpperCase()}"`, `<span style="color: red; font-weight: 800">DATA-META-TOOLTIP="${tooltipMeta.toUpperCase()}"</span>`)}&gt;${duplicate.innerHTML}&lt;/${duplicate.nodeName}&gt;</span>`;
                  }
                });
                message += `</span>`

                  
                console.log(`[TOOLTIP] → Tooltip ${tooltipId} has been duplicated`);
                if (!$(this).find('.meta-duplicate-alert').length) {
                  $(this).find('.tooltip__content').filter(function () {
                    if ($(this).text().trim().length > 0 && $(this).children().length === 0) {
                      $(this).prepend(message);
                    } else if ($(this).text().trim().length > 0 && $(this).children().length > 0) {
                      $(this).children().filter(function () { return $(this).text().trim().length > 0 }).first().prepend(message);
                    }
                  });
                }
              }
            }, 25);
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
    const targetId = target.attr('id');
    const ownerId = $(owner).attr('data-tooltip-id');
    const targetPromise = new Promise((resolve, reject) => {
      try {
        target.on('mousedown', function () { if (!$(this).hasClass('tooltip--highlight') && !$(this).attr('data-prevent-auto-close')) { $(this).addClass('tooltip--highlight') } });
        //target.on('mousemove', function () { if ($(this).hasClass('tooltip--highlight')) { $(this).removeClass('tooltip--highlight') } });
        target.on('click', function (e) {
          if ($(this).hasClass('tooltip--highlight')) { $(this).removeClass('tooltip--highlight') }
          if (!$(e.target).closest('.tooltip__button-close').length && ($(this).attr('data-prevent-auto-close') === null || $(this).attr('data-prevent-auto-close') === 'false' || $(this).attr('data-prevent-auto-close') === undefined)) {
            $(this).attr('data-prevent-auto-close', 'true').addClass('tooltip--pinned tooltip--highlight');
            setTimeout(() => $(this).removeClass('tooltip--highlight'), 100);
          }
          if (!$(this).find('.tooltip__button-close').length) {
            $(this).append(`<button type="button" class="tooltip__button-close" title="${nk.locale.get('buttonLabels.close')}" title-key="buttonLabels.close">close</button>`);
          }
        });
        target.on('mouseenter', function () {
          $(this).css('opacity', 1);
          (!$(this).find('.tooltip__button-close').length && !$(this).find('tooltip-preview').length) ? $(this).append(`<button type="button" class="tooltip__button-close" title="${nk.locale.get('buttonLabels.close')}" title-key="buttonLabels.close">close</button>`) : null;
          clearTimeout(timers_array[ownerId]);
        });
        target.on('mouseleave', function () {
          if ($(this).attr('data-prevent-auto-close') !== 'true') {
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
      target.on('click', '.tooltip__button-close', function () {
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
    const metaAnchor = $(target).attr('data-meta-tooltip') || null;
    let tooltip, previewEntity;

    if ($(`#${$(target).attr('data-tooltip-id')}`).length) {
      $(`#${$(target).attr('data-tooltip-id')}`).removeAttr('data-prevent-auto-close');
      clearTimeout(timers_array[$(target).attr('data-tooltip-id')]);
      return;
    }

    const uniqId = randomId('tooltip', 'weak');

    if (role !== undefined && role === 'preview') {
      let previewParams = {};
      if (nk.locale.check(`${key}.preview.image.src`) !== undefined) {
        previewParams.image = { src: nk.locale.get(`${key}.preview.image.src`) };
        previewParams.image.key = `${key}.preview.image.src`
      }
      nk.locale.check(`${key}.preview.image.shift`) ? (previewParams.image.shift = nk.locale.get(`${key}.preview.image.shift`)) : null;
      nk.locale.check(`${key}.preview.image.blur`) ? (previewParams.image.blur = nk.locale.get(`${key}.preview.image.blur`)) : null;
      nk.locale.check(`${key}.preview.image.opacity`) ? (previewParams.image.opacity = nk.locale.get(`${key}.preview.image.opacity`)) : null;
      nk.locale.check(`${key}.preview.image.h`) ? (previewParams.image.h = nk.locale.get(`${key}.preview.image.h`)) : null;
      nk.locale.check(`${key}.preview.content`) ? (previewParams.content = {
        text: nk.locale.get(`${key}.preview.content`),
        key: `${key}.preview.content`
      }) : null;
      nk.locale.check(`${key}.preview.subscript`) ? (previewParams.subscript = {
        text: nk.locale.get(`${key}.preview.subscript`),
        key: `${key}.preview.subscript`
      }) : null;
      href && (previewParams.link = {
        src: href,
        target: hrefTarget || '_blank'
      });
      previewEntity = new nk.ui.TooltipPreviews(previewParams);
      tooltip = new nk.ui.TooltipElement({
          content: previewEntity, role: 'preview', pos: pos, id: uniqId, customs: customs ? customs : null, classes: classes ? classes : null, meta: metaAnchor ? metaAnchor : null
      });
    } else {
      tooltip = new nk.ui.TooltipElement({
          content: nk.locale.get(key) ? nk.locale.get(key) : key, key: key, pos: pos, id: uniqId, customs: customs ? customs : null, classes: classes ? classes : null, meta: metaAnchor ? metaAnchor : null
      });
    }

    const tooltipBorn = new Promise((resolve, reject) => {
      try {
        $(target).attr({ 'data-tooltip-id': uniqId, 'aria-describedby': uniqId });
        $('body').append(tooltip);
        calcTooltipPos(uniqId, pos, target);
        $(`#${uniqId}`).addClass('tooltip--pointer-events-enabled');
        $(`#${uniqId}`).css('opacity', 1);
        //(role === 'preview') && $(`#${uniqId}`).find('.tooltip__content').html(previewEntity || 'No entity assigned');

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
    const children = $(tooltip).children('.tooltip__arrow');
    const tooltipFullres = $(tooltip).children('tooltip-img');
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
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--top');
      }
      if (ownerPos === 'bottom' && children.attr('data-parent-tooltip-pos') !== 'bottom' && calc_pos.top > (tooltip.offsetHeight)) {
        calc_pos = defCalcs.bottom;
        children.attr('data-parent-tooltip-pos', 'bottom');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--bottom');
      }
      if (ownerPos === 'left' && children.attr('data-parent-tooltip-pos') !== 'left' && calc_pos.left < (tooltip.offsetWidth * tooltipWidth)) {
        calc_pos = defCalcs.left;
        children.attr('data-parent-tooltip-pos', 'left');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--left');
      }
      if (ownerPos === 'right' && children.attr('data-parent-tooltip-pos') !== 'right' && calc_pos.left < (tooltip.offsetWidth * tooltipWidth)) {
        calc_pos = defCalcs.right;
        children.attr('data-parent-tooltip-pos', 'right');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--right');
      }
      if (ownerPos === 'top-start' && children.attr('data-parent-tooltip-pos') !== 'top-start' && calc_pos.top > (tooltip.offsetHeight)) {
        defCalcs.top.left = parentOffset.left;
        children.attr('data-parent-tooltip-pos', 'top-start');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--top');
      }
      if (ownerPos === 'top-end' && children.attr('data-parent-tooltip-pos') !== 'top-end' && calc_pos.top > (tooltip.offsetHeight)) {
        defCalcs.top.left = parentOffset.left + parent.offsetWidth - tooltipWidth;
        children.attr('data-parent-tooltip-pos', 'top-end');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--top');
      }
      if (ownerPos === 'bottom-start' && children.attr('data-parent-tooltip-pos') !== 'bottom-start' && calc_pos.top > (tooltip.offsetHeight)) {
        defCalcs.bottom.left = parentOffset.left;
        children.attr('data-parent-tooltip-pos', 'bottom-start');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--bottom');
      }
      if (ownerPos === 'bottom-end' && children.attr('data-parent-tooltip-pos') !== 'bottom-end' && calc_pos.top > (tooltip.offsetHeight)) {
        defCalcs.bottom.left = parentOffset.left + parent.offsetWidth - tooltipWidth;
        children.attr('data-parent-tooltip-pos', 'bottom-end');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--bottom');
      }
    }
    if (calc_pos) {
      const tooltipRightPos = calc_pos.left + tooltip.offsetWidth;
      const tooltipBottomPos = calc_pos.top + tooltip.offsetHeight;

      if (calc_pos.top < 5) {
        calc_pos = defCalcs.bottom;
        children.attr('data-parent-tooltip-pos', 'bottom');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--bottom');
      } else if ((tooltipBottomPos + 15) > window.innerHeight) {
        calc_pos = defCalcs.top;
        children.attr('data-parent-tooltip-pos', 'top');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--top');
      } else if (calc_pos.left < 5) {
        calc_pos = defCalcs.right;
        children.attr('data-parent-tooltip-pos', 'right');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--right');
      } else if ((tooltipRightPos + 15) > window.innerWidth) {
        calc_pos = defCalcs.left;
        children.attr('data-parent-tooltip-pos', 'left');
        tooltipFullres.attr('class', 'tooltip-fullres-image-viewside--left');
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
        const pos = $(tooltip).children('.tooltip__arrow').attr('data-parent-tooltip-pos') || 'left';
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

  //? BIND SHORTCUS
  $(document).on('click', '.tooltip--previews__image__button-toggle-fullres-wrapper', function () {
    const tooltip = $(this).closest('tooltip-element');
    const imageAlt = $(this).siblings('.tooltip--previews__image').attr('alt');
    const title = $(this).attr('title');
    const titleKey = $(this).attr('title-key');
    let imageSource = $(this).siblings('.tooltip--previews__image').attr('src');
    imageSource = imageSource.replace('_thumb', '');
    if (tooltip.find('tooltip-img').find('img').attr('src') !== imageSource) {
      tooltip.append(new nk.ui.TooltipImage({ src: imageSource, alt: imageAlt }));
      $(this).text('fullscreen_exit');
      $(this).attr('title-key', 'buttonLabels.fullres_off');
      $(this).attr('title', nk.locale.get('buttonLabels.fullres_off'));
      return;
    } else {
      tooltip.children('tooltip-img').hide('fast'); setTimeout(() => { tooltip.children('tooltip-img').remove(); }, 500);
      $(this).text('fullscreen');
      $(this).attr('title-key', 'buttonLabels.fullres');
      $(this).attr('title', nk.locale.get('buttonLabels.fullres'));
    }
  });
  $(document).on('dblclick', 'tooltip-img', function () {
    $(this).hide('fast'); setTimeout(() => { $(this).remove(); }, 500);
  });


  //? ZOOMING TOOLTIP-IMG
  let originalWidth, originalHeight;
  $(document).on("wheel", "tooltip-img", function (e) {
    let element = $(this);
    let image = new Image();
    image.src = element.find('img').attr('src');
    image.onload = function () {
      if (!image.complete) {
        return console.log('image not loaded');
      }
      originalWidth = image.width;
      originalHeight = image.height;
    };

    element.find('img').attr('draggable', false);

  });
}