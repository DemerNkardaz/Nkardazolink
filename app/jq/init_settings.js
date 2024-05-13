waitFor('input', () => {
  
})

/* ----------------- ↑ Send checkbox change state on fromStorage options ↑ ----------------- */

if (nk.settingConfig.get('save_selected_item') === true) {
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
const SKIN_LOADING = new Promise(function (resolve) {
  try {
    $(document).on('page_fully_builded', function () {
      nk.settingConfig.get('change_skin_by_time') === true ? nk.skins.set().dayTime() : (nk.settingConfig.get('skin') ? nk.skins.set(nk.settingConfig.get('skin')) : nk.skins.set('byakujou'));
      resolve();
    });
  } catch (err) { console.error(err); }
}).then(function () {
  nk.settingConfig.get('change_skin_by_time') === true ? console.buildType(`[NK_SKIN] → Skin “${nk.skins.themes[nk.settingConfig.get('skin')].name}” assigned based on “Daytime” Preference`, 'success') :
    console.buildType(`[NK_SKIN] → Skin “${nk.skins.themes[nk.settingConfig.get('skin')].name}” assigned based on User Preference`, 'success');
});