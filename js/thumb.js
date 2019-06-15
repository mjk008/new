'use strict';

// thumbnails intercations
var shoppingCart = $('#shopping-cart'),
    shoppningCartCounter = $('#shopping-cart-counter'),
    shoppningCartCounterInt = parseInt(shoppningCartCounter.text(), 10),
    shoppingCartAmount = $('#shopping-cart-amount-num'),
    shoppingCartAmountInt = parseInt(shoppingCartAmount.text(), 10);

function addItemToCart(price) {
    shoppingCart.addClass('shopping-cart-adding-item');
    setTimeout(function() {
        shoppingCart.removeClass('shopping-cart-adding-item');
        shoppningCartCounterInt++
        shoppningCartCounter.html(shoppningCartCounterInt);
    }, 300);


    $({
        someValue: shoppingCartAmountInt
    }).animate({
        someValue: shoppingCartAmountInt += price
    }, {
        duration: 500,
        easing: 'swing',
        step: function() {
            shoppingCartAmount.text(Math.round(this.someValue));
        }
    });
}


function itemErr(item, errDialog) {
    errDialog.addClass('show');
    item.addClass('anim-shake');
    setTimeout(function() {
        errDialog.removeClass('show');
        item.removeClass('anim-shake');
    }, 1500);
}


function toCartNotification(thumb, title, price, size, color) {
    var stickyImg = '<img class="sticky-thumb-img" src="' + thumb + '"/>',
        stickyPreTitle = '<p class="sticky-pretitle">New item in cart</p>',
        stickyTitle = '<h5 class="sticky-title">' + title + '</h5>',
        stickyPrice = '<p class="sticky-price">$' + price + '</p>',
        stickySize = size ? '<li>Size: <b>' + size + '</b></li>' : '',
        stickyColor = color ? '<li>Color: <b>' + color + '</b></li>' : '',
        stickyDetails = '<ul class="sticky-details">' + stickySize + stickyColor + '</ul>',
        stickyContent = '<div class="sticky-content">' + stickyPreTitle + stickyTitle + stickyPrice + stickyDetails + '</div>';
    $.sticky(stickyImg + stickyContent);
}


function toWishlistNotification(thumb, title, price) {
    var stickyImg = '<img class="sticky-thumb-img" src="' + thumb + '"/>',
        stickyPreTitle = '<p class="sticky-pretitle">New item in wishlist</p>',
        stickyTitle = '<h5 class="sticky-title">' + title + '</h5>',
        stickyPrice = '<p class="sticky-price">$' + price + '</p>',
        stickyContent = '<div class="sticky-content">' + stickyPreTitle + stickyPrice + stickyTitle + '</div>';
    $.sticky(stickyImg + stickyContent);
}


$('.thumb').each(function() {
    var infoLink = $(this).find('.thumb-more-info-link');
    var self = $(this);
    var hrefArea = self.find('.thumb-link');
    var hideInfo = self.find('.thumb-info-block-hide');
    var selectSize = self.find('.thumb-select-sizes');
    var selectSizeItem = self.find('.thumb-select-sizes > .btn');
    var selectColor = self.find('.thumb-select-colors');
    var selectColorItem = self.find('.thumb-select-colors > .btn');
    var sizeErr = self.find('.thumb-error-size');
    var colorErr = self.find('.thumb-error-color');
    var toCartInfo = self.find('.thumb-info-block-tocart');
    var toWishlistInfo = self.find('.thumb-info-block-towishlist');
    var plus = self.find('.thumb-plus');
    var price = parseInt(self.attr('data-price'), 10);
    self.hover(
        function() {
            self.addClass('thumb-hover');
        },
        function() {
            self.removeClass('thumb-hover');
            self.removeClass('thumb-info-active');
        }
    )
    plus.on('click', function(e) {
        e.preventDefault();
        if (self.hasClass('thumb-info-active')) {
            self.removeClass('thumb-info-active');
        } else {
            self.addClass('thumb-info-active');
        }
    });
});


$('.product-item').each(function() {
    var self = $(this);
    var selectSize = self.find('.product-select-sizes');
    var selectSizeItem = self.find('.product-select-sizes > .btn');
    var selectColor = self.find('.product-select-colors');
    var selectColorItem = self.find('.product-select-colors > .btn');
    var sizeErr = self.find('.product-error-size');
    var colorErr = self.find('.product-error-color');
    var toCart = self.find('.product-tocart');
    var toWishlistInfo = self.find('.product-towishlist');
    var price = parseInt(self.attr('data-price'), 10);

    selectSizeItem.on('click', function(e) {
        e.preventDefault();
        $(this).parent().addClass('active');
        self.attr('data-size', $(this).text());
    });
    selectColorItem.on('click', function(e) {
        e.preventDefault();
        $(this).parent().addClass('active');
        self.attr('data-color', $(this).attr('data-color-name'));
    });
    toCart.on('click', function(e) {
        e.preventDefault();
        if (selectSize.length && !selectSize.hasClass('active')) {
            itemErr(selectSize, sizeErr);
        } else if (selectColor.length && !selectColor.hasClass('active')) {
            itemErr(selectColor, colorErr);
        } else {
            addItemToCart(price);
            toCartNotification(self.attr('data-notify-thumb'), self.attr('data-title'), self.attr('data-price'), self.attr('data-size'), self.attr('data-color'));
        }
    });

    toWishlistInfo.on('click', function(e) {
        e.preventDefault();
        toWishlistNotification(self.attr('data-notify-thumb'), self.attr('data-title'), self.attr('data-price'));
    });

});