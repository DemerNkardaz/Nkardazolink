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
    `

  }
  nk.siteHeader.html(header);
  nk.siteMainContainer.html(main);
  nk.footerContainer.html(footer);
});