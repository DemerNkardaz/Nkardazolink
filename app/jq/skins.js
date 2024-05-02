let skin = (nkPreferences.skin && nkPreferences.skin !== null) ? `app/style/skins/${nkPreferences.skin}.css` : 'app/style/skins/byakujou.css';


window.returnCurrentSkin = function(type) {
  const preference = nkPreferences.skin;
  let skinName = availableSkins[preference] ? (type === 'url' ? availableSkins[preference].url : availableSkins[preference].name) : 'Byakujou';
  return skinName;
}


$(document).ready(function () {
  savedSettings.change_skin_by_time !== 'true' && $('head').append(`<link rel="stylesheet" href="${skin}" id="skinloader">`);

  if (savedSettings.change_skin_by_time === 'true') {
    $('head').append(`<link rel="stylesheet" href="" id="skinloader">`);
    setSkinByTime();
    setTimeout(() => {
      setSkinByTime();
    }, 500);
  }
});


window.setSkin = function (skin, saveToStorage) {
  if (skin && window.availableSkins[skin]) {
    $('#skinloader').attr('href', `app/style/skins/${skin}.css`);
    saveToStorage !== false && toStorage('selectedSiteSkin', skin);
    nkPreferences.skin = skin;

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
    }

    if (skin !== 'azumatsuyu') {
      $('.avatarWrapper').removeClass('plate_chinese');
      $('link-block').each(function () {
        $(this).attr('link_class') === 'default' && $(this.shadowRoot).find('.linkWrapper').removeClass('plate_chinese');
      });
    }
    if (skin !== 'azumatsuyu' && skin !== 'sekiban') {
      $('.personBannerWrapper').removeClass('plate_chinese');
    }
    if (skin !== 'aogurogetsu') { 
      $('.personAvatar').find('.avatarHalo').remove();
      $('.personBanner').removeClass('aogurogetsu');
    }
    $('.personBanner').each(function() {
        var $this = $(this);
        var skinClass = window.availableSkins[skin].url;
        var existingClasses = $this.attr('class').split(' ');

        if (!existingClasses.includes(skinClass)) {
            $this.addClass(skinClass);
        }
      
        for (var key in window.availableSkins) {
            if (window.availableSkins.hasOwnProperty(key) && key !== skin) {
                var classToRemove = window.availableSkins[key].url;
                if (existingClasses.includes(classToRemove)) {
                    $this.removeClass(classToRemove);
                }
            }
        }
    });

  }
  if (typeof cLang !== 'undefined') {
      $('#currentSkin').text(cLang[returnCurrentSkin()]);
  } else {
      $(document).on('languageJSON_loaded', function () {
          $('#currentSkin').text(cLang[returnCurrentSkin()]);
      });
  }
}


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
    setSkin(skin, false)
  } else {
    return skin
  }
}
