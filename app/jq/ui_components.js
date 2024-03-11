class item_prop extends HTMLElement {
  constructor({ PROP_ENTITY, PROP_Class, PROP_Image, PROP_Title, PROP_Text, PROP_Rarity, PROP_Group, PROP_Multi, PROP_Image_Types, PROP_Icon, PROP_Image_Label, PROP_Title_Additional } = {}) {
    super();
    const component = `
      ${PROP_Image ? `
        <div part="item_image_wrapper" class="item_image_wrapper">
          <picture part="item_image_picture" class="item_image_picture">
            ${PROP_Image_Label ? `<div part="item_image_label" class="item_image_label">${PROP_Image_Label}</div>` : ''}
            ${PROP_Image_Types ? PROP_Image_Types.split(', ').map(type => `<source srcset="${type === 'svg' ? PROP_Image.replace('_thumb.png', '.svg') : PROP_Image.replace(/\.\w+$/, `.${type}`)}" type="image/${type}">`).join('') : ''}

            <img part="item_image" class="item_image" src="${PROP_Image}" loading="lazy" alt="${PROP_Title}">
          </picture>
        </div>
      ` : ''}
      ${PROP_Title ? `<div part="item_title" class="item_title">${PROP_Icon ? `<img part="item_icon" class="item_icon" src="${PROP_Icon}" alt="Title icon">` : ''}<span part="item_title_text" class="item_title_text">${PROP_Title}</span>${PROP_Title_Additional ? `<div part="item_title_additional" class="item_title_additional">${PROP_Title_Additional}</div>` : ''}</div>` : ''}
      ${PROP_Text && PROP_Class === 'clans' ? `<div part="item_text" class="item_text">${PROP_Text}</div>` : ''}
    `;

    const styles = `
      <style>
        :host {
          --default_background: #FFFFFFB3;
          --default_rarity: linear-gradient(-25deg, #d1d1d1, #8f8f8f);
          --default_rarity_clan: linear-gradient(90deg, #8f8f8f50, #d1d1d150, transparent);
          --selection_anim: selected_pulse_shadow;
          --default_image: url('../resources/svg/japan/Torii_small.svg');

          position: relative;
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;
            width: 128px;
            height: 170px;
            user-select: none;
          ` : `
            display: grid;
            grid-template-columns: 360px 625px;
            grid-template-rows: 27% 1fr;
            gap: 0px 20px;
            width: 1024px;
            height: 190px;
          `}
          background: var(--default_background);
          border-radius: 8px;
          box-shadow: 0 2px 5px var(--shadow_inset_info);
          overflow: hidden;
          transition: transform 0.1s ease-in-out;
          outline: 2px solid transparent;
          cursor: pointer;
          z-index: 1;
        }

        :host::before {
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            width: 100%;
            height: 140px;
            border-radius: 0 0 35px 0;
            background: var(--default_rarity);
          ` : `
            width: 640px;
            bottom: 0;
            background: var(--default_rarity_clan);
          `}
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }

        :host::after {
          background: var(--default_image) no-repeat;
          background-size: cover;
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            width: 100%;
            height: 140px;
            border-radius: 0 0 35px 0;
            top: 0;
            filter: invert(1);
            background-position: 50% 2px;
            mix-blend-mode: overlay;
            opacity: 0.2;
          ` : `
            width: 400px;
            height: 300px;
            right: -95px;
            opacity: 0.03;
          `}
          content: "";
          position: absolute;
          z-index: -1;
        }

        :host(:hover) {
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            transform: scale(1.12);
          ` : `
            transform: scale(1.03);
          `}
          outline-color: white;
        }

        :host(:focus) {
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            transform: scale(1.12);
          ` : `
            transform: scale(1.03);
          `}
          outline-color: white;
        }

        :host(:active) {
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            transform: scale(1.05);
          ` : `
            transform: scale(1.01);
          `}
        }

        :host(.selected) {
          outline-color: white;
          animation: var(--selection_anim) 5s ease infinite;
        }

        ::part(item_image_wrapper), .item_image_wrapper {
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            width: 100%;
            height: 140px;
          ` : `
            height: inherit;
            grid-column: 1;
            grid-row: 1 / span 2;
          `}
          display: flex;
          align-items: center;
          justify-content: center;
        }

        ::part(item_title), .item_title {
          width: 100%;
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            position: absolute;
            display: flex;
            bottom: 2.95px;
            justify-content: center;
          ` : `
            display: inline-grid;
            grid-auto-columns: 32px 65% 25%;
            grid-auto-flow: column;
            column-gap: 10px;
            font-size: 1.35rem;
            grid-column: 2;
            grid-row: 1;
            justify-content: start;
          `}
          align-items: center;
          font-weight: 800;
        }
        ::part(item_title_additional), .item_title_additional {
          display: flex;
          align-items: center;
          justify-content: end;
          font-weight: 500;
        }

        ::part(item_text), .item_text {
          grid-column: 2;
          grid-row: 2;
        }

        ::part(item_image), .item_image {
          ${(PROP_Class === 'kamon' ? `
            width: 105px;
            object-fit: contain;
          ` : `
            align-self: center;
            height: 170px;
            width: 350px;
            object-fit: cover;
            margin: 0 0 0 10px;
            border-radius: 10px;
          `)}
          display: flex;
          filter: drop-shadow(0px 1px 1px var(--shadow_tretiary));
        }

        @keyframes selected_pulse_shadow {
          0% {
            box-shadow: 5px 0 15px #8c8c8c, -5px -0 15px #8c8c8c;
          }
        
          50%,
          85% {
            box-shadow: 5px 0 15px #8c8c8c90, -5px -0 15px #8c8c8c90;
          }
        
          100% {
            box-shadow: 5px 0 15px #8c8c8c, -5px -0 15px #8c8c8c;
          }
        }

        ::part(item_icon), .item_icon {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        img::before {
          display: none;
        }

      </style>`;
      
    $(this).attr({
      'PROP_ENTITY': (PROP_ENTITY ? PROP_ENTITY : null),
      'PROP_Class': (PROP_Class ? PROP_Class : null),
      'PROP_Rarity': (PROP_Rarity ? PROP_Rarity : null),
      'PROP_Group': (PROP_Group ? PROP_Group : null),
      'PROP_Multi': (PROP_Multi ? PROP_Multi : null),
      'tabindex': -1,
      'draggable': 'true',
    });
    
    var concatenated = component + styles;
    this.attachShadow({ mode: 'open' }).innerHTML = concatenated;
  }
  
  connectedCallback() {
    const PROP_Class = $(this).attr('PROP_Class');
    $(this).addClass(['kamon', 'banners', 'clans', 'pattern'].includes(PROP_Class) ? PROP_Class : 'default');
  }
  
  render() {
  }
}

customElements.define('item-prop', item_prop);

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

customElements.define('item-viewer_body', item_viewer_body);


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

$(document).on('languageJSON_loaded', function () {
  nk.siteMainContainer.prepend(
    new settings_check({
      label: languageJSON[selectedLanguage]['save_search_result'],
      setting: 'save_search_result'
    }),
    new settings_check({
      label: languageJSON[selectedLanguage]['save_selected_item'],
      setting: 'save_selected_item'
    }),
    new settings_check({
      label: languageJSON[selectedLanguage]['turn_off_preloader'],
      setting: 'turn_off_preloader'
    })
  );
});


window.item_create = function () {
  var single = true
  var image = 'resources/svg/NkardazKamon.svg'
  var image2 = 'external/Ghost_of_Tsushima.jpg'
  var PROP_ENTITY = 'entity_test'
  var item_rarity = 'gold'
  var item_status = '5'
  var item_group = 'JP'

  var item = new item_prop({
    PROP_Class: 'kamon',
    PROP_Image: image,
    PROP_Title: "Камон",
  });
  $('#testwrapper').prepend(item);
  var item2 = new item_prop({
    PROP_Class: 'clans',
    PROP_Image: image2,
    PROP_Icon: 'resources/svg/japan/kamon/Mon_of_clan_Matsudaira@48px.png',
    PROP_Title: `Сакаи`,
    PROP_Title_Additional: `酒井氏`,
    PROP_Text: "Клан Сакаи знаменит защитой острова Цусима от монгольского вторжения.",
  });
  $('#testwrapper').prepend(item2);


}; item_create();

class tooltip_element extends HTMLElement {
  constructor({ tooltip, tooltip_key, tooltip_pos, id } = {}) {
    super();
    const component = `
    <div class="tl-arrow" ${tooltip_pos ? `tooltip-pos="${tooltip_pos}"` : 'tooltip-pos="bottom"'}></div>
    <div class="tl-content" ${tooltip_key ? `data-key="${tooltip_key}"` : ''}>${textUnPacker(tooltip)}</div>
    `;
    (id ? $(this).attr('id', id) : '');
    $(this).attr('role', 'tooltip');
    this.innerHTML = component;
  }

  connectedCallback() {
  }
}

customElements.define('tooltip-element', tooltip_element);
window.tooltip_element = tooltip_element;


$(document).on('languageJSON_loaded', function () {
  setTimeout(function () {
    const tooltip = new tooltip_element({
      tooltip: languageJSON['ru']['test'],
      tooltip_key: 'test'
  });
    $('#site-header').prepend(tooltip);
  }, 1000)
})



class load_kamon extends HTMLElement {
  constructor() {
    super();
    const component = `<div><img src="resources/svg/NkardazKamon.svg" width="100" alt="content preloader"></div>`

    this.innerHTML = component;
  }
}

customElements.define('load-kamon', load_kamon);


class page_preloader extends HTMLElement {
  constructor(hiderole, enable_percent) {
    super();
    const component = `
    <div class="preloader-logo" part="preloader-logo"> 
      <div class="preloader-logo-wrapper" part="preloader-logo-wrapper">
        <img src="resources/svg/NkardazKamon.svg" width="100" alt="webpage preloader" class="preloader-logo-image" part="preloader-logo-image">
      </div>
    </div>
    <div class="preloader-progress" part="preloader-progress">
      <div class="progress-value" part="progress-value"></div>
      <p style="width: 160px"><span class="progress-label">${loadingText[selectedLanguage]}</span><br>
        <span class="loadmarker-slashes"></span><span>&ensp;:&ensp;</span><span class="loadmarker-percent">0</span>
      </p>
    </div>
    `
    $(this).attr('hiderole', hiderole ? hiderole : null, 'enable_percent', enable_percent ? enable_percent : null);
    this.innerHTML = component;
  }

  connectedCallback(siblingType) {
    var loadmarker_style = (selectedLanguage === 'ja' || selectedLanguage === 'zh') ? 'loadmarker-dots ja' : 'loadmarker-dots';
    var siblings = $(this).siblings(':not(page-preloader)');
    var siblingClass = ($(this).attr('hiderole') === 'noscroll') ? 'noscroll-for-preloader' : 'hidden-for-preloader';
    siblings.addClass(siblingClass);
    $(this).attr('enable_percent') !== 'false' ? setTimeout(showLoadPercentage, 100) : null;
  }

}

customElements.define('page-preloader', page_preloader);

class link_block extends HTMLElement {
  constructor({ LINK_Class, LINK_Title, LINK_Title_Key, LINK_Subscript, LINK_Subscript_Key, LINK_Types, LINK_Background, LINK_Image, LINK_Icon, LINK_Source, Class, Tooltip } = {}) {
    super();
    const component = `
    <a ${LINK_Source ? `href="${LINK_Source}" target="_blank"` : ''} tabindex="0" part="link" class="link ${LINK_Class}">
      ${LINK_Image && LINK_Class !== 'long-thin' ? `<img ${Tooltip ? `tooltip_key="${Tooltip.key}" tooltip_pos="${Tooltip.pos}"` : ''} src="${LINK_Image}" alt="${LINK_Title ? LINK_Title : ''}" part="link-image" class="link-image">` : ''} 
      ${LINK_Class === 'long-thin' ? `<div part="link-title-wrapper" class="link-title-wrapper"><div part="link-title-wrapper-inner" class="link-title-wrapper-inner plate_chinese">` : ''}<h3 part="link-title" class="link-title" ${LINK_Title_Key ? `data-key="${LINK_Title_Key}"` : ''}>${LINK_Title ? LINK_Title : ''}</h3>${LINK_Class === 'long-thin' ? `<img alt="Decorator" src="resources/svg/break_decorator_left.svg" part="title-decorator" class="title-decorator rotate-180">` : ''}
      ${LINK_Class === 'long-thin' ? `<img alt="Decorator" src="resources/svg/break_decorator_left.svg" part="title-decorator" class="title-decorator">` : ''}
      <span part="link-subscript" class="link-subscript" ${LINK_Subscript_Key ? `data-key="${LINK_Subscript_Key}"` : ''}>
      ${LINK_Subscript && LINK_Class !== 'long-thin' ? LINK_Subscript : (LINK_Types ? LINK_Types : '')}</span>${LINK_Class === 'long-thin' ? `</div></div>` : ''}
      ${LINK_Icon ? `<div part="link-icon" class="link-icon"><img alt="Icon" src="${LINK_Icon.image}"></div>` : ''}
    </a>
    `
    const styles = `
    <link rel="stylesheet" href="app/style/basic.css">
    <link rel="stylesheet" href="app/style/shapes.css">
    <link rel="stylesheet" href="app/style/util.css">
    <style>
      a {
        position: relative;
        
        gap: 0 5px;
        ${LINK_Class == 'long-thin' ? `
        width: 1024px;
        height: 42px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        transition: all 0.15s ease;
        `: `
        display: grid;
        width: 384px;
        height: 128px;
        border-radius: 5px;
        grid-template-columns: 23.5% 76.5%;
        grid-template-rows: 43% 23% 34%;
        transition: all 0.3s ease;
        place-items: start;
        `}
        background: var(--white);
        box-shadow: 0 3px 5px var(--shadow_primary);
        text-decoration: none;
        color: var(--text_primary);
        overflow: hidden;
        outline: 2px solid transparent;
        z-index: 0;
      }
      a::before {
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
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
      }
      a:focus,
      a:hover {
        ${LINK_Class == 'long-thin' ? `
        transform: scale(1.1);
        `: `
        transform: translateY(-15px);
        `}
        outline: 2px solid white;
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

      a:active {
        ${LINK_Class == 'long-thin' ? `
        transform: scale(1.01);
        `: `
        transform: translateY(-15px) scale(0.95);
        `}
      }

      ::part(link-image), .link-image {
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

      ::part(link-title-wrapper), .link-title-wrapper {
        width: 700px;
        height: 42px;
        filter: drop-shadow(-5px 0 3px var(--shadow_half));
        transition: all 0.3s ease;
      }

      ::part(link-title-wrapper-inner), .link-title-wrapper-inner {
        --corner_radius: 7px;
        display: grid;
        grid-template-columns: 220px 121px 1fr 1fr;
        padding: 0 30px;
        height: inherit;
        background: var(--white);
        transition: all 0.3s ease;
      }
      .link:hover .link-title-wrapper {
        animation: golden_shadow 5s infinite ease;
      }

      ::part(link-title), .link-title {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
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
        grid-column: 2;
        grid-row: 2;
        `}
      }

      ::part(title-decorator), .title-decorator {
        height: 42px;
        filter: invert(0.8);
      }

      ::part(link-subscript), .link-subscript {
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

      ::part(link-icon), .link-icon {
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
        filter: drop-shadow(-1px 0 3px var(--shadow_half));
        padding: 10px;
        border-radius: 50%;
        border: 2px solid var(--light_border);
        `: `
        ${LINK_Icon.pos ? `${LINK_Icon.pos.bottom ? `bottom: ${LINK_Icon.pos.bottom}px;` : ''}${LINK_Icon.pos.right ? `right: ${LINK_Icon.pos.right}px;` : ''}` : ''}
        ${LINK_Icon.w ? `width: ${LINK_Icon.w}px;` : 'width: 70px;'}
        `}
      }
      ::part(link-icon img), .link-icon img {
        width: 100%;
        height: 100%;
        ${LINK_Class == 'long-thin' ? `
        filter: brightness(10) drop-shadow(0 0 1px var(--shadow_secondary)) drop-shadow(0 0 2px var(--shadow_half));
        ${LINK_Icon.label.transform ? `transform: ${LINK_Icon.label.transform};` : ''}
        ${LINK_Icon.label.state === 'absolute' ? `position: absolute;` : ''}
        ${LINK_Icon.label.left ? `left: ${LINK_Icon.label.left};` : ''}
        ${LINK_Icon.label.top ? `right: ${LINK_Icon.label.top};` : ''}
        ${LINK_Icon.label.size ? `width: ${LINK_Icon.label.size}; height: ${LINK_Icon.label.size};` : ''}
        `:`
        opacity: 0.05;
        `}
      }


      img::before {
        display: none;
      }

    </style>`
    $(this).attr({
      'LINK_Class': LINK_Class
    }).addClass(`${Class ? Class : 'm-3'}`);

    const concatenated = component + styles;
    this.attachShadow({ mode: 'open' }).innerHTML = concatenated;
  }
  
  connectedCallback() {

    
  }
}

customElements.define('link-block', link_block);

var linkblic = new link_block({
  LINK_Class: 'long-thin',
  LINK_Title: 'Книга Фанфиков',
  LINK_Source: 'https://nkardazolink.com/',
  LINK_Types: 'Subscript',
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
$('#testwrapper').prepend(linkblic2);


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
          <p style="width: 160px"><span class="progress-label">${loadingText[selectedLanguage]}</span><br>
            <span class="loadmarker-slashes"></span><span>&ensp;:&ensp;</span><span class="loadmarker-percent">0</span>
          </p>
        </div>
      </div>`
    );
    $('body').prepend(component).promise().done(() => {
      var preloader = $('#preloader');
      var loadmarker_style = (selectedLanguage === 'ja' || selectedLanguage === 'zh') ? 'loadmarker-dots ja' : 'loadmarker-dots';
      var siblings = preloader.siblings(':not(#preloader)');
      var siblingClass = (siblingType === 'noscroll') ? 'noscroll-for-preloader' : 'hidden-for-preloader';
      siblings.addClass(siblingClass);

      observeOn('style:--progress:100%', $('.progress-value')[0], function () {
        console.log('style:--progress:100%');
        preloader.find('br').nextAll().remove();
        preloader.find('.progress-label').html(`${executingText[selectedLanguage]}<span class="${loadmarker_style}"></span>`);
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


/* Object.values(window.ui_components).forEach(component => component()); */




class console_run extends HTMLElement {
  constructor() {
    super();
    const component = `
    <header class="cmd_header forceDrag"><span data-key="console">${languageJSON[selectedLanguage]['console']}</span><span class="close">close</span></header>
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
$('body').append(new modal_window());