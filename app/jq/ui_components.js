class item_prop extends HTMLElement {
  constructor({ PROP_ENTITY, PROP_Class, PROP_Image, PROP_Title, PROP_Text, PROP_Rarity, PROP_Group, PROP_Multi }) {
    super();
    const component =
      (PROP_Image ? `<div part="item_image_wrapper"><img part="item_image" src=${PROP_Image} loading="lazy"></div>` : '') +
      (PROP_Title ? `<div part="item_title">${PROP_Title}</div>` : '') +
      (PROP_Text && PROP_Class === 'clans' ? `<div part="item_text">${PROP_Text}</div>` : '');

    const styles = `
      <link rel="stylesheet" href="app/style/compiled.css">
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
            cursor: pointer;
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

        ::part(item_image_wrapper) {
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

        ::part(item_title) {
          ${(['kamon', 'banners', 'pattern'].includes(PROP_Class)) ? `
            position: absolute;
            width: 100%;
            bottom: 2.95px;
            justify-content: center;
          ` : `
            font-size: 1.35rem;
            grid-column: 2;
            grid-row: 1;
            justify-content: start;
          `}
          display: flex;
          align-items: center;
          font-weight: 800;
        }

        ::part(item_text) {
          grid-column: 2;
          grid-row: 2;
        }

        ::part(item_image) {
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

      </style>`;
      
    $(this).attr({
      'PROP_ENTITY': (PROP_ENTITY ? PROP_ENTITY : null),
      'PROP_Class': (PROP_Class ? PROP_Class : null),
      'PROP_Rarity': (PROP_Rarity ? PROP_Rarity : null),
      'PROP_Group': (PROP_Group ? PROP_Group : null),
      'PROP_Multi': (PROP_Multi ? PROP_Multi : null)
    });
    
    var concatenated = component + styles;
    this.attachShadow({ mode: 'open' }).innerHTML = concatenated;
  }
  
  connectedCallback() {
    const PROP_Class = $(this).attr('PROP_Class');
    $(this).addClass(['kamon', 'banners', 'clans', 'pattern'].includes(PROP_Class) ? PROP_Class : 'default');
  }
  
  render() {
    // Здесь можно добавить логику рендеринга
  }
}

customElements.define('item-prop', item_prop);


window.item_create = function() {
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
  nk.siteMainContainer.prepend(item);
  var item2 = new item_prop({
    PROP_Class: 'clans',
    PROP_Image: image2,
    PROP_Title: `Сакаи <div class="ms-auto" style="font-weight: 500">酒井氏</div>`,
    PROP_Text: "Клан Сакаи знаменит защитой острова Цусима от монгольского вторжения.",
  });
  nk.siteMainContainer.prepend(item2);
}



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