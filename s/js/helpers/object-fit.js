var objectfit = function(){

    $('.h-object-fit').each(function() {
        var $container = $(this),
            imgUrl     = $container.find('img').prop('src');

        if (imgUrl) {
            $container
                .css('background-image', 'url(' + imgUrl + ')')
                .addClass('is-fited');
        };
    });
};
if (Modernizr.objectfit === false) {
    objectfit();
};