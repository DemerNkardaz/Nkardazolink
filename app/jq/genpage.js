function logCurrentTrigger() {
  $(document).on(`${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select + '_page_loaded' : (anUrlParameter.mode ? anUrlParameter.mode + '_page_loaded' : 'default_page_loaded')}`, function () {
    console.log(`Current trigger: ${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select : (anUrlParameter.mode ? anUrlParameter.mode : 'default')}`);
  });
};

function generateLinks({ linkClass, source } = {}) {
  let lArray = [];

  for (let key in source) {
    let link = source[key];
    if (linkClass) {
      link.LINK_Class = linkClass ? linkClass : 'default';
    };
    lArray.push(new link_block(link));
  };
  return lArray;
};

window.createObject = {
  link: function ({ source, linkClass } = {}) {
    let lArray = [];
    
    for (let key in source) {
      let link = source[key];
      if (linkClass) {
        link.LINK_Class = linkClass ? linkClass : 'default';
      };
      lArray.push(new link_block(link));
    };
    return lArray;
  },
  item: function ({ source, entClass } = {}) {
    let itemArray = [];
    $.each(source.root, function (_, category) {
      let image_default = data.default_img_path;
      let image_folder = image_default + category.img_folder;
      $.each(category.items, function (_, item) {
        let itemEntity = new item_prop({
          PROP_Class: entClass ? entClass : 'kamon',
          PROP_ENTITY: item.entity_prop,
          PROP_Rarity: item.rarity,
        });
        itemArray.push(itemEntity);
      });
    });

    return itemArray;
  },
  portfolio: function ({ source, entClass } = {}) {
    let itemArray = [];
    $.each(source.root, function (_, category) {
      $.each(category.items, function (_, item) {
        let itemEntity = new item_portfolio({
          PROP_Class: entClass ? entClass : 'default',
          PROP_ENTITY: item.entity_prop,
          PROP_Thumb: item.image.thumb ? item.image.thumb : item.image.source,
          PROP_Image: item.image.source,
          PROP_Fullres: item.image.fullres ? item.image.fullres : null,
        });
        itemArray.push(itemEntity);
      });
    });
    return itemArray;
  }
};

const pageBuild = new Promise(function (resolve, reject) {
  function anErrorOnBuild(err, str) {
    console.error(`An error occured during ${str}: ${err}`);
  }
  try {
    languageLoaded(function () {
      const dataBlocks = {
        default: {
          links: {
            content: {
              ficbook: ({
                LINK_Title: nkLocale.get('links.Ficbook'),
                LINK_Title_Key: 'links.Ficbook',
                LINK_Source: 'https://ficbook.net/authors/4241255',
                LINK_Types: ['writing'],
                LINK_Background: { image: 'https://assets.ficbook.net/assets/design/profile_default_bg.png', color: `#f6ecda`, size: '150%', position: '50% 45%' },
                LINK_Image: 'https://images.ficbook.net/avatars/hWUeiDGi2ZgPcI72heSScy8DLQ1wkNun.jpg',
                LINK_Icon: { image: 'external/fickbook_logo.svg', pos: { right: -2, bottom: -2 }, w: 50 },
                Arrow: { blend: 'color-burn' },
                Tooltip: { key: 'links.Anime_BlackClover_Tooltip', pos: 'right' }
              }),
              authorToday: ({
                LINK_Title: nkLocale.get('links.AuthorToday'),
                LINK_Title_Key: 'links.AuthorToday',
                LINK_Source: 'https://author.today/u/demer_nkardaz',
                LINK_Types: ['writing'],
                LINK_Background: { image: 'https://cm.author.today/content/2023/07/07/4bac28c43b3b4d6eaa6c6646bf977220.jpg', color: `#7b85a3`, size: 'cover', position: '50% 5%' },
                LINK_Image: 'https://cm.author.today/content/2023/09/08/d1419456461a4cf9adf4163ea03fce55.jpg',
                LINK_Icon: { image: 'external/author_today_logo.svg', pos: { right: -15, bottom: -12 } },
                Tooltip: { key: 'links.Anime_Heike-monogatari', pos: 'right' }
              }),
              artStation: ({
                LINK_Title: nkLocale.get('links.ArtStation'),
                LINK_Title_Key: 'links.ArtStation',
                LINK_Source: 'https://www.artstation.com/demernkardaz',
                LINK_Types: ['artwork', 'modeling', 'layout'],
                LINK_Background: { image: 'https://cdnb.artstation.com/p/users/covers/004/308/091/default/ed360d2bc08458597cbfa650a51c8f7e.jpg', color: `#b85d14`, size: '150%', position: '50% 0%' },
                LINK_Image: 'https://cdnb.artstation.com/p/users/avatars/004/308/091/large/9e05d5d5427f31d392d6d6df0ecd2331.jpg',
                LINK_Icon: { image: 'external/artstation_logo.svg', pos: { right: -15, bottom: -12 } },
                Tooltip: { key: 'links.Hachiman-jin_Tooltip', pos: 'right' }
              }),
              shagorRealmsCommunity: ({
                LINK_Title: nkLocale.get('links.ShagorRealms'),
                LINK_Title_Key: 'links.ShagorRealms',
                LINK_Source: 'https://vk.com/club203543966',
                LINK_Types: ['artwork', 'modeling', 'layout', 'writing'],
                LINK_Background: { image: 'resources/png/china/jiangu_full_bg_golden v2_thumb.png', color: `#fffd51`, size: 'cover', position: '50% 60%' },
                LINK_Image: 'resources/png/japan/icons/bf_00_Hachiman_yellow_s.png',
                LINK_Icon: { image: 'external/VK_logo.svg', pos: { right: -15, bottom: -20 } },
                Tooltip: { key: 'links.Hachiman-jin_Tooltip', pos: 'right' }
              }),
              DTFBlog: ({
                LINK_Title: nkLocale.get('links.DTF_Blog'),
                LINK_Title_Key: 'links.DTF_Blog',
                LINK_Source: 'https://dtf.ru/u/266902-demer-nkardaz',
                LINK_Types: ['artwork', 'modeling', 'layout', 'writing'],
                LINK_Background: { image: 'https://leonardo.osnova.io/15784ecb-c2bd-54ca-91d3-fbaf396d3002/-/scale_crop/960/-/format/webp/', color: `#dbe1da`, size: 'cover', position: '50% 40%' },
                LINK_Image: 'https://leonardo.osnova.io/3c89e2c2-a2e8-5256-9f0c-096a75d34923/-/scale_crop/200x200/-/format/webp/',
                LINK_Icon: { image: 'external/DTF_logo.svg', pos: { right: -10, bottom: -5 }, w: 100 },
                Tooltip: { key: 'links.Anime_Naruto_Tooltip', pos: 'right' },
                Arrow: { blend: 'color-burn' },
              }),
              NaedaKitetsugi: ({
                LINK_Title: nkLocale.get('links.Naeda_Kitetsugi'),
                LINK_Title_Key: 'links.Naeda_Kitetsugi',
                LINK_Source: 'https://vk.com/public219642160',
                LINK_Types: ['artwork'],
                LINK_Background: { image: 'external/Ghost_of_Tsushima.jpg', color: `#fffd51`, size: 'cover', position: '50% 50%' },
                LINK_Image: 'resources/cherepkhed32.png',
                LINK_Icon: { image: 'external/VK_logo.svg', pos: { right: -15, bottom: -20 } },
                Class: 'inactive m-3',
                Tooltip: { key: 'Nkardaz.fursona', pos: 'right' },
                Arrow: { color: 'var(--text_a4)' }
              }),
            },
          
            social: {
              shikimori: ({
                LINK_Title: nkLocale.get('links.Shikimori'),
                LINK_Title_Key: 'links.Shikimori',
                LINK_Source: 'https://shikimori.one/Демер+Нкардаз',
                LINK_Subscript: nkLocale.get('links.Shikimori_description'),
                LINK_Subscript_Key: 'links.Shikimori_description',
                LINK_Background: { image: 'https://i.imgur.com/QqfSX2E.png', color: `#ffcad4`, size: '100%', position: '50% 57%' },
                LINK_Image: 'https://desu.shikimori.one/system/users/x160/1137748.png?1658010531',
                LINK_Icon: { image: 'external/shikimori_logo.svg', pos: { right: -13, bottom: -15 }, w: 60 },
                Arrow: { blend: 'color-burn' },
                Tooltip: { key: 'links.Anime_Naruto_Tooltip', pos: 'right' }
              }),
              steam: ({
                LINK_Title: nkLocale.get('links.Steam'),
                LINK_Title_Key: 'links.Steam',
                LINK_Source: 'https://steamcommunity.com/profiles/76561198177249942',
                LINK_Subscript: nkLocale.get('links.Steam_description'),
                LINK_Subscript_Key: 'links.Steam_description',
                LINK_Background: { image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/570/51c2cf9ddfe8a170b458fc37ff55b083f6a5ec6c.jpg', color: `#2868ee`, size: '110%', position: '50% 25%' },
                LINK_Image: 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2022180/2b76687e49715a75da390cd0ff4f84f5c5382cb2.gif',
                LINK_Icon: { image: 'external/steam_logo.svg', pos: { right: 2, bottom: 5 } },
                Tooltip: { key: 'links.Steam_Hi', pos: 'right' }
              }),
            }
          }
        },
        linktree: {
          links: {
            content: {
              ficbook: ({
                LINK_Title: nkLocale.get('links.Ficbook'),
                LINK_Title_Key: 'links.Ficbook',
                LINK_Source: 'https://ficbook.net/authors/4241255',
                LINK_Types: ['writing'],
                LINK_Background: { image: 'https://assets.ficbook.net/assets/design/profile_default_bg.png', color: `#f6ecda`, size: '100%', position: '-100px 50%' },
                LINK_Icon: { image: 'external/fickbook_logo.svg', label: { state: 'absolute', left: '3px', filter: 'invert(0.45) sepia(1) saturate(180%)', size: '30px' } },
                Shadow: 'drop-shadow(-5px 0 4px var(--shadow_22a29))',
              }),
            },
            social: {}
          }
        }
      }

      const actived_type =
        anUrlParameter.mode === 'cv' ? 'cv' :
          anUrlParameter.mode === 'tree' ? 'linktree' :
            anUrlParameter.mode === 'license' ? 'license' :
              anUrlParameter.mode === 'landing' ? 'landing' :
                anUrlParameter.mode === 'reader' ? 'reader' :
                  ['kamon', 'pattern', 'banners', 'clans'].includes(anUrlParameter.mode) ? 'gallery' : null;
      let header;
      let main;
      let footer;

      const pageConfig = new Promise(function (resolveCFG, rejectCFG) {
        try {
          if (anUrlParameter.mode === 'kamon') {

            $(document).on('kamon_loaded', function () {

            });

          } else if (anUrlParameter.mode === 'banners') {

          } else if (anUrlParameter.mode === 'clans') {

          } else if (anUrlParameter.mode === 'cv') {

          } else if (anUrlParameter.mode === 'landing') {

          } else if (anUrlParameter.mode === 'tree') {

          } else if (anUrlParameter.mode === 'license') {
            header = `<div data-test="Text">${nkLocale.get('Text>licenseJSON')}</div>`;

            footer = `<div>
              ${nkLocale.get('Nkardaz.copyright', '&copy;')}
            </div><div data-key="Nkardaz.copyright" data-keyCutter="&copy;"></div>`;

          } else if (anUrlParameter.mode === 'pattern') {

          } else if (anUrlParameter.mode === 'reader') {

          } else {
            header = `
            ${nkSettings.get('skin') === "azumatsuyu" ? `<div class="personBannerBorder azumatsuyu wrap_border"></div>` : ''}
            <div class="personBannerWrapper ${(nkSettings.get('skin') === "sekiban" || nkSettings.get('skin') === "azumatsuyu") ? `plate_chinese` : ''}"><div class="personBanner ${nkSettings.get('skin')}" style="--banner: url(${nkPreferences.banner[nkSettings.get('current_banner')].url});" data-banner="${nkSettings.get('current_banner')}"></div></div>
            <div class="personAvatar">
              <span class="avatarWrapper ${nkSettings.get('skin') === "azumatsuyu" ? `plate_chinese` : ''}">
                <img src="resources/cherepkhed32_thumb.png" alt="${nkLocale.get('Nkardaz.fursona')}" alt-key="Nkardaz.fursona" width="74" loading="eager">
              </span>
              ${nkSettings.get('skin') === "aogurogetsu" ? `<img src="external/avatarHalo.gif" alt="" class="avatarHalo" loading="lazy">` : ''}
            </div>
            <div>Теставые букавы<span>${nkLocale.get('test')}</span><br/><span data-key="C.test"></span>${nkLocale.get('C.test')}
            </div>
            <div class="lang-optionOwner">${nkUI.langList('row')}</div>${nkLocale.get('testqu')}<br>
            <div tooltip_key="prevtest" tooltip_pos="right" tooltip_role="preview">TESTING OF PREVIEW TOOLTIP</div>
            <div style="height: 1000px">f</div>
            <div class="my-auto" tooltip_key="test" tooltip_pos="bottom">TESTING OF TOOLTIPUSU</div>
            `;

            main = `
            <div class="links_Wrapper">
              <h2 class="links_Header"><hr><span data-key="links.ContentLinks">${nkLocale.get('links.ContentLinks')}</span><hr></h2>
              <div class="vert-border-alpha-0 links_Grid_Parent" >
                <div class="links_Grid" tooltip_key="Tess" tooltip_pos="left">
                  <anchor-contentLinks/>
                </div>
              </div>${nkUI.tooltipEventLess(nkLocale.get('Skins.Current'), 'Skins.Azumatsuyu')}
              <h2 class="links_Header"><hr><span data-key="links.SocialLinks">${nkLocale.get('links.SocialLinks')}</span><hr></h2>
              <div class="vert-border-alpha-0 links_Grid_Parent">
                <div class="links_Grid">
                <anchor-socialLinks/>
                </div
              </div>
            </div>
            `;

            footer = `
            <span class="copyright"><span data-key="Nkardaz.copyright">${nkLocale.get('Nkardaz.copyright')}</span><span data-key="Skins.Current">${nkLocale.get('Skins.Current')}</span></span>
            <span class="ambientControls ms-auto me-3">
              <button nk-music="pause/play"><span class="material-icons">pause</span></button>
              <button nk-music="random"><span class="material-icons">shuffle</span></button>
              <button nk-music="credits" data-drop_target="musicCredits"><span class="material-icons">attribution</span></button>
              <div class="trackInfo ms-2">
                <div class="trackTitle">Track — none</div>
                <div class="trackTime">00:00 / 00:00</div>
                <div class="trackProgress"></div>
              </div>
              ${nkUI.dropdown({ content: `${nkLocale.get('MusicCredits')}`, id: 'musicCredits', hide: false })}
            </span>`;
          }
          nk.rootContainer.attr('actived', actived_type ? actived_type : 'default');
          nk.siteHeader.html(header);
          nk.siteMainContainer.html(main);
          nk.footerContainer.html(footer);

          resolveCFG();
        } catch (err) { anErrorOnBuild(err, 'page config'); rejectCFG(err); }
      });

      pageConfig.then(() => {
        console.buildType('[GENPAGE] → Configuration is set & loaded', 'info');
      
        function generateContent() {
          if (anUrlParameter.mode === 'kamon') {

          } else if (anUrlParameter.mode === 'banners') {

          } else if (anUrlParameter.mode === 'clans') {

          } else if (anUrlParameter.mode === 'cv') {

          } else if (anUrlParameter.mode === 'landing') {

          } else if (anUrlParameter.mode === 'tree') {

          } else if (anUrlParameter.mode === 'license') {

          } else if (anUrlParameter.mode === 'pattern') {

          } else if (anUrlParameter.mode === 'reader') {

          } else {
      
            nk.siteMainContainer.find('anchor-contentLinks').replaceWith(createObject.link({ linkClass: 'default', source: dataBlocks.default.links.content }));
            nk.siteMainContainer.find('anchor-socialLinks').replaceWith(createObject.link({ linkClass: 'default', source: dataBlocks.default.links.social }));
            //nk.siteMainContainer.prepend(generateLinks({linkClass : 'long-thin', source : dataBlocks.linktree.links.content}));

          };
        }; generateContent();
        resolve();
      });
    });
  } catch (err) { anErrorOnBuild(err, 'page build'); reject(err); }
});

pageBuild.then(function () {
  console.buildType(`[GENPAGE] → Page Builded and Loaded. Current mode trigger: “${pageTriggerCallback('return')}”`, 'info');
  nkLocale.langUpdate();
  $(document).on('')
  switch (anUrlParameter.mode) {
    case 'license':
      $(document).on('licenseJSON_loaded', function () { nkLocale.langUpdate({ target: { selector: '[data-test]', attrib: 'data-test' }, source: licenseJSON }); });
      break;
  }
  $(document).trigger(`${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select + '_page_loaded' : (anUrlParameter.mode ? anUrlParameter.mode + '_page_loaded' : 'default_page_loaded')}`);
});

//logCurrentTrigger();
