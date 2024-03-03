var skin = (window.selectedSiteSkin && window.selectedSiteSkin !== '') ? 'app/style/skins/' + window.selectedSiteSkin + '.css' : '';

DataExtend([
  { type: 'data', source: 'app/data/lang.json', as: 'languageJSON' }
]);


if (anUrlParameter.mode !== '' || anUrlParameter.mode !== null) {
  var mode = anUrlParameter.mode;
  if (mode === 'kamon' || mode === 'banners' || mode === 'clans') {
    DataExtend([
      { type: 'data', source: 'app/data/' + mode + '.json', as: 'items.' + mode }
    ])
  }
}

waitFor('body', () => {
  DataExtend([
    { type: 'script', source: 'app/libs/standalone/jquery/jquery.js',        anchor: 'head',              pos: 'inner-start' },
    { type: 'script', source: 'app/libs/standalone/jquery/ui.js',            anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'app/libs/standalone/jquery/ui_dark_hive.css', anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'app/libs/standalone/OverlayScrollbars.css',   anchor: 'previous',          pos: 'after' },
    { type: 'style',  source: 'app/libs/standalone/bootstrap/bootstrap.css', anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'app/jq/utils.js',                             anchor: 'script#initScript', pos: 'after' },
    { type: 'script', source: 'app/libs/standalone/bootstrap/bootstrap.js',  anchor: 'body',              pos: 'inner-end' },
    { type: 'script', source: 'app/libs/standalone/Howler.js',               anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'app/libs/standalone/Vue/Vue.js',              anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'app/libs/standalone/Vue/Vue-i18n.js',         anchor: 'previous',          pos: 'after' },
    { type: 'script', source: 'app/libs/standalone/Vue/Vuex.js',             anchor: 'previous',          pos: 'after' },
    { type: 'style',  source:  skin,                                         anchor: 'head',              pos: 'inner-end', id: 'skinloader' }
  ], () => {
    console.log('Конечные инициализированы');
    $(document).ready(function () {
      var preloader = $('#preloader');
      if (preloader.length > 0) {
        preloader.fadeOut('slow', function () {
          preloader.remove();
        });
      }
    });
  });
});