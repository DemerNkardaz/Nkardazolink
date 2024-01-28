import * as $item from './variables.js';

function siteTitleOnLang() {

    var userLanguage = navigator.language || navigator.userLanguage;

    if (userLanguage.toLowerCase() === 'ru') {
        $item.siteTitle.text('Нкардазолинк');
    } else {
        $item.siteTitle.text('Nkardazolink');
    }
}
function headerInit() {
    $(':header').each(function () {
        const headerLevel = parseInt(this.tagName.substring(1));
        const baseSize = 1.75;
        const newSize = baseSize - (headerLevel - 1) * 0.15;
        $(this).css({ 'font-size': 'calc(' + newSize + 'em)' });
        $(this).addClass('headerDefault');
    });
}


$(document).ready(function () {
    headerInit();
    siteTitleOnLang();

    const color_gold_hover = $(':root').css('--color_gold_hover');


    $item.personFlexButton.on({
        mouseover: function () {
            $(this).find('.material-icons').css('color', color_gold_hover).css('transform', 'translate(-12px, -12px) rotate(-180deg)').css('text-shadow', '0 -1px 2px var(--shadow_half)');
        },
        mouseout: function () {
            $(this).find('.material-icons').removeAttr('style');
        }
    })

    $item.moreInfoBlock.hide();
    $item.settingsBlock.hide();

    $item.settingsOpt.parent().on('click', function () {
        $item.blockumInformatorum.toggleClass('opens-settings');
        $item.moreInfoBlock.hide();
        $item.settingsBlock.show('slow');

        if (!$item.blockumInformatorum.hasClass('active')) {
            $item.blockumInformatorum.addClass('active');
        } else if (!$item.blockumInformatorum.hasClass('opens-moreInfo')) {
            $item.blockumInformatorum.removeClass('active');
        }
        $item.blockumInformatorum.removeClass('opens-moreInfo');
    });

    $item.moreInfoOpt.parent().on('click', function () {
        $item.blockumInformatorum.toggleClass('opens-moreInfo');
        $item.settingsBlock.hide();
        $item.moreInfoBlock.show('slow');

        if (!$item.blockumInformatorum.hasClass('active')) {
            $item.blockumInformatorum.addClass('active');
        } else if (!$item.blockumInformatorum.hasClass('opens-settings')) {
            $item.blockumInformatorum.removeClass('active');
        }

        $item.blockumInformatorum.removeClass('opens-settings');
    });



})