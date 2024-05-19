class LinkBlock extends HTMLElement {
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
    const component = `<div class="link-plate-wrapper${nk.settingConfig.get('skin') === 'azumatsuyu' && LINK_Class !== 'long-thin' ? ` plate_chinese` : ''}" part="link-plate-wrapper">
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

customElements.define('link-block', LinkBlock);
nk.ui.LinkBlock = LinkBlock;



nk.ui.linkBlockArray = function ({ source, linkClass } = {}) {
  let lArray = [];
  
  for (let key in source) {
    let link = source[key];
    if (linkClass) {
      link.LINK_Class = linkClass ? linkClass : 'default';
    };
    lArray.push(new nk.ui.LinkBlock(link));
  };
  return lArray;
}