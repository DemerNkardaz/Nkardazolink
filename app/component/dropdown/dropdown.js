class DropdownElement extends HTMLElement {
  constructor({ content, id, pos, key } = {}) {
    super();
      const component = `
      <div class="dropdown-content"${key ? ` data-key="${key}"` : ''}>
        ${content ? content : ''}
      </div>
      `;
      $(this).attr({'id': id ? id : null, 'data-dropdown-pos': pos ? pos : 'bottom'}).timedClass('hide');
      $(this).html(component)
  }
}

customElements.define('drop-down', DropdownElement);
nk.ui.DropdownElement = DropdownElement;


nk.ui.dropdownHeader = function (text, type) {
  return `<div class="dropdown-header">${type ? `<span class="material-icons">${type}</span>&ensp;` : ''}${text}</div><hr class="w-100 mt-1 mb-3">`
}

function dropdownOperations(target) {
  const dropId = $(target).attr('data-dropdown-id');
  const pos = $(target).attr('data-dropdown-pos');
  const dropdown = $(`drop-down[id="${dropId}"]`);
  const key = $(target).attr('data-dropdown-key');
  const uniqId = randomId('dropdown', 'weak');
  const parent = $(target).parent();
  if (!dropdown.length) {
    console.log(`Dropdown ${key} not found`);
    parent.append(new nk.ui.DropdownElement({ content: nk.locale.get(`${key}`), key: key, id: uniqId, pos: pos ? pos : 'bottom' }));
    $(target).attr('data-dropdown-id', uniqId);
  } else {
    dropdown.addClass('hide');
    setTimeout(() => dropdown.remove(), 300);
    $(target).removeAttr('data-dropdown-id');
  }
}

$(document).on('click', '[data-dropdown-key]', function () {
  dropdownOperations(this);
});

$(document).on('click', function (e) {
  const dropdown = $(e.target).closest('drop-down').length > 0;
  const dropdownOwner = $(e.target).attr('data-dropdown-id') || $(e.target).closest('[data-dropdown-id]').length > 0;
  const dropdownOwnerParent = $(e.target).children('[data-dropdown-id]').length > 0;
  const dropdownOwnerSiblings = $(e.target).siblings('[data-dropdown-id]').length > 0 || $(e.target).parent().siblings('[data-dropdown-id]').length > 0;

  if (!dropdown && !dropdownOwner && !dropdownOwnerParent && !dropdownOwnerSiblings) {
    $('drop-down').addClass('hide');
    setTimeout(() => {
      $('drop-down').remove();
    }, 300);
    $('[data-dropdown-id]').removeAttr('data-dropdown-id');
  }
});