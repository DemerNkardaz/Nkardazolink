const statuses = {
  0: 'inferior',
  1: 'common',
  2: 'normal',
  3: 'venerable',
  4: 'elite',
  5: 'grand',
  6: 'great',
  7: 'legendary',
  8: 'divine',
  9: 'mythical',
};

function getRarityOrder(rarity) {
  for (const key in statuses) {
    if (statuses[key] === rarity) {
      return parseInt(key);
    }
  }
  return -1;
}


$.fn.sortItems= function (type, switcher) {
  const elements = $(this);

  elements.sort((a, b) => {
    if (type === 'rarity') {
      const rarityA = a.getAttribute('data-rarity');
      const rarityB = b.getAttribute('data-rarity');

      const orderA = getRarityOrder(rarityA);
      const orderB = getRarityOrder(rarityB);

      if (orderA < orderB) { return switcher === true ? -1 : 1; }
      if (orderA > orderB) { return switcher === true ? 1 : -1; }

      const nameA = $(a).find('.item-title__text').text().toLowerCase() || $(a).text().toLowerCase();
      const nameB = $(b).find('.item-title__text').text().toLowerCase() || $(b).text().toLowerCase();

      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    } else if (type === 'name') {
      const nameA = $(a).find('.item-title__text').text().toLowerCase() || $(a).text().toLowerCase();
      const nameB = $(b).find('.item-title__text').text().toLowerCase() || $(b).text().toLowerCase();

      if (nameA < nameB) { return switcher === true ? 1 : -1; }
      if (nameA > nameB) { return switcher === true ? -1 : 1; }

      return 0;
    }
  });

  elements.each(function() {
    $(this).appendTo($(this).parent());
  });
}

window.sortItems = function (itemsArray) {

  itemsArray.sort((a, b) => {
    const rarityA = a.getAttribute('data-rarity');
    const rarityB = b.getAttribute('data-rarity');

    const orderA = getRarityOrder(rarityA);
    const orderB = getRarityOrder(rarityB);

    
    if (orderA < orderB) { return 1; }
    if (orderA > orderB) { return -1; }

    const nameA = $(a).find('.item-title__text').text().toLowerCase() || $(a).text().toLowerCase();
    const nameB = $(b).find('.item-title__text').text().toLowerCase() || $(b).text().toLowerCase();
    
    if (nameA > nameB) { return 1; }
    if (nameA < nameB) { return -1; }
    return 0;
  });
}

window.nkUI.itemPropArray = function (source) {

  const dataType = source.data_type;
  const thumb = '_thumb.png';
  let imageFolder = source.default_img_path;
  let itemsArray = [];
  $.each(source.root, function (_, category) {
    imageFolder += category.img_folder;
    $.each(category.items, function (_, item) {
      let itemData;
      if (dataType === 'kamon') {
        itemData = {
          PROP: {
            entity: item.entity_prop,
            class: 'kamon',
            category: category.category,
            rarity: statuses[item.status],
            title: { text: nkLocale.entity(item.clan_names), key: "clan_names" },
            image: { src: `${imageFolder}${item.image}${thumb}` },
            multiextension: item.multiextension ? item.multiextension : null,
          }
        }
      }
      let itemEntity = new ItemProp(itemData);
      itemsArray.push(itemEntity);
    });
  });
  

  sortItems(itemsArray);
  return itemsArray;
}


window.map_of_descendants = {};
window.descedationMap = function (source) {
  let map = {};

  $.each(source.root, function (_, category) {
    $.each(category.items, function (_, item) {
      if (item.descending) {
        let descendings = item.descending;

        // Проходимся по массиву descending
        descendings.reduce(function(previous, current, index) {
          if (!previous[current]) {
            previous[current] = {};
          }
          if (index !== descendings.length - 1) {
            previous[current][descendings[index + 1]] = {};
          }
          return previous[current];
        }, map);
      }
    });
  });

  return map;
}
$(document).on('full_data_loaded', function () {
  nk.url.mode === 'kamon' && (map_of_descendants.kamon = descedationMap(kamonItem));
});

window.downloadDATA = function (varToDownload) {
  let file = new Blob([JSON.stringify(varToDownload, null, 2)], { type: 'application/json' });

  let a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = `${varToDownload}.json`;
  a.click();
}




$(document).on('input', '[nk-prop-search]', function () {
  let bar = $(this);
  let itemProps = $(`[data-prop-class="${bar.attr('nk-prop-search')}"]`);
  
  if (bar.val().length > 0) {
    let value = bar.val();
    if (value.startsWith('eg:s:') && /\d/.test(value)) {
      itemProps.each(function () {
        let status = $(this).attr('data-rarity');
        if (!value.includes('-')) {
          let rarityValue = value.substring(5).trim().split('-');
          if (statuses[parseInt(rarityValue)] === status) {
            $(this).attr('data-gallery-visible', 'visible');
          } else {
            $(this).attr('data-gallery-visible', 'hidden');
          }
        } else {
          //! This is search by range like 0-3, 2-5 etc.
          let rarityValue = value.substring(5).trim().split('-');
          if (parseInt(rarityValue[0]) <= Object.values(statuses).indexOf(status) && Object.values(statuses).indexOf(status) <= parseInt(rarityValue[1])) {
            $(this).attr('data-gallery-visible', 'visible');
          } else {
            $(this).attr('data-gallery-visible', 'hidden');
          }
        }
      });
    } else if (value.startsWith('eg:>:')) {
      const correctedValue = value.replace('eg:>: ', '').trim().split(' > ');
      const clan = correctedValue.pop();
      //console.log(clan);
      itemProps.each(function () {
        let tagsSource = `${$(this).attr('data-prop-class')}Item`;
        tagsSource = eval(tagsSource);


        let entity = $(this).attr('data-entity');
        function processDescendants(obj) {
          for (let entity_key in obj) {
            if (obj.hasOwnProperty(entity_key)) {
              if (typeof obj[entity_key] === 'object') {
                processDescendants(obj[entity_key]); // Рекурсивно вызываем эту же функцию для вложенных объектов
              }
              $.each(tagsSource.root, function (_, category) {
                $.each(category.items, function (_, item) {
                  if (entity === item.entity_prop) {
                    if (Object.entries(item.clan_names).some(([key, name]) => name.toLowerCase().includes(clan.toLowerCase()))) {
                      $(`[data-entity="${item.entity_prop}"]`).attr('data-gallery-visible', 'visible');
                      if (entity_key.includes(item.entity_prop)) {
                        //! Need recursive function to show all children from map_of_descendants.kamon from current item.entity_prop name as a key of current founded entity

                      }
                    } else {
                      $(`[data-entity="${item.entity_prop}"]`).attr('data-gallery-nesting') !== 'true' && $(`[data-entity="${item.entity_prop}"]`).attr('data-gallery-visible', 'hidden');
                    }
                  }
                });
              });
            }
          }
        }
        processDescendants(map_of_descendants.kamon);
        
      });

    } else {
      itemProps.each(function () {
        let tagsSource = `${$(this).attr('data-prop-class')}Item`;
        tagsSource = eval(tagsSource);
        let entity = $(this).attr('data-entity');
        $.each(tagsSource.root, function (_, category) {
          $.each(category.items, function (_, item) {
            if (entity === item.entity_prop) {
              if (
                item.search_tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase())) ||
                Object.entries(item.names).some(([key, name]) => name.toLowerCase().includes(value.toLowerCase())) ||
                Object.entries(item.clan_names).some(([key, name]) => name.toLowerCase().includes(value.toLowerCase())) ||
                item.entity_prop.toLowerCase().includes(value.toLowerCase().replace(/\s/g, '_')) ||
                item.image.toLowerCase().includes(value.toLowerCase().replace(/\s/g, '_'))
              ) {
                $(`[data-entity="${item.entity_prop}"]`).attr('data-gallery-visible', 'visible');
              } else {
                $(`[data-entity="${item.entity_prop}"]`).attr('data-gallery-visible', 'hidden');
              }
            }
          });
        });
      });
    }
  } else {
    itemProps.attr('data-gallery-visible', 'visible');
  }
});



//? ---------------- CLICK EVENTS ---------------- ?//

$(document).on('click', 'item-prop', function () {
  var item = $(this).attr('item-prop');
  var entity = $(this).attr('PROP_ENTITY');
  $(this).reapplyClass('selected', 'item-prop');


  if (nk.settingConfig.get('save_selected_item') === true) {
    if (entity) {
      if (item === 'kamon') {
        nk.store('selectedItems.kamon', entity).save();
      } else if (item === 'banners') {
        nk.store('selectedItems.banners', entity).save();;
      } else if (item === 'clans') {
        nk.store('selectedItems.clans', entity).save();;
      } else if (item === 'pattern') {
        nk.store('selectedItems.pattern', entity).save();;
      }
    }
  }
});



//? ---------------- DRAG AND DROP EVENTS ---------------- ?//

let inWindow = true;
$(document).on('dragover', function (e) {
  let windowHeight = $(window).height();
  let y = e.originalEvent.clientY;
  
  if (y < 50 || y > (windowHeight - 50)) {
    inWindow = false;
  } else {
    inWindow = true;
  }
  e.preventDefault();
});

$(document).on('dragstart', 'item-prop', function (e) {
  $(this).addClass('dragged');
  e.originalEvent.dataTransfer.setData('text', $(e.target).find('.item-title__text').text());
});

$(document).on('dragend', 'item-prop', function (e) {
  $(this).removeClass('dragged');
});


$(document).on('dragover', '[data-drop-site]', function (e) {
  e.preventDefault();
});

$(document).on('drop', '[data-drop-site]', function (e) {
  e.preventDefault();
  let draggedItem = $('item-prop.dragged');
  if (draggedItem.length > 0) {
    let dataEntity = draggedItem.attr('data-entity');
    $(draggedItem).reapplyClass('selected', 'item-prop');
    console.log(dataEntity);
  }
});