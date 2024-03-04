var skin = (window.selectedSiteSkin && window.selectedSiteSkin !== '') ? 'app/style/skins/' + window.selectedSiteSkin + '.css' : '';
var loadingText = {
  en: 'Loading content',
  ru: 'Контент загружается',
  ja: 'コンテンツが読み込まれています',
  zh: '内容正在加载',
  ko: '콘텐츠가 로드 중입니다',
  vi: 'Nội dung đang tải'
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


function showLoadPercentage() {
    var img = document.images,
        c = 0,
        tot = img.length;
    var percentElement = document.querySelector('.loadmarker-percent');
    var percentBar = document.querySelector('#preloader-progress');
    var currentPercentage = 0;
    var intervalDuration = 10;

    function imgLoaded() {
        c += 1;
        var perc = ((100 / tot * c) << 0);

        var increment = 1;
        var interval = setInterval(function() {
            if (currentPercentage < perc) {
                currentPercentage += increment;
                percentElement.textContent = currentPercentage;
                percentBar.style.setProperty('--progress', currentPercentage + '%');
            } else {
                clearInterval(interval);
            }
        }, intervalDuration);

        if (c === tot) return;
    }

    for (var i = 0; i < tot; i++) {
        var tImg = new Image();
        tImg.onload = imgLoaded;
        tImg.onerror = imgLoaded;
        tImg.src = img[i].src;
    }
}



window.initPreloader = function () {
  waitFor('#preloader', () => {
    var preloader = document.querySelector('#preloader');
    var poreloaderLabel = document.querySelector('#progress-label');
    if (preloader) {
      var siblings = preloader.parentNode.querySelectorAll(':scope > :not(#preloader)');
      siblings.forEach(function(element) {
          element.classList.add('hidden-for-preloader');
      });
    }
    if (poreloaderLabel) {
      poreloaderLabel.textContent = loadingText[selectedLanguage];
    }
    observeOn('style:--progress:100%', $('#preloader-progress')[0], function() {
      var preloader = $('#preloader');
      preloader.siblings().removeClass('hidden-for-preloader');
      preloader.fadeOut('slow', function () {
        preloader.remove();
      });
    }, 500);
  });
  document.addEventListener('DOMContentLoaded', showLoadPercentage, false);
}
initPreloader();

waitFor('title', () => {
  var title = document.querySelector('title');
  if (title) {
    title.textContent = (metaData['title'][anUrlParameter.mode] && metaData['title'][anUrlParameter.mode][anUrlParameter.select]) ? metaData['title'][anUrlParameter.mode][anUrlParameter.select][selectedLanguage] : (metaData['title'][anUrlParameter.mode] ? metaData['title'][anUrlParameter.mode][selectedLanguage] : metaData['title']['common'][selectedLanguage]);
  }
});

DataExtend([
  { type: 'data',  source: 'app/data/lang.json', as: 'languageJSON' },
  { type: 'style', source: skin, anchor: 'head', pos: 'inner-end', id: 'skinloader' }
]);


if (anUrlParameter.mode !== '' || anUrlParameter.mode !== null) {
  var mode = anUrlParameter.mode;
  if (mode === 'kamon' || mode === 'banners' || mode === 'clans') {
    DataExtend([
      { type: 'data', source: 'app/data/' + mode + '.json', as: 'items.' + mode }
    ])
  }
}

/*
waitFor('body', () => {
  var url = {
  JQuery:                  "https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js",
    JQueryUI:                "https://cdn.jsdelivr.net/npm/jquery-ui@latest/dist/jquery-ui.min.js",
    JQueryUICSS:             "https://code.jquery.com/ui/1.13.2/themes/dark-hive/jquery-ui.css",
    OverlayscrollbarsCSS:    "https://cdn.jsdelivr.net/npm/overlayscrollbars@latest/styles/overlayscrollbars.min.css",
    BootstrapCSS:            "https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css",
    JQueryOverlayscrollbars: "https://cdn.jsdelivr.net/npm/overlayscrollbars@latest/browser/overlayscrollbars.browser.es6.min.js",
    Bootstrap:               "https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.min.js",
    Howler:                  "https://cdn.jsdelivr.net/npm/howler@latest/dist/howler.min.js",
    Vue:                     "https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.min.js",
    Vue18:                   "https://cdn.jsdelivr.net/npm/vue-i18n@latest/dist/vue-i18n.global.min.js",
    Vuex:                    "https://cdn.jsdelivr.net/npm/vuex@latest/dist/vuex.min.js"
  };
  DataExtend([
    { type: 'script', source:  url.JQuery,                  anchor: 'head',              pos: 'inner-start' },
    { type: 'script', source:  url.JQueryUI,                anchor: 'previous',          pos: 'after' },
    { type: 'style',  source:  url.JQueryUICSS,             anchor: 'previous',          pos: 'after' },
    { type: 'style',  source:  url.OverlayscrollbarsCSS,    anchor: 'previous',          pos: 'after' },
    { type: 'style',  source:  url.BootstrapCSS,            anchor: 'previous',          pos: 'after' },
    { type: 'script', source:  url.JQueryOverlayscrollbars, anchor: 'body',              pos: 'inner-end' },
    { type: 'script', source: 'app/jq/utils.js',            anchor: 'script#initScript', pos: 'after' },
    { type: 'script', source:  url.Bootstrap,               anchor: 'body',              pos: 'inner-end' },
    { type: 'script', source:  url.Howler,                  anchor: 'previous',          pos: 'after' },
    { type: 'script', source:  url.Vue,                     anchor: 'previous',          pos: 'after' },
    { type: 'script', source:  url.Vue18,                   anchor: 'previous',          pos: 'after' },
    { type: 'script', source:  url.Vuex,                    anchor: 'previous',          pos: 'after' },
    { type: 'style',  source:  skin,                        anchor: 'head',              pos: 'inner-end', id: 'skinloader' }
  ], () => {
    observeOn('style:--progress:100%', $('#preloader-progress')[0], function() {
      var preloader = $('#preloader');
      preloader.siblings().removeClass('hidden-for-preloader');
      preloader.fadeOut('slow', function () {
        preloader.remove();
      });
    }, 500);
  });
});
*/



