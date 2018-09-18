$(window).on('load', function(){
	(function(){
		var map;
		DG.then(function(){
			map = DG.map('map', {
				center: [59.944341, 30.307203],
				zoom: 13
			});
		});
	})();

	$('#burger-button').on('click', function(){
		$('.menu-popup').css('display', 'block');
		$('.menu-popup').css('left', -$('.menu-popup').width());
		$('.menu-popup').animate({
			'left': 0
		}, 100);
	});

	$('#burger-button-close').on('click', function(){
		$('.menu-popup').animate({
			'left': -$('.menu-popup').width()
		}, 100, function(){
			$('.menu-popup').css('display', 'none');
		});
	});

	$('.menu__link').on('mouseover', function(){
		$('.submenu').css('display', 'block');
		$('.submenu').css('left', $(this).offset().left);
		$('.submenu').css('top', $(this).offset().top+$(this).height());
	});

	$('.submenu').on('mouseover', function(){
		$('.submenu').css('display', 'block');
	});

	$('.menu__link, .submenu').on('mouseout', function(){
		$('.submenu').css('display', 'none');
	});

	$('#login-button').on('click', function(e){
		e.preventDefault();
		$('.auth').addClass('auth_active');
		$('.auth-block').addClass('auth-block_login');
		$('#auth-login-button').addClass('auth-block__button_active');
		$('#auth-register-button').removeClass('auth-block__button_active');
	});

	$('#register-button').on('click', function(e){
		e.preventDefault();
		$('.auth').addClass('auth_active');
		$('.auth-block').addClass('auth-block_register');
		$('#auth-register-button').addClass('auth-block__button_active');
		$('#auth-login-button').removeClass('auth-block__button_active');
	});

	$('.auth__close-button').on('click', function(e){
		e.preventDefault();
		$('.auth').removeClass('auth_active');
		$('.auth-block').removeClass('auth-block_login');
		$('.auth-block').removeClass('auth-block_register');
	});

	$('#auth-login-button').on('click', function(e){
		$('.auth-block').addClass('auth-block_login');
		$('.auth-block').removeClass('auth-block_register');
		$('#auth-login-button').addClass('auth-block__button_active');
		$('#auth-register-button').removeClass('auth-block__button_active');
	});

	$('#auth-register-button').on('click', function(e){
		$('.auth-block').addClass('auth-block_register');
		$('.auth-block').removeClass('auth-block_login');
		$('#auth-register-button').addClass('auth-block__button_active');
		$('#auth-login-button').removeClass('auth-block__button_active');
	});

	$('.basket-min').on('click', function(e){
		$('.basket-window-wrapper').css('display', 'block');
		$('.basket-window').css('left', $(this).offset().left+$(this).width()/2-$('.basket-window').width()/2);
		$('.basket-window').css('top', $(this).offset().top+$(this).height());
	});

	$('.basket-window-wrapper').on('click', function(e){
		e.stopPropagation();
		$('.basket-window-wrapper').css('display', 'none');
	});

	$('.basket-window').on('click', function(e){
		e.stopPropagation();
	});

	$('.review-link__link').on('click', function(e){
		e.preventDefault();
		$('.review-window-wrapper').css('display', 'flex');
	});

	$('.review-window-wrapper, .review-window__button-close').on('click', function(e){
		e.stopPropagation();
		$('.review-window-wrapper').css('display', 'none');
	});

	$('.review-window').on('click', function(e){
		e.stopPropagation();
	});

	(function(){
		var circleLeftPressed = false;
		var circleRightPressed = false;

		$('.filter-range__circle_left').on('mousedown', function(e){
			 circleLeftPressed = true;
		});

		$('.filter-range__circle_right').on('mousedown', function(e){
			 circleRightPressed = true;
		});

		$(window).on('mouseup', function(e){
			 circleLeftPressed = false;
			 circleRightPressed = false;
			 $(window).off('mousemove', prevent);
		});

		var prevent = function(e){
			e.preventDefault();
		};

		$(window).on('mousemove', function(e){
			var position = 0;

			if (circleLeftPressed == true) {
				position = e.clientX - $('.filter-range').offset().left - 7;
				if (position <= 0) {
					position = 0;
				}
				if (position > 0 &&  position < $('.filter-range').width() - 14) {
					if (position < $('.filter-range__circle_right').offset().left - $('.filter-range').offset().left) {
						$('.filter-range__circle_left').css('left', position);
						$('.filter-range__line_inner').css('left', position);
						$('.filter-range__line_inner').css('width', $('.filter-range__circle_right').offset().left - $('.filter-range__circle_left').offset().left);
						$('#filterMinPrice').val(Math.round((position-1)/$('.filter-range').width()*$('.filter-range').attr('data-max-price')));
					} else {
						circleLeftPressed = false;
						circleRightPressed = true;
					}
				}
				$(window).on('mousemove', prevent);
			}

			if (circleRightPressed == true) {
				position = e.clientX - $('.filter-range').offset().left - 7;
				if (position >= $('.filter-range').width() + 14) {
					position = $('.filter-range').width() + 14;
				}
				if (position > 0 &&  position < $('.filter-range').width() - 14) {
					if (position > $('.filter-range__circle_left').offset().left - $('.filter-range').offset().left) {
						$('.filter-range__circle_right').css('left', position);
						$('.filter-range__line_inner').css('width', $('.filter-range__circle_right').offset().left - $('.filter-range__circle_left').offset().left);
						$('#filterMaxPrice').val(Math.round((position+15)/$('.filter-range').width()*$('.filter-range').attr('data-max-price')));
					} else {
						circleRightPressed = false;
						circleLeftPressed = true;
					}
				}
				$(window).on('mousemove', prevent);
			}
		});

		$(window).on('resize', function(){
			$('.filter-range__circle_left').css('left', $('#filterMinPrice').val()/$('.filter-range').attr('data-max-price')*$('.filter-range').width());
			$('.filter-range__circle_right').css('left', $('#filterMaxPrice').val()/$('.filter-range').attr('data-max-price')*$('.filter-range').width()-15);
			$('.filter-range__line_inner').css('left', $('.filter-range__circle_left').css('left'));
			$('.filter-range__line_inner').css('width', $('.filter-range__circle_right').offset().left - $('.filter-range__circle_left').offset().left);
		});
	})();

	$('.feature__name').on('click', function(e){
		if ($(this).parent().attr('data-status') == 'opened') {
			$('#' + $(this).parent().attr('id') + ' .feature__name-icon').css('transform', 'rotate(180deg)');
			$(this).parent().attr('data-status', 'processing');
			$('#' + $(this).parent().attr('id') + ' .feature__content').animate({
				'height': 0
			}, 100, function(e){
				$('#' + $(this).parent().attr('id') + ' .feature__content').css('display', 'none');
				$(this).parent().attr('data-status', 'closed');
			});
		}
		if ($(this).parent().attr('data-status') == 'closed') {
			$('#' + $(this).parent().attr('id') + ' .feature__name-icon').css('transform', 'rotate(0deg)');
			$(this).parent().attr('data-status', 'processing');
			$('#' + $(this).parent().attr('id') + ' .feature__content').css('display', 'block');
			$('#' + $(this).parent().attr('id') + ' .feature__content').animate({
				'height': $(this).parent().attr('data-height')
			}, 100, function(e){
				$(this).parent().attr('data-status', 'opened');
			});
		}
	});

	(function(){
		$('#filterMinPrice').val($('.filter-range').attr('data-min-price'));
		$('#filterMaxPrice').val($('.filter-range').attr('data-max-price'));
		$('.filter-range__circle_left').css('left', $('#filterMinPrice').val()/$('.filter-range').attr('data-max-price')*$('.filter-range').width());
		$('.filter-range__circle_right').css('left', $('#filterMaxPrice').val()/$('.filter-range').attr('data-max-price')*$('.filter-range').width()-15);
	})();
});