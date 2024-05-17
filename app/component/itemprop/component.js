class ItemProp extends HTMLElement {
  constructor({ PROP } = {}) {
    super();
    const component = `
      ${PROP.image ? `
        <div class="item-image-wrapper">
          <picture class="item-image__picture">
            ${PROP.image.label ? `<div class="item-image__label">${PROP.image.label}</div>` : ''}
            ${PROP.image.types ? PROP.image.types.split(', ').map(type => `<source srcset="${type === 'svg' ? PROP.image.src.replace('_thumb.png', '.svg') : PROP.image.src.replace(/\.\w+$/, `.${type}`)}" type="image/${type}">`).join('') : ''}

            <img class="item-image__element" src="${PROP.image.src}" loading="lazy" alt="${PROP.title.text ? PROP.title.text.stripHTML() : ''}">
          </picture>
        </div>
      ` : ''}
      ${PROP.title ? `<div class="item-title">${PROP.icon ? `<img class="item-icon" src="${PROP.icon }" alt="Title icon">` : ''}<div class="item-title__text" ${PROP.title.key ? `data-key="${PROP.title.key}"` : ''}>${PROP.title.text}</div>${PROP.title.second ? `<div class="item-title__additional">${PROP.title.second}</div>` : ''}</div>` : ''}
      ${PROP.description && PROP.class === 'clans' ? `<div class="item-description" ${PROP.description.key ? `data-key="${PROP.description.key}"` : ''}>${PROP.description.text}</div>` : ''}
    `;

    $(this).attr({
      'data-entity': (PROP.entity ? PROP.entity : null),
      'data-prop-class': (PROP.class ? PROP.class : null),
      'data-prop-category': PROP.category || null,
      'data-prop-template': (PROP.template ? PROP.template : null),
      'data-rarity': (PROP.rarity ? PROP.rarity : null),
      'data-image-multiextension': (PROP.multiextension ? PROP.multiextension : null),
      'data-gallery-visible': 'visible',
      'data-gallery-nested': 'false',
      'tabindex': 0,
      'draggable': 'true',
    });
    
    this.innerHTML = component;
  }
  
  connectedCallback() {
  }
  
  render() {
  }
}

customElements.define('item-prop', ItemProp);
window.ItemProp = ItemProp;

class InventoryInfoPanel extends HTMLElement {
  constructor({ PANEL } = {}) {
    super();
    const component = `
    <div class="inventory-info-panel">
      <div class="inventory-info-panel__banner">
        <h2 class="inventory-info-panel__title"${PANEL && PANEL.title.key ? ` data-key="${PANEL.title.key}"` : ''}>${PANEL && PANEL.title.text ? PANEL.title.text : ''}</h2>
        <div class="inventory-info-panel__title_transcription shadow-wrapper">
          <div class="inventory-info-panel__title_transcription_inner plate_chinese" data-key="transcript_first">${PANEL && PANEL.CJK ? `${PANEL.CJK.transcript_first}` : ''}</div>
        </div>
      </div>
      <div class="inventory-info-panel__item_viewer">
        <img src="${PANEL && PANEL.image ? PANEL.image : ''}" alt="${PANEL && PANEL.name ? PANEL.name : ''}" class="inventory-info-panel__item_viewer__image">
        <span class="inventory-info-panel__item_viewer__CJK_script topright_12px" data-key="kanji_first">
        ${PANEL.CJK.first_text ? PANEL.CJK.first_text : ''}
        </span>
        <span class="inventory-info-panel__item_viewer__CJK_script topleft_12px" data-key="kanji_second">
        ${PANEL.CJK.second_text ? PANEL.CJK.second_text : ''}
        </span>
        <div class="inventory-info-panel__item_viewer__extras bottom_6px left_3px">${PANEL && PANEL.extras ? PANEL.extras : ''}</div>
      </div>
      <div class="inventory-info-panel__content">
        <div class="inventory-info-panel__clan_title">
          <img src="resources/svg/break_decorator_left.svg" alt="" class="inventory-info-panel__break_decorator">
          <b class="inventory-info-panel__clan_title_text"${PANEL && PANEL.title.clan_key ? ` data-key="${PANEL.title.clan_key}"` : ''}>${PANEL && PANEL.title.clan ? PANEL.title.clan : ''}</b>
          <img src="resources/svg/break_decorator_left.svg" alt="" class="inventory-info-panel__break_decorator rotate-180">
        </div>
        <div class="inventory-info-panel__description" ${PANEL && PANEL.description.key ? ` data-key="${PANEL.description.key}"` : ''}>${PANEL && PANEL.description.text ? PANEL.description.text : ''}</div>
      </div>
    </div>`;

    $(this).attr({
      'data-inventory': PANEL && PANEL.inventory ? PANEL.inventory : 'kamon',
      'data-entity-given': PANEL && PANEL.entity ? PANEL.entity : null,
      'data-prop-class': PANEL && PANEL.prop_class ? PANEL.prop_class : null,
      'data-prop-category': PANEL && PANEL.category ? PANEL.category : null,
      'data-rarity': PANEL && PANEL.rarity ? PANEL.rarity : null,
      'data-drop-site': PANEL && PANEL.prop_class ? PANEL.prop_class : null
    });

    this.innerHTML = component;
  }
  connectedCallback() {
    $(this).attr('role', 'complementary');
  }
  
}

customElements.define('inventory-information-panel', InventoryInfoPanel);
nk.ui.InventoryInfoPanel = InventoryInfoPanel;