(anUrlParameter.mode && !availableModes.includes(anUrlParameter.mode)) ||
((anUrlParameter.mode === 'cv') && (!anUrlParameter.select || !availableSelects.includes(anUrlParameter.select))) ? redirect.origin() : null;

nkSettings.get('lang') ? $('html').attr('lang', nkSettings.get('lang')) : $('html').attr('lang', 'ru');

window.loadingText = {
  en: 'Loading content',
  ru: 'Контент загружается',
  ja: 'コンテンツが読み込まれています',
  zh: '内容正在加载',
  ko: '콘텐츠가 로드 중입니다',
  vi: 'Nội dung đang tải'
}

window.executingText = {
  en: 'Running',
  ru: 'Запуск',
  ja: '実行',
  zh: '运行',
  ko: '업데이트',
  vi: 'Tuyến'
}

var metaData = {
  "title": {
    "common": {
      ru: 'Демер Нкардаз・2D・3D・Писательство・Вёрстка',
      en: 'Demer Nkardaz・2D・3D・Writing・Design',
      ja: 'デメル・Nカードザ・2D・3D・書評・デサザ',
      zh: 'Nkardaz・2D・3D・写作・设计',
      ko: 'Demer Nkardaz・2D・3D・텍스트・デサザ',
      vi: 'Nkardaz・2D・3D・Vềt liên・Thiết kế'
    },
    "kamon": {
      ru: 'Галерея Монсё・Царства Шагора・Демер Нкардаз',
      en: 'Monshō Gallery・St. SHAGOR REALMS・Demer Nkardaz',
      ja: 'モンソゴ・シガス・シガルム・デメル・Nカードザ',
      zh: 'Monshō Gallery・St. SHAGOR REALMS・Demer Nkardaz',
      ko: 'Monshō Gallery・St. SHAGOR REALMS・Demer Nkardaz',
      vi: 'Monshō Gallery・St. SHAGOR REALMS・Demer Nkardaz'
    },
    "cv": {
      "2d": {
        ru: 'Демер Нкардаз・2D-Художник',
        en: 'Demer Nkardaz・2D Artist',
        ja: 'デメル・Nカードザ・2D-アーティスト',
        zh: 'Nkardaz・2D Artist',
        ko: 'Demer Nkardaz・2D Artist',
        vi: 'Nkardaz・2D Artist'
      },
      "3d": {
        ru: 'Демер Нкардаз・3D-Художник',
        en: 'Demer Nkardaz・3D Artist',
        ja: 'デメル・Nカードザ・3D-アーティスト',
        zh: 'Nkardaz・3D Artist',
        ko: 'Demer Nkardaz・3D Artist',
        vi: 'Nkardaz・3D Artist'
      }
    }
  }
}


window.showLoadPercentage = function () {
  $(document).trigger('loading_precentage_initialized');
  let img = document.images,
      c = 0,
      tot = img.length;
  let percentElement = document.querySelector('.loadmarker-percent');
  let percentBar = document.querySelector('.progress-value');
  let currentPercentage = 0;
  let intervalDuration = 10;

  function imgLoaded() {
      c += 1;
      let perc = ((100 / tot * c) << 0);

      let increment = 1;
      let interval = setInterval(function() {
          if (currentPercentage < perc) {
              currentPercentage += increment;
              percentElement.textContent = currentPercentage;
              percentBar.style.setProperty('--progress', `${ currentPercentage}%`);
          } else {
              clearInterval(interval);
          }
      }, intervalDuration);

      if (c === tot) return;
  }

  for (let i = 0; i < tot; i++) {
      let tImg = new Image();
      tImg.onload = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src = img[i].src;
  }
}




if (nkSettings.get('turn_off_preloader') !== 'true') {
  nkUI.preLoader({
    hiding_role: 'hide',
  });
};


waitFor('title', () => {
  var title = document.querySelector('title');
  if (title) {
    title.textContent = (metaData['title'][anUrlParameter.mode] && metaData['title'][anUrlParameter.mode][anUrlParameter.select]) ? metaData['title'][anUrlParameter.mode][anUrlParameter.select][nkSettings.get('lang')] : (metaData['title'][anUrlParameter.mode] ? metaData['title'][anUrlParameter.mode][nkSettings.get('lang')] : metaData['title']['common'][nkSettings.get('lang')]);
  }
});


let dataArray = [];
dataArray.push({ type: 'data',  source: 'app/data/locale.json', as: 'languageJSON'  });
dataArray.push({ type: 'data',  source: 'app/data/license.json', as: 'licenseJSON'  });
anUrlParameter.mode && dataArray.push({ type: 'data',  source: `app/data/${anUrlParameter.mode}.json`, as: `${anUrlParameter.mode}Item`  });
console.log(dataArray);
let dataTimer;
DataExtend(dataArray, true).then((loadedData) => {
  const loadingPromise = new Promise((resolve, reject) => {
    try {
      loadedData.forEach(({ as, source }) => {
        console.buildType(`[DATA_IN] → “${as}” : loaded with “${source}”`, 'success');
        clearTimeout(dataTimer);
        setTimeout(() => { $(document).trigger(`${as}_loaded`); }, 50);
      });
      dataTimer = setTimeout(() => { resolve() }, 1000);
    } catch (err) { console.error(err); reject(err); }
  });

  loadingPromise.then(() => {
    console.buildType(`[DATA_IN] → All of data JSON was loaded`, 'success');
    $(document).trigger('full_data_loaded');
  })
})
