/* marcon 

const diaciritc_classes = {
  'macron': 'd-mac',
  'circumflex': 'd-cir',
  'caron': 'd-car',
  'tilda': 'd-til',
  'breve': 'd-bre',
  'diaeresis': 'd-dia',
  'dot': 'd-dot',
  'cedilla': 'd-ced'
};


(function() {
  for (const [key, value] of Object.entries(diaciritc_classes)) {
    class CustomElement extends HTMLElement {
      constructor() {
        super();
        key !== 'cedilla' ?
          (
            $(this).addClass('diacritic_upper')
          )
          :
          $(this).addClass('diacritic_lower');
      }

      connectedCallback() {
        if ($(this).text().length === 1 && $(this).text() === $(this).text().toUpperCase()) {
          $(this).addClass('upcase');
        }
      }

    }
    customElements.define(value, CustomElement);
  }
})();
*/