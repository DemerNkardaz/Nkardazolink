window.ui_components = {
  preloader: (siblingType, callback, stopTimer) => {
    var component = (
      `<div id="preloader">` +
      `  <div class="preloader-logo">` +
      `    <div class="preloader-logo-wrapper">` +
      `      <img src="resources/svg/NkardazKamon.svg" width="100">` +
      `    </div>` +
      `  </div>` +
      `  <div class="preloader-progress">` +
      `    <div id="preloader-progress" class="progress_bar" value="0"></div>` +
      `    <p style="width: 160px"><span id="progress-label">${loadingText[selectedLanguage]}</span><br>` +
      `      <span class="loadmarker-slashes"></span><span>&ensp;:&ensp;</span><span class="loadmarker-percent">0</span>` +
      `    </p>` +
      `  </div>` +
      `</div>`
    );
    $('body').prepend(component).promise().done(() => {
      var preloader = $('#preloader');
      var loadmarker_style = (selectedLanguage === 'ja' || selectedLanguage === 'zh') ? 'loadmarker-dots ja' : 'loadmarker-dots';
      var siblings = preloader.siblings(':not(#preloader)');
      var siblingClass = (siblingType === 'noscroll') ? 'noscroll-for-preloader' : 'hidden-for-preloader';
      siblings.addClass(siblingClass);

      observeOn('style:--progress:100%', $('#preloader-progress')[0], function () {
        console.log('style:--progress:100%');
        preloader.find('br').nextAll().remove();
        preloader.find('#progress-label').html(`${executingText[selectedLanguage]}<span class="${loadmarker_style}"></span>`);
        if (!stopTimer) {
          setTimeout(() => {
            siblings.removeClass(siblingClass);
            preloader.fadeOut('slow', function () {
              preloader.remove();
            });
          }, 1000);
        }
      });
      document.addEventListener('DOMContentLoaded', showLoadPercentage, false);
    });
    if (typeof callback === 'function') {
      callback();
    }
  },
  header: () => {
    nk.siteHeader.html(
      (!anUrlParameter.mode ?
        'This is default'
        :
        'This is ' + anUrlParameter.mode)
    );
  }
}


/* Object.values(window.ui_components).forEach(component => component()); */