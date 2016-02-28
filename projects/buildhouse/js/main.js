window.BuildHouse = {};;
BuildHouse.FormSubmit = function(){
	$('.js-formSubmit').on('submit', function(e){
		var $form = $(this);
		var url = $(this).attr('data-url');
		e.preventDefault();
		$.ajax({
			url: url,
			type: "POST",
			data: $form.serialize()
		}).done(function() {
			console.log('data');
		});
	});
};;
BuildHouse.InputNumber = function(){	
	$('.js-formNumber').keydown(function (e) {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
			return;
		}
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
};;
BuildHouse.LightBox = function(){
	var resizeId = 0;
	$('.js-colorboxGallary, .js-colorboxJoin').on('click', function(e){
		e.preventDefault();
	});
	
	$('.js-colorboxJoin').colorbox({
		inline: true,
		className: 'modalJoin',
		fixed: true,
		scrolling: false
	});
	$(window).on("resize", function(){
		clearTimeout(resizeId);
		resizeId = setTimeout($.colorbox.close(), 500);
	});
	ResizeColorboxJoin = function(){
		var width = $('#formRegistration').width();
		var height = $('#formRegistration').height();
		$.colorbox.resize({
			width: width,
			height: height,
			scrolling: false
		});
	};

	$('.js-colorboxGallary').each(function(){
		var gallary = $(this).attr('data-gallary');
		$(this).colorbox({
			rel: gallary,
			maxWidth: '90%',
			maxHeight: '90%',
			photo: true,
			className: 'modalGallary',
			fixed: true,
			scrolling: false
		});
	});
};;
$(document).ready(function() {
    BuildHouse.LightBox();
    BuildHouse.InputNumber();
    BuildHouse.FormSubmit();
});