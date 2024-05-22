class LanguageList extends HTMLElement {
  constructor(variant) {
    super();
    let optionsArray = [];
    for (let key in nk.langs.list) {
      const language = nk.langs.list[key];
      const isSelected = nk.settingConfig.get('lang') === key;
      let component = `
      <button type="button"${variant === 'row' ? ` data-tooltip-key="${key.toUpperCase()}" data-tooltip-pos="top"` : ''} class="lang-option${variant === 'row' ? ' inline' : ''}" value="${key}" data-language-selector="${isSelected ? 'selected' : ''}" aria-label="${nk.locale.get(`buttonLabels.lang_select.${key}`)}">
      ${variant !== 'row' ? `${language.name}&nbsp;` : ''}<span class="ms-auto emoji_font">${language.emoji}</span>
      </button>`;
      optionsArray.push(component);
    }
    const component = `${optionsArray.join('')}`;
    this.innerHTML = component;
  }
}

customElements.define('language-list', LanguageList);
nk.ui.LanguageList = LanguageList;



$(document).on('click', '[data-language-selector]', function () {
  const lang = $(this).attr('value').toLowerCase();
  $('[data-language-selector]').attr('data-language-selector', '');
  $(this).attr('data-language-selector', 'selected');
  nk.locale.switch(lang);
});
