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

window.item_prop_array = function (source) {

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
      let itemEntity = new item_prop(itemData);
      itemsArray.push(itemEntity);
    });
  });
  

  function getRarityOrder(rarity) {
    for (const key in statuses) {
      if (statuses[key] === rarity) {
        return parseInt(key);
      }
    }
    return -1;
  }

  itemsArray.sort((a, b) => {
    const rarityA = a.getAttribute('data-rarity');
    const rarityB = b.getAttribute('data-rarity');

    const orderA = getRarityOrder(rarityA);
    const orderB = getRarityOrder(rarityB);


    if (orderA < orderB) { return 1; }
    if (orderA > orderB) { return -1; }
    return 0;
  });
  return itemsArray;
}


function responseSearchTags(entity, source) {
  const dataType = source.data_type;
  $.each(source.root, function (_, category) {
    $.each(category.items, function (_, item) {

    });
  });
}


$(document).on('input', '[nk-prop-search]', function () {
  let bar = $(this);
  const itemProps = $('item-prop');
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
                itemProps.attr('data-gallery-visible', 'hidden');
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