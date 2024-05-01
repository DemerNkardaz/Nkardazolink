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
            Arrow: {blend: 'color-burn'},
            Tooltip: {key: 'Anime_BlackClover_Tooltip', pos: 'right'}
          }),
          authorToday: ({
            LINK_Title: cLang['AuthorToday'],
            LINK_Source: 'https://author.today/u/demer_nkardaz',
            LINK_Types: ['writing'],
            LINK_Background: {image: 'https://cm.author.today/content/2023/07/07/4bac28c43b3b4d6eaa6c6646bf977220.jpg', color: `#7b85a3`, size: 'cover', position: '50% 5%'},
            LINK_Image: 'https://cm.author.today/content/2023/09/08/d1419456461a4cf9adf4163ea03fce55.jpg',
            LINK_Icon: {image: 'external/author_today_logo.svg', pos: { right: -15, bottom: -12 }},
            Tooltip: {key: 'Anime_Heike-monogatari', pos: 'right'}
          }),
          artStation: ({
            LINK_Title: cLang['ArtStation'],
            LINK_Source: 'https://www.artstation.com/demernkardaz',
            LINK_Types: ['artwork', 'modeling', 'layout'],
            LINK_Background: {image: 'https://cdnb.artstation.com/p/users/covers/004/308/091/default/ed360d2bc08458597cbfa650a51c8f7e.jpg', color: `#b85d14`, size: '150%', position: '50% 0%'},
            LINK_Image: 'https://cdnb.artstation.com/p/users/avatars/004/308/091/large/9e05d5d5427f31d392d6d6df0ecd2331.jpg',
            LINK_Icon: {image: 'external/artstation_logo.svg', pos: { right: -15, bottom: -12 }},
            Tooltip: {key: 'Hachiman-jin_Tooltip', pos: 'right'}
          }),
          shagorRealmsCommunity: ({
            LINK_Title: cLang['ShagorRealms'],
            LINK_Source: 'https://vk.com/club203543966',
            LINK_Types: ['artwork', 'modeling', 'layout', 'writing'],
            LINK_Background: {image: '../resources/png/china/jiangu_full_bg_golden v2_thumb.png', color: `#fffd51`, size: 'cover', position: '50% 60%'},
            LINK_Image: '../resources/png/japan/icons/bf_00_Hachiman_yellow_s.png',
            LINK_Icon: {image: 'external/VK_logo.svg', pos: { right: -15, bottom: -20 }},
            Tooltip: {key: 'Hachiman-jin_Tooltip', pos: 'right'}
          }),
          DTFBlog: ({
            LINK_Title: cLang['DTF_Blog'],
            LINK_Source: 'https://vk.com/club203543966',
            LINK_Types: ['artwork', 'modeling', 'layout', 'writing'],
            LINK_Background: {image: 'https://leonardo.osnova.io/15784ecb-c2bd-54ca-91d3-fbaf396d3002/-/scale_crop/960/-/format/webp/', color: `#dbe1da`, size: 'cover', position: '50% 40%'},
            LINK_Image: 'https://leonardo.osnova.io/3c89e2c2-a2e8-5256-9f0c-096a75d34923/-/scale_crop/200x200/-/format/webp/',
            LINK_Icon: { image: 'external/DTF_logo.svg', pos: { right: -10, bottom: -5 }, w: 100 },
            Tooltip: { key: 'Anime_Naruto_Tooltip', pos: 'right' },
            Arrow: {blend: 'color-burn'},
          }),
          NaedaKitetsugi: ({
            LINK_Title: cLang['Naeda_Kitetsugi'],
            LINK_Source: 'https://vk.com/public219642160',
            LINK_Types: ['artwork'],
            LINK_Background: {image: '../external/Ghost_of_Tsushima.jpg', color: `#fffd51`, size: 'cover', position: '50% 50%'},
            LINK_Image: '../resources/cherepkhed32.png',
            LINK_Icon: { image: 'external/VK_logo.svg', pos: { right: -15, bottom: -20 } },
            Class: 'inactive m-3',
            Tooltip: {key: 'OCKhertahiron', pos: 'right'},
            Arrow: {color: 'var(--text_a4)'}
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
            Arrow: {blend: 'color-burn'},
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
      <div class="vert-border-alpha-0 links_Grid_Parent" >
        <div class="links_Grid">
          <anchor-contentLinks/>
        </div>
      </div>
      <h2 class="links_Header"><hr>${cLang['SocialLinks']}<hr></h2>
      <div class="vert-border-alpha-0 links_Grid_Parent">
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
      
      nk.siteMainContainer.find('anchor-contentLinks').replaceWith(generateLinks({linkClass : 'default', source : dataBlocks.default.links.content}));
      nk.siteMainContainer.find('anchor-socialLinks').replaceWith(generateLinks({linkClass : 'default', source : dataBlocks.default.links.social}));
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