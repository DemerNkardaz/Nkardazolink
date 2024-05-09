let skin = (nkSettings.get('skin') !== null) ? `app/style/skins/${nkSettings.get('skin')}.css` : 'app/style/skins/byakujou.css';
$('head').append(`<link rel="stylesheet" href="${skin}" id="skinloader">`);

const skinLoad = new Promise(function (resolve, reject) {
  pageTriggerCallback(function () {
    nkSettings.get('change_skin_by_time') === 'true' && (setSkinByTime(), console.buildType(`[NK_SKIN] → Skin assigned based on “Daytime” Preference`, 'success'));
    nkSettings.get('change_skin_by_time') !== 'true' && setSkin(nkSettings.get('skin'));
  }); resolve();
});

window.returnCurrentSkin = function (type) {
  const preference = nkSettings.get('skin');
  const skinName = availableSkins[preference] ? (type === 'url' ? availableSkins[preference].url : availableSkins[preference].name) : 'Byakujou';
  if (type === 'loc') return `Skins.${skinName}`;
  if (type !== 'loc') return skinName;
};

window.setSkin = function (skin) {
  skin = skin.toLowerCase();
  const onSetSkin = new Promise(function (resolve, reject) {
    try {
      if (skin && window.availableSkins[skin]) {
        
        if (nkSettings.get('skin') !== skin) {
          $Setting('skin').save(skin).then((result) => {
            const prev_skin = result.valueBefore;
            const new_skin = result.valueNew;
            $('#skinloader').attr('href', `app/style/skins/${new_skin}.css`);

            if (anUrlParameter.mode === 'kamon') { 


            } else {
              //* DEFAULT MODE SKIN OPERATIONS
              //! REMOVING OPERATIONS FOR SKINS
              if (prev_skin === 'sekiban' && new_skin !== 'sekiban') { //! REMOVE “SEKIBAN”
                $('.personBannerWrapper').removeClass('plate_chinese');
              } else if (prev_skin === 'aogurogetsu' && new_skin !== 'aogurogetsu') { //! REMOVE “AOGUROGETSU”
                $('.personAvatar').find('.avatarHalo').remove();
              } else if (prev_skin === 'azumatsuyu' && new_skin !== 'azumatsuyu') { //! REMOVE “AZUMATSUYU”
                new_skin !== 'sekiban' && $('.personBannerWrapper').removeClass('plate_chinese');
                $('.avatarWrapper').removeClass('plate_chinese');
                $('link-block').each(function () {
                  $(this).attr('link_class') === 'default' && $(this.shadowRoot).find('.linkWrapper').removeClass('plate_chinese');
                });
              } else if (prev_skin === 'byakujou' && new_skin !== 'byakujou') { //! REMOVE “BYAKUJOU”

              } else if (prev_skin === 'akatsukikurai' && new_skin !== 'akatsukikurai') { //! REMOVE “AKATSUKIKURAI”

              }

              //? SETTING OPERATIONS FOR SKINS
              if (new_skin === 'sekiban' && prev_skin !== 'sekiban') { //? SEKIN “SEKIBAN”
                $('.personBannerWrapper').addClass('plate_chinese');
              } else if (new_skin === 'aogurogetsu' && prev_skin !== 'aogurogetsu') { //? SEKIN “AOGUROGETSU”
                $('.personAvatar').append(`<img src="external/avatarHalo.gif" alt="" class="avatarHalo" loading="lazy">`);
              } else if (new_skin === 'azumatsuyu' && prev_skin !== 'azumatsuyu') { //? SEKIN “AZUMATSUYU”
                $('.personBannerWrapper, .avatarWrapper').addClass('plate_chinese');
                $('link-block').each(function () {
                  $(this).attr('link_class') === 'default' && $(this.shadowRoot).find('.linkWrapper').addClass('plate_chinese');
                });
                !$('.personBannerBorder').length ? $('<div class="personBannerBorder azumatsuyu wrap_border"></div>').insertBefore('.personBannerWrapper') : '';
              } else if (new_skin === 'byakujou' && prev_skin !== 'byakujou') { //? SEKIN “BYAKUJOU”

              } else if (new_skin === 'akatsukikurai' && prev_skin !== 'akatsukikurai') { //? SEKIN “AKATSUKIKURAI”

              };
            };

            $('.personBanner, body').each(function () { $(this).removeClass(prev_skin).addClass(new_skin); });
            $('[data-key="Skins.Current"]').hide('slow', function () {
              setTimeout(function () { $('[data-key="Skins.Current"]').html(nkLocale.get('Skins.Current')).show('slow'); }, 200);
            })
          });
        }
      }
      resolve();
    } catch (err) { reject(err); }
  });
  onSetSkin.then(function () {
    $(document).trigger('setSkin');
    console.buildType(`[NK_SKIN] → Skin set to: “${returnCurrentSkin()}” : Locale key “${returnCurrentSkin('loc')}”`, 'info');
  });
};


window.repeatableSkins = function () {
  let currentSkinIndex = 0;
  setInterval(() => {
    const skinKeys = Object.keys(window.availableSkins);
    const skinCount = skinKeys.length;
    const currentSkinKey = skinKeys[currentSkinIndex];
    const currentSkin = window.availableSkins[currentSkinKey].url;
    setSkin(currentSkinKey);
    currentSkinIndex = (currentSkinIndex + 1) % skinCount;
  }, 1000);
}

window.setSkinByTime = function (isReturn) {
  const now = new Date();
  const hour = now.getHours();

  let skin;

  if (hour >= 7 && hour < 12) {
    skin = 'azumatsuyu';
  } else if (hour >= 12 && hour < 18) {
    skin = 'byakujou';
  } else if (hour >= 18 && hour < 22) {
    skin = 'sekiban';
  } else if (hour >= 22 || hour < 4) {
    skin = 'aogurogetsu';
  } else {
    skin = 'akatsukikurai';
  }

  if (!isReturn) {
    setSkin(skin)
  } else {
    return skin
  }
};
