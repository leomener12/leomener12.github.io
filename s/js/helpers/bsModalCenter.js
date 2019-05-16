function bsModalCenter(modal) {
	modal.css('display', 'block');
	var $dialog  = modal.find(".modal-dialog").not('.dialog_gallery'),
	offset       = Math.floor(($(window).height() - $dialog.height()) / 2),
	bottomMargin = parseInt($dialog.css('marginBottom'), 10);

	// Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
	if(offset < bottomMargin) offset = bottomMargin;
	$dialog.css("margin-top", offset);
}

$(document).on('show.bs.modal', '.modal_centered', function(){
	$(this).each(function() {
		bsModalCenter($(this));
	});
});

$(window).on("resize", function () {
	$('.modal_centered:visible').each(function() {
		bsModalCenter($(this));
	});
});