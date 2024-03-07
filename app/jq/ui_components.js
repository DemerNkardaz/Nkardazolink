class item_prop extends HTMLElement {
  constructor({ PROP_ENTITY, PROP_Class, PROP_Image, PROP_Title, PROP_Text, PROP_Rarity, PROP_Group, PROP_Multi, PROP_Image_Types, PROP_Icon, PROP_Image_Label, PROP_Title_Additional } = {}) {
    super();
    const component = `
      ${PROP_Image ? `
        <div part="item_image_wrapper" class="item_image_wrapper">
          <picture part="item_image_picture" class="item_image_picture">
            ${PROP_Image_Label ? `<div part="item_image_label" class="item_image_label">${PROP_Image_Label}</div>` : ''}
            ${PROP_Image_Types ? PROP_Image_Types.split(', ').map(type => `<source srcset="${type === 'svg' ? PROP_Image.replace('_thumb.png', '.svg') : PROP_Image.replace(/\.\w+$/, `.${type}`)}" type="image/${type}">`).join('') : ''}

            <img part="item_image" class="item_image" src="${PROP_Image}" loading="lazy">
          </picture>
        </div>
      ` : ''}
      ${PROP_Title ? `<div part="item_title" class="item_title">${PROP_Icon ? `<img part="item_icon" class="item_icon" src="${PROP_Icon}">` : ''}<span part="item_title_text" class="item_title_text">${PROP_Title}</span>${PROP_Title_Additional ? `<div part="item_title_additional" class="item_title_additional">${PROP_Title_Additional}</div>` : ''}</div>` : ''}
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
    });

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



window.ui_components = {
  preloader: (siblingType, callback, stopTimer) => {
    var component = (`
      <div id="preloader">
        <div class="preloader-logo">
          <div class="preloader-logo-wrapper">
            <img src="resources/svg/NkardazKamon.svg" width="100">
          </div>
        </div>
        <div class="preloader-progress">
          <div id="preloader-progress" class="progress_bar" value="0"></div>
          <p style="width: 160px"><span id="progress-label">${loadingText[selectedLanguage]}</span><br>
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

      observeOn('style:--progress:100%', $('#preloader-progress')[0], function () {
        console.log('style:--progress:100%');
        preloader.find('br').nextAll().remove();
        preloader.find('#progress-label').html(`${executingText[selectedLanguage]}<span class="${loadmarker_style}"></span>`);
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