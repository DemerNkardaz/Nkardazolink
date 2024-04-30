function generateLinks({ linkClass, source } = {}) {
  let lArray = [];

  for (let key in source) {
    let link = source[key];
    if (linkClass) {
      link.LINK_Class = linkClass ? linkClass : 'default';
    }
    lArray.push(new link_block(link));
  }
  console.log(lArray);
  return lArray;
}

$(document).on('languageJSON_loaded', function () {
  let actived_type = 
    anUrlParameter.mode === 'cv' ? 'cv' :
    anUrlParameter.mode === 'tree' ? 'linktree' :
    anUrlParameter.mode === 'license' ? 'license' :
    anUrlParameter.mode === 'landing' ? 'landing' :
    anUrlParameter.mode === 'reader' ? 'reader' :
    ['kamon', 'pattern', 'banners', 'clans'].includes(anUrlParameter.mode) ? 'gallery' :
    null;
  
  let header;
  let main;
  let footer;

  if (anUrlParameter.mode === 'kamon') {


    $(document).on('kamon_loaded', function () {

    });

  } else {
    header = `
    <div class="personBanner" data-banner="${nkPreferences.banner}"></div>
    <div class="personAvatar">
      <span class="avatarWrapper">
        <img src="resources/cherepkhed32.png" alt="${cLang['OCKhertahiron']}" alt-key="OCKhertahiron" width="74" loading="eager">
      </span>
    </div>
    `;
    main = `
    <div class="links_Wrapper">
      <h2 class="links_Header"><hr>${cLang['ContentLinks']}<hr></h2>
      <div class="vert-border-alpha-0">
        <div class="links_Grid">
          <anchor-contentLinks/>
        </div>
      </div>
      <h2 class="links_Header"><hr>${cLang['SocialLinks']}<hr></h2>
      <div class="vert-border-alpha-0">
        <div class="links_Grid">
        <anchor-socialLinks/>
        </div
      </div>
    </div>
    `;

    footer = `
    <span class="copyright">&copy;&nbsp;<span data-key="DemerNkardaz">${cLang['DemerNkardaz']}</span>,&nbsp;${returnCopyright()}</span>
    <span class="ambientControls ms-auto me-3">
      <button nk-music="pause/play"><span class="material-icons">pause</span></button>
      <button nk-music="random"><span class="material-icons">shuffle</span></button>
      <button nk-music="credits" data-drop_target="musicCredits"><span class="material-icons">attribution</span></button>
      <div class="trackInfo ms-2">
        <div class="trackTitle">Track — none</div>
        <div class="trackTime">00:00 / 00:00</div>
        <div class="trackProgress"></div>
      </div>
      ${nkUI.dropdown({ content: `${cLang['DemerNkardaz']}`, id: 'musicCredits', hide: false })}
    </span>`;
  }
  nk.rootContainer.attr('actived', actived_type ? actived_type : 'default');
  nk.siteHeader.html(header);
  nk.siteMainContainer.html(main);
  nk.footerContainer.html(footer);


  function generateContent() {
    if (anUrlParameter.mode === 'kamon') {

    } else {
      const contentLinks = {
        ficbook: ({
          LINK_Title: cLang['Ficbook'],
          LINK_Source: 'https://ficbook.net/authors/4241255',
          LINK_Types: ['writing'],
          LINK_Background: {
            image: 'https://assets.ficbook.net/assets/design/profile_default_bg.png',
            color: `#f6ecda`,
            size: '150%',
            position: '50% 45%',
          },
          LINK_Image: 'https://images.ficbook.net/avatars/hWUeiDGi2ZgPcI72heSScy8DLQ1wkNun.jpg',
          LINK_Icon: {
            image: 'external/fickbook_logo.svg',
            pos: {
              right: -2,
              bottom: -2
            },
            w: 50
          },
          Arrow_blend: 'color-burn',
          Tooltip: { key: 'Naeda_Kitetsugi', pos: 'right' }
        }),
      };
      const contentLinks2 = {
        test1: contentLinks.ficbook,
        test2: contentLinks.ficbook,
        test3: contentLinks.ficbook,
        test4: contentLinks.ficbook,
        test5: contentLinks.ficbook,
      };
      
      nk.siteMainContainer.find('anchor-contentLinks').replaceWith(generateLinks({source : contentLinks}));
      nk.siteMainContainer.find('.links_Grid:first').append(generateLinks({source : contentLinks2}));
      nk.siteMainContainer.find('anchor-socialLinks').replaceWith(generateLinks({source : contentLinks2}));
    };
  }; generateContent();

  updateLanguageKeys();



  $(document).trigger(`${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select + '_page_loaded' : (anUrlParameter.mode ? anUrlParameter.mode + '_page_loaded' : 'default_page_loaded')}`);
});

function logCurrentTrigger() {
  $(document).on(`${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select + '_page_loaded' : (anUrlParameter.mode ? anUrlParameter.mode + '_page_loaded' : 'default_page_loaded')}`, function () {
    console.log(`Current trigger: ${anUrlParameter.mode && anUrlParameter.select ? anUrlParameter.mode + anUrlParameter.select : (anUrlParameter.mode ? anUrlParameter.mode : 'default')}`);
  });
};
logCurrentTrigger();