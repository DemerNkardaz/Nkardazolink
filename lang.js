

$(document).on('click', '[data-language-selector]', function () {
  var $this = $(this);
  var lang_val = $this.attr('value').toLowerCase();
  $('[data-language-selector]').removeClass('selected');
  $this.addClass('selected');
  localStorage.setItem('selected_language', lang_val);

  defs_loc_values = (languageJSON && languageJSON[global_selected_language] && {
    "titleLost": languageJSON[global_selected_language]['titleLost'],
    "descriptionLost": languageJSON[global_selected_language]['descriptionLost'],
    "subtitleLost": languageJSON[global_selected_language]['subtitleLost']
  });
  updateGalleryItem($('.galleryItemCommon.selected'));
  updateItemsLocales();
  updateTranscriptLocales(true);
});

$(document).ready(function() {
  $('[data-language-selector]').each(function () {
    var $this = $(this);
    var lang_val = $this.attr('value').toLowerCase();
    if (lang_val === global_selected_language) {
      $this.addClass('selected');
    }
  })
  
})

window.getUpdateLocalisedText = function() {
    if (typeof languageJSON !== 'undefined' && Object.keys(languageJSON).length > 0) {
        var selectedLanguage = global_selected_language || 'en';
        var langData = languageJSON[selectedLanguage];
        
        if (typeof langData !== 'undefined' && Object.keys(langData).length > 0) {
            $('[data-key]').each(function() {
                var dataKey = $(this).attr('data-key');
                
                // Проверяем, что значение data-key существует в langData
                if (langData[dataKey] !== undefined) {
                    // Если значение data-key является строкой, обновляем содержимое элемента
                    if (typeof langData[dataKey] === 'string') {
                        $(this).html(langData[dataKey]);
                    } else if (Array.isArray(langData[dataKey])) {
                        // Если значение data-key является массивом, то проходим по его элементам и обновляем содержимое элемента
                        var nestedKeys = langData[dataKey];
                        var nestedText = "";
                        nestedKeys.forEach(function(nestedKey) {
                            nestedText += langData[nestedKey] + " ";
                        });
                        $(this).html(nestedText.trim());
                    }
                }
            });
        }
    }
};
