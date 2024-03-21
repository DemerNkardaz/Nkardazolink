window.localHostIP = window.location.href.startsWith("http://localhost") || window.location.href.startsWith("http://127.0.0.1") || window.location.href.startsWith("http://192.168");

window.fromStorage = function (key) {
  return localStorage.getItem(key);
}

window.toStorage = function (key, value) {
  localStorage.setItem(key, value);
}

window.saveSettings = function (key, value) {
  window.toStorage(`savedSettings.${key}`, value);
}

window.loadSettings = function (key) {
  return fromStorage(`savedSettings.${key}`);
}

window.removeStorage = function (key) {
  localStorage.removeItem(key);
}

window.clearStorage = function () {
  localStorage.clear();
}

window.observeOn = function (type, element, callback, timeout, context) {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === 'style') {
        var parts = type.split(':');
        var style = parts[1];
        var value = parts[2];
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

var lastLoaded = null;

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
        $(document).trigger(`${as}_loaded`);
        await DataExtend(dataArray, callback, index + 1);
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
}

window.waitFor = function(selector, callback) {
  const targetElement = document.querySelector(selector);
  if (targetElement) {
    callback();
    return;
  }

  let timeoutId = setTimeout(() => {
    observer.disconnect();
    console.log(`Obeserver has been disconnected due to inactivity. →${selector.toUpperCase()}← is not responding`);
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

window.redirOrigin = function() {
  if (window.localHostIP) {
    window.location.replace(window.location.href.split('?')[0]);
  } else {
    window.location.replace(window.location.href.split('.html')[0]);
  }
}

window.redirToIndex = function() {
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
        window.open(`index.html${url}`, '_blank');
      } else {
        window.open(`./${url}`, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  } else {
    if (index) {
      if (window.localHostIP) {
        window.location.replace(`index.html${url}`);
      } else {
        window.location.replace(`./${url}`);
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
}


window.setTabIndex = function() {
    var elementsWithTabIndex = document.querySelectorAll('[tabindex]');
    var usedTabIndexes = [];

    elementsWithTabIndex.forEach(function(element) {
        var index = parseInt(element.getAttribute('tabindex'));
        usedTabIndexes.push(index);
    });

    function isUnique(index) {
        return !usedTabIndexes.includes(index);
    }

    var uniqueIndex = 1;
    while (!isUnique(uniqueIndex)) {
        uniqueIndex++;
    }

    return uniqueIndex;
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