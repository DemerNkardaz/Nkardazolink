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
    $item.lightBoxContainer.hide();
    $item.personInformationBlock.show();
    $item.personLinksBlock.show();

    $item.settingsOpt.parent().on('click', function () {
        $item.blockumInformatorum.toggleClass('opens-settings');
        $item.moreInfoBlock.hide();
        $item.settingsBlock.show('slow');
        $item.personInformationBlock.hide('slow');

        if (!$item.blockumInformatorum.hasClass('active')) {
            $item.blockumInformatorum.addClass('active');
        } else if (!$item.blockumInformatorum.hasClass('opens-moreInfo')) {
            $item.blockumInformatorum.removeClass('active');
            $item.settingsBlock.hide('slow');
            $item.personInformationBlock.show('slow');
        }
        $item.blockumInformatorum.removeClass('opens-moreInfo');
    });

    $item.moreInfoOpt.parent().on('click', function () {
        $item.blockumInformatorum.toggleClass('opens-moreInfo');
        $item.settingsBlock.hide();
        $item.moreInfoBlock.show('slow');
        $item.personInformationBlock.hide('slow');

        if (!$item.blockumInformatorum.hasClass('active')) {
            $item.blockumInformatorum.addClass('active');
        } else if (!$item.blockumInformatorum.hasClass('opens-settings')) {
            $item.blockumInformatorum.removeClass('active');
            $item.moreInfoBlock.hide('slow');
            $item.personInformationBlock.show('slow');
        }

        $item.blockumInformatorum.removeClass('opens-settings');
    });



    $item.gallery_trigger.on('click', function (e) {
        e.preventDefault();
        var fullresUrl = $(this).data('fullres') || $(this).data('src') || $(this).attr('src');
        var title = $(this).find($item.gallery_title).text();
        $item.selectedGalleryPicture.attr('src', fullresUrl);
        $item.selectedGalleryTitle.text(title);
        $item.lightBoxContainer.show('slow');
        $item.personLinksBlock.hide('slow');
    });

    $item.lightBoxGalleryCloseBtn.on('click', function () {
        $item.lightBoxContainer.hide('slow');
        $item.personLinksBlock.show('slow');
    })

    var lastZoomX;
    var lastZoomY;
    $item.selectedPictureParent.on('click', function (e) {
        var $selectedGalleryPicture = $item.selectedGalleryPicture;
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;

        var zoomFactor = 3;
        var originX = (mouseX / $(this).width()) * 100 + '%';
        var originY = (mouseY / $(this).height()) * 100 + '%';



        if ($item.selectedPictureParent.hasClass('zoomed')) {
            $selectedGalleryPicture.css({
                'transform': 'none',
                'transform-origin': lastZoomX + ' ' + lastZoomY
            });
        } else {
            $selectedGalleryPicture.css({
                'transform': 'scale(' + zoomFactor + ')',
                'transform-origin': originX + ' ' + originY
            });
            lastZoomX = originX;
            lastZoomY = originY;
        }
        $item.selectedPictureParent.toggleClass('zoomed');
    });


})