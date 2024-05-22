class TooltipElement extends HTMLElement {
  constructor(tooltip) {
    super();
    const component = `
    <div class="tooltip__arrow" ${tooltip.pos ? `data-parent-tooltip-pos="${tooltip.pos}"` : 'data-parent-tooltip-pos="bottom"'}></div>
    <div class="tooltip__content" ${tooltip.key ? `data-key="${tooltip.key}"` : ''} ${tooltip.customs ? `style="${tooltip.customs}"` : ''}>${tooltip.role !== 'preview' ? tooltip.content.unpackText() : `<tooltip-preview ${nk.extractAttributes(tooltip.content)}>${tooltip.content.innerHTML}</tooltip-preview>`}</div>
    `;
    (tooltip.classes ? $(this).addClass(tooltip.classes) : '');
    $(this).attr({ 'role': 'tooltip', 'id': tooltip.id ? tooltip.id : null, 'data-meta-anchor': tooltip.meta ? tooltip.meta : null });
    this.innerHTML = component;
  }

  connectedCallback() {
    const $this = $(this);
    if ($this.find('tooltip-preview').length) {
      $this.addClass('tooltip--previews-owner');
    }
  }
}

customElements.define('tooltip-element', TooltipElement);
nk.ui.TooltipElement = TooltipElement;

class TooltipPreviews extends HTMLElement {
  constructor({ image, content, subscript, link } = {}) {
    super();
    const component = `${link ? `<a href="${link.src}"${link.target ? ` target="${link.target}"` : ''}>` : ''}
    ${image ? `<div class="tooltip--previews__image-wrapper"${image.h ? ` style="--h: ${image.h}px;"` : ''}><img class="tooltip--previews__image" src="${image.src}" alt="preview" loading="eager" style="${image.shift ? `--shift: ${image.shift};` : ''}${image.opacity ? ` --image-opacity: ${image.opacity};` : ''}"${image.blur ? ` data-blur="${image.blur}"` : ''}${image.key ? ` data-key-image="${image.key}"` : ''}><button class="tooltip--previews__image__button-toggle-fullres-wrapper material-icons" title="${nk.locale.get('buttonLabels.fullres')}" title-key="buttonLabels.fullres">fullscreen</button></div>` : ''}
    <div class="tooltip--previews__content vertical-border-blur"${content && content.key ? ` data-key="${content.key}"` : ''}>${content && content.text ? content.text : ''}</div>
    ${subscript && subscript.text ? `<div class="tooltip--previews__subscription" data-key="${subscript.key}">${subscript.text}</div>` : ''}
    ${link ? `</a>` : ''}`;
    $(this).addClass('tooltip--previews');
    image && image.blur ? $(this).attr('data-blur', image.blur) : '';
    !this.innerHTML.length ? this.innerHTML = component : '';
  }
}
customElements.define('tooltip-preview', TooltipPreviews);
nk.ui.TooltipPreviews = TooltipPreviews;

class TooltipImage extends HTMLElement {
  constructor(image) {
    super();
    const component = `<div class="tooltip-fullres-image__content"><img src="${image ? image.src : image}" alt="${image.alt ? image.alt : ''}" loading="eager"></div>`;
    image && image.classes ? $(this).addClass(image.classes) : '';
    !this.innerHTML.length ? this.innerHTML = component : '';
  }

  connectedCallback() {
    $(this).timedClass('hide', 150);
    const imgSrc = $(this).find('img').attr('src');
    let originalWidth, originalHeight, aspect_ration;
    let image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      originalWidth = image.width;
      originalHeight = image.height;
      aspect_ration = originalWidth / originalHeight;
      $(this).css('aspect-ratio', `${aspect_ration}`);
    }
  }
}
customElements.define('tooltip-img', TooltipImage);
nk.ui.TooltipImage = TooltipImage;



$.extend(nk.ui, {
  tooltipInfo: {
    header: function (text, logo) { return `<div class="tooltip--previews__header-primary"><span class="tooltip-title">${text}</span>${logo ? `<img src="${logo}" alt="logo" class="tooltip-logo">` : ''}</div>`; },
    quest: function (key, pos) { return `<span class="tooltip-quest" data-tooltip-key="${typeof key === 'object' ? key.key : key}" ${typeof key === 'object' ? `data-meta-tooltip="${key.meta}"` : ''} ${pos ? `data-tooltip-pos="${pos}"` : ''}>[?]</span>`; }
  },
  tooltipEventLess: function (text, key, pos) {
    let fromData = null;
    if (key.includes('/')) { fromData = key.split('/')[1]; key = key.split('/')[0]; }
    return `<span ${fromData === 'data' ? `data-key="${key}"` : ''} class="tooltip--event-less${pos ? ` tooltip-${pos}` : ''}" data-tooltip="${nk.locale.get(key)}" data-eless-tooltip-key="${key}">${text}</span>`;
  }
});
