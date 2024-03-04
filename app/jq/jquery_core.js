window.cloneTo = function (from, element, to) {
  var deferred = $.Deferred();

  $.ajax({
    url: from + '.html',
    dataType: 'html',
    success: function(response) {
      var clonedElement = $(response).find(element).clone();
      $(to).append(clonedElement);
      
      deferred.resolve(clonedElement);
    },
    error: function(xhr, status, error) {
      console.error('Произошла ошибка при загрузке файла:', error);
      deferred.reject();
    }
  });

  return deferred.promise();
};

$.fn.insertFrom = function(from, element) {
  var self = this;
  return cloneTo(from, element, self).then(function(clonedElement) {
    return $(clonedElement);
  });
};

/* -------------------------------- SAMPLE OF USE -------------------------------- */
/*
cloneTo('index', '#personBlock', '#site-header').then(function($clonedElement) {
  $clonedElement.children().remove();
});
*/
/* -------------------------------- SAMPLE OF USE -------------------------------- */


window.replaceWithClone = function(from, element, target) {
  var deferred = $.Deferred();

  $.ajax({
    url: from + '.html',
    dataType: 'html',
    success: function(response) {
      var clonedContent = $(response).find(element).clone();
      $(target).empty().append(clonedContent);
      
      deferred.resolve(clonedContent);
    },
    error: function(xhr, status, error) {
      console.error('Произошла ошибка при загрузке файла:', error);
      deferred.reject();
    }
  });

  return deferred.promise();
};


$.fn.refillWith = function(from, element, callback, aftercall) {
  var self = this;
  if (typeof callback === 'function') {
    callback();
    replaceWithClone(from, element, self);
    aftercall();
  } else {
    return replaceWithClone(from, element, self);
  }
};

/* -------------------------------- SAMPLE OF USE -------------------------------- */
/*
$('#site-header').refillWith('index', '#personBlock', function() {
  $('body').insertFrom('preloader', '#preloader').then(function ($clonedElement) {
    $clonedElement.hide().fadeIn('fast');
    $('body').prepend($clonedElement);
    showLoadPercentage();
  });
}, function() {
  initPreloader();
});
*/
/* -------------------------------- SAMPLE OF USE -------------------------------- */


window.reInitScripts = function () {
  var reload = [
    'app/core.js',
    'app/init.js'
  ];
  $('script').each(function () {
    var src = $(this).attr('src');
    if (src && reload.indexOf(src) !== -1) {
      $.getScript(src, function(data, textStatus, jqxhr) {
        console.log('Скрипт ' + src + ' успешно загружен.');
      }).fail(function(jqxhr, settings, exception) {
        console.error('Ошибка загрузки скрипта ' + src + ': ' + exception);
      });
    }
  });
};

window.changeMode = function (mode) {
  if (!mode.includes("&")) {
    history.replaceState({}, null, "?mode=" + mode);
  } else if (mode.includes("&")) {
    var matches = mode.split("&");
    var mode = matches[0];
    var select = matches[1];
    history.replaceState({}, null, "?mode=" + mode + "&select=" + select);
  }
  reInitScripts();
}

$(document).on('click', '[nk-page]', function () {
  var mode = $(this).attr('nk-page');
  changeMode(mode);
})