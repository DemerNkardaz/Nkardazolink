function generateLinks({ linkClass, source } = {}) {
  let lArray = [];

  for (let key in source) {
    let link = source[key];
    if (linkClass) {
      link.LINK_Class = linkClass ? linkClass : 'default';
    }
    lArray.push(new link_block(link));
  }
  console.log(lArray);
  return lArray;
}

$(document).on('languageJSON_loaded', function () {
  const dataBlocks = {
    default: {
      links: {
        content: {
          ficbook: ({
            LINK_Title: cLang['Ficbook'],
            LINK_Source: 'https://ficbook.net/authors/4241255',
            LINK_Types: ['writing'],
            LINK_Background: {image: 'https://assets.ficbook.net/assets/design/profile_default_bg.png', color: `#f6ecda`, size: '150%', position: '50% 45%'},
            LINK_Image: 'https://images.ficbook.net/avatars/hWUeiDGi2ZgPcI72heSScy8DLQ1wkNun.jpg',
            LINK_Icon: {image: 'external/fickbook_logo.svg', pos: { right: -2, bottom: -2 }, w: 50},
            Arrow_blend: 'color-burn',
            Tooltip: {key: 'Naeda_Kitetsugi', pos: 'right'}
          }),
        },
        social: {
          shikimori: ({
            LINK_Title: cLang['Shikimori'],
            LINK_Source: 'https://shikimori.one/Демер+Нкардаз',
            LINK_Subscript: 'Манганимешный список',
            LINK_Subscript_Key: 'Shikimori_description',
            LINK_Background: {image: 'https://i.imgur.com/QqfSX2E.png', color: `#ffcad4`, size: '100%', position: '50% 57%'},
            LINK_Image: 'https://desu.shikimori.one/system/users/x160/1137748.png?1658010531',
            LINK_Icon: {image: 'external/shikimori_logo.svg', pos: { right: -13, bottom: -15 }, w: 60},
            Arrow_blend: 'color-burn',
            Tooltip: {key: 'Anime_Naruto_Tooltip', pos: 'right'}
          }),
          steam: ({
            LINK_Title: cLang['Steam'],
            LINK_Source: 'https://steamcommunity.com/profiles/76561198177249942',
            LINK_Subscript: 'Манганимешный список',
            LINK_Subscript_Key: 'Steam_description',
            LINK_Background: {image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/570/51c2cf9ddfe8a170b458fc37ff55b083f6a5ec6c.jpg', color: `#2868ee`, size: '110%', position: '50% 25%'},
            LINK_Image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2022180/2b76687e49715a75da390cd0ff4f84f5c5382cb2.gif',
            LINK_Icon: {image: 'external/steam_logo.svg', pos: { right: 2, bottom: 5 }},
            Tooltip: {key: 'Steam_Hi', pos: 'right'}
          }),
        }
      }
    },
    linktree: {
      links: {
        content: {
          ficbook: ({
            LINK_Title: cLang['Ficbook'],
            LINK_Source: 'https://ficbook.net/authors/4241255',
            LINK_Types: ['writing'],
            LINK_Background: {image: 'https://assets.ficbook.net/assets/design/profile_default_bg.png', color: `#f6ecda`, size: '100%', position: '-100px 50%'},
            LINK_Icon: { image: 'external/fickbook_logo.svg', label: { state: 'absolute', left: '3px', filter: 'invert(0.45) sepia(1) saturate(180%)', size: '30px' } },
            Shadow: 'drop-shadow(-5px 0 4px var(--shadow_22a29))',
          }),
        },
        social: {}
      }
    }
  }

  let actived_type = 
    anUrlParameter.mode === 'cv' ? 'cv' :
    anUrlParameter.mode === 'tree' ? 'linktree' :
    anUrlParameter.mode === 'license' ? 'license' :
    anUrlParameter.mode === 'landing' ? 'landing' :
    anUrlParameter.mode === 'reader' ? 'reader' :
    ['kamon', 'pattern', 'banners', 'clans'].includes(anUrlParameter.mode) ? 'gallery' :
    null;
  
  let header;
  let main;
  let footer;

  if (anUrlParameter.mode === 'kamon') {


    $(document).on('kamon_loaded', function () {

    });

  } else {
    header = `
    <div class="personBanner" data-banner="${nkPreferences.banner}"></div>
    <div class="personAvatar">
      <span class="avatarWrapper">
        <img src="resources/cherepkhed32.png" alt="${cLang['OCKhertahiron']}" alt-key="OCKhertahiron" width="74" loading="eager">
      </span>
    </div>
    `;
    main = `
    <div class="links_Wrapper">
      <h2 class="links_Header"><hr>${cLang['ContentLinks']}<hr></h2>
      <div class="vert-border-alpha-0">
        <div class="links_Grid">
          <anchor-contentLinks/>
        </div>
      </div>
      <h2 class="links_Header"><hr>${cLang['SocialLinks']}<hr></h2>
      <div class="vert-border-alpha-0">
        <div class="links_Grid">
        <anchor-socialLinks/>
        </div
      </div>
    </div>
    `;

    footer = `
    <span class="copyright">&copy;&nbsp;<span data-key="DemerNkardaz">${cLang['DemerNkardaz']}</span>,&nbsp;${returnCopyright()}</span>
    <span class="ambientControls ms-auto me-3">
      <button nk-music="pause/play"><span class="material-icons">pause</span></button>
      <button nk-music="random"><span class="material-icons">shuffle</span></button>
      <button nk-music="credits" data-drop_target="musicCredits"><span class="material-icons">attribution</span></button>
      <div class="trackInfo ms-2">
        <div class="trackTitle">Track — none</div>
        <div class="trackTime">00:00 / 00:00</div>
        <div class="trackProgress"></div>
      </div>
      ${nkUI.dropdown({ content: `${cLang['DemerNkardaz']}`, id: 'musicCredits', hide: false })}
    </span>`;
  }
  nk.rootContainer.attr('actived', actived_type ? actived_type : 'default');
  nk.siteHeader.html(header);
  nk.siteMainContainer.html(main);
  nk.footerContainer.html(footer);


  function generateContent() {
    if (anUrlParameter.mode === 'kamon') {

    } else {
      const contentLinks = {
        ficbook: ({
          LINK_Title: cLang['Ficbook'],
          LINK_Source: 'https://ficbook.net/authors/4241255',
          LINK_Types: ['writing'],
          LINK_Background: {
            image: 'https://assets.ficbook.net/assets/design/profile_default_bg.png',
            color: `#f6ecda`,
            size: '150%',
            position: '50% 45%',
          },
          LINK_Image: 'https://images.ficbook.net/avatars/hWUeiDGi2ZgPcI72heSScy8DLQ1wkNun.jpg',
          LINK_Icon: {
            image: 'external/fickbook_logo.svg',
            pos: {
              right: -2,
              bottom: -2
            },
            w: 50
          },
          Arrow_blend: 'color-burn',
          Tooltip: { key: 'Naeda_Kitetsugi', pos: 'right' }
        }),
      };
      const contentLinks2 = {
        test1: contentLinks.ficbook,
        test2: contentLinks.ficbook,
        test3: contentLinks.ficbook,
        test4: contentLinks.ficbook,
        test5: contentLinks.ficbook,
      };
      
      nk.siteMainContainer.find('anchor-contentLinks').replaceWith(generateLinks({source : dataBlocks.default.links.content}));
      nk.siteMainContainer.find('.links_Grid:first').append(generateLinks({source : contentLinks2}));
      nk.siteMainContainer.find('anchor-socialLinks').replaceWith(generateLinks({source : dataBlocks.default.links.social}));
      //nk.siteMainContainer.prepend(generateLinks({linkClass : 'long-thin', source : dataBlocks.linktree.links.content}));
    };
  }; generateContent();

  updateLanguageKeys();



  $(document).trigger(`${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select + '_page_loaded' : (anUrlParameter.mode ? anUrlParameter.mode + '_page_loaded' : 'default_page_loaded')}`);
});

function logCurrentTrigger() {
  $(document).on(`${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select + '_page_loaded' : (anUrlParameter.mode ? anUrlParameter.mode + '_page_loaded' : 'default_page_loaded')}`, function () {
    console.log(`Current trigger: ${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select : (anUrlParameter.mode ? anUrlParameter.mode : 'default')}`);
  });
};
logCurrentTrigger();