import { REPO_STATUS } from './data/repository/status.js';
import { ENTITIES } from './data/dtd/entities.js';
window.nk = {};
nk.ui = {};
nk.skins = {};
nk.locale = {};
nk.locale.languageJSON = {};
nk.locale.licenseJSON = {};
nk.items = {};
nk.timers = { data: null };
REPO_STATUS().then(repoInfo => { window.repoStatus = repoInfo; });
window.localHostIP = window.location.href.startsWith("http://localhost") || window.location.href.startsWith("http://127.0.0.1") || window.location.href.startsWith("http://192.168");


window.parseUrlParameter = function (name) {
  return new URLSearchParams(window.location.search).get(name)?.toLowerCase();
};

function parsePathDepth(text) {
  text = text.split('.').map(key => `[\"${key}\"]`);
  text.length > 1 ? text = text.join('') : text = text[0];
  return text;
}
String.prototype.parsePathDepth = function () {
  return parsePathDepth(this);
}

window.isMobileDevice = function () {
  let chk = false;
  const isMobile = /Android|MIUI|Galaxy|Xiaomi|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile/i.test(navigator.userAgent);
  (isMobile && window.screen.width <= 600 && window.navigator.maxTouchPoints > 1) ? chk = true : chk = false;
  return chk;
}

window.checkResolution = function () {
  let resolution = window.screen.width + 'x' + window.screen.height;
  return resolution;
}

window.isResolutionGreaterThan = function (width, height) {
  let resolution = window.checkResolution();
  let [screenWidth, screenHeight] = resolution.split('x').map(Number);

  if (screenWidth > width && screenHeight > height) { return true; }
  else { return false; }
}
window.moreThan1080p = isResolutionGreaterThan(1920, 1080);

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
  $('*').filter(function () { return this.shadowRoot !== null; }).each(function () { targetsCollection = targetsCollection.add($(this.shadowRoot).find(target)); });
  return targetsCollection;
};


$.fn.setSelected = function () { $(this).addClass('selected'); }
$.fn.setUnselected = function () { $(this).removeClass('selected'); }
$.fn.setActive = function () { $(this).addClass('active'); }
$.fn.setInactive = function () { $(this).removeClass('active'); }
$.fn.reapplyClass = function (addClass, selector) { $(selector).removeClass(addClass); $(this).addClass(addClass); };
$.fn.tagName = function () { return this.prop("tagName") };
$.fn.timedClass = function (className, end, start) { $(this).addClass(className); setTimeout(() => { setTimeout(() => { $(this).removeClass(className) }, end ? end : 100) }, start ? start : null) }
$.fn.timedClassEvent = function (eventType, className, end, start) { $(this).on(eventType, function () { $(this).timedClass(className, end, start); }) }
$.fn.closestParent = function(selector) {
    let $elements = nk.collectTargets(this);
    let $closestParent = $();
    
    $elements.each(function() {
        let $element = $(this);
        let $parent = $element.parent();
        
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
  const loadJSON = (data) => {
    return new Promise((resolve, reject) => {
      $.getJSON(data.source)
        .done(function (json, status, xhr) {
          if (typeof data.as !== 'undefined') {
            if (typeof data.to !== 'undefined') {
              const nestedProperties = data.to.split('.');
              let nestingWindow = window;
              for (const property of nestedProperties) {
                if (!nestingWindow[property]) {
                  nestingWindow[property] = {};
                }
                nestingWindow = nestingWindow[property];
              }
              nestingWindow[data.as] = json;
            } else {
              window[data.as] = json;
            }
          }

          if (xhr.readyState === 4 && xhr.status === 200) {
            $(document).trigger(`${data.as}_loaded`);
            console.buildType(`[DATA_IN] → “${data.as}” : loaded with “${data.source}”${data.to ? ` : → “${data.to}”` : ''}`, 'success');
            resolve();
          }
        })
        .fail(function (jqxhr, textStatus, error) {
          console.buildType(`[DATA_IN] → “${data.as}” : failed to load with “${data.source}” : ${error}`, 'error');
          reject(error);
        });
    });
  };

  if (isPromise) {
    return new Promise((resolve, reject) => {
      const promises = dataArray.map(data => loadJSON(data));
      Promise.all(promises)
        .then(() => {
          clearTimeout(nk.timers.data);
          nk.timers.data = setTimeout(function () {
            $(document).trigger(`full_data_loaded`);
          }, 75);
          resolve();
        })
        .catch(error => reject(error));
    });
  } else {
    if (typeof dataArray === 'object' && !Array.isArray(dataArray)) {
      loadJSON(dataArray).catch(error => console.error(error));
    } else {
      dataArray.forEach(function (data) {
        loadJSON(data).catch(error => console.error(error));
      });
    }
  }
};



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

window.changeMode = function (mode) {
  if (!mode.includes("&")) {
    history.replaceState({}, null, `?mode=${mode}`);
  } else if (mode.includes("&")) {
    let matches = mode.split("&");
    let mode = matches[0];
    let select = matches[1];
    history.replaceState({}, null, `?mode=${mode}&select=${select}`);
  }
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

window.unpackElement = function (obj) {
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

function getAttributes(element) {
  let attrs = '';
  const attributes = element.attributes;
  for (let i = 0; i < attributes.length; i++) {
    const value = eval('`' + attributes[i].value + '`');
    attrs += `${attributes[i].name}="${value}" `;
  }
  return attrs.trim();
}

const tagsLibrary = {
  badges: [
    { tag: 'ability', localeKey: 'tags.ability', badgeColor: 'pink' },
    { tag: 'addon', localeKey: 'tags.addon', badgeColor: 'red' },
    { tag: 'entity', localeKey: 'tags.entity', badgeColor: 'blue' },
    { tag: 'formations', localeKey: 'tags.formations', badgeColor: 'yellow' },
    { tag: 'modifiers', localeKey: 'tags.modifiers', badgeColor: 'turquoise' },
    { tag: 'race', localeKey: 'tags.race', badgeColor: 'darkred' },
    { tag: 'requirements', localeKey: 'tags.requirements', badgeColor: 'lightindigo' },
    { tag: 'research', localeKey: 'tags.research', badgeColor: 'grey' },
    { tag: 'squad', localeKey: 'tags.squad', badgeColor: 'purple' },
    { tag: 'tables', localeKey: 'tags.tables', badgeColor: 'lightbrown' },
    { tag: 'tuning', localeKey: 'tags.tuning', badgeColor: 'cyan1' },
    { tag: 'types', localeKey: 'tags.types', badgeColor: 'lavanda' },
    { tag: 'weapon', localeKey: 'tags.weapon', badgeColor: 'green' },
    { tag: 'lua', localeKey: 'tags.lua', badgeColor: 'lua' },
    { tag: 'scar', localeKey: 'tags.scar', badgeColor: 'relic' },
    { tag: 'map', localeKey: 'tags.map', badgeColor: 'lime' },
    { tag: 'guide', localeKey: 'tags.guide', badgeColor: 'guide' },
    { tag: 'ui', localeKey: 'tags.ui', badgeColor: 'skyblue' },
    { tag: '3d', localeKey: 'tags.3d', badgeColor: 'orange' },
    { tag: 'textures', localeKey: 'tags.textures', badgeColor: 'lavandadark' },
    { tag: 'fx', localeKey: 'tags.fx', badgeColor: 'lightpink' },
    { tag: 'sfx', localeKey: 'tags.sfx', badgeColor: 'sfx' },
    { tag: 'error', localeKey: 'tags.error', badgeColor: 'red' },
  ],
  extensions: [
    { tag: 'ability', localeKey: 'tags.ability_ext' },
    { tag: 'addon', localeKey: 'tags.addon_ext' },
    { tag: 'entity', localeKey: 'tags.ebpextension' },
    { tag: 'race', localeKey: 'tags.raceextension' },
    { tag: 'requirements', localeKey: 'tags.requiredextension' },
    { tag: 'research', localeKey: 'tags.researchextension' },
    { tag: 'squad', localeKey: 'tags.sbpextension' },
    { tag: 'weapon', localeKey: 'tags.weapextension' },
  ]
};


function tagParser(tagsArray, type, addText) {
  let result = '';
  const tags = tagsLibrary[type];
  tagsArray.forEach(tag => {
    const tagInfo = tags.find(item => item.tag === tag);
    if (tagInfo) {
      let contentText = addText && nk.locale.check(addText) ? nk.locale.get(addText) : (addText ? addText : nk.locale.get(tagInfo.localeKey));
      let dataKey = addText && nk.locale.check(addText) ? ` data-key="${addText}"` : (addText ? '' : ` data-key="${tagInfo.localeKey}"`);
      if (type === 'badges') {
        result += `<span class="badge badge--${tagInfo.badgeColor}"${dataKey}>${contentText}</span>`;
      } else if (type === 'extensions') {
        result += `<p class="badge"${dataKey}>${contentText}</p>`;
      }
    }
  });
  return result;
}
window.tagParser = tagParser;

function switchHTMLEntities(text, to) {
  if (to === 'xml') { ENTITIES.forEach(function (entity) { text = text.replace(new RegExp(entity[0], 'g'), entity[1]); }); }
  else { ENTITIES.forEach(function (entity) { text = text.replace(new RegExp(entity[1], 'g'), entity[0]); }); }
  return text;
}
function fetchArticleStructure(xmlUrl) {
  return new Promise((resolve, reject) => {
    fetch(xmlUrl)
      .then(response => response.text())
      .then(xmlText => {
        const parser = new DOMParser();
        const decodedXMLDoc = switchHTMLEntities(xmlText.XMLAsStringHandler().unpackText(), 'xml');
        const xmlDoc = parser.parseFromString(decodedXMLDoc, "application/xml");
        const badges = tagParser(xmlDoc.querySelector('badges').textContent.toLowerCase().split(' '), 'badges');
        const extension = tagParser(xmlDoc.querySelector('extensions').textContent.toLowerCase().split(' '), 'extensions');
        const htmlDoc = parser.parseFromString(eval('`' + xmlDoc.documentElement.innerHTML + '`'), "text/html");
        const article = $(htmlDoc.querySelector('article'));

        article.addClass('wiki-aricle').children('header').addClass('wiki-aricle__header');
        badges && article.children('header').append(badges);
        extension && article.children('main').prepend(extension);
        article.children('header').after('<hr class="w-100 mt-1 mb-3">');
        resolve(article);
      })
      .catch(error => reject(error));
  });
}
window.fetchArticleStructure = fetchArticleStructure;





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