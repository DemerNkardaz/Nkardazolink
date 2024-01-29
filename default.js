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
    $item.selectedPictureSpecials.hide();
    $item.selectedPicturePDFVersion.hide();
    $item.selectedYouTubeVideo.hide();
    $item.selectedPictureYouTubeVideo.hide();
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



    var ytfUrl = $item.selectedPictureYouTubeVideo.attr('data-youtube');
    $item.gallery_trigger.on('click', function (e) {
        e.preventDefault();
        var progressBar = $('#progressEntityDummy').clone().removeAttr('id').show();
        var fullresUrl = $(this).data('fullres') || $(this).data('src') || $(this).attr('src');
        var pdfUrl = $(this).data('pdf');
        var ytUrl = $(this).data('youtube');
        var currentYt = $item.selectedYouTubeVideo.attr('src');
        var currentImage = $item.selectedGalleryPicture.attr('src');

        $item.selectedYouTubeVideo.hide();
        $item.selectedYouTubeVideo.removeAttr('src');
        if (ytfUrl !== currentYt) { $item.selectedYouTubeVideo.attr('src', ytfUrl); }

        if (ytUrl || pdfUrl) {
            $item.selectedPictureSpecials.show('slow');
            if (ytUrl) {
                $item.selectedPicturePDFVersion.hide('slow');
                $item.selectedPictureYouTubeVideo.show('slow');
                $item.selectedPictureYouTubeVideo.attr('data-youtube', ytUrl);
            } else if (pdfUrl) {
                $item.selectedPictureYouTubeVideo.hide('slow');
                $item.selectedPicturePDFVersion.show('slow');
                $item.selectedPicturePDFVersion.attr('data-pdf', pdfUrl);
            }
        } else {
            $item.selectedPictureSpecials.hide('slow');
        }


        if (fullresUrl !== currentImage) {
            $item.selectedPictureParent.append(progressBar);
            $item.selectedGalleryPicture.removeAttr('src');

            var img = new Image();
            img.onload = function () {
                progressBar.fadeOut('fast', function () {
                    $(this).remove();
                });
            };
            img.src = fullresUrl;

            $item.selectedGalleryPicture.fadeOut('fast', function () {
                $(this).attr('src', fullresUrl).fadeIn('fast');
            });

            var title = $(this).find($item.gallery_title).text();
            $item.selectedGalleryTitle.text(title);
        }

        if (!$item.selectedGalleryPicture.is(':visible')) {
            $item.selectedGalleryPicture.show('slow');
        }

        if (!$item.lightBoxContainer.is(':visible')) {
            $item.lightBoxContainer.show('slow');
            $item.personLinksBlock.hide('slow');
        }
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
        var mouseWhellZoomFactor = 0.2;
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

    $item.galleryThumbnail.on('click', function () {
        var $this = $(this);
        $this.addClass('clicked');
        $this.addClass('bright');
        setTimeout(function () {
            $this.removeClass('clicked');
        }, 100);
        setTimeout(function () {
            $this.removeClass('bright');
        }, 200);
    });

    $item.personAvatarImg.on('click', function () {
        var $this = $(this);
        $this.addClass('clicked');
        $this.addClass('bright');
        setTimeout(function () {
            $this.removeClass('clicked');
        }, 100);
        setTimeout(function () {
            $this.removeClass('bright');
        }, 200);
    });

    $item.personBannerImg.on('click', function () {
        var $this = $(this);
        $this.addClass('clicked');
        setTimeout(function () {
            $this.removeClass('clicked');
        }, 200);
    });


    $item.selectedPictureDownload.on('click', function () {
        var imageUrl = $('#selectedGalleryPicture').attr('src');
        var downloadLink = document.createElement('a');
        var originalFileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        downloadLink.href = imageUrl;
        downloadLink.download = originalFileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });


    $item.selectedPictureFullscreen.on('click', function () {
        var imageElement = $('#selectedGalleryPicture')[0];
        if (imageElement.requestFullscreen) {
            imageElement.requestFullscreen();
        } else if (imageElement.mozRequestFullScreen) {
            imageElement.mozRequestFullScreen();
        } else if (imageElement.webkitRequestFullscreen) {
            imageElement.webkitRequestFullscreen();
        }
    });

    $item.selectedPictureBlankPage.on('click', function () {
        var imageUrl = $('#selectedGalleryPicture').attr('src');
        window.open(imageUrl, '_blank');
    });

    $item.selectedPicturePDFVersion.on('click', function () {
        var pdfUrl = $(this).attr('data-pdf');
        window.open(pdfUrl, '_blank');
    })

    var player;
    function onYouTubePlayerAPIReady() { player = new YT.Player($item.selectedYouTubeVideo); }

    $item.selectedPictureYouTubeVideo.on('click', function () {
        var ytfUrl = $(this).attr('data-youtube');
        var currentYt = $item.selectedYouTubeVideo.attr('src');

        if (ytfUrl !== currentYt) {
            $item.selectedYouTubeVideo.attr('src', ytfUrl);
        }

        if (!$item.selectedYouTubeVideo.is(':visible')) {
            $item.selectedGalleryPicture.hide();
            $item.selectedYouTubeVideo.show('slow');
        } else {
            $item.selectedYouTubeVideo.hide();
            $item.selectedYouTubeVideo.removeAttr('src');
            if (ytfUrl !== currentYt) { $item.selectedYouTubeVideo.attr('src', ytfUrl); }
            $item.selectedGalleryPicture.show('slow');
        }

    })




})