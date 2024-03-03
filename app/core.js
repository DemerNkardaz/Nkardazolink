let lastLoaded = null;

window.DataExtend = async function (dataArray, callback, index = 0) {
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
  const targetElement = document.querySelector(element);
  if (targetElement) {
    callback();
    return;
  }

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
