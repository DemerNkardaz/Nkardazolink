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


//nkSettings.get('change_skin_by_time') === 'true' && (setSkinByTime(), console.log(`Skin assigned based on “Daytime” Preference`));