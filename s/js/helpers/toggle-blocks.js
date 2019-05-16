var showBlock = function(button, block) {
	block.removeClass('minimized');
	if(button) {
		button.addClass('active');
	};
	block.trigger('showBlock');
};
var hideBlock = function(button, block) {
	block.addClass('minimized');
	if(button) {
		button.removeClass('active');
	};
	block.trigger('hideBlock');
};
var toggleBlock = function(button, block) {
	block.toggleClass('minimized');

	if (block.hasClass('minimized')) {
		if(button) {
			button.removeClass('active');
		};
		block.trigger('hideBlock');
	} else {
		if(button) {
			button.addClass('active');
		};
		block.trigger('showBlock');
	};
};

// show/hide/toggle blocks
$('.button-toggle').on('click', function(e) {
	var button = $(this),
		block = $(button.attr('data-target-block'));

	toggleBlock(button, block);
	e.preventDefault();
});
$('.button-show').on('click', function(e) {
	var button = $(this),
		block = $(button.attr('data-target-block'));

	showBlock(button, block);
	e.preventDefault();
});
$('.button-hide').on('click', function(e) {
	var button = $(this),
		block = $(button.attr('data-target-block'));

	hideBlock(button, block);
	e.preventDefault();
});