function logCurrentTrigger() {
  $(document).on(`${nk.url.mode && nk.url.select ? nk.url.mode + nk.url.select + '_page_loaded' : (nk.url.mode ? nk.url.mode + '_page_loaded' : 'default_page_loaded')}`, function () {
    console.log(`Current trigger: ${nk.url.mode && nk.url.select ? nk.url.mode + nk.url.select : (nk.url.mode ? nk.url.mode : 'default')}`);
  });
};

const PAGE_BUILD = new Promise(function (resolve, reject) {
  function anErrorOnBuild(err, str) {
    console.error(`An error occured during ${str}: ${err}`);
  }
  try {
    $(document).on('full_data_loaded', function () {
      console.buildType(`[DATA_IN] → All of data JSON was loaded`, 'success');
      $('.temporary-no-transition').removeClass('temporary-no-transition');
      $('#temporary-no-transition').remove();
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
                  CJK: { first_key: 'kanji_first', second_key: 'kanji_second' , transcript_first: 'default'},
                  image: 'resources/svg/japan/kamon/Mon_of_clan_Matsudaira.svg',
                  prop_class: 'kamon', category: 'JA', rarity: 'inferior',
                }
              })
            );

            header = `
            ${unpackElement(new nk.ui.GallerySearcher('kamon'))}
            `;

            main = `
            <div data-items-container="kamon" style="display: grid; grid-template-columns: repeat(7, 1fr); row-gap: 30px; column-gap: 15px;">${unpackElement(nk.ui.itemPropArray(nk.items.kamon))}</div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); row-gap: 30px; column-gap: 15px;">${unpackElement(nk.ui.itemPropArray(null, 'template'))}</div>`;
            
            
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
            <div class="person-banner-wrapper ${(nk.settingConfig.get('skin') === "sekiban" || nk.settingConfig.get('skin') === "azumatsuyu") ? `plate_chinese` : ''}"><div class="person-banner ${nk.settingConfig.get('skin')}" style="--banner: url('${nkPreferences.banner[nk.settingConfig.get('current_banner')].url}');" data-banner="${nk.settingConfig.get('current_banner')}"></div></div>
            <div class="person-avatar">
              <span class="person-avatar__image-wrapper ${nk.settingConfig.get('skin') === "azumatsuyu" ? `plate_chinese` : ''}">
                <img class="person-avatar__image" src="resource/images/cherepkhed32_thumb256.avif" alt="${nk.locale.get('Nkardaz.fursona')}" alt-key="Nkardaz.fursona" width="74" loading="eager" data-lightbox-entity="person_avatar">
              </span>
              ${nk.settingConfig.get('skin') === "aogurogetsu" ? `<img src="external/avatarHalo.gif" alt="" class="person-avatar__image__halo" loading="lazy">` : ''}
            </div>
            <div>Теставые букавы<span>${nk.locale.get('test')}</span><br/><span data-key="C.test"></span>${nk.locale.get('C.test')}<br>
              ${repoStatus.join('<br>')}
            </div>
            <div class="lang-optionOwner">${unpackElement(new nk.ui.LanguageList())}</div>${nk.locale.get('testqu')}<br>
            <div data-tooltip-key="prevtest" data-tooltip-pos="right" data-tooltip-role="preview">TESTING OF PREVIEW TOOLTIP</div>
            `;

            main =
              `<section class="link-plates-section">
              <h2 class="link-plates-section__header"><hr><span data-key="links.ContentLinks">${nk.locale.get('links.ContentLinks')}</span><hr></h2>
              <div class="vertical-border-blur link-plates-section__grid-wrapper" >
                <div class="link-plates-section__grid" data-tooltip-key="Tess" data-tooltip-pos="left">
                  ${unpackElement(nk.ui.linkBlockArray(nk.items.links, 'content'))}
                </div>
              </div>
              <h2 class="link-plates-section__header"><hr><span data-key="links.SocialLinks">${nk.locale.get('links.SocialLinks')}</span><hr></h2>
              <div class="vertical-border-blur link-plates-section__grid-wrapper">
                <div class="link-plates-section__grid">
                  ${unpackElement(nk.ui.linkBlockArray(nk.items.links, 'social'))}
                </div
              </div>
            </section>`;

            footer = `
            <span class="copyright"><span data-key="Nkardaz.copyright">${nk.locale.get('Nkardaz.copyright')}</span><span data-key="Skins.Current">${nk.locale.get('Skins.Current')}</span></span>${isMobileDevice() !== true ?
                `<span class="ambient-music-controls ms-auto me-3">
              <button type="button" class="button-music-controls" nk-music="pause/play" title="${nk.locale.get('buttonLabels.pause')}" title-key="buttonLabels.pause"><span class="material-icons" aria-hidden="true">pause</span></button>
              <button type="button" class="button-music-controls" nk-music="random" title="${nk.locale.get('buttonLabels.shuffle')}" title-key="buttonLabels.shuffle"><span class="material-icons" aria-hidden="true">shuffle</span></button>
              <button type="button" class="button-music-controls" nk-music="credits" data-dropdown-key="dropdown.music_attribution" data-dropdown-pos="top" title="${nk.locale.get('buttonLabels.attribution')}" title-key="buttonLabels.attribution"><span class="material-icons" aria-hidden="true">attribution</span></button>
              <div class="ambient-music-controls__track_info ms-2">
                <div class="track-info__title" aria-hidden="true">Track — none</div>
                <div class="track-info__time" aria-hidden="true">00:00 / 00:00</div>
                <div class="track-info__player-progress" aria-hidden="true"></div>
              </div>
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

  return new Promise(function (resolve) { try { setTimeout(() => { nk.locale.update(); resolve(); }, 100); } catch (err) { anErrorOnBuild(err, 'language update'); } }).then(function () {
    console.buildType(`[GENPAGE] → Content Loaded & Updated`, 'important');
    $(document).trigger('page_fully_builded');
  });
    
});

$(document).on('page_fully_builded', function () {
  setTimeout(function () {
    if (isMobileDevice() !== true) { nk.initTooltips(); /*import('../script/howler_init.js');*/ }
  }, 500);
});
//logCurrentTrigger();
