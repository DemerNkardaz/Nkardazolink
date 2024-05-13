let skin = (nk.settingConfig.get('skin') !== null) ? `app/style/skins/${nk.settingConfig.get('skin')}.css` : 'app/style/skins/byakujou.css';
$('head').append(`<link rel="stylesheet" href="${skin}" id="skinloader">`);
nk.skins.check = function (type) {
  const preference = nk.settingConfig.get('skin');
  const skinName = nk.skins.themes[preference] ? (type === 'url' ? nk.skins.themes[preference].url : nk.skins.themes[preference].name) : 'Byakujou';
  if (type === 'loc') return `Skins.${skinName}`;
  if (type === 'run') return nk.locale.get(`Skins.${skinName}`);
  if (type === 'emoji') return `${nk.skins.themes[preference].emoji}&ensp;${nk.locale.get(`Skins.${skinName}`)}`;
  if (type !== 'loc' || type === 'emoji') return skinName;
};

nk.skins.set = function (skin) {
  const LINK_TAG = $('#skinloader');
  if (skin !== null && skin !== undefined) {
    skin = skin.toLowerCase();
    const onSetSkin = new Promise(function (resolve, reject) {
      try {
        if (skin && nk.skins.themes[skin]) {
        
          if (nk.settingConfig.get('skin') !== skin) {
            nk.setting('skin').save(skin).then((result) => {
              const previousSkin = result.valueBefore;
              const newSkin = result.valueNew;
              const appliedSkin = LINK_TAG.attr('href');
              !appliedSkin.includes(newSkin) && LINK_TAG.attr('href', `app/style/skins/${newSkin}.css`);

              if (nk.url.mode === 'kamon') {


              } else {
                //* DEFAULT MODE SKIN OPERATIONS
                //! REMOVING OPERATIONS FOR SKINS
                if (previousSkin === 'sekiban' && newSkin !== 'sekiban') { //! REMOVE “SEKIBAN”
                  $('.person-banner-wrapper').removeClass('plate_chinese');
                } else if (previousSkin === 'aogurogetsu' && newSkin !== 'aogurogetsu') { //! REMOVE “AOGUROGETSU”
                  $('.person-avatar').find('.person-avatar__image__halo').remove();
                } else if (previousSkin === 'azumatsuyu' && newSkin !== 'azumatsuyu') { //! REMOVE “AZUMATSUYU”
                  newSkin !== 'sekiban' && $('.person-banner-wrapper').removeClass('plate_chinese');
                  $('.person-avatar__image-wrapper').removeClass('plate_chinese');
                  $('link-block').each(function () {
                    $(this).attr('data-link-class') === 'default' && $(this.shadowRoot).find('.link-plate-wrapper').removeClass('plate_chinese');
                  });
                } else if (previousSkin === 'byakujou' && newSkin !== 'byakujou') { //! REMOVE “BYAKUJOU”

                } else if (previousSkin === 'akatsukikurai' && newSkin !== 'akatsukikurai') { //! REMOVE “AKATSUKIKURAI”

                }

                //? SETTING OPERATIONS FOR SKINS
                if (newSkin === 'sekiban' && previousSkin !== 'sekiban') { //? SEKIN “SEKIBAN”
                  $('.person-banner-wrapper').addClass('plate_chinese');
                } else if (newSkin === 'aogurogetsu' && previousSkin !== 'aogurogetsu') { //? SEKIN “AOGUROGETSU”
                  $('.person-avatar').append(`<img src="external/avatarHalo.gif" alt="" class="person-avatar__image__halo" loading="lazy">`);
                } else if (newSkin === 'azumatsuyu' && previousSkin !== 'azumatsuyu') { //? SEKIN “AZUMATSUYU”
                  $('.person-banner-wrapper, .person-avatar__image-wrapper').addClass('plate_chinese');
                  $('link-block').each(function () {
                    $(this).attr('data-link-class') === 'default' && $(this.shadowRoot).find('.link-plate-wrapper').addClass('plate_chinese');
                  });
                  !$('.person-banner-border').length ? $('<div class="person-banner-border azumatsuyu wrap_border"></div>').insertBefore('.person-banner-wrapper') : '';
                } else if (newSkin === 'byakujou' && previousSkin !== 'byakujou') { //? SEKIN “BYAKUJOU”

                } else if (newSkin === 'akatsukikurai' && previousSkin !== 'akatsukikurai') { //? SEKIN “AKATSUKIKURAI”

                };
              };

              $('.person-banner, body').each(function () { $(this).removeClass(previousSkin).addClass(newSkin); });
              $('[data-key="Skins.Current"]').hide('slow', function () {
                setTimeout(function () { $('[data-key="Skins.Current"]').html(nk.locale.get('Skins.Current')).show('slow'); }, 200);
              })
            });
          }
        }
        resolve();
      } catch (err) { reject(err); }
    });
    onSetSkin.then(function () {
      $(document).trigger('setSkin');
      console.buildType(`[NK_SKIN] → Skin set to: “${nk.skins.check()}” : Locale key “${nk.skins.check('loc')}”`, 'info');
    });
  } else {
    let methods = {
      dayTime(getName) {
        const now = new Date();
        const hour = now.getHours();

        let skin;

        if (hour >= 7 && hour < 12) { skin = 'azumatsuyu'; }
        else if (hour >= 12 && hour < 18) { skin = 'byakujou'; }
        else if (hour >= 18 && hour < 22) { skin = 'sekiban'; }
        else if (hour >= 22 || hour < 4) { skin = 'aogurogetsu'; }
        else { skin = 'akatsukikurai'; }
    
        if (!getName) { nk.skins.set(skin) } else { return skin }
      },
      repeat() {
        let currentSkinIndex = 0;
        setInterval(() => {
          const skinKeys = Object.keys(nk.skins.themes);
          const skinCount = skinKeys.length;
          const currentSkinKey = skinKeys[currentSkinIndex];
          const currentSkin = nk.skins.themes[currentSkinKey].url;
          nk.skins.set(currentSkinKey);
          currentSkinIndex = (currentSkinIndex + 1) % skinCount;
        }, 1000);
      },

      preload() {
        let skin = nk.settingConfig.get('change_skin_by_time') === true ? nk.skins.set().dayTime(true) : nk.settingConfig.get('skin');
        LINK_TAG.attr('href', `app/style/skins/${skin}.css`);
      }
    };

    return methods;
  }
};


nk.skins.set().preload();

nk.skins.logo = function () {
  let methodUsed = false;
  let methods = {
    dayTime() {
      
      const now = new Date();
      const hour = now.getHours();
      let logo;

      if (hour >= 7 && hour < 12) { logo = 'resources/svg/NkardazKamon.svg'; }
      else if (hour >= 12 && hour < 18) { logo = 'resources/svg/NkardazKamon.svg'; }
      else if (hour >= 18 && hour < 22) { logo = 'resources/svg/NkardazKamon.svg'; }
      else if (hour >= 22 || hour < 4) { logo = 'resources/svg/hangetsu.svg'; }
      else { logo = 'resources/svg/NkardazKamon.svg'; }

      methodUsed = true;
      return logo;
    },
    onSkin()
    {
      
      let logo;
      const skin = nk.skins.check('url');
        
      if (skin === 'azumatsuyu') { logo = 'resources/svg/NkardazKamon.svg'; }
      else if (skin === 'byakujou') { logo = 'resources/svg/NkardazKamon.svg'; }
      else if (skin === 'sekiban') { logo = 'resources/svg/NkardazKamon.svg'; }
      else if (skin === 'aogurogetsu') { logo = 'resources/svg/hangetsu.svg'; }
      else if (skin === 'akatsukikurai') { logo = 'resources/svg/NkardazKamon.svg'; }
      
      methodUsed = true;
      return logo;
    }
  };

  return methods;
}

