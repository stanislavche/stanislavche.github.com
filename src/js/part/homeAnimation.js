Piano.homeAnimation = function(){
	$(".js-destination").mCustomScrollbar({
		advanced:{
			autoExpandHorizontalScroll: true,
			updateOnContentResize: true,
			updateOnSelectorChange: ".js-destination"
		}
	});
	$('.js-link').on('click', function(e){
		e.preventDefault();
		var itemId = $(this).attr('data-id');
		$('.js-link').removeClass('active');
		$(this).addClass('active');
		$('.js-destination').each(function(){
			var $destination = $(this);
			if ($destination.attr('data-id') === itemId){
				$('.js-destination').removeClass('active');
				$destination.addClass('active');
			}
		});
	});
	$('.js-mailForm').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			url: "//forms.brace.io/stress_tn@yahoo.com", 
			method: "POST",
			data: $('.js-mailForm').serialize(),
			dataType: "json",
			error: function () {
				$('.js-mailForm').remove();
				$('.js-changeTitle').text('Try later');
			},
			success: function (response) {
				$('.js-changeTitle').text('Thank you');
				$('#formTosend')[0].reset();
			}
		});
	});
};