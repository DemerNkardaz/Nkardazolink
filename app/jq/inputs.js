$(document).on('input', '[nk-search-bar]', function () {
  var this_bar = $(this);
  const searchBarType = this_bar.attr('nk-search-bar');
  if (this_bar.val().length > 0) {
  }
  if (nkSettings.get('save_search_result') === 'true') {
    if (this_bar.attr('nk-search-bar')) {
      if (this_bar.val().length > 0) {
        nk.store(`latestSearches.${searchBarType}`, this_bar.val()).save();
      } else {
        nk.store(`latestSearches.${searchBarType}`).remove();
      }
    }
  } else {
    if (nk.store(`latestSearches.${searchBarType}`).load()) {
      nk.store(`latestSearches.${searchBarType}`).remove();
    }
  }


  if (searchBarType === 'kamon') {
    
  }
});
