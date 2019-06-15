
'use strict';

var navId = '#navbar-main',
    mobileViewport = 992;

$('.first-screen').firstScreen();
$(navId).navScroll();

// initilize owl carousels -> first screen/normal
var owlFirstScreen = $('#owl-first-screen');
var owlCarousel = $('.owl');

// on document ready calls
$(document).ready(function() {
    
    // youtube video initilization
    $('#youtube-video').YTPlayer({
        fitToBackground: true,
        videoId: $('#youtube-video').data('video-id'),
        events: {
            'onReady' : onPlayerReady
        }
    });

    function onPlayerReady() {
        var player = $('#youtube-video').data('ytPlayer').player;
        player.mute();
        $('#hero-video-sound').on('click', function(e){
            e.preventDefault;
            if(player.isMuted()) {
                $(this).removeClass('fa-volume-off').addClass('fa-volume-up');
                $(this).addClass('active');
                player.unMute();
            } else {
                $(this).removeClass('fa-volume-up').addClass('fa-volume-off');
                $(this).removeClass('active');
                player.mute();
            }            
        })


        var fraction = 0.75,
            youtube = $('#youtube-video'),
            youtubeHeight = youtube.height(),
            youtubeOffsetTop = youtube.offset().top;

        // pasue video on scroll
        $(window).on('scroll', function(){
            var windowScrollY = window.scrollY;
            if(windowScrollY > (youtubeHeight + youtubeOffsetTop) *fraction) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }          
        });



    }

    $('#hero-scroll').on('click', function(e){
        e.preventDefault();
        if($('#youtube-video').length) {
            $('#youtube-video').data('ytPlayer').player.pauseVideo();
        }

        var scrollPoint = $('#scroll-point').offset().top;
        if($(navId).hasClass('navbar-main-fixed') || ( $(navId).attr('data-action') && $(navId).attr('data-action').indexOf('sticky') >= 0 )) {
            scrollPoint = scrollPoint - $(navId).height();
        }

        $('html, body').animate({
            scrollTop: scrollPoint
        }, 500)
    })

    // responsive video
    $("body").fitVids();

    // owl carousel for full screen
    owlFirstScreen.owlCarousel({
        dotsContainer: '#hero-slider-nav .container .pull-right'
    });

    // normal owl carousel
    owlCarousel.owlCarousel({});

    // subscribe dialog
    setTimeout(function() {
        if ($('#subscribe-dialog').length) {
            $.magnificPopup.open({
                removalDelay: 500,
                items: {
                    src: '#subscribe-dialog'
                },
                type: 'inline',
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = 'mfp-zoom-in';
                    }
                }
            });
        }
    }, 3000);

});


// Product zoomer
$('#jqzoom').jqzoom({
    zoomType: 'standard',
    lens: true,
    preloadImages: false,
    alwaysOn: false,
    zoomWidth: 560,
    zoomHeight: 432,
    yOffset: 0,
    position: 'left'
});


// Product zoomer in lightbox
$('#jqzoom-lightbox').jqzoom({
    zoomType: 'standard',
    lens: true,
    preloadImages: false,
    alwaysOn: false,
    zoomWidth: 560,
    zoomHeight: 432,
    yOffset: 0,
    position: 'left'
});


// Countdown timer
$('#countdown').countdown('12/01/2016', function(event) {
    $(this).html(event.strftime('' + '<table>' + '<tr>' + '<th> %D </th>' + '<th> %H </th>' + '<th> %M </th>' + '<th> %S </th>' + '</tr>' + '<tr>' + '<td>Days</td>' + '<td>Hours</td>' + '<td>Minutes</td>' + '<td>Seconds</td>' + '</tr>' + '</table>'));
});

// Accordion carets
$('#accordion, #accordion-mobile')
.on('show.bs.collapse', function(e) {
    $(e.target).prev('.panel-heading').addClass('active');
})
.on('hide.bs.collapse', function(e) {
    $(e.target).prev('.panel-heading').removeClass('active');
});


// dropdowns
$('.nav-drop').dropit();

// bootstrap buttons
$('.btn').button();



// price slider
$("#price-slider-sidebar").ionRangeSlider({
    min: 130,
    max: 575,
    type: 'double',
    prefix: "$",
    prettify: false,
    hasGrid: false
});

$('#price-slider-tab').on('shown.bs.collapse', function() {
    $("#price-slider").ionRangeSlider({
        min: 130,
        max: 575,
        type: 'double',
        prefix: "$",
        prettify: false,
        hasGrid: false
    });
});

$('#price-slider-mob-tab').on('shown.bs.collapse', function() {
    $("#price-slider-mob").ionRangeSlider({
        min: 130,
        max: 575,
        type: 'double',
        prefix: "$",
        prettify: false,
        hasGrid: false
    });
});




// Lighbox gallery
$('#popup-gallery').each(function() {
    $(this).magnificPopup({
        delegate: 'a.popup-gallery-image',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
});

// Lighbox image
$('.popup-image').magnificPopup({
    type: 'image'
});

// Lighbox text
$('.popup-text').magnificPopup({
    removalDelay: 500,
    closeBtnInside: true,
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        }
    },
    midClick: true
});

// check if element in viewport
function isElinView (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

// lightbox with navigation padding
$('.popup-after-nav').magnificPopup({
    removalDelay: 500,
    closeBtnInside: true,
    callbacks: {
        beforeOpen: function() {
            this.st.mainClass = this.st.el.attr('data-effect');
        },
        open: function() {
            this.currItem.el.parent().addClass('active');
            var $navEl = $(navId),
                navHeight = $navEl.height(),
                navView = isElinView($(navId)),
                child = this.contentContainer.children();
            if(navView) {
                $navEl.css('z-index', '99999');
                child.css('top', navHeight);
            };
            if(child.hasClass('mfp-dialog-full') && navView) {
                // child.height($(window).height() - navHeight);
                child.css('max-height', $(window).height() - navHeight);
            }
        },
        beforeClose: function() {
            this.currItem.el.parent().removeClass('active');
            var $navEl = $(navId),
                child = this.contentContainer.children();
            $navEl.css('z-index', '');
            child.css('top', '');
            child.css('max-height', '');
        }
    },
    midClick: true
});


//  i Check plugin
$('.i-check, .i-radio').iCheck({
    checkboxClass: 'i-check',
    radioClass: 'i-radio'
});

// Item quantity control (shopping cart)
$(".cart-item-plus").on('click', function() {
    var currentVal = parseInt($(this).prev(".cart-quantity").val(), 10);

    if (!currentVal || currentVal == "" || currentVal == "NaN") currentVal = 0;

    $(this).prev(".cart-quantity").val(currentVal + 1);
});

$(".cart-item-minus").on('click', function() {
    var currentVal = parseInt($(this).next(".cart-quantity").val(), 10);
    if (currentVal == "NaN") currentVal = 0;
    if (currentVal > 0) {
        $(this).next(".cart-quantity").val(currentVal - 1);
    }
});

// Card form
$('.form-group-cc-number input').payment('formatCardNumber');
$('.form-group-cc-date input').payment('formatCardExpiry');
$('.form-group-cc-cvc input').payment('formatCardCVC');



// Register account on payment
$('#create-account-checkbox').on('ifChecked', function() {
    $('#create-account').removeClass('hide');
});

$('#create-account-checkbox').on('ifUnchecked', function() {
    $('#create-account').addClass('hide');
});

$('#shipping-address-checkbox').on('ifChecked', function() {
    $('#shipping-address').removeClass('hide');
});

$('#shipping-address-checkbox').on('ifUnchecked', function() {
    $('#shipping-address').addClass('hide');
});


$(window).on('load', function(){

    // sicky areas
    if($(window).width() > mobileViewport) {
        $('#sticky-side, #sticky-body').stick_in_parent({
             parent: '#sticky-parent',
             recalc_every: 1
        });

        $('#masonry, #masonry2').masonry({
            itemSelector: '.col-masonry',
            columnWidth: 1,
            percentPosition: true

        });


        $('#masonry-products').masonry({
            itemSelector: '.col-masonry'
        });
    }
})

// mobile category
if($(window).width() < mobileViewport) {
    if($('#category-mob-sidebar-btn').length && $('#category-sidebar').length) {
        $('#category-mob-sidebar-btn').on('click', function(e) {
            e.preventDefault();
            $('#category-sidebar').addClass('active');
            $('#category-mob-sidebar-cover').show();
            $('html, body').addClass('noscroll');
        });

        $('#category-mob-sidebar-cover').on('click', function(e){
            e.preventDefault();
            $('#category-sidebar').removeClass('active');
            $('html, body').removeClass('noscroll');
            $(this).hide();
        });

        $(window).on('scroll', function(){
            if(!isElinView($('#category-mob-sidebar-btn-wrapper')) && !isElinView($('#main-footer'))) {
                $('#category-mob-sidebar-btn').addClass('fixed');
            } else {
                $('#category-mob-sidebar-btn').removeClass('fixed');
            }
        });
    }
} 