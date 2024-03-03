var skin = (window.selectedSiteSkin && window.selectedSiteSkin !== '') ? 'app/style/skins/' + window.selectedSiteSkin + '.css' : '';


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

        // Запуск изменения процента пошагово
        var increment = 1; // Шаг увеличения процента
        var interval = setInterval(function() {
            if (currentPercentage < perc) {
                currentPercentage += increment;
                percentElement.textContent = currentPercentage;
                percentBar.value = currentPercentage;
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



waitFor('progress', () => {
  var preloader = document.querySelector('#preloader');
  if (preloader) {
    var siblings = preloader.parentNode.querySelectorAll(':scope > :not(#preloader)');
    siblings.forEach(function(element) {
        element.classList.add('hidden-for-preloader');
    });
  }
  console.log('preloader ready');
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
    { type: 'script', source: 'app/libs/standalone/jquery/jquery.js',        anchor: 'head',              pos: 'inner-start' },
    { type: 'script', source: 'app/libs/standalone/jquery/ui.js',            anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'app/libs/standalone/jquery/ui_dark_hive.css', anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'app/libs/standalone/OverlayScrollbars.css',   anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'app/libs/standalone/bootstrap/bootstrap.css', anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'app/jq/utils.js',                             anchor: 'script#initScript', pos: 'after' },
    { type: 'script', source: 'app/libs/standalone/bootstrap/bootstrap.js',  anchor: 'body',              pos: 'inner-end' },
    { type: 'script', source: 'app/libs/standalone/Howler.js',               anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'app/libs/standalone/Vue/Vue.js',              anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'app/libs/standalone/Vue/Vue-i18n.js',         anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'app/libs/standalone/Vue/Vuex.js',             anchor: 'previous',          pos: 'after' },
    { type: 'style',  source:  skin,                                         anchor: 'head',              pos: 'inner-end', id: 'skinloader' }
  ], () => {
    console.log('Конечные инициализированы');/*
    $(document).ready(function () {
      var preloaderProgress = $('#preloader-progress')[0];
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'value' && mutation.target.value == 100) {
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
    });*/
  });
});




