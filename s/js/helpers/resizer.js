// window.cust = window.cust ? window.cust : {};
var breakPoint = false,
	bp_XX      = 480,
	bp_XS      = 768,
	bp_SM      = 992,
	bp_MD      = 1200,
	body       = $('body');

$(window).on('load', function(){resizer();});
$(window).on('resize', function(){resizer();});

function resizer(){
	var ww = window.innerWidth;
	// var ww = body.outerWidth();
	if (ww < bp_XX) {windowXX();};
	if (ww >= bp_XX && ww < bp_XS) {windowXS();};
	if (ww >= bp_XS && ww < bp_SM) {windowSM();};
	if (ww >= bp_SM && ww < bp_MD) {windowMD();};
	if (ww >= bp_MD) {windowLG();};
};

function windowXX(){
	if (breakPoint != 'xx') {
		breakPoint = 'xx';
		body.trigger('resize_xx_once');
	};
	body.trigger('resize_xx');
};

function windowXS(){
	if (breakPoint != 'xs') {
		breakPoint = 'xs';
		body.trigger('resize_xs_once');
	};
	body.trigger('resize_xs');
};

function windowSM(){
	if (breakPoint != 'sm') {
		breakPoint = 'sm';
		body.trigger('resize_sm_once');
	};
	body.trigger('resize_sm');
};

function windowMD(){
	if (breakPoint != 'md') {
		breakPoint = 'md';
		body.trigger('resize_md_once');
	};
	body.trigger('resize_md');
};

function windowLG(){
	if (breakPoint != 'lg') {
		breakPoint = 'lg';
		body.trigger('resize_lg_once');
	};
	body.trigger('resize_lg');
};
resizer();