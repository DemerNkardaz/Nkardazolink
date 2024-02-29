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
      loadMonsItems(function () {
        initializeFilters();
        updateCrestCounter();
        getHighestRarity();
        if (global_saved_search_mode_kamon && global_saved_opt_save_search === "true") {
          $('#galleryContentSearchInput').val(global_saved_search_mode_kamon).trigger('input');
        };
      });

      $('#galleryControlButtons').append(
        '<div class="button_rounded_common" onclick="window.redirTo({ index: true, url: \'?mode=banners\' });">' +
        '<span class="maticon">flag</span>' +
        'Смотреть штандарты' +
        '</div>'
      );
    }

    $('[data-filter_entity]').tooltip();
    $('[data-filter_selected]').attr('data-filter_selected', $('[data-filter_value="default"]').attr('value'));
    window.setRLTBPositions();
    window.setWidthFromChildren();
    OverlayScrollbars($('.galleryContentGridWrapper'), {
    });
    OverlayScrollbars($('#gallerySelectedDescription'), {
    });

    var items = $('.galleryItemCommon');
    if ($('[data-filter_group]')) {
      items.each(function(){
        if ($(this).attr('data-filter_group') === 'JP') {
          $(this).removeClass('groupDisabled');
        } else {
          $(this).addClass('groupDisabled');
        }
      });
    }
  });

  window.updateGalleryScrollbar = function() {
    OverlayScrollbars($('.galleryContentGridWrapper')).scroll().update();
  }

  window.updateCrestCounter = function() {
    $('span[data-counter]').text($('#galleryContentGrid > .galleryItemCommon:not(.groupDisabled)').length);
  }


  $(document).on('mouseover', '#galleryInfoSelectedTitle', function(){
    var $element = $(this)[0];
    if ($element.offsetWidth < $element.scrollWidth) {
      $("#galleryFullTitle").addClass('active');
      $("#galleryFullTitle").text($element.textContent);
    }
  });
  $(document).on('mouseover', '[data-transcript]', function(){
    var transcript = $(this).attr('data-transcript');
      $("#galleryFullTitle").addClass('active');
      $("#galleryFullTitle").html(transcript);
  });


  $(document).on('mouseleave', '#galleryFullTitle', function(){
    $("#galleryFullTitle").removeClass('active');
    $("#galleryFullTitle").text('');
  });

  $(document).on('click', '#gallerySelectedItemImg', function(){
      var $this = $(this);
      var src = $this.attr('src');

      if (src.endsWith('.png')) {
        src = src.replace('.png', '.svg');
        $('[data-imgprop="SVG"]').css('display', 'block');
      } else if (src.endsWith('.svg')) {
        src = src.replace('.svg', '.png');
        $('[data-imgprop="SVG"]').css('display', 'none');
      }
      $this.attr('src', src);
  });

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
  $(document).on('click', '.galleryItemCommon', function () {
    var $this = $(this);
    var image = $this.find('img').attr('src');
    if (!$this.hasClass('selected')) {
      $('.galleryItemCommon').removeClass('selected');
      $this.addClass('selected');

      $('#gallerySelectedSubTitleText').text($this.find('.galleryItemTitle').text() || 'Название отсутствует');

      $('#gallerySelectedDescription').find('.os-content').html($this.find('.galleryItemDescription').html() || 'Описание отсутствует').attr('data-key', $this.find('.galleryItemDescription').attr('data-key') || '');

      $('#galleryInfoSelectedTitle').text($this.data('mon_title') || 'Название отсутствует').attr('data-key', $this.data('mon_key'));

      $('#gallerySelectedItem').find('.gallerySelectedTranslatedName').eq(0).text($this.data('mon_kanji_first') || 'Не найдено').attr('data-transcript', $this.data('mon_transcript_first') || 'Руби-подсказка не найдена');

      $('#gallerySelectedItem').find('.gallerySelectedTranslatedName').eq(1).text($this.data('mon_kanji_second') || 'Не найдено').attr('data-transcript', $this.data('mon_transcript_second') || 'Руби-подсказка не найдена');

      $('#gallerySelectedItemImg').attr('src', image.replace("_thumb", ""));
      
    }
  });

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
  if (global_saved_opt_save_search === 'true') {
    localStorage.setItem('saved_search_mode_kamon', savedSearch);
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


window.loadMonsItems = function (callback) {
    $.getJSON('data/mon_items.json', function(data) {
        var galleryContentGrid = $('#galleryContentGrid');

        $.each(data.root, function(_, category) {
            var imgFolder = category.img_folder;
            $.each(category.items, function(_, item) {
                var galleryItem = $('<div>').addClass('galleryItemCommon').attr({
                    'rarity': item.rarity,
                    'data-filter_status': item.status,
                    'data-filter_group': category.category,
                    'data-search_tags': item.search_tags.join(', '),
                    'data-mon_title': item.name,
                    'data-mon_key': item.key,
                    'data-mon_kanji_first': item.kanji_first,
                    'data-mon_kanji_second': item.kanji_second,
                    'data-mon_transcript_first': item.transcript_first.join(''),
                    'data-mon_transcript_second': item.transcript_second.join(''),
                });
                if (item.eg && item.eg.length > 0) {
                    galleryItem.attr('data-eg_tree', item.eg[0].tree);
                }

                var galleryItemImg = $('<div>').addClass('galleryItemImg');
                $('<img>').attr('src', data.default_img_path + imgFolder + item.img + "_thumb.png").appendTo(galleryItemImg);
                galleryItemImg.appendTo(galleryItem);

                $('<div>').addClass('galleryItemTitle').attr('data-key', item.clan_key).text(item.clan).appendTo(galleryItem);

                var galleryItemDescription = $('<div>').addClass('galleryItemDescription');
                var descriptionHTML = item.description.join(''); 
                galleryItemDescription.attr('data-key', item.description_key); 
                galleryItemDescription.html(descriptionHTML); 
                galleryItemDescription.appendTo(galleryItem);

                galleryItem.appendTo(galleryContentGrid);
            });
        });
      if (typeof callback === 'function') {
          callback();
      }
    });
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
    var isChecked = localStorage.getItem('search_result_save') === 'true';
    $('input[name="search_result_save"]').prop('checked', isChecked);
    $('input[name="search_result_save"]').change(function(){
        localStorage.setItem('search_result_save', $(this).prop('checked'));
        if(!$(this).prop('checked')) {
            localStorage.removeItem('saved_search_mode_kamon');
        } else {
            localStorage.setItem('saved_search_mode_kamon', $('#galleryContentSearchInput').val());
        }
    });
});
