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
    $item.moreInfoBlock.hide();
    $item.settingsBlock.hide();
    $item.lightBoxContainer.hide();
    $item.selectedPictureSpecials.hide();
    $item.selectedPicturePDFVersion.hide();
    $item.selectedYouTubeVideo.hide();
    $item.scrollControlsParent.hide();
    $item.selectedPictureYouTubeVideo.hide();
    $item.personInformationBlock.show();
    $item.personLinksBlock.show();
    siteTitleOnLang();

    const color_gold_hover = $(':root').css('--color_gold_hover');

    $item.linkBlock.each(function () {
        var bgUrl = $(this).data('bg');
        var bgSz = $(this).data('bg-size');
        var bgPos = $(this).data('bg-pos');
        var arrBlend = $(this).data('arrow-blend');
        var avatar = $(this).data('avatar');
        var avatar_tooltip = $(this).data('avatar-tooltip');
        var avatar_tooltip_pos = $(this).data('avatar-tooltip-pos');
        var avatar_tooltip_title = $(this).data('avatar-tooltip-title');
        var avatar_tooltip_key = $(this).data('avatar-tooltip-title-key');
        var title = $(this).data('title');
        var titleKey = $(this).data('title-key');
        var types = $(this).data('types');
        var site = $(this).data('site');
        var site_scale = $(this).data('site-scale');
        var site_pos = $(this).data('site-pos');
        var textPlate = $(this).data('text');

        $(this).css('--background-url', bgUrl);
        $(this).css('--background-size', bgSz || 'cover');
        $(this).css('--background-pos', bgPos || 'center center');
        $(this).css('--arrow-blend', arrBlend || 'color-burn');

        if (avatar) {
            var tooltip = avatar_tooltip ? 'data-bs-toggle="' + avatar_tooltip + '"' : '';
            var tooltipPos = avatar_tooltip_pos ? 'data-bs-placement="' + avatar_tooltip_pos + '"' : '';
            var tooltipTitle = avatar_tooltip_title ? 'title="' + avatar_tooltip_title + '"' : '';
            var tooltipTitleKey = avatar_tooltip_key ? 'data-key="' + avatar_tooltip_key + '"' : '';

            $(this).append('<img loading="eager" class="linkAvatarImage" src="' + avatar + '" ' + tooltip + ' ' + tooltipPos + ' ' + tooltipTitle + ' ' + tooltipTitleKey + '>');

        }
        if (title) {
            var titleKeyCheck = titleKey ? 'data-key="' + titleKey + '"' : '';
            $(this).append('<h3 class="linkTitle" ' + titleKeyCheck + '>' + title + '</h3>');
        }
        if (types) {
            var svgIcons = {
                artwork: 'resources/svg/icos/art_alt.svg',
                modeling: 'resources/svg/icos/3d.svg',
                layout: 'resources/svg/icos/book_alt.svg',
                github: 'resources/svg/icos/github.svg',
                writing: 'resources/svg/icos/scorpio_pen.svg',
                mods: 'resources/svg/icos/mods.svg'
            };
            $(this).append('<span class="linkTypes"></span>');

            var typesArray = types.split(', ');
            typesArray.forEach(type => {
                if (svgIcons[type]) {
                    $(this).find('.linkTypes').append('<span class="linkType"><img src="' + svgIcons[type] + '" width="20px" loading="eager"></span>');
                }
            });
        }
        if (site) {
            $(this).append('<span class="linkSiteParent"><img src="' + site + '" width="' + (site_scale || '70px') + '"></span>');
            if (site_pos) {
                var positions = site_pos.split(', ');
                $(this).find('.linkSiteParent').css('--pos-bottom', positions[0] || '5px');
                $(this).find('.linkSiteParent').css('--pos-right', positions[1] || '5px');
            }
        }
        if (textPlate) {
            $(this).append('<p class="linkTextPlate">' + textPlate + '</p>');
        }
        $item.linkBlock.each(function () {
            var $this = $(this);
            $this.find('img[data-bs-toggle="tooltip"]').tooltip({ container: $this });
        })

    });
    $item.linkBlock.on({
        mouseover: function () {
            $(this).css('transform', 'translate3d(0px, -15px, 0px)');
            $(this).find('.linkType').addClass('active');
        },
        mouseout: function () {
            $(this).css('transform', 'translate3d(0px, 0px, 0px)');
            $(this).find('.linkType').removeClass('active');
        }
    });

    $item.scrollControls.on('click', function () {
        var scrollDirection = $(this).data('scroll');
        var linksSet = $(this).closest('.scrollControlsParent').next('.linksSet');

        if (scrollDirection === 'up') {
            linksSet.animate({ scrollTop: '-=168.5px' }, 'fast');
        } else if (scrollDirection === 'down') {
            linksSet.animate({ scrollTop: '+=168.5px' }, 'fast');
        }
    });

    $item.scrollControlsParent.each(function () {
        var $this = $(this);
        var linksSet = $(this).siblings('.linksSet');
        if (linksSet[0].scrollHeight > linksSet[0].clientHeight) {
            $this.show();
        } else {
            $this.hide();
        }
    })




    $item.personFlexButton.on({
        mouseover: function () {
            $(this).find('.material-icons').css('color', color_gold_hover).css('transform', 'translate(-12px, -12px) rotate(-180deg)').css('text-shadow', '0 -1px 2px var(--shadow_half)');
        },
        mouseout: function () {
            $(this).find('.material-icons').removeAttr('style');
        }
    })



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


    var image_view_aspect_w;
    var image_view_aspect_h;
    var $imgSelectedGall;
    var $imgIsSVG = '';
    var ytfUrl = $item.selectedPictureYouTubeVideo.attr('data-youtube');
    $item.gallery_trigger.on('click', function (e) {
        e.preventDefault();
        var progressBar = $('#progressEntityDummy').clone().removeAttr('id').show();
        var fullresUrl = $(this).data('fullres') || $(this).data('src') || $(this).attr('src');
        var pdfUrl = $(this).data('pdf');
        var ytUrl = $(this).data('youtube');
        var maxres = $(this).data('maxres');
        var currentYt = $item.selectedYouTubeVideo.attr('src');
        var currentImage = $item.selectedGalleryPicture.attr('src');

        $item.selectedYouTubeVideo.hide();
        $item.selectedYouTubeVideo.removeAttr('src');
        if (ytfUrl !== currentYt) { $item.selectedYouTubeVideo.attr('src', ytfUrl); }

        if (ytUrl || pdfUrl || maxres) {
            $item.selectedPictureSpecials.show('slow');
            if (ytUrl) {
                $item.selectedPicturePDFVersion.hide('slow');
                $item.selectedPictureMAXRES.hide('slow');
                $item.selectedPictureYouTubeVideo.show('slow');
                $item.selectedPictureYouTubeVideo.attr('data-youtube', ytUrl);
            } else if (pdfUrl) {
                $item.selectedPictureYouTubeVideo.hide('slow');
                $item.selectedPictureMAXRES.hide('slow');
                $item.selectedPicturePDFVersion.show('slow');
                $item.selectedPicturePDFVersion.attr('data-pdf', pdfUrl);
            } else if (maxres) {
                $item.selectedPictureYouTubeVideo.hide('slow');
                $item.selectedPicturePDFVersion.hide('slow');
                $item.selectedPictureMAXRES.show('slow');
            }
        } else {
            $item.selectedPictureSpecials.hide('slow');
        }
        if (!$item.selectedGalleryPicture.is(':visible')) {
            $item.selectedGalleryPicture.fadeIn('fast');
        }

        if (fullresUrl !== currentImage) {
            $item.selectedGalleryPicture.hide();
            $item.lightBoxContainer.append(progressBar);
            $item.selectedGalleryPicture.removeAttr('src');

            var img = new Image();
            img.onload = function () {
                progressBar.fadeOut('fast', function () {
                    $(this).remove();
                });
            };
            img.src = fullresUrl;

            $item.selectedGalleryPicture.fadeOut('fast', function () {
                var $this = $(this);
                $this.attr('src', fullresUrl);


                /*if ($this.attr('src').includes('svg')) {
                    $this.parent().parent().css('width', '100%');
                    $this.parent().css('width', '100%');
                } else {
                    $this.parent().css('width', 'auto');
                    $this.parent().parent().css('width', 'auto');
                }*/
                /*image_view_aspect_w = $item.selectedGalleryPicture[0].naturalWidth;
                image_view_aspect_h = $item.selectedGalleryPicture[0].naturalHeight;*/
                $imgSelectedGall = $item.selectedGalleryPicture;
                $imgSelectedGall.on('load', function () {
                    image_view_aspect_w = this.naturalWidth;
                    image_view_aspect_h = this.naturalHeight;
                    $item.selectedPictureParent.css('aspect-ratio', image_view_aspect_w / image_view_aspect_h);
                    if ($this.attr('src').includes('svg')) {
                        $imgIsSVG = '<span data-key="Vector">[вектор]</span>';
                    } else {
                        $imgIsSVG = '';
                    }
                    $item.selectedPictureMetas.html(image_view_aspect_w + '&ensp;×&ensp;' + image_view_aspect_h + '&ensp;' + $imgIsSVG);
                    $this.fadeIn('slow');
                });

            });


            var title = $(this).find($item.gallery_title).text();
            $item.selectedGalleryTitle.text(title);
        }



        if (!$item.lightBoxContainer.is(':visible')) {
            $item.lightBoxContainer.show('slow');
            $item.personLinksBlock.hide('slow');
        }


        $item.selectedGalleryPicture.on('load', function () {
            $item.selectedPictureParent.css('aspect-ratio', image_view_aspect_w / image_view_aspect_h);
        });
        if ($item.selectedPictureParent.css('aspect-ratio') !== (image_view_aspect_w / image_view_aspect_h).toString()) {
            $item.selectedPictureParent.css('aspect-ratio', image_view_aspect_w / image_view_aspect_h);
        }
    });



    $item.lightBoxGalleryCloseBtn.on('click', function () {
        $item.lightBoxContainer.hide('slow');
        $item.personLinksBlock.show('slow');
    })

    var lastZoomX;
    var lastZoomY;
    $item.selectedGalleryPicture.on('click', function (e) {
        var $selectedGalleryPicture = $item.selectedGalleryPicture;
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;

        var naturalWidth = $selectedGalleryPicture[0].naturalWidth;
        var naturalHeight = $selectedGalleryPicture[0].naturalHeight;

        var zoomFactorY = naturalWidth / $selectedGalleryPicture.width();
        var zoomFactorX = naturalHeight / $selectedGalleryPicture.height();

        var originX = (mouseX / $selectedGalleryPicture.width()) * 100 + '%';
        var originY = (mouseY / $selectedGalleryPicture.height()) * 100 + '%';

        if ($item.selectedPictureParent.hasClass('zoomed')) {
            $selectedGalleryPicture.css({
                'transform': 'none',
                'transform-origin': lastZoomX + ' ' + lastZoomY
            });
        } else {
            $selectedGalleryPicture.css({
                'transform': 'scale(' + zoomFactorX + ', ' + zoomFactorY + ')',
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
    });

    $item.selectedPictureMAXRES.on('click', function () {
        var progressBar = $('#progressEntityDummy').clone().removeAttr('id').show();
        var imgSrc = $item.selectedGalleryPicture.attr('src');
        var isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        var hightResURL = imgSrc.replace(/(\.\w+)$/, '_maxres$1');

        if (!isLocalhost) {
            hightResURL = hightResURL.replace('resources/', 'https://media.githubusercontent.com/media/DemerNkardaz/Nkardazolink/main/resources/');
        }
        var currentImage = $item.selectedGalleryPicture.attr('src');
        if (hightResURL !== currentImage && !imgSrc.includes('_maxres')) {
            $item.selectedGalleryPicture.hide();
            $item.lightBoxContainer.append(progressBar);
            $item.selectedGalleryPicture.removeAttr('src');

            var img = new Image();
            img.onload = function () {
                progressBar.fadeOut('fast', function () {
                    $(this).remove();
                });
            };
            img.src = hightResURL;

            $item.selectedGalleryPicture.fadeOut('fast', function () {
                var $this = $(this);
                $this.attr('src', hightResURL);
                $this.on('load', function () {
                    $this.fadeIn('slow');
                });
            });
        }
    });


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
            $item.selectedPictureParent.css('aspect-ratio', '16 / 9');
            $item.selectedYouTubeVideo.show('slow');
        } else {
            $item.selectedYouTubeVideo.hide();
            $item.selectedYouTubeVideo.removeAttr('src');

            $item.selectedPictureParent.css('aspect-ratio', image_view_aspect_w / image_view_aspect_h);

            if (ytfUrl !== currentYt) { $item.selectedYouTubeVideo.attr('src', ytfUrl); }
            $item.selectedGalleryPicture.fadeIn('fast');
        }

    })


})