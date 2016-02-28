$(document).ready(function() {
	var $slider = $('.js-main-slider'),
		$sliderConainer = $slider.find('.js-main-slider-container'),
		$pag = $slider.find('.js-main-slider-pag'),
		slides = $pag.length,
		$kate = $('.contacts__item.contacts__item_katya'),
		$popup = $('.popup'),
		$closePopup = $('.popup__close')
	;
	$pag.on('click', function(){
		var $self = $(this);
		$pag.removeClass('active');
		$self.addClass('active');
		$sliderConainer.css({'margin-left': -1200 * $self.index() + 'px'});
	});
	window.setInterval(function(){
		var activeSlide = $slider.find('.js-main-slider-pag.active').index(),
			newIndex = 0
		;
		if (activeSlide < slides - 1){
			newIndex = activeSlide + 1;
		}
		console.log(newIndex);
		$pag[newIndex].click();
	}, 10000);
	$kate.on('click', function(){
		$popup.addClass('active');
	});
	$closePopup.on('click', function(){
		$popup.removeClass('active');
	});
});