let lastLoaded = null;

async function DataExtend(dataArray, callback, index = 0) {
  if (index >= dataArray.length) {
    if (typeof callback === 'function') {
      callback();
    }
    return;
  }

  const data = dataArray[index];
  const { type, source, anchor, pos, id, as } = data;

  // Обработка типа 'data'
  if (type === 'data') {
    try {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${source}`);
      }
      const jsonData = await response.json();
      if (typeof as !== 'undefined') {
        window[as] = jsonData; // Сохранение данных JSON в переменной
        await DataExtend(dataArray, callback, index + 1); // После сохранения данных JSON вызываем следующий элемент
        return;
      }
    } catch (error) {
      console.error(`Ошибка загрузки ${source}:`, error);
    }
    await DataExtend(dataArray, callback, index + 1); // В случае ошибки также переходим к следующему элементу
    return;
  }

  const element = document.createElement(type === 'script' ? 'script' : 'link');
  if (type === 'script') {
    element.src = source;
  } else {
    element.rel = 'stylesheet';
    if (source) {
      element.href = source;
    }
  }

  if (id) {
    element.id = id;
  }

  if (anchor === 'previous' && lastLoaded) {
    const previousElement = document.querySelector(lastLoaded);
    if (previousElement) {
      if (pos === 'before') {
        previousElement.parentNode.insertBefore(element, previousElement);
      } else {
        previousElement.parentNode.insertBefore(element, previousElement.nextSibling);
      }
    }
  } else {
    const anchorElement = document.querySelector(anchor);
    if (anchorElement) {
      if (pos === 'inner-start') {
        anchorElement.insertBefore(element, anchorElement.firstChild);
      } else if (pos === 'inner-end') {
        anchorElement.appendChild(element);
      } else if (pos === 'before') {
        anchorElement.parentNode.insertBefore(element, anchorElement);
      } else if (pos === 'after') {
        anchorElement.parentNode.insertBefore(element, anchorElement.nextSibling);
      }
    }
  }
  lastLoaded = type === 'script' ? `script[src="${source}"]` : `link[href="${source}"]`;

  if (!source) {
    await DataExtend(dataArray, callback, index + 1);
    return;
  }

  await new Promise(resolve => {
    element.onload = () => {
      resolve();
    };
    element.onerror = (error) => {
      console.error(`Ошибка загрузки ${source}:`, error);
      resolve();
    };
  });

  await DataExtend(dataArray, callback, index + 1);
}


window.waitFor = function(element, callback) {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node.nodeName.toLowerCase() === element.toLowerCase()) {
            observer.disconnect();
            callback();
            return;
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}

var skin = (window.selectedSiteSkin && window.selectedSiteSkin !== '') ? 'app/style/skins/' + window.selectedSiteSkin + '.css' : '';

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
    console.log('Конечные инициализированы');
    $(document).ready(function () {
      var preloader = $('#preloader');
      if (preloader.length > 0) {
        preloader.fadeOut('slow', function () {
          preloader.remove();
        });
      }
    });
  });
});