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

document.addEventListener('DOMContentLoaded', showLoadPercentage, false);

waitFor('title', () => {
  var title = document.querySelector('title');
  if (title) {
    title.textContent = (metaData['title'][anUrlParameter.mode] && metaData['title'][anUrlParameter.mode][anUrlParameter.select]) ? metaData['title'][anUrlParameter.mode][anUrlParameter.select][selectedLanguage] : (metaData['title'][anUrlParameter.mode] ? metaData['title'][anUrlParameter.mode][selectedLanguage] : metaData['title']['common'][selectedLanguage]);
  }
});


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
});


DataExtend([
  { type: 'data', source: 'app/data/lang.json', as: 'languageJSON' }
]);


if (anUrlParameter.mode !== '' || anUrlParameter.mode !== null) {
  var mode = anUrlParameter.mode;
  if (mode === 'kamon' || mode === 'banners' || mode === 'clans') {
    DataExtend([
      { type: 'data', source: 'app/data/' + mode + '.json', as: 'items.' + mode }
    ])
  }
}

waitFor('body', () => {
  DataExtend([
    { type: 'script', source: 'https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js',        anchor: 'head',              pos: 'inner-start' },
    { type: 'script', source: 'https://cdn.jsdelivr.net/npm/jquery-ui@latest/dist/jquery-ui.min.js',            anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'https://code.jquery.com/ui/1.13.2/themes/dark-hive/jquery-ui.css', anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'https://cdn.jsdelivr.net/npm/overlayscrollbars@latest/styles/overlayscrollbars.min.css',   anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/css/bootstrap.min.css', anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'https://cdn.jsdelivr.net/npm/overlayscrollbars@latest/browser/overlayscrollbars.browser.es6.min.js', anchor: 'body', pos: 'inner-end' },
    { type: 'script', source: 'app/jq/utils.js',                             anchor: 'script#initScript', pos: 'after' },
    { type: 'script', source: 'https://cdn.jsdelivr.net/npm/bootstrap@latest/dist/js/bootstrap.min.js',  anchor: 'body',              pos: 'inner-end' },
    { type: 'script', source: 'https://cdn.jsdelivr.net/npm/howler@latest/dist/howler.min.js',               anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.global.min.js',              anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'https://cdn.jsdelivr.net/npm/vue-i18n@latest/dist/vue-i18n.global.min.js',         anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'https://cdn.jsdelivr.net/npm/vuex@latest/dist/vuex.global.min.js',             anchor: 'previous',          pos: 'after' },
    { type: 'style',  source:  skin,                                         anchor: 'head',              pos: 'inner-end', id: 'skinloader' }
  ], () => {
    console.log('Конечные инициализированы');
    $(document).ready(function () {
      var preloaderProgress = $('#preloader-progress')[0];
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'style' && getComputedStyle(mutation.target).getPropertyValue('--progress') === '100%') {
            setTimeout(function() {
              var preloader = $('#preloader');
              if (preloader.length > 0) {
                preloader.siblings().removeClass('hidden-for-preloader');
                preloader.fadeOut('slow', function () {
                  preloader.remove();
                });
                observer.disconnect();
              }
            }, 500);
          }
        });
      });
      observer.observe(preloaderProgress, { attributes: true });
    });
  });
});




