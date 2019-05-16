window.cust = window.cust ? window.cust : {};
var $body = $('body'),
	$html = $('html');
$('.modal').on('show.bs.modal', function () {
	$body.addClass('modal-open');
	if( is_scroll() ) {
		if (!$html.hasClass('msie10') && !$html.hasClass('msie11') && !$html.hasClass('ie10') && !$html.hasClass('ie11') ) {
			$body.css('padding-right', getScrollBarWidth());
		};
	};
	window.cust.modal_show_process = true;
	$('.modal').not($(this)).modal('hide');
});
$('.modal').on('shown.bs.modal', function () {
	window.cust.modal_show_process = false;
});
$('.modal').on('hidden.bs.modal', function () {
	if ( !window.cust.modal_show_process ) {
		$body.removeClass('modal-open');
		$body.css('padding-right', 0);
	};
});