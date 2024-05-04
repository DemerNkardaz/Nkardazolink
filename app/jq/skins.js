let skin = (nkPreferences.skin && nkPreferences.skin !== null) ? `app/style/skins/${nkPreferences.skin}.css` : 'app/style/skins/byakujou.css';
$('head').append(`<link rel="stylesheet" href="${skin}" id="skinloader">`);

const skinLoad = new Promise(function (resolve, reject) {
  pageTriggerCallback(function () {
    savedSettings.change_skin_by_time === 'true' && setSkinByTime();
  }); resolve();
});

window.returnCurrentSkin = function (type) {
  const preference = nkPreferences.skin;
  const skinName = availableSkins[preference] ? (type === 'url' ? availableSkins[preference].url : availableSkins[preference].name) : 'Byakujou';
  if (type === 'loc') return `Skins.${skinName}`;
  if (type !== 'loc') return skinName;
};


window.setSkin = function (skin, saveToStorage) {
  const onSetSkin = new Promise(function (resolve, reject) {
    if (skin && window.availableSkins[skin]) {
      $('#skinloader').attr('href', `app/style/skins/${skin}.css`);
      saveToStorage !== false && toStorage('selectedSiteSkin', skin);
      nkPreferences.skin = skin;

      if (anUrlParameter.mode === 'kamon') {

      } else {

        if (skin === 'sekiban') {
          $('.personBannerWrapper').addClass('plate_chinese');
        } else if (skin === 'aogurogetsu') {
          $('.personAvatar').append(`<img src="external/avatarHalo.gif" alt="" class="avatarHalo" loading="lazy">`);
          $('.personBanner').addClass('aogurogetsu');
        } else if (skin === 'azumatsuyu') {
          $('.personBannerWrapper, .avatarWrapper').addClass('plate_chinese');
          $('link-block').each(function () {
            $(this).attr('link_class') === 'default' && $(this.shadowRoot).find('.linkWrapper').addClass('plate_chinese');
          });
          !$('.personBannerBorder').length ? $('<div class="personBannerBorder azumatsuyu wrap_border"></div>').insertBefore('.personBannerWrapper') : '';
        };

        if (skin !== 'azumatsuyu') {
          $('.avatarWrapper').removeClass('plate_chinese');
          $('link-block').each(function () {
            $(this).attr('link_class') === 'default' && $(this.shadowRoot).find('.linkWrapper').removeClass('plate_chinese');
          });
        };
        if (skin !== 'azumatsuyu' && skin !== 'sekiban') {
          $('.personBannerWrapper').removeClass('plate_chinese');
        };
        if (skin !== 'aogurogetsu') {
          $('.personAvatar').find('.avatarHalo').remove();
          $('.personBanner').removeClass('aogurogetsu');
        };
        $('.personBanner').each(function () {
          let $this = $(this);
          let skinClass = window.availableSkins[skin].url;
          let existingClasses = $this.attr('class').split(' ');

        if (!existingClasses.includes(skinClass)) {
          $this.addClass(skinClass);
        }
      
        for (let key in window.availableSkins) {
          if (window.availableSkins.hasOwnProperty(key) && key !== skin) {
            let classToRemove = window.availableSkins[key].url;
            if (existingClasses.includes(classToRemove)) {
              $this.removeClass(classToRemove);
            }
          }
        }
      });
    };

      if (typeof cLang !== 'undefined' && typeof iLang !== 'undefined') {
        $('[data-key="Skins.Current"]').html(iLang('Skins.Current'));
      } else {
        languageLoaded(function () {
          $('[data-key="Skins.Current"]').html(iLang('Skins.Current'));
        });
      }
    }

    resolve();
  });
  onSetSkin.then(function () {
    $(document).trigger('setSkin');
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

  if (hour >= 5 && hour < 12) {
    skin = 'azumatsuyu';
  } else if (hour >= 12 && hour < 18) {
    skin = 'byakujou';
  } else if (hour >= 18 && hour < 22) {
    skin = 'sekiban';
  } else {
    skin = 'aogurogetsu';
  }

  if (!isReturn) {
    setSkin(skin)
  } else {
    return skin
  }
};
