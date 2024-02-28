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
    window.initializeFilters();
    OverlayScrollbars($('.galleryContentGridWrapper'), {

    });
  });

  window.updateGalleryScrollbar = function() {
    OverlayScrollbars($('.galleryContentGridWrapper')).scroll().update();
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
    if (!$this.hasClass('active')) {
      $('[data-gallery_groups]').removeClass('active');
      $this.addClass('active');
      if ($this.attr('data-filter_groups') === 'JP') {
        $('#galleryGroupTitle').text('Япония');
        $('#galleryGroupTitle').attr('data-key', 'jp');
      } else if ($this.attr('data-filter_groups') === 'ZH') {
        $('#galleryGroupTitle').text('Китай');
        $('#galleryGroupTitle').attr('data-key', 'zh');
      } else if ($this.attr('data-filter_groups') === 'VI') {
        $('#galleryGroupTitle').text('Вьетнам');
        $('#galleryGroupTitle').attr('data-key', 'vi');
      } else if ($this.attr('data-filter_groups') === 'KR') {
        $('#galleryGroupTitle').text('Корея');
        $('#galleryGroupTitle').attr('data-key', 'kr');
      } else if ($this.attr('data-filter_groups') === 'Glyphs') {
        $('#galleryGroupTitle').text('Глифы');
        $('#galleryGroupTitle').attr('data-key', 'glyphs');
      }
    }
  });
  $(document).on('click', '.galleryItemCommon', function () {
    var $this = $(this);
    if (!$this.hasClass('selected')) {
      $('.galleryItemCommon').removeClass('selected');
      $this.addClass('selected');
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
  }

  window.filter_show_items_by_type = function() {
    
  }

  window.filter_items_by_swap = function() {
    if ($('[data-filter_entity="swapper"]').attr('data-filter_swap') === 'true') {
      
    } else {
      
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

window.toggleTooltip = function (element) {
  $(element).tooltip('toggleEnabled');
}


$(document).on('click', function (e) {
  var $target = $(e.target);
  if ($target.closest($('[data-dropid]').parent()).length === 0) {
    $('[data-dropid]').removeClass('opened');
  }
});



$(document).ready(function(){
    $('#galleryContentSearchInput').on('input', function(){
        var searchText = $(this).val().toLowerCase();
        $('.galleryItemCommon').each(function(){
            var searchTags = $(this).attr('data-search_tags');
            if((searchTags && searchTags.toLowerCase().indexOf(searchText) !== -1) || !searchTags){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
