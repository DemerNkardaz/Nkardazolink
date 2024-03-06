window.panel_prop_constructor = {
  kamon: (rarity, title, subtitle) => {
    `<div nk-item-view="body" show_rarity=${rarity}>` +
      `<div nk-item-view="banner">` +
        `<div nk-item-view="ornate"></div>` +
        `<h2 nk-item-view="title">${title}</h2>` +
        `<div class="shadowDropWrapper w_children">` +
          `<h2 nk-item-view="subtitle">${subtitle}</h2>` +
        `</div>` +
      `</div>` +
    
    `</div>`
  }
};

window.item_props = {
  panel: () => {
    return panel_prop_constructor[anUrlParameter.mode](rarity, title, subtitle);
  },
  item: () => {
    return;
  }
}