window.clearModesURL = function() {
    var currentUrl = location.href;
    var urlWithoutParams = currentUrl.split('?')[0];
    window.open(urlWithoutParams);
}

window.executeTooltipsCVLeft = function() {
      $('.cv_main_description [data-bs-toggle="tooltip"]').tooltip();
}

if (modeUrlPar === 'cv') {
  $('#miniFolioBlock').remove();
  $('#personLinksBlock').remove();
  $('.personFlexButton').remove();
  $('.personKamon').remove();
  $('#personInformationBlock').children('.personDescription').eq(0).children().remove();
  $('#personBlock').children('.blockumInformatorum').eq(0).remove();
  $('#personInformationBlock').addClass('cv_mode');
  $('#personName').parent().addClass('cv_mode');
  $('[data-key="SaitamaOnmyoji"]').after($('<span>').text('Bălți, Republica Moldova'));
  $('[data-key="SaitamaOnmyoji"').remove();

  var cv_description;
  var cv_contents;
  if (selUrlPar === '3d') {
    cv_description = '#cv_main_description_3d';
    cv_contents = '#cv_contents_3d';
  } else if (selUrlPar === '2d') {
    cv_description = '#cv_main_description_2d';
    cv_contents = '#cv_contents_2d';
  }
  
  $('#personInformationBlock').children('.personDescription').eq(0).load('cv.html ' + cv_description);
  $('#personInformationBlock').children('.personDescription').eq(0).clone().insertAfter('#personInformationBlock .personDescription:eq(0)').load('cv.html #cv_main_socials');
  $('#personInformationBlock').children('.personDescription').eq(0).clone().insertAfter('#personInformationBlock .personDescription:eq(1)').load('cv.html #cv_second_socials').addClass('cv_mode');


  $('#linkBlock').prepend('<div id="CVList" class="cv_page"><div id="CVListWrapper"></div></div>');
  $('#CVListWrapper').eq(0).load('cv.html ' + cv_contents);
  $(document).ready(function(){
    executeTooltipsCVLeft();
  });
}

window.titleMode = '';
if (modeUrlPar === 'kamon' || modeUrlPar === 'pattern' || modeUrlPar === 'mods' || modeUrlPar === 'webs') {
  $('#rootContainer').children().eq(1).remove();
  
  if (modeUrlPar === 'kamon') {
    window.titleMode = '<div class="vr ms-3 me-3"></div>Галерея Монсё';
  }
  
  $('#rootContainer').append('<div id="galleryModeMainWrapper"></div>').children().eq(1).load('modes.html #galleryModeMainWrapper > *', function() {
    $('#titleMode').html(titleMode);
    if (modeUrlPar === 'kamon') {
      loadJSON('mon_items', function(data) {
        loadedMonsJSON = data;
        loadMonsItems(function () {
          initializeFilters();
          $('#foundedItemsCount').parent().hide();
          getHighestRarity();
          $('[data-transcript]').hide();
          defaultSelectedItem();
          if ($('[data-filter_group]')) {
            $('.galleryItemCommon').each(function(){
              if ($(this).attr('data-filter_group') === 'JP') {
                $(this).removeClass('groupDisabled');
              } else {
                $(this).addClass('groupDisabled');
              }
            });
          }
          updateCrestCounter();
          if (global_saved_search_mode_kamon && global_saved_opt_save_search === "true") {
            $('#galleryContentSearchInput').val(global_saved_search_mode_kamon).trigger('input');
          };
        });
      });


    }

    $('[data-filter_entity]').tooltip();
    $('[data-filter_selected]').attr('data-filter_selected', $('[data-filter_value="default"]').attr('value'));
    window.setRLTBPositions();
    window.setWidthFromChildren();
    OverlayScrollbars($('.galleryContentGridWrapper'), {
    });
    OverlayScrollbars($('#gallerySelectedDescription'), {
    });
  });

  window.updateGalleryScrollbar = function() {
    OverlayScrollbars($('.galleryContentGridWrapper')).scroll().update();
  }

  window.updateCrestCounter = function() {
    $('span[data-counter]').text($('#galleryContentGrid > .galleryItemCommon:not(.groupDisabled)').length);
    $('#groupTotalCount').text($('#galleryContentGrid > .galleryItemCommon:not(.groupDisabled)').length);
  }


  $(document).on('mouseover', '#galleryInfoSelectedTitle', function(){
    var $element = $(this)[0];
    if ($element.offsetWidth < $element.scrollWidth) {
      $("#galleryFullTitle").addClass('active');
      $("#galleryFullTitle").text($element.textContent);
    }
  });

  window.last_hovered_transcript = '';
  window.updateTranscriptLocales = function(hidden) {
    var selectedItem = $('.galleryItemCommon.selected');
    var data = loadedMonsJSON;
    $.each(data.root, function (_, category) {
      var imgFolder = category.img_folder;
      $.each(category.items, function (_, item) {
        var item_transcript_first = (item.transcript_first && item.transcript_first[global_selected_language].join('')) || '';
        var item_transcript_second = (item.transcript_second && item.transcript_second[global_selected_language].join('')) || '';

        if (selectedItem.attr('data-entity_prop') === item.entity_prop) {
          if (!hidden) {
            $("#galleryFullTitle").addClass('active');
          }

          if (last_hovered_transcript === 'first') {
            $("#galleryFullTitle").html(item_transcript_first);
          } else {
            $("#galleryFullTitle").html(item_transcript_second);
          }
        }

      });
    });
  }

  
  $(document).on('mouseover', '[data-transcript]', function(){
    last_hovered_transcript = $(this).attr('data-transcript');
    updateTranscriptLocales();
  });


  $(document).on('mouseleave', '#galleryFullTitle', function(){
    $("#galleryFullTitle").removeClass('active');
    $("#galleryFullTitle").text('');
  });

  $(document).on('click', '#gallerySelectedItemImg', function(){
    showIMGProp($(this));
  });
  window.showIMGProp = function($element) {
    var src = $element.attr('src');
    if ($element.attr('data-imgprop') !== 'false') {
      if (src.endsWith('.png') ) {
        src = src.replace('.png', '.svg');
        $('[data-imgprop="SVG"]').css('display', 'block');
      } else if (src.endsWith('.svg')) {
        src = src.replace('.svg', '.png');
        $('[data-imgprop="SVG"]').css('display', 'none');
      }
      $element.attr('src', src);
    } else {
      $('[data-imgprop="SVG"]').css('display', 'none');
    }
  }

  $(document).on('click', '[data-gallery_groups]', function(){
    var $this = $(this);
    var items = $('.galleryItemCommon');

    if (!$this.hasClass('active')) {
      $('[data-gallery_groups]').removeClass('active');
      $this.addClass('active');
      if ($this.attr('data-filter_groups') === 'JP') {
        $('#galleryGroupTitle').text('Япония');
        $('#galleryGroupTitle').attr('data-key', 'jp');

        if ($('[data-filter_group]')) {
          items.each(function(){
            if ($(this).attr('data-filter_group') === 'JP') {
              $(this).removeClass('groupDisabled');
            } else {
              $(this).addClass('groupDisabled');
            }
          });
        }

      } else if ($this.attr('data-filter_groups') === 'ZH') {
        $('#galleryGroupTitle').text('Китай');
        $('#galleryGroupTitle').attr('data-key', 'zh');

        if ($('[data-filter_group]')) {
          items.each(function(){
            if ($(this).attr('data-filter_group') === 'ZH') {
              $(this).removeClass('groupDisabled');
            } else {
              $(this).addClass('groupDisabled');
            }
          });
        }

      } else if ($this.attr('data-filter_groups') === 'VI') {
        $('#galleryGroupTitle').text('Вьетнам');
        $('#galleryGroupTitle').attr('data-key', 'vi');

        if ($('[data-filter_group]')) {
          items.each(function(){
            if ($(this).attr('data-filter_group') === 'VI') {
              $(this).removeClass('groupDisabled');
            } else {
              $(this).addClass('groupDisabled');
            }
          });
        }

      } else if ($this.attr('data-filter_groups') === 'KR') {
        $('#galleryGroupTitle').text('Корея');
        $('#galleryGroupTitle').attr('data-key', 'kr');

        if ($('[data-filter_group]')) {
          items.each(function(){
            if ($(this).attr('data-filter_group') === 'KR') {
              $(this).removeClass('groupDisabled');
            } else {
              $(this).addClass('groupDisabled');
            }
          });
        }

      } else if ($this.attr('data-filter_groups') === 'Glyphs') {
        $('#galleryGroupTitle').text('Глифы');
        $('#galleryGroupTitle').attr('data-key', 'glyphs');

        if ($('[data-filter_group]')) {
          items.each(function(){
            if ($(this).attr('data-filter_group') === 'Glyphs') {
              $(this).removeClass('groupDisabled');
            } else {
              $(this).addClass('groupDisabled');
            }
          });
        }


      }
    } else {
      $this.removeClass('active');
      $('#galleryGroupTitle').text('Все');
      $('#galleryGroupTitle').attr('data-key', 'All');

      if ($('[data-filter_group]')) {
        items.removeClass('groupDisabled');
      }
    }
    $('#galleryContentSearchInput').trigger('input');
    updateCrestCounter();
  });

  
window.updateGalleryItem = function ($element) {
    var item_entity = $element.data('entity_prop');
    $('.galleryItemCommon').removeClass('selected');
    $element.addClass('selected');

    var data = loadedMonsJSON;
    var foundItem = false;
    $.each(data.root, function(_, category) {
        var imgFolder = category.img_folder;
        $.each(category.items, function (_, item) {
            var item_title = (item.localised_name && item.localised_name[global_selected_language]) || item.name || defs_loc_values.titleLost;
            var item_subtitle = (item.localised_clan && item.localised_clan[global_selected_language]) || item.clan || defs_loc_values.subtitleLost;
            var item_description = (item.description && item.description[global_selected_language] && (
            '<div>' +
            (item.description[global_selected_language].join('').replace(/\n/g, '<br>').replace(/\n/g, '<br>')) +
            '</div>'
            )) || defs_loc_values.descriptionLost || '';


            var item_kanji_fist = (item.kanji_first) || '';
            var item_kanji_second = (item.kanji_second) || '';;

            if (item_entity === item.entity_prop) {
                $('#galleryInfoSelectedTitle').html(item_title);
                $('#gallerySelectedSubTitleText').html(item_subtitle);
                $('#gallerySelectedDescription').find('.os-content').html(item_description);

                $('#gallerySelectedItem').find('[data-transcript="first"]').text(item_kanji_fist);

                $('#gallerySelectedItem').find('[data-transcript="second"]').text(item_kanji_second);
                $('[data-transcript]').fadeIn();
                var imgpath = data.default_img_path + imgFolder + item.img + ".png"
                if ($('#gallerySelectedItemImg').attr('src') !== imgpath) {
                    $('#gallerySelectedItemImg').hide();
                    $('#gallerySelectedItemImg').attr('src', imgpath);

                    var progressBar = $('#progressEntityDummy').clone().removeAttr('id').show();
                    $('#gallerySelectedItem').append(progressBar);

                    var img = new Image();
                    img.onload = function () {
                        progressBar.fadeOut('fast', function () {
                            $(this).remove();
                            $('#gallerySelectedItemImg').fadeIn('fast');
                        });
                    };
                    img.src = imgpath;
                }
              var showBlock = $('#gallerySelectedItemBlock');
              var data_status = $element.attr('data-filter_status');
              if (data_status) {
                  if (data_status == 1) {
                    showBlock.attr('show_rarity', 'common');
                  } else if (data_status == 2) {
                    showBlock.attr('show_rarity', 'uncommon');
                  } else if (data_status == 3) {
                    showBlock.attr('show_rarity', 'normal');
                  } else if (data_status == 4) {
                    showBlock.attr('show_rarity', 'venerable');
                  } else if (data_status == 5) {
                    showBlock.attr('show_rarity', 'highnoble');
                  } else if (data_status == 6) {
                    showBlock.attr('show_rarity', 'gold');
                  } else if (data_status == 7) {
                    showBlock.attr('show_rarity', 'great');
                  } else if (data_status == 8) {
                    showBlock.attr('show_rarity', 'legendary');
                  } else if (data_status == 9) {
                    showBlock.attr('show_rarity', 'god');
                  } else if (data_status == 10) {
                    showBlock.attr('show_rarity', 'mythical');
                }
              }
                foundItem = true;
                return false;
            }
        });
        if (foundItem) {
            return false;
        }
    });

    if ($element.attr('data-imgprop')) {
        $('#gallerySelectedItemImg').attr('data-imgprop', $element.data('imgprop'));
    } else {
        $('#gallerySelectedItemImg').removeAttr('data-imgprop');
    }
}

$(document).on('click', '.galleryItemCommon', function () {
  var clickedEntityProp = $(this).data('entity_prop');
  $('#galleryFullTitle').removeClass('active');
  updateGalleryItem($(this));
  $('[data-imgprop="SVG"]').css('display', 'none');
  if (global_save_selected_kamon === 'true' || $('input[name="save_selected_kamon"]').prop('checked')) {
    localStorage.setItem('saved_kamon_item', clickedEntityProp);
  }
});

window.defaultSelectedItem = function () {
  var savedItem = localStorage.getItem('saved_kamon_item');
  if (savedItem && global_save_selected_kamon === 'true') {
    $('.galleryItemCommon').each(function () {
      if ($(this).data('entity_prop') === savedItem) {
        updateGalleryItem($(this));
        return false;
      }
    });
  } else {
    updateGalleryItem($('.galleryItemCommon').eq(0));
  }
  }


  $(document).on('click', '[data-filter_menu] > [value]', function(){
    var selected = $('[data-filter_selected]');

    selected.attr('data-filter_selected', $(this).attr('value'));
    $(this).parent().removeClass('opened');
    initializeFilters();
  });

  window.initializeFilters = function () {
    var selected = $('[data-filter_selected]');
    var value_items = $('[data-filter_menu] > [value]');

    value_items.each(function() {
      if (selected.attr('data-filter_selected') === $(this).attr('value')) {
        $(this).addClass('active');
        selected.text($(this).text());
        selected.attr('data-key', $(this).attr('data-key'));
      } else {
        $(this).removeClass('active');
      }
    });
    filter_items_by_swap();
  }

  window.filter_show_items_by_type = function() {
    
  }

  window.filter_items_by_swap = function () {
    var selected_filter = $('[data-filter_menu] > .active').attr('value');
    if ($('[data-filter_entity="swapper"]').attr('data-filter_swap') === 'true') {
      if (selected_filter === 'clan_status') {
        var items = $('.galleryItemCommon');
      
        items.sort(function(a, b) {
          var statusA = $(a).data('filter_status');
          var statusB = $(b).data('filter_status');
          
          if (statusA !== statusB) {
            return statusA - statusB;
          } else {
            var titleA = $(a).find('.galleryItemTitle').text().toUpperCase();
            var titleB = $(b).find('.galleryItemTitle').text().toUpperCase();
            return titleA.localeCompare(titleB);
          }
        });
      
        items.each(function() {
          $(this).appendTo($(this).parent());
        });
      } else if (selected_filter === 'clan_name') {
            var items = $('.galleryItemCommon');

            items.sort(function(a, b) {
                var nameA = $(a).find('.galleryItemTitle').text().toUpperCase();
                var nameB = $(b).find('.galleryItemTitle').text().toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            });

            items.each(function() {
                $(this).appendTo($(this).parent());
            });
        }
    } else {
        if (selected_filter === 'clan_status') {
          var items = $('.galleryItemCommon');
        
          items.sort(function(a, b) {
            var statusA = $(a).data('filter_status');
            var statusB = $(b).data('filter_status');

            if (statusA !== statusB) {
              return statusB - statusA;
            } else {
              var titleA = $(a).find('.galleryItemTitle').text().toUpperCase();
              var titleB = $(b).find('.galleryItemTitle').text().toUpperCase();
              return titleA.localeCompare(titleB);
            }
          });
        
          items.each(function() {
            $(this).appendTo($(this).parent());
          });
        } else if (selected_filter === 'clan_name') {
            var items = $('.galleryItemCommon');

            items.sort(function(a, b) {
                var nameA = $(a).find('.galleryItemTitle').text().toUpperCase();
                var nameB = $(b).find('.galleryItemTitle').text().toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            items.each(function() {
                $(this).appendTo($(this).parent());
            });
        }
      }
  }
  


  window.filterSwapper = function () {
    if ($('[data-filter_entity="swapper"]').attr('data-filter_swap') === 'false') {
      $('[data-filter_entity="swapper"]').attr('data-filter_swap', 'true');
    } else {
      $('[data-filter_entity="swapper"]').attr('data-filter_swap', 'false');
    }
    filter_items_by_swap();
  }

  
  window.filterUnset = function() {
    $('[data-filter_entity="swapper"]').attr('data-filter_swap', 'false');
    filter_items_by_swap();
    $('[data-filter_selected]').attr('data-filter_selected', $('[data-filter_value="default"]').attr('value'));
    initializeFilters();
    }
}

window.openTargetDropdown = function (selector) {
  $('[data-dropid="' + selector + '"]').toggleClass('opened');
}

$(document).on('click', function (e) {
  var $target = $(e.target);
  if ($target.closest($('[data-dropid]').parent()).length === 0) {
    $('[data-dropid]').removeClass('opened');
  }
});

window.toggleTooltip = function (element) {
  $(element).tooltip('toggleEnabled');
}

$(document).on('click', '.clickableSendSearch', function () {
  var $this = $(this);
  var $searchInput = $('#galleryContentSearchInput');

  $searchInput.val($this.text().replace(/«|»/g, ''));
  $searchInput.trigger('input');
});


$(document).on('input', '#galleryContentSearchInput', function(){
  var savedSearch = $(this).val();
  var searchText = savedSearch.toLowerCase();
  var searchCriteria = searchText.split('eg:>:');
  var searchTerm = searchCriteria[0].trim(); 
  var searchTree = searchCriteria[1] ? searchCriteria[1].trim() : '';


  var isNumericSearch = searchTerm.startsWith('eg:s:');
  var numericFilter = null;
  if (isNumericSearch) {
      numericFilter = searchTerm.replace('eg:s:', '').trim();
      if (numericFilter.includes('-')) {
          var range = numericFilter.split('-');
          var min = parseInt(range[0]);
          var max = parseInt(range[1]);
          numericFilter = {
              min: min,
              max: max
          };
      } else {
          numericFilter = parseInt(numericFilter);
      }
  }

  $('.galleryItemCommon').each(function(){
      var searchTags = $(this).attr('data-search_tags');
      var egTree = $(this).attr('data-eg_tree');
      var filterStatus = parseInt($(this).attr('data-filter_status'));

  var matchesSearchTags = !searchTags || (searchTags.toLowerCase().indexOf(searchTerm) !== -1);
  var matchesNumericFilter = !isNaN(filterStatus) && (isNumericSearch && isNumericMatch(filterStatus, numericFilter));

    if (!$(this).hasClass('groupDisabled')) {
        if ((matchesSearchTags || matchesNumericFilter) && (searchTerm || !searchTree || isEgTreeMatch(egTree, searchTree) || isEgTreeMatchFlex(egTree, searchTree))) {
          $(this).show();
          } else {
              $(this).hide();
          }
    }
  });
  if(searchText.trim() !== '') {
    $(this).siblings('[type="reset"]').addClass('active');
  } else { 
    $(this).siblings('[type="reset"]').removeClass('active');
  }
  if (global_saved_opt_save_search === 'true'|| $('input[name="search_result_save"]').prop('checked')) {
    localStorage.setItem('saved_search_mode_kamon', savedSearch);
  }
  var countWithoutDisabled = $('#galleryContentGrid > .galleryItemCommon:visible').length;
  $('#foundedItemsCount').text(countWithoutDisabled);

  if (!savedSearch) {
    $('#foundedItemsCount').parent().fadeOut('fast');
  } else {
    $('#foundedItemsCount').parent().fadeIn('fast');
  }

});

$(document).on('click', '[type="reset"]', function () {
  var $this = $(this);
  $this.siblings('input').val('');
  $this.siblings('input').trigger('input');
});


function isNumericMatch(value, filter) {
    if (filter === null || filter === undefined) {
        return false;
    }
    if (typeof filter === 'number') {
        return value === filter;
    } else if (typeof filter === 'object' && filter.hasOwnProperty('min') && filter.hasOwnProperty('max')) {
        return value >= filter.min && value <= filter.max;
    }
    return false;
}

function isEgTreeMatch(egTree, searchTree) {
    if (!egTree || !searchTree) {
        return false;
    }

    var treeArray = egTree.split('>');
    var searchArray = searchTree.split('>');

    for (var i = 0; i < treeArray.length; i++) {
        var treeNode = treeArray[i].trim().toLowerCase();
        if (treeNode.indexOf(searchArray[0].trim().toLowerCase()) === 0) {
            var found = true;
            var searchIndex = 1;
            for (var j = i + 1; j < treeArray.length && searchIndex < searchArray.length; j++) {
                var nextTreeNode = treeArray[j].trim().toLowerCase();
                var searchNode = searchArray[searchIndex].trim().toLowerCase();

                if (nextTreeNode.indexOf(searchNode) === 0) {
                    searchIndex++;
                } else if (searchNode === '') {
                    searchIndex++;
                    continue;
                } else {
                    found = false;
                    break;
                }
            }
            if (found && searchIndex === searchArray.length) {
                return true;
            }
        }
    }

    return false;
}


function isEgTreeMatchFlex(egTree, searchTree) {
    if (!egTree || !searchTree) {
        return false;
    }

    var treeArray = egTree.split('>');
    var searchArray = searchTree.split('*');

    var searchStart = searchArray[0].trim().toLowerCase();
    var searchEnd = searchArray[1] ? searchArray[1].trim().toLowerCase() : '';

    for (var i = 0; i < treeArray.length; i++) {
        var treeNode = treeArray[i].trim().toLowerCase();

        if (treeNode.indexOf(searchStart) === 0) {
            if (searchEnd === '') {
                return true; 
            }

            for (var j = i; j < treeArray.length; j++) {
                var currentNode = treeArray[j].trim().toLowerCase();

                if (currentNode.indexOf(searchEnd) !== -1) {
                    return true;
                }
            }
        }
    }

    return false;
}




window.updateItemsLocales = function () {
  var data = loadedMonsJSON;
  var galleryItem = $('.galleryItemCommon');

  $.each(data.root, function(_, category) {
    $.each(category.items, function (_, item) {
      var item_clan = (item.localised_clan && item.localised_clan[global_selected_language]) || item.clan || defs_loc_values.titleLost;

      galleryItem.each(function() {
        if ($(this).attr('data-entity_prop') === item.entity_prop) { 
          $(this).find('.galleryItemTitle').html(item_clan);
        }
      });
    })
  })
}

window.loadMonsItems = function (callback) {
    var data = loadedMonsJSON;
    
    var galleryContentGrid = $('#galleryContentGrid');

    $.each(data.root, function(_, category) {
        var imgFolder = category.img_folder;
        $.each(category.items, function (_, item) {
            var item_clan = (item.localised_clan && item.localised_clan[global_selected_language]) || item.clan || defs_loc_values.titleLost;
        

            var galleryItem = $('<div>').addClass('galleryItemCommon').attr({
                'data-filter_status': item.status,
                'data-filter_group': category.category,
                'data-search_tags': item.search_tags.join(', '),
                'data-entity_prop': item.entity_prop
            });
          

            if (item.eg && item.eg.length > 0) {
                galleryItem.attr('data-eg_tree', item.eg[0].tree);
            }
            if (item.imgprop) {
                galleryItem.attr('data-imgprop', item.imgprop);
            }

            var galleryItemImg = $('<div>').addClass('galleryItemImg');
            $('<img>').attr('src', data.default_img_path + imgFolder + item.img + "_thumb.png").appendTo(galleryItemImg);
            galleryItemImg.appendTo(galleryItem);
            

            $('<div>').addClass('galleryItemTitle').html(item_clan).appendTo(galleryItem);


          galleryItem.appendTo(galleryContentGrid).each(function () {
            if (item.status === 1) {
              galleryItem.attr('rarity', 'common');
            } else if (item.status === 2) {
              galleryItem.attr('rarity', 'uncommon');
            } else if (item.status === 3) {
              galleryItem.attr('rarity', 'normal');
            } else if (item.status === 4) {
              galleryItem.attr('rarity', 'venerable');
            } else if (item.status === 5) {
              galleryItem.attr('rarity', 'highnoble');
            } else if (item.status === 6) {
              galleryItem.attr('rarity', 'gold');
            } else if (item.status === 7) {
              galleryItem.attr('rarity', 'great');
            } else if (item.status === 8) {
              galleryItem.attr('rarity', 'legendary');
            } else if (item.status === 9) {
              galleryItem.attr('rarity', 'god');
            } else if (item.status === 10) {
              galleryItem.attr('rarity', 'mythical');
            }
          });
          
            if (item.lazy_load !== "false") {
                galleryItem.find('img').attr('loading', "lazy");
            }

        });
    });
    if (typeof callback === 'function') {
        callback();
    }
}



window.getHighestRarity = function () {
  var placenment = $('[data-totalRarities]');
  var rarities = $('[data-filter_status]').map(function() {
    return parseInt($(this).attr('data-filter_status'));
  }).get();
  
  if (rarities.length === 0) {
    placenment.text("Нет данных");
    return;
  }
  
  var maxRarity = Math.max.apply(null, rarities);

  placenment.text(maxRarity);
}


$(document).ready(function(){
    if(localStorage.getItem('search_result_save') === null) {
        localStorage.setItem('search_result_save', 'true');
    }

    var isChecked = localStorage.getItem('search_result_save') === 'true';
    
    $(document).on('change', 'input[name="search_result_save"]', function(){
        localStorage.setItem('search_result_save', $(this).prop('checked'));
        if(!$(this).prop('checked')) {
            localStorage.removeItem('saved_search_mode_kamon');
        } else {
            localStorage.setItem('saved_search_mode_kamon', $('#galleryContentSearchInput').val());
        }
    });

    $('input[name="search_result_save"]').prop('checked', isChecked).trigger('change');
});

$(document).ready(function () {
  var isChecked2 = localStorage.getItem('save_selected_kamon') === 'true';
  $(document).on('change', 'input[name="save_selected_kamon"]', function () {
    localStorage.setItem('save_selected_kamon', $(this).prop('checked'));
    if (!$(this).prop('checked')) {
      localStorage.removeItem('saved_kamon_item');
    } else {
    }
  });

  $('input[name="save_selected_kamon"]').prop('checked', isChecked2).trigger('change');
});