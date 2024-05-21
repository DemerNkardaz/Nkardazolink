const loadingText = {
  en: 'Loading content',
  ru: 'Контент загружается',
  ja: 'コンテンツが読み込まれています',
  zh: '内容正在加载',
  ko: '콘텐츠가 로드 중입니다',
  vi: 'Nội dung đang tải'
};
const executingText = {
  en: 'Running',
  ru: 'Запуск',
  ja: '実行',
  zh: '运行',
  ko: '업데이트',
  vi: 'Tuyến'
};
class Preloader extends HTMLElement {
  constructor(hidingRole, percentage) {
    super();
    const logo = nk.settingConfig.get('change_skin_by_time') === true ? nk.skins.logo().dayTime() : nk.skins.logo().onSkin();
    const component = `
      <div class="preloader-logo" part="preloader-logo"> 
        <div class="preloader-logo-wrapper" part="preloader-logo-wrapper">
          <img src="${logo}" width="100" alt="webpage preloader" class="preloader-logo-image" part="preloader-logo-image">
        </div>
      </div>
      <div class="preloader-progress" part="preloader-progress">
        <div class="progress-value" part="progress-value"></div>
        <p style="width: 160px"><span class="progress-label">${loadingText[nk.settingConfig.get('lang')]}</span><br>
          <span class="loadmarker-slashes"></span><span>&ensp;:&ensp;</span><span class="loadmarker-percent">0</span>
        </p>
      </div>`;
    $(this).attr({
      'id': `preloader-${Math.round(Math.random() * 1000)}`,
      'data-hiding-role': `${hidingRole === 'noscroll' ? 'noscroll' : 'hide'}`,
      'data-percentage': `${percentage ? percentage : 'true'}`
    });
    this.innerHTML = component;
  }

  connectedCallback() {
    const preloader = $(this);
    const siblingClass = preloader.attr('data-hiding-role') === 'noscroll' ? 'noscroll-for-preloader' : 'hidden-for-preloader';
    const siblings = preloader.siblings(':not(#preloader)');
    const loadmarkerStyle = (nk.settingConfig.get('lang') === 'ja' || nk.settingConfig.get('lang') === 'zh') ? 'loadmarker-dots ja' : 'loadmarker-dots';
    
    siblings.addClass(siblingClass);
    observeOn('style:--progress:100%', $('.progress-value')[0], function () {
      preloader.find('br').nextAll().remove();
      preloader.find('.progress-label').html(`${executingText[nk.settingConfig.get('lang')]}<span class="${loadmarkerStyle}"></span>`);
      setTimeout(() => { siblings.removeClass(siblingClass); preloader.fadeOut('slow', function () { preloader.remove(); }); }, 1000);
    });
    preloader.attr('data-percentage') !== 'false' && setTimeout(preloaderPrecentage, 500);
  }
}

customElements.define('page-preloader', Preloader);
nk.ui.Preloader = Preloader;


function preloaderPrecentage() {
  $(document).trigger('loading_precentage_initialized');
  let percentElement = document.querySelector('.loadmarker-percent');
  let percentBar = document.querySelector('.progress-value');
  let currentPercentage = 0;
  let roundedPercentage;

  function fillFakePercentage() {
    let fakePerc = Math.round(Math.random() * (20 - 50) + 37);
    let interval = setInterval(function () {
      if (currentPercentage < fakePerc) {
        currentPercentage += Math.random() * (0.32 - 0.6) + 0.6;
        roundedPercentage = Math.round(currentPercentage);
        percentElement.textContent = roundedPercentage;
        percentBar.style.setProperty('--progress', `${roundedPercentage}%`);
      } else {
        clearInterval(interval);
      }
    }, Math.round(Math.random() * (8 - 10) + 10));
  }
  fillFakePercentage();

  function randomAddition() {
    let maxPercent = 50;
    let randomAddInverval = setInterval(function () {
      if (currentPercentage < maxPercent) {
        currentPercentage += Math.random() * (0 - 1) + 1;
        roundedPercentage = Math.round(currentPercentage);
        percentElement.textContent = roundedPercentage;
        percentBar.style.setProperty('--progress', `${roundedPercentage}%`);
      } else {
        clearInterval(randomAddInverval);
      }
    }, Math.round(Math.random() * (55 - 75) + 75));
  }

  randomAddition();



  setTimeout(function () {
    let img = document.images, c = 0, tot = img.length;
    function imgLoaded() {
      c += 1;
      let perc = ((100 / tot * c) << 0);
      let interval = setInterval(function () {
        if (currentPercentage < perc) {
          currentPercentage += Math.random() * (0.8 - 1) + 1;
          roundedPercentage = Math.round(currentPercentage);
          percentElement.textContent = roundedPercentage;
          percentBar.style.setProperty('--progress', `${roundedPercentage}%`);
        } else {
          clearInterval(interval);
        }
      }, Math.round(Math.random() * (8 - 10) + 10));

      if (c === tot) return;
    }

    for (let i = 0; i < tot; i++) {
      let tImg = new Image();
      tImg.onload = imgLoaded;
      tImg.onerror = imgLoaded;
      tImg.src = img[i].src;
    }
    
  }, 600);
}