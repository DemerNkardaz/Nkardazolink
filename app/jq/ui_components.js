class item_prop extends HTMLElement {
  constructor({ PROP } = {}) {
    super();
    const component = `
      ${PROP.image ? `
        <div class="item-image-wrapper">
          <picture class="item-image__picture">
            ${PROP.image.label ? `<div class="item-image__label">${PROP.image.label}</div>` : ''}
            ${PROP.image.types ? PROP.image.types.split(', ').map(type => `<source srcset="${type === 'svg' ? PROP.image.src.replace('_thumb.png', '.svg') : PROP.image.src.replace(/\.\w+$/, `.${type}`)}" type="image/${type}">`).join('') : ''}

            <img class="item-image__element" src="${PROP.image.src}" loading="lazy" alt="${PROP.title.text ? PROP.title.text : ''}">
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
      'data-rarity': (PROP.rarity ? PROP.rarity : null),
      'data-image-multiextension': (PROP.multiextension ? PROP.multiextension : null),
      'data-gallery-visible': 'visible',
      'tabindex': -1,
      'draggable': 'true',
    });
    
    this.innerHTML = component;
  }
  
  connectedCallback() {
  }
  
  render() {
  }
}

customElements.define('item-prop', item_prop);
window.item_prop = item_prop;

class item_viewer_body extends HTMLElement {
  constructor() {
    super();
    const component = `ffff`
    const styles = ``

    $(this).attr({
      'container': 'gallery_viewer'
    })

    var concatenated = component + styles;
    this.innerHTML = concatenated;
  }
  connectedCallback() {
    $(this).attr('role', 'complementary');
  }
  
}

customElements.define('item-viewer-body', item_viewer_body);


window.gallery_viewer_container = function () {
  var viewer = new item_viewer_body();
  if (['kamon', 'pattern', 'banners', 'clans'].includes(anUrlParameter.mode)) {
    nk.siteMainContainer.after(viewer);
  }
}; gallery_viewer_container();



class settings_check extends HTMLElement {
  constructor({ label, label_key, setting } = {}) {
    super();
    const component = `
      <label>
        <div option_type="checkbox"></div>
        ${label ? `<span ${label_key ? `data-key="${label_key}"` : (setting ? `data-key="${setting}"` : '')}>${label}</span>` : ''}
      </label>
    `

    $(this).attr({
      'nk-setting': (setting ? setting : null)
    }).addClass('my-1');

    this.innerHTML = component;
  }
  connectedCallback() {
    $(this).attr('tabindex', 0);
    $(this).find('[option_type="checkbox"]').attr('role', 'checkbox');
    const setting = $(this).attr('nk-setting');
    const checkbox = $(this).find('[option_type="checkbox"]');
    const stored = savedSettings[setting];

    stored === 'true' ? checkbox.attr('aria-checked', 'true') : checkbox.attr('aria-checked', 'false');
  }
}

customElements.define('settings-check', settings_check);
/*
$(document).on('full_data_loaded', function () {
  nk.siteMainContainer.prepend(
    new settings_check({
      label: languageJSON[]['save_search_result'],
      setting: 'save_search_result'
    }),
    new settings_check({
      label: languageJSON[]['save_selected_item'],
      setting: 'save_selected_item'
    }),
    new settings_check({
      label: languageJSON[]['turn_off_preloader'],
      setting: 'turn_off_preloader'
    })
  );
});*/


window.item_create = function () {
  var single = true
  var image = 'resources/svg/NkardazKamon.svg'
  var image2 = 'external/Ghost_of_Tsushima.jpg'
  var PROP_ENTITY = 'entity_test'
  var item_rarity = 'gold'
  var item_status = '5'
  var item_group = 'JP'

  var item = new item_prop({
    PROP: {
      entity: 'ent_maru_ni_mittsu_aoi.clan_matsudaira',
      class: 'kamon',
      category: 'JA',
      rarity: 'legendary',
      image: { src: 'resources/svg/japan/kamon/Mon_of_clan_Matsudaira.svg' },
      title: { text: "Камон", key: "clan_names" }
    }
  });
  $('main').prepend(item);
  var item2 = new item_prop({
    PROP: {
      class: 'clans',
      image: { src: 'external/Ghost_of_Tsushima.jpg' },
      title: { text: "Сакаи", second: '酒井氏' },
      description: { text: 'Клан Сакаи знаменит защитой острова Цусима от монгольского вторжения.' },
      icon: 'resources/svg/japan/kamon/Mon_of_clan_Matsudaira@48px.png',
    }
  });
  $('main').prepend(item2);

};// $(document).on('full_data_loaded', function () { setTimeout(item_create, 1000); });



class tooltip_element extends HTMLElement {
  constructor({ tooltip, tooltip_key, tooltip_pos, tooltip_role, tooltip_classes, tooltip_customs, tooltip_meta, id } = {}) {
    super();
    const component = `
    <div class="tooltip__arrow" ${tooltip_pos ? `data-parent-tooltip-pos="${tooltip_pos}"` : 'data-parent-tooltip-pos="bottom"'}></div>
    <div class="tooltip__content" ${tooltip_key ? `data-key="${tooltip_key}"` : ''} ${tooltip_customs ? `style="${tooltip_customs}"` : ''}>${tooltip_role !== 'preview' ? tooltip.unpackText() : `<tooltip-preview ${extractAttributes(tooltip)}>${tooltip.innerHTML}</tooltip-preview>`}</div>
    `;
    (tooltip_classes ? $(this).addClass(tooltip_classes) : '');
    $(this).attr({ 'role': 'tooltip', 'id': id ? id : null, 'data-meta-anchor': tooltip_meta ? tooltip_meta : null });
    this.innerHTML = component;
  }

  connectedCallback() {
    const $this = $(this);
    if ($this.find('tooltip-preview').length) {
      $this.addClass('tooltip--previews-owner');
    }
  }
}

customElements.define('tooltip-element', tooltip_element);
window.tooltip_element = tooltip_element;

class tooltip_preview extends HTMLElement {
  constructor({ image, content, subscript, link } = {}) {
    super();
    const component = `${link ? `<a href="${link.src}" ${link.target ? `target="${link.target}"` : ''}>` : ''}
    ${image ? `<div class="tooltip--previews__image-wrapper" ${image.h ? `style="--h: ${image.h}px;"` : ''}><img class="tooltip--previews__image" src="${image.src}" alt="preview" loading="eager" style="${image.shift ? `--shift: ${image.shift};` : ''} ${image.opacity ? `--image-opacity: ${image.opacity};` : ''}" ${image.blur ? `data-blur="${image.blur}"` : ''} ${image.key ? `data-key-image="${image.key}"` : ''}><button class="tooltip--previews__image__button-toggle-fullres-wrapper material-icons">fullscreen</button></div>` : ''}
    <div class="tooltip--previews__content vertical-border-blur" ${content && content.key ? `data-key="${content.key}"` : ''}>${content && content.text ? content.text : ''}</div>
    ${subscript && subscript.text ? `<div class="tooltip--previews__subscription" data-key="${subscript.key}">${subscript.text}</div>` : ''}
    ${link ? `</a>` : ''}`;
    $(this).addClass('tooltip--previews');
    image && image.blur ? $(this).attr('data-blur', image.blur) : '';
    !this.innerHTML.length ? this.innerHTML = component : '';
  }
}
customElements.define('tooltip-preview', tooltip_preview);
window.tooltip_preview = tooltip_preview;

class tooltip_img extends HTMLElement {
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
customElements.define('tooltip-img', tooltip_img);
window.tooltip_img = tooltip_img;

class dropdown_element extends HTMLElement {
  constructor({ content, id, hide } = {}) {
    super();
    //if (!$(this).length) {
      const component = `
      <div class="dropdown-content">
        ${content ? content : ''}
      </div>
      `;
      $(this).attr({
        'data-dropid': id ? id : null,
        'hidden': (typeof hide === 'undefined' || hide) ? 'hidden' : null
      });
      $(this).html(component)
    //}
  }
}

customElements.define('drop-down', dropdown_element);
window.dropdown_element = dropdown_element;


window.nkUI = {
  constructor: function ({template, from} = {}) {
    if (!template || !from) {
      console.error('Необходимо указать шаблон и источник данных');
      return;
    }

    let markup = '';
    Object.keys(from).forEach(key => {
      const data = from[key];
      let tempMarkup = template;
      Object.keys(data).forEach(variable => {
        const regex = new RegExp('\\${' + variable + '}', 'g');
        tempMarkup = tempMarkup.replace(regex, data[variable]);
      });
      markup += tempMarkup;
    });
    return markup;
  },

  langList: function (variant) {
    let gArray = [];
    for (let key in window.languagesList) {
      const language = window.languagesList[key];
      const isSelected = nkSettings.get('lang') === key;
      let component;
      const emoji = `<span class="ms-auto emoji_font">${language.emoji}</span>`;
      if (variant === 'row') {
        component = `<span data-tooltip-key="${key.toUpperCase()}" data-tooltip-pos="top" tabindex="0" class="lang-option inline" value="${key}" data-language_selector="${isSelected ? 'selected' : ''}">${emoji}</span>`
      } else {
        component = `<div tabindex="0" class="lang-option" value="${key}" data-language_selector="${isSelected ? 'selected' : ''}">${language.name}&nbsp;${emoji}</div>`;
      }
      gArray.push(component);
    }
    return gArray.join('');
  },

  loadKamon: function () {
    return `<div><img src="resources/svg/NkardazKamon.svg" width="100" alt="content preloader"></div>`;
  },

  preLoader: async function ({ target, hiding_role, enable_percent, stopTimer } = {}) {
    const logo = nkSettings.get('change_skin_by_time') === 'true' ? setLogoByTime() : setLogoBySkin();
    const component = `
    <page-preloader id="preloader" hiding_role="${hiding_role && hiding_role === 'noscroll' ? 'noscroll' : 'hide'}">
      <div class="preloader-logo" part="preloader-logo"> 
        <div class="preloader-logo-wrapper" part="preloader-logo-wrapper">
          <img src="${logo}" width="100" alt="webpage preloader" class="preloader-logo-image" part="preloader-logo-image">
        </div>
      </div>
      <div class="preloader-progress" part="preloader-progress">
        <div class="progress-value" part="progress-value"></div>
        <p style="width: 160px"><span class="progress-label">${loadingText[nkSettings.get('lang')]}</span><br>
          <span class="loadmarker-slashes"></span><span>&ensp;:&ensp;</span><span class="loadmarker-percent">0</span>
        </p>
      </div>
    </page-preloader>`;

    $(target ? target : 'body').prepend(component).promise().done(() => {
      const preloader = $('#preloader');
      const preloader_logo = preloader.find('.preloader-logo-image');
      const siblingClass = hiding_role === 'noscroll' ? 'noscroll-for-preloader' : 'hidden-for-preloader';
      const siblings = $(preloader).siblings(':not(#preloader)');

      const loadmarker_style = (nkSettings.get('lang') === 'ja' || nkSettings.get('lang') === 'zh') ? 'loadmarker-dots ja' : 'loadmarker-dots';
      siblings.addClass(siblingClass);
      //$(document).on('setSkin', function () { 
      //  const skinName = CheckSkin('url');
      //  skinName === 'aogurogetsu' ? preloader_logo.attr('src', 'resources/svg/hangetsu.svg') : preloader_logo.attr('src', 'resources/svg/NkardazKamon.svg');
      //});
      observeOn('style:--progress:100%', $('.progress-value')[0], function () {
        preloader.find('br').nextAll().remove();
        preloader.find('.progress-label').html(`${executingText[nkSettings.get('lang')]}<span class="${loadmarker_style}"></span>`);
        if (!stopTimer) {
          setTimeout(() => {
            siblings.removeClass(siblingClass);
            preloader.fadeOut('slow', function () {
              preloader.remove();
            });
          }, 1000);
        }
      });
      enable_percent !== false && setTimeout(showLoadPercentage, 1000);
    });
  },

  dropdown: function ({ content, id, hide } = {}) {
    return `
    <drop-down ${id ? `data-dropid="${id}"` : ''} ${typeof hide === 'undefined' || hide ? 'hidden' : ''}>
      <div class="dropdown-content">
        ${content ? content : ''}
      </div>
    </drop-down>`;
  },

  tooltipInfo: {
    header: function (text, logo) {return `<div class="tooltip--previews__header-primary"><span class="tooltip-title">${text}</span>${logo ? `<img src="${logo}" alt="logo" class="tooltip-logo">` : ''}</div>`;},
    quest: function (key, pos) { return `<span class="tooltip-quest" data-tooltip-key="${typeof key === 'object' ? key.key : key}" ${typeof key === 'object' ? `data-meta-tooltip="${key.meta}"` : ''} ${pos ? `data-tooltip-pos="${pos}"` : ''}>[?]</span>`; }
  },
  tooltipEventLess: function (text, key, pos) {
    let fromData = null;
    if (key.includes('/')) { fromData = key.split('/')[1]; key = key.split('/')[0]; }
    return `<span ${fromData === 'data' ? `data-key="${key}"` : ''} class="eventLess-Tooltip ${pos ? `tl-${pos}` : ''}" eventLess-tooltip="${nkLocale.get(key)}" eventLess-tooltip-key="${key}">${text}</span>`;
  }
}


class load_kamon extends HTMLElement { };
customElements.define('load-kamon', load_kamon);

class page_preloader extends HTMLElement { };
customElements.define('page-preloader', page_preloader);


class link_block extends HTMLElement {
  constructor({ LINK_Class, LINK_Title, LINK_Title_Key, LINK_Subscript, LINK_Subscript_Key, LINK_Types, LINK_Background, LINK_Image, LINK_Icon, LINK_Source, Arrow, Class, Tooltip, Shadow } = {}) {
    super();
    const types = {
			artwork: 'resources/svg/icos/art_alt.svg',
			modeling: 'resources/svg/icos/3d.svg',
			layout: 'resources/svg/icos/book_alt.svg',
			github: 'resources/svg/icos/github.svg',
			writing: 'resources/svg/icos/scorpio_pen.svg',
			mods: 'resources/svg/icos/mods.svg'
    }
    function returnTypes() {
      var constructor = `<span class="linkTypes" part="link-types">`
      const matchingTypes = Object.keys(types).filter(type => LINK_Types.includes(type));
      matchingTypes.forEach(type => {
        constructor += `<span class="linkType" part="link-type"><img src="${types[type]}" alt="decorator" loading="eager" part="link-type-image"></span>`;
      });
      constructor += `</span>`;
      return constructor;
    }
    const component = `<div class="link-plate-wrapper${nkSettings.get('skin') === 'azumatsuyu' && LINK_Class !== 'long-thin' ? ` plate_chinese` : ''}" part="link-plate-wrapper">
    <a ${LINK_Source ? `href="${LINK_Source}" target="_blank"` : ''} tabindex="0" part="link" class="link-plate ${LINK_Class}">
      ${LINK_Image && LINK_Class !== 'long-thin' ? `<img ${Tooltip ? `data-tooltip-key="${Tooltip.key}" data-tooltip-pos="${Tooltip.pos}"` : ''} src="${LINK_Image}" alt="${LINK_Title ? LINK_Title : ''}" part="link-plate__avatar" class="link-plate__avatar">` : ''} 
      ${LINK_Class === 'long-thin' ? `<div part="link-plate__title-wrapper" class="link-plate__title-wrapper"><div part="link-plate__title-wrapper-inner" class="link-plate__title-wrapper-inner plate_chinese">` : ''}<h3 part="link-plate__title" class="link-plate__title" ${LINK_Title_Key ? `data-key="${LINK_Title_Key}"` : ''}>${LINK_Title ? LINK_Title : ''}</h3>${LINK_Class === 'long-thin' ? `<img alt="Decorator" src="resources/svg/break_decorator_left.svg" part="title-decorator" class="title-decorator rotate-180">` : ''}
      ${LINK_Class === 'long-thin' ? `<img alt="Decorator" src="resources/svg/break_decorator_left.svg" part="title-decorator" class="title-decorator">` : ''}
      <span part="link-plate__subscription" class="link-plate__subscription" ${LINK_Subscript_Key ? `data-key="${LINK_Subscript_Key}"` : ''}>
      ${LINK_Types ? returnTypes() : (LINK_Subscript ? LINK_Subscript : '')}</span>
      ${LINK_Class === 'long-thin' ? `</div></div>` : ''}
      ${LINK_Icon ? `<div part="link-plate__icon" class="link-plate__icon"><img alt="Icon" src="${LINK_Icon.image}" part="link-plate__icon-image"></div>` : ''}
    </a></div>
    `

    const styles = `
    <link rel="stylesheet" href="app/style/basic.css">
    <link rel="stylesheet" href="app/style/shapes.css">
    <link rel="stylesheet" href="app/style/util.css">
    <style>
      :host(.inactive) {
        filter: grayscale(100%);
        transition: all 0.3s ease;
      }
      :host(.inactive:hover) {
        filter: grayscale(0%);
      }
      ::part(link-plate-wrapper), .link-plate-wrapper {
        ${LINK_Class == 'long-thin' ? `
        border-radius: 50px;
        transition: all 0.15s ease;
        `: `
        border-radius: 5px;
        transition: all 0.3s ease;
        `}
        box-shadow: 0 3px 5px var(--shadow_22a10);
        outline: 2px solid transparent;
        overflow: hidden;
      }
      a {
        position: relative;
        gap: 0 5px;
        ${LINK_Class == 'long-thin' ? `
        width: 1024px;
        height: 42px;
        border-radius: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        transition: all 0.15s ease;
        `: `
        display: grid;
        width: 384px;
        height: 128px;
        border-radius: 0;
        grid-template-columns: 23.5% 76.5%;
        grid-template-rows: 45% 23% 32%;
        transition: all 0.3s ease;
        place-items: start;
        `}
        background: var(--white);
        text-decoration: none;
        color: var(--text_33);
        overflow: hidden;
        z-index: 0;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          background: ${LINK_Background && LINK_Background.image ? `url("${LINK_Background.image}") no-repeat, ${LINK_Background.color}` : 'transparent'};
          background-size: ${LINK_Background && LINK_Background.size ? LINK_Background.size : 'cover'};
          background-position: ${LINK_Background && LINK_Background.position ? LINK_Background.position : 'center center'};
          ${LINK_Class == 'long-thin' ? `
          width: 50%;
          height: 100%;
          `: `
          width: 100%;
          height: 50px;
          `}
          z-index: -1;
          transition: all 0.3s ease;
          box-shadow: inset 0 0 15px 10px transparent;
        }

        &::after {
          position: absolute;
          content: 'arrow_outward';
          font-family: 'material icons';
          line-height: 1em;
          color: ${Arrow && Arrow.color ? Arrow.color : 'var(--text_33)'};
          mix-blend-mode: ${Arrow && Arrow.blend ? Arrow.blend : 'color-dodge'};
          top: 0;
          right: 0;
          font-size: 1.5em;
          z-index: -1;
        }
      }
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
      }
      .link-plate-wrapper:focus-within,
      .link-plate-wrapper:hover {
        ${LINK_Class == 'long-thin' ? `
        transform: scale(1.1);
        `: `
        transform: translateY(-15px);
        `}
        outline: 2px solid white;
      }
      a:focus,
      a:hover {
        & :is(::part(link-type), .linkType) {
          box-shadow: inset 2px 2px 3px var(--color_gold_hover_light), inset -2px -2px 3px var(--shadow_22a29), 2px 1.5px 1px var(--shadow_22a29);
          background: var(--color_dark_gold);

          & img {
            filter: brightness(450%) sepia(100%) saturate(300%) drop-shadow(0px 0.75px 1px var(--shadow_22a86));
          }
        }
      }

      a.long-thin:hover::before, a.long-thin:focus::before {
        animation: inner-shadow 1s ease;
      }

      @keyframes inner-shadow {
        0% {
          box-shadow: inset 0 0 15px 10px transparent;
        }
        5% {
          box-shadow: inset 0 0 12px 7px white;
        }
        90%, 100% {
          box-shadow: inset 0 0 5px 2px transparent;
        }
      }

      .link-plate-wrapper:active {
        ${LINK_Class == 'long-thin' ? `
        transform: scale(1.01);
        `: `
        transform: translateY(-15px) scale(0.95);
        `}
      }

      ::part(link-plate__avatar), .link-plate__avatar {
        position: relative;
        grid-column: 1;
        grid-row: 1 / span 3;
        align-self: center;
        justify-self: center;
        width: 72px;
        height: 72px;
        margin-top: 10px;
        border-radius: 50%;
        padding: 4px;
        overflow: hidden;
        background: var(--white);
        transition: all 0.3s ease;
        z-index: 1;
        object-fit: cover;
      }

      ::part(link-plate__title-wrapper), .link-plate__title-wrapper {
        width: 700px;
        height: 42px;
        filter: ${Shadow ? Shadow : `drop-shadow(-5px 0 3px var(--shadow_22a64))`};
        transition: all 0.3s ease;
      }

      ::part(link-plate__title-wrapper-inner), .link-plate__title-wrapper-inner {
        --corner_radius: 7px;
        display: grid;
        grid-template-columns: 200px 121px 1fr 1fr;
        padding: 0 30px;
        height: inherit;
        background: var(--white);
        transition: all 0.3s ease;
      }
      .link:hover .link-plate__title-wrapper {
        animation: golden_shadow 5s infinite ease;
      }

      ::part(link-plate__title), .link-plate__title {
        position: relative;
        display: flex;
        height: 42px;
        width: 100%;
        ${LINK_Class == 'long-thin' ? `
        justify-self: end;
        align-items: center;
        justify-content: flex-end;
        font-size: 1.5rem;
        padding-bottom: 2px;
        padding-right: 8px;
        grid-column: 1;
        grid-row: 1;
        gap: 8px;
        `: `
        justify-self: start;
        align-self: center;
        align-items: center;
        justify-content: flex-start;
        grid-column: 2;
        grid-row: 2;
        `}
      }

      ::part(title-decorator), .title-decorator {
        height: 42px;
        filter: invert(0.8);
      }

      ::part(link-plate__subscription), .link-plate__subscription {
        position: relative;
        display: flex;
        inset: 0;
        ${LINK_Class == 'long-thin' ? `
        justify-content: flex-start;
        padding-left: 5px;
        grid-column: 4;
        align-items: center;
        `: `
        padding-top: 5px;
        grid-row: 3;
        grid-column: 2;
        `}
      }

      ::part(link-plate__icon), .link-plate__icon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        ${LINK_Class == 'long-thin' ? `
        width: 40px;
        height: 40px;
        right: 0;
        background: var(--light_border);
        filter: drop-shadow(-1px 0 3px var(--shadow_22a64));
        padding: 10px;
        border-radius: 50%;
        border: 2px solid var(--light_border);
        `: `
        ${LINK_Icon.pos ? `${LINK_Icon.pos.bottom ? `bottom: ${LINK_Icon.pos.bottom}px;` : ''}${LINK_Icon.pos.right ? `right: ${LINK_Icon.pos.right}px;` : ''}` : ''}
        ${LINK_Icon.w ? `width: ${LINK_Icon.w}px;` : 'width: 70px;'}
        `}
      }
      ::part(link-plate__icon img), .link-plate__icon img {
        width: 100%;
        height: 100%;
        ${LINK_Class == 'long-thin' ? `
        filter: brightness(10) drop-shadow(0 0 1px var(--shadow_22a86)) drop-shadow(0 0 2px var(--shadow_22a64));
        ${LINK_Icon.label.transform ? `transform: ${LINK_Icon.label.transform};` : ''}
        ${LINK_Icon.label.state === 'absolute' ? `position: absolute;` : ''}
        ${LINK_Icon.label.left ? `left: ${LINK_Icon.label.left};` : ''}
        ${LINK_Icon.label.top ? `right: ${LINK_Icon.label.top};` : ''}
        ${LINK_Icon.label.size ? `width: ${LINK_Icon.label.size}; height: ${LINK_Icon.label.size};` : ''}
        `:`
        opacity: 0.05;
        `}
      }

      ::part(link-types), .linkTypes {
        display: flex;
        gap: 7px;
        align-items: center;
        justify-content: flex-start;
        transition: all 0.3s ease;
        z-index: 1;
      }

      ::part(link-type), .linkType {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        background: var(--bg_ffab3);
        box-shadow: inset 1px 2px 3px var(--shadow_22a29);
        border-radius: 5px;
        transition: all 0.3s ease;
        cursor: pointer;

        & img {
          position: relative;
          width: 20px;
          height: 20px;
          object-fit: contain;
          transition: all 0.3s ease;
          filter: brightness(400%);
        }
      }

      img::before {
        display: none;
      }

    </style>`
    $(this).attr({
      'data-link-class': LINK_Class
    }).addClass(`link-plate__host${Class ? ` ${Class}` : ' m-3'}`);
    

    const concatenated = component + styles;
    this.attachShadow({ mode: 'open' }).innerHTML = concatenated;
  }
  
  connectedCallback() {
  }
}

customElements.define('link-block', link_block);
window.link_block = link_block;

var linkblic = new link_block({
  LINK_Class: 'long-thin',
  LINK_Title: 'Книга Фанфиков',
  LINK_Source: 'https://nkardazolink.com/',
  LINK_Types: ['artwork', 'modeling', 'layout', 'writing'],
  LINK_Background: {
    image: 'external/Ghost_of_Tsushima.jpg',
    color: `#A14643`,
    size: '74.5%',
    position: '-50px 50%',
  },
  LINK_Image: 'https://leonardo.osnova.io/3c89e2c2-a2e8-5256-9f0c-096a75d34923/-/scale_crop/200x200/-/format/webp/',
  LINK_Icon: {
    image: 'external/fickbook_logo.svg',
    background: '#4d1600',
    label: {
      state: 'absolute',
      left: '4px',
      filter: 'invert(0.45) sepia(1) saturate(180%)',
      size: '35px',
    }
  }
});
$('#testwrapper').prepend(linkblic);
var linkblic2 = new link_block({
  LINK_Class: 'default',
  LINK_Title: 'Наэда Китэцуги',
  LINK_Title_Key: 'Naeda_Kitetsugi',
  LINK_Source: 'https://nkardazolink.com/',
  LINK_Subscript: 'Subscript',
  LINK_Types: ['artwork', 'modeling', 'layout', 'writing'],
  LINK_Background: {
    image: 'external/Ghost_of_Tsushima.jpg',
    color: `#A14643`,
    size: 'cover',
    position: '50% 50%',
  },
  LINK_Image: 'https://leonardo.osnova.io/3c89e2c2-a2e8-5256-9f0c-096a75d34923/-/scale_crop/200x200/-/format/webp/',
  LINK_Icon: {
    image: 'external/vk_logo.svg',
    pos: {
      right: -15,
      bottom: -20
    }
  },
  Tooltip: { key: 'Naeda_Kitetsugi', pos: 'right' }
});
/*
$('#testwrapper').prepend(linkblic2);

setTimeout(() => {
  nk.siteMainContainer.append(linkblic2);
}, 2000);*/

window.ui_components = {
  preloader: (siblingType, callback, stopTimer) => {
    var component = (`
      <div id="preloader">
        <div class="preloader-logo">
          <div class="preloader-logo-wrapper">
            <img src="resources/svg/NkardazKamon.svg" width="100" alt="webpage preloader">
          </div>
        </div>
        <div class="preloader-progress">
          <div id="preloader-progress" class="progress_bar progress-value" value="0"></div>
          <p style="width: 160px"><span class="progress-label">${loadingText[nkSettings.get('lang')]}</span><br>
            <span class="loadmarker-slashes"></span><span>&ensp;:&ensp;</span><span class="loadmarker-percent">0</span>
          </p>
        </div>
      </div>`
    );
    $('body').prepend(component).promise().done(() => {
      var preloader = $('#preloader');
      var loadmarker_style = (nkSettings.get('lang') === 'ja' || nkSettings.get('lang') === 'zh') ? 'loadmarker-dots ja' : 'loadmarker-dots';
      var siblings = preloader.siblings(':not(#preloader)');
      var siblingClass = (siblingType === 'noscroll') ? 'noscroll-for-preloader' : 'hidden-for-preloader';
      siblings.addClass(siblingClass);

      observeOn('style:--progress:100%', $('.progress-value')[0], function () {
        preloader.find('br').nextAll().remove();
        preloader.find('.progress-label').html(`${executingText[nkSettings.get('lang')]}<span class="${loadmarker_style}"></span>`);
        if (!stopTimer) {
          setTimeout(() => {
            siblings.removeClass(siblingClass);
            preloader.fadeOut('slow', function () {
              preloader.remove();
            });
          }, 1000);
        }
      });
      document.addEventListener('DOMContentLoaded', showLoadPercentage, false);
    });
    if (typeof callback === 'function') {
      callback();
    }
  },
  header: () => {
    nk.siteHeader.html(
      (!anUrlParameter.mode ?
        'This is default'
        :
        'This is ' + anUrlParameter.mode)
    );
  }
}


class light_box extends HTMLElement {
  constructor({ Image, Controls } = {}) {
    super();
    const component = `
    <div class="lBox-Container">
      <div class="lBox-Close material-icons">close</div>
      <div class="lBox-Content">
        <div class="lBox-Image">
          <div class="lBox-View>
            <div class="lBox-Res"></div>
            <img src="${Image.src}" alt="${Image.alt}" loading="eager">
            ${Controls &&  Controls.extra.ytube ? `<iframe src="" loading="lazy" frameborder="0" allowfullscreen hidden></iframe>` : ''}
            <div class="lBox-Controls">
              <span id="lBox-Download" class="material-icons">download</span>
              <span id="lBox-Fscreen" class="material-icons">fullscreen</span>
              <span id="lBox-Blank" class="material-icons">launch</span>
            </div>
            ${Controls && Controls.extra ?
              `
              <div class="lBox-Controls-Extra">
                ${Controls.extra.maxres ? `<span id="lBox-MaxRes" class="material-icons">hd</span>` : ''}
                ${Controls.extra.pdf ? `<span id="lBox-Pdf" class="material-icons" data-pdf="${Controls.extra.pdf}">picture_as_pdf</span>` : ''}
                ${Controls.extra.ytube ? `<span id="lBox-Yt" class="material-icons" data-yt="${Controls.extra.ytube}"><img src="resources/svg/social_youtube_dark.svg" width="20" class="socialIconSVG"></span>` : ''}
              </div>
              `
            : ''}
          </div>
          <div class="lBox-Image-Label" ${Image.labelKey ? `data-key="${Image.labelKey}"` : ''}>${Image.label}</div>
        </div>
        <div class="lBox-Group"></div>
      </div>
    </div>`;
    this.innerHTML = component;
  }
  connectedCallback() {
    $(function () {
    });
    $(this).attr('role', 'dialog');
  }
}

customElements.define('light-box', light_box);
window.nkUI.light_box = light_box;


/* Object.values(window.ui_components).forEach(component => component()); */




class console_run extends HTMLElement {
  constructor() {
    super();
    const component = `
    <header class="cmd_header forceDrag"><span data-key="console">${languageJSON[nkSettings.get('lang')]['console']}</span><span class="close">close</span></header>
    <section class="cmd_input"><span class="cmd_line"><label>PROMPT : ></label><textarea spellcheck="false" type="text" rows="1"></textarea></span></section>
    <footer class="cmd_footer"></footer>
    `;
    $(this).isdrag({ container: 'body'});
    this.innerHTML = component;
  }
  connectedCallback() {
    $(function () {
    });
    !$(this).attr('id') ?
      ($(this).attr('id', `cmd${Math.floor(Math.random() * 1000000)}`),
      $(this).find('header').prepend(`<span class="cmd_number">${$(this).attr('id')}</span>`))
      :
    '';
    $(this).attr('role', 'dialog');
    $(this).find('textarea').focus();
  }
}

customElements.define('run-cmd', console_run);
window.consoleElement = console_run;


class modal_window extends HTMLDialogElement {
  constructor() {
    super();
    const component = ``;
    $(this).attr({
      'class': 'modal_window',
      'open' : '',
    });
    this.innerHTML = component;
  }
}

customElements.define('modal-window', modal_window, { extends: 'dialog' });