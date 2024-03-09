class nobreak extends HTMLElement {
  constructor() {
    super();
  }

}

customElements.define('no-br', nobreak);


class overnote extends HTMLSpanElement {
  constructor() {
    super();

    $(this).attr({
      'role': 'term',
      'tooltip_key': `${this.getAttribute('key')}`,
      'tooltip_pos': 'top',
    }).addClass('text-underline line_dottes line_grey underline-offset-2 question').removeAttr('key');
  }

}

customElements.define('over-note', overnote, { extends: 'span' })


class charname extends HTMLSpanElement {
  constructor() {
    super();
  }

}

customElements.define('char-name', charname, { extends: 'span' })