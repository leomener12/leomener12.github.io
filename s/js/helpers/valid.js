define(function(require, exports, module) {
	// Put traditional CommonJS module content here
	var init = function(elem, args){
		$('.form-control').keydown(function(){
			$(this).addClass('control_changed');
		});

		if(!debounce) {
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
		};

		elem.each( function() {
			var th = $(this);
			// console.log(th)
			th.not('.form_notValid').validate({
				onfocusout: false,
				focusInvalid: false,
				onkeyup: false,
				onclick: false,
				ignore: ".ignore",
				rules: {
					email: {
						required: true,
						emailfull: true
					}
				},
				errorPlacement: function(error, element) {
					// alert('errorPlacement');
					element.closest('.input-wrap').addClass('error').after(error.addClass('input-wrap_error'));
					element.addClass('debug_control').removeClass('valid');

					var firstErrorInput = $(th.find('.form-control.error')[0]),
						scrollSpeed = 300,
						firstErrorInput_offsetTop = firstErrorInput.offset().top;
					if (window.scrollY > firstErrorInput_offsetTop - 50) {
						var scrollToValue = firstErrorInput_offsetTop - window.innerHeight / 2;
						$('body').animate({scrollTop:scrollToValue}, scrollSpeed);
						setTimeout(function(){
							firstErrorInput.focus();
						}, scrollSpeed);
					} else {
						firstErrorInput.focus();
					};
				}
			});
			$formControl = th.find('.form-control');

			$formControl.on('input', debounce( function(e){
				var inputTh = $(this);
				if(inputTh.hasClass('debug_control')){
					inputTh.valid();
				}
			}, 400)).focusout(function(){
				var inputTh = $(this);
				if(inputTh.hasClass('debug_control') && inputTh.hasClass('valid')){
					inputTh.removeClass('debug_control').closest('.input-wrap').removeClass('error');
				}
				if(inputTh.val().length == 0 && inputTh.hasClass('valid') && !!inputTh.attr('required')){
					inputTh.addClass('debug_control error').removeClass('valid').closest('.input-wrap').addClass('error');
					inputTh.valid();
				}
			})
		});

		$.validator.addMethod("emailfull", function(value, element) {
			return this.optional(element) || /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(value);
		}, "Пожалуйста, введите корректный адрес электронной почты.");

		$.validator.addMethod("only_cyrillic", function(value, element) {
			return this.optional(element) || /^[А-Яа-я]+$/i.test(value);
		}, "Заполните данные на русском языке");

		/*
		 * Translated default messages for the jQuery validation plugin.
		 * Locale: RU (Russian; русский язык)
		 */
		$.extend( $.validator.messages, {
			required: "Поле не заполнено.",
			remote: "Пожалуйста, введите правильное значение.",
			email: "Пожалуйста, введите корректный адрес электронной почты.",
			url: "Пожалуйста, введите корректный URL.",
			date: "Пожалуйста, введите корректную дату.",
			dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
			number: "Пожалуйста, введите число.",
			digits: "Пожалуйста, вводите только цифры.",
			creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
			equalTo: "Пожалуйста, введите такое же значение ещё раз.",
			extension: "Пожалуйста, выберите файл с правильным расширением.",
			maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
			minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
			rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
			range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
			max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
			min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
		} );

		// $('.form-control')
		// 	.on('focus', function(){
		// 		$(this).closest('.input-wrap').addClass('focused');
		// 	})
		// 	.on('blur', function(){
		// 		$(this).closest('.input-wrap').removeClass('focused');
		// 	});
	};

	return init;
});