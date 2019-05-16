window.cust = window.cust ? window.cust : {};
var body = $('body');

window.cust.reset_columns = function (row){
	row.children().css({
		'height':'inherit'
	});
};

window.cust.update_columns_calc = function (row, cols_in_row){
	window.cust.reset_columns(row);
	items = row.children();
	if (cols_in_row > 1) {
		for (var i = 0; i < items.length; i+=cols_in_row) {
			var max_height = 0;
			for (var j = 0; j < cols_in_row; j++) {
				if ($(items[j+i]).outerHeight() > max_height) {
					max_height = $(items[j+i]).outerHeight();
				}
			};
			for (var j = 0; j < cols_in_row; j++) {
				$(items[j+i]).css({
					'height': max_height
				});
			};
		};
	};
};

window.cust.update_columns_now = function (data) {
	if (window.cust.breakPoint == 'lg') {
		window.cust.update_columns_calc(data.row, data.lg);
	};
	if (window.cust.breakPoint == 'md') {
		window.cust.update_columns_calc(data.row, data.md);
	};
	if (window.cust.breakPoint == 'sm') {
		window.cust.update_columns_calc(data.row, data.sm);
	};
	if (window.cust.breakPoint == 'xs') {
		window.cust.update_columns_calc(data.row, data.xs);
	};
	if (window.cust.breakPoint == 'xx') {
		window.cust.update_columns_calc(data.row, data.xx);
	};
};

window.cust.update_columns = function (data){
	body.on('resize_lg_once resize_md_once resize_sm_once resize_xs_once resize_xx_once', function(){
		window.cust.update_columns_now(data);
	});
	window.cust.update_columns_now(data);
};
