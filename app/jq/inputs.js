$(document).on('input', '[nk-search-bar]', function () {
  var this_bar = $(this);
  const searchBarType = this_bar.attr('nk-search-bar');
  if (this_bar.val().length > 0) {
  }
  if (nkSettings.get('save_search_result') === 'true') {
    if (this_bar.attr('nk-search-bar')) {
      if (this_bar.val().length > 0) {
        toStorage(`latestSearches.${searchBarType}`, this_bar.val());
      } else {
        removeStorage(`latestSearches.${searchBarType}`);
      }
    }
  } else {
    if (fromStorage(`latestSearches.${searchBarType}`)) {
      removeStorage(`latestSearches.${searchBarType}`);
    }
  }


  if (searchBarType === 'kamon') {
    
  }
});
