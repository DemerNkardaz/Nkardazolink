function logCurrentTrigger() {
  $(document).on(`${nk.url.mode && nk.url.select ? nk.url.mode + nk.url.select + '_page_loaded' : (nk.url.mode ? nk.url.mode + '_page_loaded' : 'default_page_loaded')}`, function () {
    console.log(`Current trigger: ${nk.url.mode && nk.url.select ? nk.url.mode + nk.url.select : (nk.url.mode ? nk.url.mode : 'default')}`);
  });
};

function generateLinks({ linkClass, source } = {}) {
  let lArray = [];

  for (let key in source) {
    let link = source[key];
    if (linkClass) {
      link.LINK_Class = linkClass ? linkClass : 'default';
    };
    lArray.push(new nk.ui.LinkBlock(link));
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
      lArray.push(new nk.ui.LinkBlock(link));
    };
    return lArray;
  },
  item: function ({ source, entClass } = {}) {
    let itemArray = [];
    $.each(source.root, function (_, category) {
      let image_default = data.default_img_path;
      let image_folder = image_default + category.img_folder;
      $.each(category.items, function (_, item) {
        let itemEntity = new ItemProp({
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

const PAGE_BUILD = new Promise(function (resolve, reject) {
  function anErrorOnBuild(err, str) {
    console.error(`An error occured during ${str}: ${err}`);
  }
  try {
    $(document).on('full_data_loaded', function () {
      const DATA_BLOCKS = {
        default: {
          links: {
            content: {
              ficbook: ({
                LINK_Title: nk.locale.get('links.Ficbook'),
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
                LINK_Title: nk.locale.get('links.AuthorToday'),
                LINK_Title_Key: 'links.AuthorToday',
                LINK_Source: 'https://author.today/u/demer_nkardaz',
                LINK_Types: ['writing'],
                LINK_Background: { image: 'https://cm.author.today/content/2023/07/07/4bac28c43b3b4d6eaa6c6646bf977220.jpg', color: `#7b85a3`, size: 'cover', position: '50% 5%' },
                LINK_Image: 'https://cm.author.today/content/2023/09/08/d1419456461a4cf9adf4163ea03fce55.jpg',
                LINK_Icon: { image: 'external/author_today_logo.svg', pos: { right: -15, bottom: -12 } },
                Tooltip: { key: 'links.Anime_Heike-monogatari', pos: 'right' }
              }),
              artStation: ({
                LINK_Title: nk.locale.get('links.ArtStation'),
                LINK_Title_Key: 'links.ArtStation',
                LINK_Source: 'https://www.artstation.com/demernkardaz',
                LINK_Types: ['artwork', 'modeling', 'layout'],
                LINK_Background: { image: 'https://cdnb.artstation.com/p/users/covers/004/308/091/default/ed360d2bc08458597cbfa650a51c8f7e.jpg', color: `#b85d14`, size: '150%', position: '50% 0%' },
                LINK_Image: 'https://cdnb.artstation.com/p/users/avatars/004/308/091/large/9e05d5d5427f31d392d6d6df0ecd2331.jpg',
                LINK_Icon: { image: 'external/artstation_logo.svg', pos: { right: -15, bottom: -12 } },
                Tooltip: { key: 'links.Hachiman-jin_Tooltip', pos: 'right' }
              }),
              shagorRealmsCommunity: ({
                LINK_Title: nk.locale.get('links.ShagorRealms'),
                LINK_Title_Key: 'links.ShagorRealms',
                LINK_Source: 'https://vk.com/club203543966',
                LINK_Types: ['artwork', 'modeling', 'layout', 'writing'],
                LINK_Background: { image: 'resources/png/china/jiangu_full_bg_golden v2_thumb.png', color: `#fffd51`, size: 'cover', position: '50% 60%' },
                LINK_Image: 'resources/png/japan/icons/bf_00_Hachiman_yellow_s.png',
                LINK_Icon: { image: 'external/VK_logo.svg', pos: { right: -15, bottom: -20 } },
                Tooltip: { key: 'links.Hachiman-jin_Tooltip', pos: 'right' }
              }),
              DTFBlog: ({
                LINK_Title: nk.locale.get('links.DTF_Blog'),
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
                LINK_Title: nk.locale.get('links.Naeda_Kitetsugi'),
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
                LINK_Title: nk.locale.get('links.Shikimori'),
                LINK_Title_Key: 'links.Shikimori',
                LINK_Source: 'https://shikimori.one/Демер+Нкардаз',
                LINK_Subscript: nk.locale.get('links.Shikimori_description'),
                LINK_Subscript_Key: 'links.Shikimori_description',
                LINK_Background: { image: 'https://i.imgur.com/QqfSX2E.png', color: `#ffcad4`, size: '100%', position: '50% 57%' },
                LINK_Image: 'https://desu.shikimori.one/system/users/x160/1137748.png?1658010531',
                LINK_Icon: { image: 'external/shikimori_logo.svg', pos: { right: -13, bottom: -15 }, w: 60 },
                Arrow: { blend: 'color-burn' },
                Tooltip: { key: 'links.Anime_Naruto_Tooltip', pos: 'right' }
              }),
              steam: ({
                LINK_Title: nk.locale.get('links.Steam'),
                LINK_Title_Key: 'links.Steam',
                LINK_Source: 'https://steamcommunity.com/profiles/76561198177249942',
                LINK_Subscript: nk.locale.get('links.Steam_description'),
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
                LINK_Title: nk.locale.get('links.Ficbook'),
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

      const ACTIVATE_INTERFACE_TYPE =
        nk.url.mode === 'cv' ? 'cv' :
          nk.url.mode === 'tree' ? 'linktree' :
            nk.url.mode === 'license' ? 'license' :
              nk.url.mode === 'landing' ? 'landing' :
                nk.url.mode === 'reader' ? 'reader' :
                  ['kamon', 'pattern', 'banners', 'clans'].includes(nk.url.mode) ? 'gallery' : null;
      nk.rootContainer.attr('data-active-interface', ACTIVATE_INTERFACE_TYPE ? ACTIVATE_INTERFACE_TYPE : 'default');
      
      let header;
      let main;
      let footer;

      const PAGE_CONFIG = new Promise(function (resolveCFG, rejectCFG) {
        try {
          if (nk.url.mode === 'kamon') {
            nk.siteMainContainer.after(
              new nk.ui.InventoryInfoPanel({
                PANEL: {
                  entity: 'ent_maru-ni-mitsu-aoi.clan_matsudaira',
                  name : 'kamon',
                  title: { text: 'Default', key: 'names', clan: 'Clan', clan_key: 'clan_names' },
                  description: { text: 'Default', key: 'description' },
                  CJK: { first_key: 'kanji_first', second_key: 'kanji_second' },
                  image: 'resources/svg/japan/kamon/Mon_of_clan_Matsudaira.svg',
                  prop_class: 'kamon', category: 'JA', rarity: 'inferior',
                }
              })
            );

            header = `
            <input nk-prop-search="kamon" type="text" placeholder="Поиск знака…">
            `;

            main = `
            <div data-items-container="kamon" style="display: grid; grid-template-columns: repeat(7, 1fr); grid-gap: 30px;">${unpackElementObject(nk.ui.itemPropArray(nk.items.kamon))}</div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); grid-gap: 30px;">${unpackElementObject(nk.ui.itemPropArray(null, 'template'))}</div>
            <div data-entity="ent_maru_ni_mittsu_aoi.clan_matsudaira" data-prop-class="kamon" data-prop-category="JA"><span data-key="transcript_second">fff</span></div><div style="display: grid; grid-template-columns: repeat(10, 1fr); grid-gap: 8px; border: 1px solid #000; padding-top: 8px; height: 400px; width: 100%;" data-drop-site="kamon"></div>`;
            
            
            footer = `
            `;

          } else if (nk.url.mode === 'banners') {

          } else if (nk.url.mode === 'clans') {

          } else if (nk.url.mode === 'cv') {

          } else if (nk.url.mode === 'landing') {

          } else if (nk.url.mode === 'tree') {

          } else if (nk.url.mode === 'license') {
            header = ``;

            main = `<div class="licensePages lh-3">
              <div data-key="Title" data-key-source="licenseJSON">${nk.locale.get('Title>licenseJSON')}</div>
              <div data-key="Text" data-key-source="licenseJSON">${nk.locale.get('Text>licenseJSON')}</div>
              </div>`;

            footer = `<span data-key="Nkardaz.copyright" data-key-cutter="&ensp;|"></span>`;

          } else if (nk.url.mode === 'pattern') {

          } else if (nk.url.mode === 'reader') {

          } else {
            header = `
            ${nk.settingConfig.get('skin') === "azumatsuyu" ? `<div class="person-banner-border azumatsuyu wrap_border"></div>` : ''}
            <div class="person-banner-wrapper ${(nk.settingConfig.get('skin') === "sekiban" || nk.settingConfig.get('skin') === "azumatsuyu") ? `plate_chinese` : ''}"><div class="person-banner ${nk.settingConfig.get('skin')}" style="--banner: url(${nkPreferences.banner[nk.settingConfig.get('current_banner')].url});" data-banner="${nk.settingConfig.get('current_banner')}"></div></div>
            <div class="person-avatar">
              <span class="person-avatar__image-wrapper ${nk.settingConfig.get('skin') === "azumatsuyu" ? `plate_chinese` : ''}">
                <img class="person-avatar__image" src="resources/cherepkhed32_thumb.png" alt="${nk.locale.get('Nkardaz.fursona')}" alt-key="Nkardaz.fursona" width="74" loading="eager">
              </span>
              ${nk.settingConfig.get('skin') === "aogurogetsu" ? `<img src="external/avatarHalo.gif" alt="" class="person-avatar__image__halo" loading="lazy">` : ''}
            </div>
            <div>Теставые букавы<span>${nk.locale.get('test')}</span><br/><span data-key="C.test"></span>${nk.locale.get('C.test')}<br>
              ${repoStatus.join('<br>')}
            </div>
            <div class="lang-optionOwner">${nk.ui.langList('row')}</div>${nk.locale.get('testqu')}<br>
            <div data-tooltip-key="prevtest" data-tooltip-pos="right" data-tooltip-role="preview">TESTING OF PREVIEW TOOLTIP</div>
            `;

            main =
              `<section class="link-plates-section">
              <h2 class="link-plates-section__header"><hr><span data-key="links.ContentLinks">${nk.locale.get('links.ContentLinks')}</span><hr></h2>
              <div class="vertical-border-blur link-plates-section__grid-wrapper" >
                <div class="link-plates-section__grid" data-tooltip-key="Tess" data-tooltip-pos="left">
                  ${unpackElementObject(createObject.link({ linkClass: 'default', source: DATA_BLOCKS.default.links.content }))}
                </div>
              </div>
              <h2 class="link-plates-section__header"><hr><span data-key="links.SocialLinks">${nk.locale.get('links.SocialLinks')}</span><hr></h2>
              <div class="vertical-border-blur link-plates-section__grid-wrapper">
                <div class="link-plates-section__grid">
                  ${unpackElementObject(createObject.link({ linkClass: 'default', source: DATA_BLOCKS.default.links.social }))}
                </div
              </div>
            </section>`;

            footer = `
            <span class="copyright"><span data-key="Nkardaz.copyright">${nk.locale.get('Nkardaz.copyright')}</span><span data-key="Skins.Current">${nk.locale.get('Skins.Current')}</span></span>${isMobileDevice() !== true ?
                `<span class="ambient-music-controls ms-auto me-3">
              <button nk-music="pause/play"><span class="material-icons">pause</span></button>
              <button nk-music="random"><span class="material-icons">shuffle</span></button>
              <button nk-music="credits" data-drop_target="musicCredits"><span class="material-icons">attribution</span></button>
              <div class="ambient-music-controls__track_info ms-2">
                <div class="track-info__title">Track — none</div>
                <div class="track-info__time">00:00 / 00:00</div>
                <div class="track-info__player-progress"></div>
              </div>
              ${unpackElementObject(new nk.ui.DropdownElement({ content: `${nk.locale.get('MusicCredits')}`, id: 'MusicCredits', hide: false }))}
            </span>` : ''}`;
          }
          
            
            
          resolveCFG();
        } catch (err) { anErrorOnBuild(err, 'page config'); rejectCFG(err); }
      });
      PAGE_CONFIG.then(() => {
        nk.siteHeader.html(header);
        nk.siteMainContainer.html(main);
        nk.footerContainer.html(footer);
        console.buildType('[GENPAGE] → Configuration is set & loaded', 'info');
        resolve();
      });
    });
  } catch (err) { anErrorOnBuild(err, 'page build'); reject(err); }
});

PAGE_BUILD.then(function () {
  unpackedHandler();
  console.buildType(`[GENPAGE] → Page Builded and Loaded. Current mode trigger: “${pageTriggerCallback('return')}”`, 'info');
  
  $(document).trigger(`${nk.url.mode && nk.url.select ? nk.url.mode + nk.url.select + '_page_loaded' : (nk.url.mode ? nk.url.mode + '_page_loaded' : 'default_page_loaded')}`);

    return new Promise(function (resolve) { try { setTimeout(() => { nk.locale.update(); resolve(); }, 1000); } catch (err) { anErrorOnBuild(err, 'language update'); } }).then(function () {
      console.buildType(`[GENPAGE] → Content Loaded and updated`, 'important');
      $(document).trigger('page_fully_builded');
    });
    
});

//logCurrentTrigger();
