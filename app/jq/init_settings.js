waitFor('input', () => {
  
})

/* ----------------- ↑ Send checkbox change state on fromStorage options ↑ ----------------- */

if (savedSettings.save_selected_item === 'true') {
  waitFor('[nk-item]', () => {
    $('[nk-item]').each(function() {
      var entity = $(this).attr('entity');
      if (entity) {
        var storageKey = `selectedItems.${entity}`;
        var storedValue = fromStorage(storageKey);
        if (storedValue) {
          $(this).addClass('selected');
        }
      }
    });
  });
}


savedSettings.change_skin_by_time === 'true' && setSkinByTime();