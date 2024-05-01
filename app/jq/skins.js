let skin = (nkPreferences.skin && nkPreferences.skin !== null) ? `app/style/skins/${nkPreferences.skin}.css` : '';
$(document).ready(function () {
  savedSettings.change_skin_by_time !== 'true' && $('head').append(`<link rel="stylesheet" href="${skin || 'app/style/skins/byakujou.css'}" id="skinloader">`);

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
    saveToStorage === false && toStorage('selectedSiteSkin', skin);

    if (skin === 'sekiban') {
      $('.personBannerWrapper').addClass('plate_chinese');
    } else if (skin === 'aogurogetsu') {
      $('.personAvatar').append(`<img src="external/avatarHalo.gif" alt="" class="avatarHalo" loading="lazy">`);
      $('.personBanner').addClass('aogurogetsu');
    }
      
      
    if (skin === 'aogurogetsu' || skin === 'byakujou') {
      $('.personBannerWrapper').removeClass('plate_chinese');
    }
    if (skin === 'sekiban' || skin === 'byakujou') {
      $('.personAvatar').find('.avatarHalo').remove();
      $('.personBanner').removeClass('aogurogetsu');
    }
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
