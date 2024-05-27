class GallerySearcher extends HTMLElement {
  constructor(type) {
    super();

    const component = `
    <input nk-prop-search="${type}" type="text" data-key="inputs.${type}_search" placeholder="${nk.locale.get(`inputs.${type}_search`)}">
    <button type="button"><span>X</span></button>
    `;

    this.innerHTML = component;
  }
}

customElements.define('gallery-searcher', GallerySearcher);
nk.ui.GallerySearcher = GallerySearcher;


$(document).on('input', '[nk-prop-search]', function () {
  $(this).val().length > 0 ? $(this).siblings('button').addClass('active') : $(this).siblings('button').removeClass('active');
});

$(document).on('click', 'gallery-searcher button', function () {
  $(this).siblings('[nk-prop-search]').val('').trigger('input');
});