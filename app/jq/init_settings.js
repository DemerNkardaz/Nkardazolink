waitFor('input', () => {
  
})

/* ----------------- ↑ Send checkbox change state on fromStorage options ↑ ----------------- */

if (nkSettings.get('save_selected_item') === 'true') {
  waitFor('[nk-item]', () => {
    $('[nk-item]').each(function() {
      var entity = $(this).attr('entity');
      if (entity) {
        var storageKey = `selectedItems.${entity}`;
        var storedValue = $Store(storageKey).load();
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
    pageTriggerCallback(function () {
      nkSettings.get('change_skin_by_time') === 'true' ? setSkinByTime() : setSkin(nkSettings.get('skin'));
      resolve();
    });
  } catch (err) { console.error(err); }
}).then(function () {
  nkSettings.get('change_skin_by_time') === 'true' ? console.buildType(`[NK_SKIN] → Skin “${availableSkins[nkSettings.get('skin')].name}” assigned based on “Daytime” Preference`, 'success') :
    console.buildType(`[NK_SKIN] → Skin “${availableSkins[nkSettings.get('skin')].name}” assigned based on User Preference`, 'success');
});