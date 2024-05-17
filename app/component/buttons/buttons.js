nk.ui.buttons = {};
nk.ui.buttons.inline = function (text) { return `<button class="button-inline">${text}</button>`; }
nk.ui.buttons.close = function () { return `<button class="button-close material-icons">close</button>`; }


$(document).on('click', '.button-close', function () {
  const parent = $(this).closestParent('[data-close-action]');
  parent.hide('slow');
  setTimeout(() => parent.remove(), 300);
});