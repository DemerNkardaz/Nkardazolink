$(document).on('languageJSON_loaded', function () {
  console.log('GenPage Init');
  let header;
  let main;
  let footer;

  if (anUrlParameter.mode === 'kamon') {


    $(document).on('kamon_loaded', function () {

    });

  } else {
    header = `
    <div class="personBanner"></div>
    <div class="personAvatar">
      <span class="avatarWrapper">
        <img src="resources/cherepkhed32.png" alt="${languageJSON[selectedLanguage]['OCKhertahiron']}" alt-key="OCKhertahiron" width="74" loading="eager">
      </span>
    </div>
    `
    main = ``

    footer = `
    <span class="copyright">&copy;&nbsp;<span data-key="DemerNkardaz">${languageJSON[selectedLanguage]['DemerNkardaz']}</span>,&nbsp;${returnCopyright()}</span>
    <span class="ambientControls ms-auto me-3">
      <button nk-music="pause/play"><span class="material-icons">pause</span></button>
      <button nk-music="random"><span class="material-icons">shuffle</span></button>
      <div class="trackInfo ms-3">
        <div class="trackTitle">${getCurrentTrack() ? getCurrentTrack() : ''}</div>
        <div class="trackTime">00:00 / ${getCurrentTrackTime() ? getCurrentTrackTime() : '00:00'}</div>
        <div class="trackProgress"></div>
      </div>
    </span>
    `
  }
  nk.siteHeader.html(header);
  nk.siteMainContainer.html(main);
  nk.footerContainer.html(footer);
  updateLanguageKeys();



  $(document).trigger(`${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select + '_page_loaded' : (anUrlParameter.mode ? anUrlParameter.mode + '_page_loaded' : 'default_page_loaded')}`);
});

function logCurrentTrigger() {
  $(document).on(`${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select + '_page_loaded' : (anUrlParameter.mode ? anUrlParameter.mode + '_page_loaded' : 'default_page_loaded')}`, function () {
    console.log(`Current trigger: ${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select : (anUrlParameter.mode ? anUrlParameter.mode : 'default')}`);
  });
};
logCurrentTrigger();