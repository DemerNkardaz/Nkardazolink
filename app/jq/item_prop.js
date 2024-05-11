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