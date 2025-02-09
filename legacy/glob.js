window.setRandJSUrl = function(id, name) {
  var scriptElement = document.getElementById(id);
  if (scriptElement) {
    var currentDate = new Date().getTime();
    var randomThreeDigitNumber = Math.floor(Math.random() * 1000);
    var randJSUrl = '?' + currentDate + randomThreeDigitNumber;
    var scriptUrl = name + '.js' + randJSUrl;
    
    var newScriptElement = document.createElement('script');
    newScriptElement.type = 'module';
    newScriptElement.src = scriptUrl;
    newScriptElement.id = id;

    scriptElement.parentNode.replaceChild(newScriptElement, scriptElement);
  } else {
    console.error('Скрипт с ID ' + id + ' не найден');
  }
}

window.loadedMonsJSON = {};
window.languageJSON = {};


window.global_saved_search_mode_kamon = localStorage.getItem('saved_search_mode_kamon');
window.global_saved_opt_save_search = localStorage.getItem('search_result_save');
window.global_save_selected_kamon = localStorage.getItem('save_selected_kamon');
window.global_saved_kamon_item = localStorage.getItem('saved_kamon_item');

const supportedLanguages = ['ru', 'en', 'jp', 'zh', 'kr', 'vi'];
let userLanguage = localStorage.getItem('selected_language') || navigator.language.toLowerCase();

if (!supportedLanguages.includes(userLanguage)) {
    userLanguage = 'ru';
}

window.global_selected_language = userLanguage;



window.modeUrlPar = new URLSearchParams(window.location.search).get('mode')?.toLowerCase();
window.selUrlPar = new URLSearchParams(window.location.search).get('sel')?.toLowerCase();

window.selfOriginURL = window.location.href;
window.localHostIP = window.selfOriginURL.startsWith("http://localhost") || window.selfOriginURL.startsWith("http://127.0.0.1") || window.selfOriginURL.startsWith("http://192.168");

window.redirOrigin = function() {
  if (window.localHostIP) {
    window.location.replace('index.html');
  } else {
    window.location.replace('./');
  }
}
window.redirTo = function({ index, url, new_tab }) {
  if (new_tab) {
    if (index) {
      if (window.localHostIP) {
        window.open('index.html' + url, '_blank');
      } else {
        window.open('./' + url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  } else {
    if (index) {
      if (window.localHostIP) {
        window.location.replace('index.html' + url);
      } else {
        window.location.replace('./' + url);
      }
    } else {
      window.location.replace(url);
    }
  }
}

window.copyCurrentURL = function() {
    var currentURL = window.location.href;
    var tempInput = document.createElement('input');
    tempInput.value = currentURL;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        navigator.clipboard.writeText(currentURL)
            .then(() => {
                console.log('URL скопирован в буфер обмена');
            })
            .catch(err => {
                console.error('Не удалось скопировать URL в буфер обмена: ', err);
            });
    } catch (err) {
        console.error('Ошибка при копировании URL в буфер обмена: ', err);
    } finally {
        document.body.removeChild(tempInput);
    }
};

window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    if(preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(function() {
            preloader.style.opacity = '0';
        }, 500);
        setTimeout(function() {
            preloader.parentNode.removeChild(preloader);
        }, 1000);
    }
});


