window.nk = {};
nk.ui = {};
nk.skins = {};
nk.locale = {};
nk.items = {};
window.localHostIP = window.location.href.startsWith("http://localhost") || window.location.href.startsWith("http://127.0.0.1") || window.location.href.startsWith("http://192.168");


window.parseUrlParameter = function (name) {
  return new URLSearchParams(window.location.search).get(name)?.toLowerCase();
};


window.isMobileDevice = function () {
  let chk = false;
  const isMobile = /Android|MIUI|Galaxy|Xiaomi|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile/i.test(navigator.userAgent);
  (isMobile && window.screen.width <= 600 /*&& window.navigator.maxTouchPoints > 1*/) ? chk = true : chk = false;
  return chk;
}

window.randomId = function (prefix, mode) {
  prefix = prefix ? `${prefix}-` : '';
  let latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let latinLenght = latin.length;
  function genWords(counter) { let rand = ''; counter = counter ? counter : 10; for (let i = 0; i < counter; i++) { rand += latin.charAt(Math.floor(Math.random() * latinLenght)); } return rand; }
  let math1 = Math.random().toString(36).replace(/[.,]/g, '');
  let math2 = Math.floor(Math.random() * 1000);
  let math3 = mode === 'weak' ? Math.random().toString(36).replace(/[.,]/g, '') + Math.floor(Math.random() * 1000) : null;
  let date = mode === 'weak' ? new Date().getMilliseconds() : new Date().getTime() * new Date().getMilliseconds()
  let result;
  if (mode === 'weak') { result = `${prefix}W${math3}-${genWords(5)}-${date}`; return result };
  result = `${prefix}D-${math1}-${math2}-${genWords()}-${genWords()}-${date}`;
  return result;
}


window.console.buildType = function (message, type) {
  let styles = 'font-size: 12px; padding-inline: 5px; width: 100%; min-height: 24px; display: inline-flex; align-items: center; justify-content: start;';
  let marker;
  switch (type) {
    case 'error': styles += 'color: #ff3f3f; background-color: #ffdada;'; marker = '🚫'; break;
    case 'info': styles += 'color: #2c6c9e; background-color: #d6f0ff;'; marker = 'ℹ️'; break;
    case 'important': styles += 'color: #612c9e; background-color: #efd6ff;'; marker = '🆔'; break;
    case 'success': styles += 'color: #3f9e3f; background-color: #c3ffc3;'; marker = '✅'; break;
    case 'warning': styles += 'color: #988958; background-color: #fffbd6;'; marker = '⚠️'; break;
    default: styles += 'color: black;'; break;
  }
  return console.log(`%c${marker} ${message}`, styles);
};


nk.extractAttributes = function(element) {
    let attributesMap = new Map();
    Array.from(element.attributes).forEach(attr => {
        attributesMap.set(attr.name, attr.value);
    });
    
    Object.keys(element.dataset).forEach(key => {
        const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        if (!attributesMap.has(kebabKey)) {
            attributesMap.set(kebabKey, element.dataset[key]);
        }
    });
    
    let attributesString = Array.from(attributesMap)
        .map(([name, value]) => `${name}="${value}"`)
        .join(" ");
        
    return attributesString;
}


nk.collectTargets = function (target) {
  let targetsCollection = $(target);
  $('*').filter(function () {
    return this.shadowRoot !== null;
  }).each(function () {
    targetsCollection = targetsCollection.add($(this.shadowRoot).find(target));
  });
  return targetsCollection;
};



$.fn.reapplyClass = function (addClass, selector) { $(selector).removeClass(addClass); $(this).addClass(addClass); };
$.fn.tagName = function () { return this.prop("tagName") };
$.fn.timedClass = function (className, end, start) { $(this).addClass(className); setTimeout(() => { setTimeout(() => { $(this).removeClass(className) }, end ? end : 100) }, start ? start : null) }

$.fn.timedClassEvent = function (eventType, className, end, start) { $(this).on(eventType, function () { $(this).timedClass(className, end, start); }) }


$.fn.closestParent = function(selector) {
    var $elements = nk.collectTargets(this);
    var $closestParent = $();
    
    $elements.each(function() {
        var $element = $(this);
        var $parent = $element.parent();
        
        while ($parent.length) {
            if ($parent.is(selector)) {
                $closestParent = $parent;
                return false;
            }
            $parent = $parent.parent();
        }
    });
    
    return $closestParent;
};


window.clearStorage = function () { localStorage.clear(); };
function storageOperations(key, type, value) {
  if (key.includes('.')) {
    let result = JSON.parse(localStorage.getItem(key.split('.')[0]));
    for (let i = 1; i < key.split('.').length - 1; i++) { result = result !== null ? result[key.split('.')[i]] : null; };
    
    const lastKey = key.split('.').pop();

    if (type === 'set') { result === null && (result = {}); result[lastKey] = value; localStorage.setItem(key.split('.')[0], JSON.stringify(result)); }
    else if (type === 'remove') { delete result[lastKey]; localStorage.setItem(key.split('.')[0], JSON.stringify(result)); };

    return result !== null ? result[lastKey] : null;
  } else {
    switch (type) {
      case 'set': localStorage.setItem(key, value); break;
      case 'remove': localStorage.removeItem(key); break;
      default: return localStorage.getItem(key);
    }
  }
};
nk.store = function (key) {
  let methods = {};
  methods.load = function (promise) {
    const result = storageOperations(key, 'load');
    return promise === true ? Promise.resolve(result) : result;
  };
  methods.save = function (value) {
    storageOperations(key, 'set', value);
    Promise.resolve(value);
  };
  methods.remove = function () {
    storageOperations(key, 'remove');
    Promise.resolve();
  };
  return methods;
}
nk.setting = function (key) {
  let methods = {};
  methods.save = function (value, offConfigurate) {
    const previousSetting = storageOperations(`savedSettings.${key}`, 'load') || null;
    const previousMap = nk.settingConfig.get(key) || null;
    const savePromise = new Promise((resolve, reject) => {
      try {
        storageOperations(`savedSettings.${key}`, 'set', typeof value === 'string' ? value : JSON.stringify(value));
        offConfigurate !== true && nk.settingConfig.set(key, value);
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    savePromise.then(function () {
      console.buildType(`[SETTING] → Changed setting: ${key} = from “${previousSetting}” to “${value}” : Map “${previousMap} → ${nk.settingConfig.get(key)}” & Store “${previousSetting} → ${nk.setting(key).load()}”`, 'info');
    }).catch(function (err) { console.buildType(`[SETTING] → ${err}`, 'error') });

    return new Promise((resolve) => {
      const valueBefore = previousSetting !== null ? previousSetting : previousMap;
      const valueNew = value;
      resolve({ valueBefore, valueNew });
    });
  };
  methods.load = function (promise) {
    let result = storageOperations(`savedSettings.${key}`, 'load');

    if (typeof result === 'string') { try { result = JSON.parse(result) } catch (err) {} };

    return promise === true ? Promise.resolve(result) : result;
  };

  methods.remove = function () {
    const previousSetting = storageOperations(`savedSettings.${key}`, 'load') || null;
    const previousMap = nk.settingConfig.get(key) || null;
    const removePromise = new Promise((resolve, reject) => {
      try {
        storageOperations(`savedSettings.${key}`, 'remove');
        resolve();
      } catch (err) {
        reject(err);
      }
    });

    removePromise.then(function () {
      console.buildType(`[SETTING] → Removed setting: ${key} = “${previousSetting}” : Map “${previousMap} → ${nk.settingConfig.get(key)}”`, 'important');
    }).catch(function (err) { console.buildType(`[SETTING] → ${err}`, 'error') });
    return new Promise((resolve) => {
      const valueBefore = previousSetting !== null ? previousSetting : previousMap;
      const valueNew = null;
      resolve({ valueBefore, valueNew });
    });
  };
  return methods;
};

window.observeOn = function (type, element, callback, timeout, context) {
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'style') {
        let parts = type.split(':');
        let style = parts[1];
        let value = parts[2];
        if (getComputedStyle(mutation.target).getPropertyValue(style) === value) {
          if (timeout > 0) {
            setTimeout(function () {
              callback.call(context || null);
              observer.disconnect();
            }, timeout);
          } else {
            callback.call(context || null);
            observer.disconnect();
          }
        }
      }
    });
  });
  observer.observe(element, { attributes: true });
}


window.DataExtend = function (dataArray, isPromise) {
  if (isPromise) {
    return new Promise((resolve, reject) => {
      const loadedData = [];
      if (typeof dataArray === 'object' && !Array.isArray(dataArray)) {
        $.getJSON(dataArray.source)
          .done(function (json) {
            if (typeof dataArray.as !== 'undefined') {
              if (typeof dataArray.to !== 'undefined') {
                const nestedProperties = dataArray.to.split('.');
                let nestingWindow = window;
                for (const property of nestedProperties) {
                  if (!nestingWindow[property]) { nestingWindow[property] = {}; } nestingWindow = nestingWindow[property];
                }
                nestingWindow[dataArray.as] = json;
                console.log(nestingWindow);
              } else {
                window[dataArray.as] = json;
              }
              loadedData.push({ as: data.as, source: data.source, to: data.to });
            }
            resolve(loadedData);
          })
          .fail(function (jqxhr, textStatus, error) {
            reject(error);
          });
      } else {
        const promises = dataArray.map(data => DataExtend(data));
        Promise.all(promises)
          .then(() => resolve(loadedData))
          .catch(error => reject(error));
      }
    });
  } else {
    if (typeof dataArray === 'object' && !Array.isArray(dataArray)) {
      $.getJSON(dataArray.source, function (json) {
        if (typeof dataArray.as !== 'undefined') {
          if (typeof dataArray.to !== 'undefined') {
            const nestedProperties = dataArray.to.split('.');
            let nestingWindow = window;
            for (const property of nestedProperties) {
              if (!nestingWindow[property]) { nestingWindow[property] = {}; } nestingWindow = nestingWindow[property];
            }
            nestingWindow[dataArray.as] = json;
          } else {
            window[dataArray.as] = json;
          }
        }
    
      }).done(function () {
        $(document).trigger(`${dataArray.as}_loaded`);
        console.buildType(`[DATA_IN] → “${dataArray.as}” : loaded with “${dataArray.source}”${dataArray.to ? ` : → “${dataArray.to}”` : ''}`, 'success');

      });
    } else {
      dataArray.forEach(function (data) {
        DataExtend(data, callback);
      })
    }
  }
}






let lastLoaded = null;
/*
window.DataExtend = async function (dataArray, callback, index = 0) {
  if (index >= dataArray.length) {
    if (typeof callback === 'function') {
      callback();
    }
    return;
  }

  const data = dataArray[index];
  const { type, source, anchor, pos, id, as } = data;

  if (type === 'data') {
    try {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${source}`);
      }
      const jsonData = await response.json();
      if (typeof as !== 'undefined') {
        window[as] = jsonData;
        console.buildType(`[DATA_IN] → “${as}” : loaded with “${source}”`, 'success');
        await DataExtend(dataArray, callback, index + 1);
        $(document).trigger(`${as}_loaded`);
        return;
      }
    } catch (error) {
      console.error(`Ошибка загрузки ${source}:`, error);
    }
    await DataExtend(dataArray, callback, index + 1);
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
}*/

window.waitFor = function(selector, callback) {
  const targetElement = document.querySelector(selector);
  if (targetElement) {
    callback();
    return;
  }

  let timeoutId = setTimeout(() => {
    observer.disconnect();
    console.buildType(`[OBSERVER] → Observer “WaitFor” has been disconnected due to inactivity. →${selector.toUpperCase()}← is not responding`, 'warning');
  }, 2000);

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1 && node.matches(selector)) {
            clearTimeout(timeoutId);
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

window.redirect = function(linkOrigin) {
  let methods = {};
  methods.origin = function () { if (window.localHostIP) { window.location.replace(window.location.href.split('?')[0]); } else { window.location.replace(window.location.href.split('.html')[0]); } };
  methods.index = function () { if (window.localHostIP) { window.location.replace('index.html'); } else { window.location.replace('./'); } };
  methods.to = function (url) {
    if (typeof url === 'object') { linkOrigin === 'external' ? window.open(`https://${url.url}`, url.target ? url.target : '_blank') : window.location.replace(url.url); }
    else { linkOrigin === 'external' ? window.open(`https://${url}`, '_blank') : window.location.replace(url); }
  };
  return methods;
}

window.URLCopy = function() {
    let currentURL = window.location.href;
    let tempInput = document.createElement('input');
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
}


window.setTabIndex = function() {
    let elementsWithTabIndex = document.querySelectorAll('[tabindex]');
    let usedTabIndexes = [];

    elementsWithTabIndex.forEach(function(element) {
        let index = parseInt(element.getAttribute('tabindex'));
        usedTabIndexes.push(index);
    });

    function isUnique(index) {
        return !usedTabIndexes.includes(index);
    }

    let uniqueIndex = 1;
    while (!isUnique(uniqueIndex)) {
        uniqueIndex++;
    }

    return uniqueIndex;
}

window.pageTriggerCallback = function (callback) {
  if (typeof callback === 'function') {
    $(document).on(`${nk.url.mode && nk.url.select ? nk.url.mode + nk.url.select + '_page_loaded' : (nk.url.mode ? nk.url.mode + '_page_loaded' : 'default_page_loaded')}`, function () {
      callback();
    });
  } else if (typeof callback === 'string' && callback === 'return') {
    return `${nk.url.mode && nk.url.select ? nk.url.mode + nk.url.select + '_page_loaded' : (nk.url.mode ? nk.url.mode + '_page_loaded' : 'default_page_loaded')}`;
  }
};
window.contentLoadCallback = function (callback) {
  let variable = `${nk.url.mode && nk.url.select ? `${nk.url.mode}${nk.url.select}` : (nk.url.mode ? `${nk.url.mode}` : 'default')}`;
  if (nk.url.mode) {
    $(document).on(`${variable}_loaded`, function () {
      callback();
    });
  } else {
    callback();
  }
}


window.exportStorageData = function() {
    var localStorageData = {};

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);

        localStorageData[key] = value;
    }

    var jsonData = JSON.stringify(localStorageData, null, 2); 

    var a = document.createElement('a');
    var file = new Blob([jsonData], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = 'localStorageData.json';
    a.click();
}

window.unpackElementObject = function (obj) {
  const uniqId = randomId('object');
  $('body').append(`<div id="${uniqId}"></div>`);
  $(`#${uniqId}`).hide();
  $(`#${uniqId}`).append(obj);
  return `<div data-object-id="${uniqId}"><div></div></div>`;
}

window.unpackedHandler = function () {
  let anchorObjects = $('[data-object-id]');
  anchorObjects.each(function () {
    let ownId = $(this).attr('data-object-id');
    let tempId = $(`#${ownId}`);
    if (tempId) {
      $(this).replaceWith(tempId);
      tempId.contents().unwrap();
    }
  });
}



window.downloadDATA = function (varToDownload) {
  let varName = Object.keys(window).find(key => window[key] === varToDownload);
  let file = new Blob([JSON.stringify(varToDownload, null, 2)], { type: 'application/json' });

  let a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = `${varName}.json`;
  a.click();
}


/*
document.addEventListener('DOMContentLoaded', function() {
    var elementsWithTabindex = document.querySelectorAll('[tabindex]');
    elementsWithTabindex.forEach(function(element) {
        element.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                this.click();
            }
        });
    });
});*/