waitFor('input', () => {
  
})

/* ----------------- ↑ Send checkbox change state on fromStorage options ↑ ----------------- */

if (nkSettings.get('save_selected_item') === 'true') {
  waitFor('[nk-item]', () => {
    $('[nk-item]').each(function() {
      var entity = $(this).attr('entity');
      if (entity) {
        var storageKey = `selectedItems.${entity}`;
        var storedValue = nk.store(storageKey).load();
        if (storedValue) {
          $(this).addClass('selected');
        }
      }
    });
  });
}

//? APPLYING SKIN
const skinLoad = new Promise(function (resolve) {
  try {
    $(document).on('page_fully_builded', function () {
      nkSettings.get('change_skin_by_time') === 'true' ? setSkinByTime() : (nkSettings.get('skin') ? setSkin(nkSettings.get('skin')) : setSkin('byakujou'));
      resolve();
    });
  } catch (err) { console.error(err); }
}).then(function () {
  nkSettings.get('change_skin_by_time') === 'true' ? console.buildType(`[NK_SKIN] → Skin “${nk.skins.themes[nkSettings.get('skin')].name}” assigned based on “Daytime” Preference`, 'success') :
    console.buildType(`[NK_SKIN] → Skin “${nk.skins.themes[nkSettings.get('skin')].name}” assigned based on User Preference`, 'success');
});