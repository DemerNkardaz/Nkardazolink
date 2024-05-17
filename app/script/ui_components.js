class settings_check extends HTMLElement {
  constructor({ label, label_key, setting } = {}) {
    super();
    const component = `
      <label>
        <div option_type="checkbox"></div>
        ${label ? `<span ${label_key ? `data-key="${label_key}"` : (setting ? `data-key="${setting}"` : '')}>${label}</span>` : ''}
      </label>
    `

    $(this).attr({
      'nk-setting': (setting ? setting : null)
    }).addClass('my-1');

    this.innerHTML = component;
  }
  connectedCallback() {
    $(this).attr('tabindex', 0);
    $(this).find('[option_type="checkbox"]').attr('role', 'checkbox');
    const setting = $(this).attr('nk-setting');
    const checkbox = $(this).find('[option_type="checkbox"]');
    const stored = savedSettings[setting];

    stored === 'true' ? checkbox.attr('aria-checked', 'true') : checkbox.attr('aria-checked', 'false');
  }
}

customElements.define('settings-check', settings_check);
/*
$(document).on('full_data_loaded', function () {
  nk.siteMainContainer.prepend(
    new settings_check({
      label: languageJSON[]['save_search_result'],
      setting: 'save_search_result'
    }),
    new settings_check({
      label: languageJSON[]['save_selected_item'],
      setting: 'save_selected_item'
    }),
    new settings_check({
      label: languageJSON[]['turn_off_preloader'],
      setting: 'turn_off_preloader'
    })
  );
});*/


$.extend(nk.ui, {
  constructor: function ({ template, from } = {}) {
    let markup = '';
    Object.keys(from).forEach(key => {
      const data = from[key];
      let tempMarkup = template;
      Object.keys(data).forEach(variable => {
        const regex = new RegExp('\\${' + variable + '}', 'g');
        tempMarkup = tempMarkup.replace(regex, data[variable]);
      });
      markup += tempMarkup;
    });
    return markup;
  }
});

class LightBox extends HTMLElement {
  constructor({ Image, Controls } = {}) {
    super();
    const component = `
    <div class="lBox-Container">
      <div class="lBox-Close material-icons">close</div>
      <div class="lBox-Content">
        <div class="lBox-Image">
          <div class="lBox-View>
            <div class="lBox-Res"></div>
            <img src="${Image.src}" alt="${Image.alt}" loading="eager">
            ${Controls &&  Controls.extra.ytube ? `<iframe src="" loading="lazy" frameborder="0" allowfullscreen hidden></iframe>` : ''}
            <div class="lBox-Controls">
              <span id="lBox-Download" class="material-icons">download</span>
              <span id="lBox-Fscreen" class="material-icons">fullscreen</span>
              <span id="lBox-Blank" class="material-icons">launch</span>
            </div>
            ${Controls && Controls.extra ?
              `
              <div class="lBox-Controls-Extra">
                ${Controls.extra.maxres ? `<span id="lBox-MaxRes" class="material-icons">hd</span>` : ''}
                ${Controls.extra.pdf ? `<span id="lBox-Pdf" class="material-icons" data-pdf="${Controls.extra.pdf}">picture_as_pdf</span>` : ''}
                ${Controls.extra.ytube ? `<span id="lBox-Yt" class="material-icons" data-yt="${Controls.extra.ytube}"><img src="resources/svg/social_youtube_dark.svg" width="20" class="socialIconSVG"></span>` : ''}
              </div>
              `
            : ''}
          </div>
          <div class="lBox-Image-Label" ${Image.labelKey ? `data-key="${Image.labelKey}"` : ''}>${Image.label}</div>
        </div>
        <div class="lBox-Group"></div>
      </div>
    </div>`;
    this.innerHTML = component;
  }
  connectedCallback() {
    $(function () {
    });
    $(this).attr('role', 'dialog');
  }
}

customElements.define('light-box', LightBox);
nk.ui.LightBox = LightBox;


/* Object.values(window.ui_components).forEach(component => component()); */




class ConsoleRun extends HTMLElement {
  constructor() {
    super();
    const component = `
    <header class="cmd_header forceDrag"><span data-key="console">${nk.locale.get('console')}</span><span class="close">close</span></header>
    <section class="cmd_input"><span class="cmd_line"><label>PROMPT : ></label><textarea spellcheck="false" type="text" rows="1"></textarea></span></section>
    <footer class="cmd_footer"></footer>
    `;
    $(this).isdrag({ container: 'body'});
    this.innerHTML = component;
  }
  connectedCallback() {
    $(function () {
    });
    !$(this).attr('id') ?
      ($(this).attr('id', `cmd${Math.floor(Math.random() * 1000000)}`),
      $(this).find('header').prepend(`<span class="cmd_number">${$(this).attr('id')}</span>`))
      :
    '';
    $(this).attr('role', 'dialog');
    $(this).find('textarea').focus();
  }
}

customElements.define('run-cmd', ConsoleRun);
nk.ui.ConsoleRun = ConsoleRun;


class ModalWindow extends HTMLDialogElement {
  constructor() {
    super();
    const component = ``;
    $(this).attr({
      'class': 'modal_window',
      'open' : '',
    });
    this.innerHTML = component;
  }
}

customElements.define('modal-window', ModalWindow, { extends: 'dialog' });