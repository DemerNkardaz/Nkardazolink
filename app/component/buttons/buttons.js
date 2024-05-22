nk.ui.buttons = {};
nk.ui.buttons.inline = function (text) { return `<button type="button" class="button-inline" aria-label="${text}">${text}</button>`; }
nk.ui.buttons.close = function () { return `<button type="button" class="button-close material-icons" title="${nk.locale.get('buttonLabels.close')}" title-key="buttonLabels.close">close</button>`; }


$(document).on('click', '.button-close', function () {
  const parent = $(this).closestParent('[data-close-action]');
  parent.hide('slow');
  setTimeout(() => parent.remove(), 300);
});