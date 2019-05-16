var $window = $(window);
    window.cust = window.cust ? window.cust : {};

// get window width && height
var gW  = $window.outerWidth(true),
    gH  = $window.outerHeight(true);

$window.on('resize', function(){
    gIw = $window.innerWidth(true);
    gIh = $window.innerHeight(true);
});

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function detectBrowser() {
    // function for detect browser and add it to html tag
	var ua = window.navigator.userAgent,
		html = $('html');

	if (ua.indexOf('MSIE ') > 0) {
		html.addClass('msie msie' + parseInt(ua.substring(ua.indexOf('MSIE ') + 5, ua.indexOf('.', ua.indexOf('MSIE '))), 10));
	};
	if (ua.indexOf('Trident/') > 0) {
		html.addClass('ie ie' + parseInt(ua.substring(ua.indexOf('rv:') + 3, ua.indexOf('.', ua.indexOf('rv:'))), 10));
	};
	if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) || (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))) {
		html.addClass('ios');
	};
	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		html.addClass('edge');
	};
	if (ua.toLowerCase().indexOf('safari') != -1) { 
		if (ua.toLowerCase().indexOf('chrome') > -1) {
			html.addClass('chrome');
		} else {
			html.addClass('safari');
		}
	}
};
detectBrowser();

function getScrollBarWidth() {
	var inner          = document.createElement('p');
	inner.style.height = "200px";
	inner.style.width  = "100%";

	var outer              = document.createElement('div');
	outer.style.visibility = "hidden";
	outer.style.position   = "absolute";
	outer.style.overflow   = "hidden";
	outer.style.height     = "150px";
	outer.style.width      = "200px";
	outer.style.left       = "0px";
	outer.style.top        = "0px";

	outer.appendChild(inner);
	document.body.appendChild(outer);

	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';

	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;

	document.body.removeChild(outer);

	return w1 - w2; // scroll width
};
getScrollBarWidth();

function is_scroll(){
	// if window has scroll
	return $(document).height() > $(window).height();
};