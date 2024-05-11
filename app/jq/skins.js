let skin = (nkSettings.get('skin') !== null) ? `app/style/skins/${nkSettings.get('skin')}.css` : 'app/style/skins/byakujou.css';
$('head').append(`<link rel="stylesheet" href="${skin}" id="skinloader">`);
window.CheckSkin = function (type) {
  const preference = nkSettings.get('skin');
  const skinName = availableSkins[preference] ? (type === 'url' ? availableSkins[preference].url : availableSkins[preference].name) : 'Byakujou';
  if (type === 'loc') return `Skins.${skinName}`;
  if (type === 'run') return nkLocale.get(`Skins.${skinName}`);
  if (type === 'emoji') return `${availableSkins[preference].emoji}&ensp;${nkLocale.get(`Skins.${skinName}`)}`;
  if (type !== 'loc' || type === 'emoji') return skinName;
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
            const appliedSkin = $('#skinloader').attr('href');
            !appliedSkin.includes(new_skin) && $('#skinloader').attr('href', `app/style/skins/${new_skin}.css`);

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
    console.buildType(`[NK_SKIN] → Skin set to: “${CheckSkin()}” : Locale key “${CheckSkin('loc')}”`, 'info');
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

function skinPreload() {
  let skin = nkSettings.get('change_skin_by_time') === 'true' ? setSkinByTime(true) : nkSettings.get('skin');
  $('#skinloader').attr('href', `app/style/skins/${skin}.css`);
}; skinPreload();

window.setLogoBySkin = function () {
  let logo;
  const skin = CheckSkin('url');
  if (skin === 'azumatsuyu') {
    logo = 'resources/svg/NkardazKamon.svg';
  } else if (skin === 'byakujou') {
    logo = 'resources/svg/NkardazKamon.svg';
  } else if (skin === 'sekiban') {
    logo = 'resources/svg/NkardazKamon.svg';
  } else if (skin === 'aogurogetsu') {
    logo = 'resources/svg/hangetsu.svg';
  } else if (skin === 'akatsukikurai') {
    logo = 'resources/svg/NkardazKamon.svg';
  }
  return logo;
};

window.setLogoByTime = function () {
  const now = new Date();
  const hour = now.getHours();
  let logo;
  if (hour >= 7 && hour < 12) {
    logo = 'resources/svg/NkardazKamon.svg';
  } else if (hour >= 12 && hour < 18) {
    logo = 'resources/svg/NkardazKamon.svg';
  } else if (hour >= 18 && hour < 22) {
    logo = 'resources/svg/NkardazKamon.svg';
  } else if (hour >= 22 || hour < 4) {
    logo = 'resources/svg/hangetsu.svg';
  } else {
    logo = 'resources/svg/NkardazKamon.svg';
  }

  return logo;
};