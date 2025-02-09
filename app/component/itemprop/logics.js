const statuses = {
  0: 'inferior',
  1: 'common',
  2: 'normal',
  3: 'venerable',
  4: 'elite',
  5: 'grand',
  6: 'regal',
  7: 'great',
  8: 'legendary',
  9: 'divine',
  10: 'mythical',
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

nk.ui.itemPropArray = function (source, mode) {
  let itemsArray = [];
  if (mode === 'template') {
    Object.keys(statuses).forEach(status => {
      let items = new ItemProp({
        PROP: {
          class: 'kamon',
          category: 'JA',
          rarity: statuses[status],
          title: { text: nk.locale.get(`kamon.rarities.${statuses[status]}`), key: `kamon.rarities.${statuses[status]}` },
          template: 'true',
        }
      });
      itemsArray.push(items);
    });
  } else {
  const dataType = source.data_type;
    $.each(source.root, function (_, category) {
      $.each(category.items, function (_, item) {
        let itemData;
        if (dataType === 'kamon') {
          let thumbnail = moreThan1080p ? item.formats.med : item.formats.low;
          itemData = {
            PROP: {
              entity: item.entity_prop,
              class: 'kamon',
              category: category.category,
              rarity: statuses[item.status],
              title: { text: nk.locale.entity(item.clan_names), key: "clan_names" },
              image: { src: `${source.default_img_path}${category.img_folder}${item.image}${item.extension ? item.extension : thumbnail}` },
              multiextension: item.multiextension ? item.multiextension : null,
            }
          }
        }
        let itemEntity = new ItemProp(itemData);
        itemsArray.push(itemEntity);
      });
    });
  }
  sortItems(itemsArray);
  return itemsArray;
}

window.map_of_descendants = {};

window.descedationMap = function (source) {
  let map = {};
  function processCategory(category) {
    if (category.items) {
      $.each(category.items, function (_, item) {
        if (item.descending && Array.isArray(item.descending)) {
          const descendants = item.descending;
          let currentLevel = map;

          descendants.forEach((desc, index) => {
            if (index === descendants.length > 0) {
              currentLevel[desc] = {};
            } else {
              currentLevel[desc] = currentLevel[desc] || {};
              currentLevel = currentLevel[desc];
            }
          });
        }
      });
    }
  }

  $.each(source.root, function (_, category) {
    processCategory(category);
  });

  return map;
};

$(document).on('full_data_loaded', function () { nk.url.mode === 'kamon' && (map_of_descendants.kamon = descedationMap(nk.items.kamon)); });


const COUNTRIES_KEYS = {
  JA: ['日本', '日本国', 'にほん', 'Nihon', 'Нихон', 'にっぽん', 'ニホン', 'Nippon', 'Ниппон', 'Japan', 'Япония', '일본', 'Nhật Bản', '日本島国', 'にほんしまぐに', 'Нихонсимагуни', 'Nihonshimaguni'],
  ZH: ['中國', '中国', 'ㄓㄨㄥㄍㄨㄛˊ', 'Zhōngguó', 'Zhongguo', 'ちゅうごく', 'Chūgoku', 'Chuugoku', 'Chugoku', 'China', 'Китай'],
  KO: ['대한', '韓国', '한국', 'Hanguk', 'Corea', '코리아', 'Корея', 'Korea', 'コリア', '한국어', 'ハングル']
}

function recursiveChildrenJSONPath(mapobject, targets, item, value) {
  const correctedValue = value.replace('eg:>:', '').replace('*', '').trim().toLowerCase();
  const markedValue = value.replace('eg:>:', '').trim().toLowerCase();
  const startingKeys = $(`[data-entity="${item.entity_prop}"]`).attr('data-entity');
  const result = jsonpath.query(mapobject, `$..['${startingKeys}']`);
  const childrenArray = [];

  function subRecusrion(keys) {
    keys.forEach(key => {
      childrenArray.push(Object.keys(key));
      const children = Object.keys(key).map(k => key[k]);
      if (!markedValue.startsWith('*') && children.length > 0) { subRecusrion(children); }
    });
  }

  if (result.length > 0) {
    subRecusrion(result.flat());
    targets.each(function () {
      const entity = $(this).attr('data-entity');
      const isVisible = childrenArray.flat().includes(entity) || entity === item.entity_prop;
      $(this).attr({
        'data-gallery-visible': isVisible && correctedValue.length > 0 ? 'visible' : 'hidden',
        'data-gallery-nested': isVisible && correctedValue.length > 0 ? 'true' : 'false'
      });
    });
  }
}


function filterDescendats(itemProps, value) {
  const correctedValue = value.replace('eg:>:', '').replace('*', '').trim().toLowerCase();
  itemProps.each(function () {
    const propClass = $(this).attr('data-prop-class');
    const tagsSource = nk.items[propClass];
    const entity = $(this).attr('data-entity');
    $.each(tagsSource.root, function (_, category) {
      $.each(category.items, function (_, item) {
        if (entity === item.entity_prop) {
          const containsValue = item.search_tags.toFlatArray().some(tag => tag.toLowerCase().includes(correctedValue)) || Object.values(item.clan_names).some(name => name.toLowerCase().includes(correctedValue));
          const isVisible = containsValue || $(`[data-entity="${item.entity_prop}"]`).attr('data-gallery-nested') === 'true';
          $(`[data-entity="${item.entity_prop}"]`).attr({
            'data-gallery-visible': isVisible ? 'visible' : 'hidden',
            'data-gallery-nested': containsValue ? 'true' : ''
          });
          if (containsValue) {
            recursiveChildrenJSONPath(map_of_descendants[propClass], itemProps, item, value);
          }
        }
      });
    });
  });
}


function filterRarities(itemProps, value) {
  itemProps.each(function () {
    let status = $(this).attr('data-rarity');
    if (value.includes('-')) {
      let rarityValue = value.substring(5).trim().split('-');
      let visible = parseInt(rarityValue[0]) <= Object.values(statuses).indexOf(status) && Object.values(statuses).indexOf(status) <= parseInt(rarityValue[1]);
      $(this).attr('data-gallery-visible', visible ? 'visible' : 'hidden');
    } else if (value.includes(',')) {
      let rarityValues = value.substring(5).trim().split(',');
      let visible = rarityValues.some(rarity => Object.values(statuses).indexOf(status) === parseInt(rarity));
      $(this).attr('data-gallery-visible', visible ? 'visible' : 'hidden');
    } else {
      let rarityValue = value.substring(5).trim();
      let visible = statuses[parseInt(rarityValue)] === status;
      $(this).attr('data-gallery-visible', visible ? 'visible' : 'hidden');
    }
  });
}

function filterCountries(itemProps, value) {
  const correctedValue = value.replace(':', '').toLowerCase();
  itemProps.each(function () {
    const propCategory = $(this).attr('data-prop-category');
    let visible = false;
    for (let key in COUNTRIES_KEYS) {
      const lowercaseKey = key.toLowerCase();
      if (lowercaseKey === correctedValue || COUNTRIES_KEYS[key].some(k => k.toLowerCase().includes(correctedValue))) {
        if (propCategory === key) { visible = true; break; }
      }
    }
    $(this).attr('data-gallery-visible', visible ? 'visible' : 'hidden');
  });
}


function filterTags(itemProps, value) {
  itemProps.each(function () {
    let tagsSource = `nk.items.${$(this).attr('data-prop-class')}`;
    tagsSource = eval(tagsSource);
    let entity = $(this).attr('data-entity');
    $.each(tagsSource.root, function (_, category) {
      $.each(category.items, function (_, item) {
        if (entity === item.entity_prop) {
          let visible = item.search_tags.toFlatArray().some(tag => tag.toLowerCase().includes(value.toLowerCase())) ||
                        Object.entries(item.names).some(([key, name]) => name && name.toLowerCase().includes(value.toLowerCase())) ||
                        Object.entries(item.clan_names).some(([key, name]) => name && name.toLowerCase().includes(value.toLowerCase())) ||
                        item.entity_prop.toLowerCase().includes(value.toLowerCase().replace(/\s/g, '_')) ||
                        item.image.toLowerCase().includes(value.toLowerCase().replace(/\s/g, '_'));
          $(`[data-entity="${item.entity_prop}"]`).attr('data-gallery-visible', visible ? 'visible' : 'hidden');
        }
      });
    });
  });
}


let waitingForSave;
$(document).on('input', '[nk-prop-search]', function () {
  const bar = $(this);
  const ITEM_TYPE = bar.attr('nk-prop-search');
  const itemProps = $(`[data-items-container="${ITEM_TYPE}"]`).find(`[data-prop-class="${ITEM_TYPE}"]`);
  let value = bar.val();

  if (nk.settingConfig.get('save_search_result') === true) {
    clearTimeout(waitingForSave); waitingForSave = setTimeout(() => { nk.store(`searchResults.${ITEM_TYPE}`).save(value); }, 500);
  }

  if (value.length > 0) {
    
    if (value.startsWith('eg:s:') && /\d/.test(value)) { filterRarities(itemProps, value); }
    else if (value.startsWith('eg:>:')) { filterDescendats(itemProps, value); }
    else if (value.startsWith(':')) { filterCountries(itemProps, value); }
    else { filterTags(itemProps, value); }

  } else { itemProps.attr('data-gallery-visible', 'visible'); }
});



//? ---------------- CLICK EVENTS ---------------- ?//

$(document).on('click', 'item-prop', function () {
  const itemProp = $(this);
  const entity = itemProp.attr('data-entity');
  const isTemplate = itemProp.attr('data-prop-template') === 'true';
  const propClass = itemProp.attr('data-prop-class');
  const selectedClass = 'selected';

  itemProp.reapplyClass(selectedClass, `item-prop${!isTemplate ? ':not([data-prop-template])' : '[data-prop-template]'}`);

  if (!isTemplate && nk.settingConfig.get('save_selected_item') === true) { nk.store(`selectedItems.${propClass}`).save(entity); }
  if (!isTemplate) { openInventoryPanel(itemProp); }
});

function openInventoryPanel(itemProp) {
  const entity = itemProp.attr('data-entity');
  const propClass = itemProp.attr('data-prop-class');
  const language = nk.settingConfig.get('lang');
  const path = jsonpath.query(nk.items[propClass].root, `$..items[?(@.entity_prop=="${entity}")]`)[0];
  const categoryPath = nk.items[propClass].root.find(category => category.category === itemProp.attr('data-prop-category'));
  if (path) {
    const InventoryInfoPanel = $(`inventory-information-panel[data-prop-class="${propClass}"]`);
    if (InventoryInfoPanel.length > 0) {
      InventoryInfoPanel.replaceWith(
        new nk.ui.InventoryInfoPanel({
          PANEL: {
            entity: path.entity_prop,
            title: { text: path.names[language] && path.names[language].unpackText(), key: 'names', clan: path.clan_names[language] && path.clan_names[language].unpackText(), clan_key: 'clan_names' },
            description: {
              text: path.description && path.description[language] ? path.description[language].unpackText() : 'No description',
              key: path.description && 'description'
            },
            CJK: {
              first_text: path.kanji_first ? path.kanji_first.unpackText() : null,
              second_text: path.kanji_second ? path.kanji_second.unpackText() : null,
              transcript_first: path.transcript_first[language] ? path.transcript_first[language].unpackText() : null,
            },
            image: `${nk.items[propClass].default_img_path}${categoryPath.img_folder}${path.image}${path.extension ? path.extension : path.formats.med}`,
            prop_class: propClass, category: categoryPath.category, rarity: statuses[path.status],
          }
        })
      );
    }
  }
}


//? ---------------- DRAG AND DROP EVENTS ---------------- ?//

let inWindow = true;
$(document).on('dragover', function (e) { let windowHeight = $(window).height(); let y = e.originalEvent.clientY; if (y < 50 || y > (windowHeight - 50)) { inWindow = false; } else { inWindow = true; } e.preventDefault(); });
$(document).on('dragstart', 'item-prop', function (e) { $(this).addClass('dragged'); e.originalEvent.dataTransfer.setData('text', $(e.target).find('.item-title__text').text()); });
$(document).on('dragend', 'item-prop', function () { $(this).removeClass('dragged'); });
$(document).on('drop', '[data-drop-site]', function (e) { e.preventDefault(); let draggedItem = $('item-prop.dragged'); if (draggedItem.length > 0 && draggedItem.attr('data-prop-template') !== 'true') { $(draggedItem).trigger('click'); }});