$(document).on('page_fully_builded', function () {
  //? APPLYING SEARCH
  if (nk.settingConfig.get('save_search_result') === true) {
    const bar = $('[nk-prop-search]');
    const itemType = bar.attr('nk-prop-search');
    if (nk.store(`searchResults.${itemType}`).load() && bar) {
      bar.val(nk.store(`searchResults.${itemType}`).load());
      $('[nk-prop-search]').trigger('input');
    }
  }

  //? APPLYING SELECTED ITEM
  if (nk.settingConfig.get('save_selected_item') === true) {
    const items = $('item-prop');
    const itemType = items.attr('data-prop-class');
    if (nk.store('selectedItems').load()) {
      $(`item-prop[data-entity="${nk.store(`selectedItems.${itemType}`).load()}"]`).trigger('click');
    } else {
      $('item-prop').first().trigger('click');
    }
  } else {
    $('item-prop').first().trigger('click');
    nk.store('selectedItems').remove();
  }

  //? APPLYING SKIN
  const SKIN_LOADING = new Promise(function (resolve) {
    try {
      nk.settingConfig.get('change_skin_by_time') === true ? nk.skins.set().dayTime() : (nk.settingConfig.get('skin') ? nk.skins.set(nk.settingConfig.get('skin')) : nk.skins.set('byakujou'));
      resolve();
    } catch (err) { console.error(err); }
  });
  SKIN_LOADING.then(function () {
    nk.settingConfig.get('change_skin_by_time') === true ? console.buildType(`[NK_SKIN] → Skin “${nk.skins.themes[nk.settingConfig.get('skin')].name}” assigned based on “Daytime” Preference`, 'success') :
      console.buildType(`[NK_SKIN] → Skin “${nk.skins.themes[nk.settingConfig.get('skin')].name}” assigned based on User Preference`, 'success');
  });
});


