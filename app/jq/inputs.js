$(document).on('input', '[nk-search-bar]', function () {
  var this_bar = $(this);
  const searchBarType = this_bar.attr('nk-search-bar');
  if (this_bar.val().length > 0) {
  }
  if (nkSettings.get('save_search_result') === 'true') {
    if (this_bar.attr('nk-search-bar')) {
      if (this_bar.val().length > 0) {
        $Store(`latestSearches.${searchBarType}`, this_bar.val()).save();
      } else {
        $Store(`latestSearches.${searchBarType}`).remove();
      }
    }
  } else {
    if ($Store(`latestSearches.${searchBarType}`).load()) {
      $Store(`latestSearches.${searchBarType}`).remove();
    }
  }


  if (searchBarType === 'kamon') {
    
  }
});
