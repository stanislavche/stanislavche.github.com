window.Piano = {};;
Piano.buzz = function(){
	buzz.defaults.formats = [ 'ogg', 'mp3' ];
	buzz.defaults.preload = true;
	buzz.defaults.loop = false;
	buzz.defaults.volume = 40;

	var alphabetSounds  = {},
	alphabet        = '3c,3c$,3d,3d$,3e,3f,3f$,3g,3g$,3a,3a$,3b,4c,4c$,4d,4d$,4e,4f,4f$,4g,4g$,4a,4a$,4b,5c,5c$,5d,5d$,5e,5f,5f$,5g,5g$,5a,5a$,5b'.split(',');

	for( var i in alphabet ) {
	var letter = alphabet[ i ];
	alphabetSounds[ letter ] = new buzz.sound('sounds/'+ letter );
	var lastEvent;
	var heldKeys = {};
	var $note1 = $(".3c");
	var $note2 = $(".3cc");
	var $note3 = $(".3d");
	var $note4 = $(".3dd");
	var $note5 = $(".3e");
	var $note6 = $(".3f");
	var $note7 = $(".3ff");
	var $note8 = $(".3g");
	var $note9 = $(".3gg");
	var $note10 = $(".3a");
	var $note11 = $(".3aa");
	var $note12 = $(".3b");
	var $note13 = $(".4c");
	var $note14 = $(".4cc");
	var $note15 = $(".4d");
	var $note16 = $(".4dd");
	var $note17 = $(".4e");
	var $note18 = $(".4f");
	var $note19 = $(".4ff");
	var $note20 = $(".4g");
	var $note21 = $(".4gg");
	var $note22 = $(".4a");
	var $note23 = $(".4aa");
	var $note24 = $(".4b");
	var $note25 = $(".5c");
	var $note26 = $(".5cc");
	var $note27 = $(".5d");
	var $note28 = $(".5dd");
	var $note29 = $(".5e");
	var $note30 = $(".5f");
	var $note31 = $(".5ff");
	var $note32 = $(".5g");
	var $note33 = $(".5gg");
	var keyAllowed = {};
	}
	$( function() {
		var idx = 0,
		$letters = $( '.note' );
		$letters.each( function( i ) {
			$( this ).on('mousedown touchstart', function() {
				var letter = $( this ).children().text();
				if ( alphabetSounds[ letter ] ) {
					alphabetSounds[ letter ].stop().play();
				}
			});
		});
		$letters.each( function( i ) {
			$( this ).on('mouseup mouseleave touchend', function() {
				var letter = $( this ).children().text();
				if ( alphabetSounds[ letter ] ) {
					alphabetSounds[ letter ].stop();
				}
			});
		});
	});
	$("body").on("keydown", function(e) {
		if (keyAllowed [e.which] === false) return;
			keyAllowed [e.which] = false;
		if (lastEvent && lastEvent.keyCode == e.keyCode) {
			return;
		}
		lastEvent = e;
		heldKeys[e.keyCode] = true;
		if(e.keyCode == 90) {
			$note1.trigger('mousedown');
		}
		if(e.keyCode == 83) {
			$note2.trigger('mousedown');
		}
		if(e.keyCode == 88) {
			$note3.trigger('mousedown');
		}
		if(e.keyCode == 68) {
			$note4.trigger('mousedown');
		}
		if(e.keyCode == 67) {
			$note5.trigger('mousedown');
		}
		if(e.keyCode == 86) {
			$note6.trigger('mousedown');
		}
		if(e.keyCode == 71) {
			$note7.trigger('mousedown');
		}
		if(e.keyCode == 66) {
			$note8.trigger('mousedown');
		}
		if(e.keyCode == 72) {
			$note9.trigger('mousedown');
		}
		if(e.keyCode == 78) {
			$note10.trigger('mousedown');
		}
		if(e.keyCode == 74) {
			$note11.trigger('mousedown');
		}
		if(e.keyCode == 77) {
			$note12.trigger('mousedown');
		}
		if(e.keyCode == 188) {
			$note13.trigger('mousedown');
		}
		if(e.keyCode == 76) {
			$note14.trigger('mousedown');
		}
		if(e.keyCode == 190) {
			$note15.trigger('mousedown');
		}
		if(e.keyCode == 186) {
			$note16.trigger('mousedown');
		}
		if(e.keyCode ==191) {
			$note17.trigger('mousedown');
		}
		if(e.keyCode == 81) {
			$note13.trigger('mousedown');
		}
		if(e.keyCode == 50) {
			$note14.trigger('mousedown');
		}
		if(e.keyCode == 87) {
			$note15.trigger('mousedown');
		}
		if(e.keyCode == 51) {
			$note16.trigger('mousedown');
		}
		if(e.keyCode == 69) {
			$note17.trigger('mousedown');
		}
		if(e.keyCode == 82) {
			$note18.trigger('mousedown');
		}
		if(e.keyCode == 53) {
			$note19.trigger('mousedown');
		}
		if(e.keyCode == 84) {
			$note20.trigger('mousedown');
		}
		if(e.keyCode == 54) {
			$note21.trigger('mousedown');
		}
		if(e.keyCode == 89) {
			$note22.trigger('mousedown');
		}
		if(e.keyCode == 55) {
			$note23.trigger('mousedown');
		}
		if(e.keyCode == 85) {
			$note24.trigger('mousedown');
		}
		if(e.keyCode == 73) {
			$note25.trigger('mousedown');
		}
		if(e.keyCode == 57) {
			$note26.trigger('mousedown');
		}
		if(e.keyCode == 79) {
			$note27.trigger('mousedown');
		}
		if(e.keyCode == 48) {
			$note28.trigger('mousedown');
		}
		if(e.keyCode == 80) {
			$note29.trigger('mousedown');
		}
		if(e.keyCode == 219) {
			$note30.trigger('mousedown');
		}
		if(e.keyCode == 187) {
			$note31.trigger('mousedown');
		}
		if(e.keyCode == 221) {
			$note32.trigger('mousedown');
		}
		if(e.keyCode == 220) {
			$note33.trigger('mousedown');
		}
	});
	$("body").on("keyup", function(e) {
		keyAllowed [e.which] = true;
		lastEvent = null;
		if(e.keyCode == 90) {
			$note1.trigger('mouseup');
		}
		if(e.keyCode == 83) {
			$note2.trigger('mouseup');
		}
		if(e.keyCode == 88) {
			$note3.trigger('mouseup');
		}
		if(e.keyCode == 68) {
			$note4.trigger('mouseup');
		}
		if(e.keyCode == 67) {
			$note5.trigger('mouseup');
		}
		if(e.keyCode == 86) {
			$note6.trigger('mouseup');
		}
		if(e.keyCode == 71) {
			$note7.trigger('mouseup');
		}
		if(e.keyCode == 66) {
			$note8.trigger('mouseup');
		}
		if(e.keyCode == 72) {
			$note9.trigger('mouseup');
		}
		if(e.keyCode == 78) {
			$note10.trigger('mouseup');
		}
		if(e.keyCode == 74) {
			$note11.trigger('mouseup');
		}
		if(e.keyCode == 77) {
			$note12.trigger('mouseup');
		}
		if(e.keyCode == 188) {
			$note13.trigger('mouseup');
		}
		if(e.keyCode == 76) {
			$note14.trigger('mouseup');
		}
		if(e.keyCode == 190) {
			$note15.trigger('mouseup');
		}
		if(e.keyCode == 186) {
			$note16.trigger('mouseup');
		}
		if(e.keyCode ==191) {
			$note17.trigger('mouseup');
		}
		if(e.keyCode == 81) {
			$note13.trigger('mouseup');
		}
		if(e.keyCode == 50) {
			$note14.trigger('mouseup');
		}
		if(e.keyCode == 87) {
			$note15.trigger('mouseup');
		}
		if(e.keyCode == 51) {
			$note16.trigger('mouseup');
		}
		if(e.keyCode == 69) {
			$note17.trigger('mouseup');
		}
		if(e.keyCode == 82) {
			$note18.trigger('mouseup');
		}
		if(e.keyCode == 53) {
			$note19.trigger('mouseup');
		}
		if(e.keyCode == 84) {
			$note20.trigger('mouseup');
		}
		if(e.keyCode == 54) {
			$note21.trigger('mouseup');
		}
		if(e.keyCode == 89) {
			$note22.trigger('mouseup');
		}
		if(e.keyCode == 55) {
			$note23.trigger('mouseup');
		}
		if(e.keyCode == 85) {
			$note24.trigger('mouseup');
		}
		if(e.keyCode == 73) {
			$note25.trigger('mouseup');
		}
		if(e.keyCode == 57) {
			$note26.trigger('mouseup');
		}
		if(e.keyCode == 79) {
			$note27.trigger('mouseup');
		}
		if(e.keyCode == 48) {
			$note28.trigger('mouseup');
		}
		if(e.keyCode == 80) {
			$note29.trigger('mouseup');
		}
		if(e.keyCode == 219) {
			$note30.trigger('mouseup');
		}
		if(e.keyCode == 187) {
			$note31.trigger('mouseup');
		}
		if(e.keyCode == 221) {
			$note32.trigger('mouseup');
		}
		if(e.keyCode == 220) {
			$note33.trigger('mouseup');
		}
	});
};
;
Piano.typewritter = function () {
	function typeString($target, str, cursor, delay, cb) {
		$target.html(function (_, html) {
			return html + str[cursor];
		});
			if (cursor < str.length - 1) {
				setTimeout(function () {
					typeString($target, str, cursor + 1, delay, cb);
				}, delay);
			}
			else {
				cb();
			}
		}
		function deleteString($target, delay, cb) {
			var length;
			$target.html(function (_, html) {
				length = html.length;
			return html.substr(0, length - 1);
		});
	
		if (length > 1) {
			setTimeout(function () {
				deleteString($target, delay, cb);
			}, delay);
		}
		else {
			cb();
		}
	}
	$.fn.extend({
		teletype: function (opts) {
			var settings = $.extend({}, $.teletype.defaults, opts);
      
			return $(this).each(function () {
			(function loop($tar, idx) {
			// type
				typeString($tar, settings.text[idx], 0, settings.delay, function () {
			// delete
			setTimeout(function () {
				deleteString($tar, settings.delay, function () {
					loop($tar, (idx + 1) % settings.text.length);
				});
			}, settings.pause);
			});        
			}($(this), 0));
			});
		}
	});

	// plugin defaults  
		$.extend({
			teletype: {
			defaults: {
				delay: 200,
				pause: 50000,
				text: []
			}
		}
	});
	$('#cursor').teletype({
		text: ['█', ' '],
		delay: 0,
		pause: 500
	});
	$('#target').teletype({
	text: [
	'LOAD"COMMODORE64 HTML5 PIANO",8'
	]
	});

};

;
Piano.anim = function(){
	var n;
	var $breaksound = new Audio('sounds/break.mp3');
		$breaksound.preload = 'auto';
		$breaksound.load();
	var $glich = $('.monitor-glich');
	n=0;
	myIntVal = setInterval(Piano.glich, 100);
	$(".monitor").click(function(){
		n++;
		clearInterval(myIntVal);
		$glich.stop().removeClass('active');
		$breaksound.currentTime=0;
		$breaksound.play();
		if(n==10){
			setInterval(Piano.glich, 100);
			n=0;
		}
	});
};
Piano.glich = function() {
	var $glich = $('.monitor-glich');
	setTimeout(function () {
		$glich.removeClass('active');
	},50);
	$glich.addClass('active');
};;
Piano.Error = function() {
	var $text = $(".error-text");
	var currenturl = $(location).attr('href');
	$text.text(currenturl);
};;
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
};;
$(document).load(function() {
	$('.content-wrap').css("opacity","0");
	Piano.typewritter();
});
$(document).ready(function() {
	Piano.buzz();
	setTimeout(function(){
		$('#loadscreen').fadeOut(300);
		$('.content-wrap').css("opacity","1");
	}, 2000);
	if (document.getElementById("monitor") !== null){
		Piano.anim();
	}
	if (document.getElementById("error") !== null){
		Piano.Error();
	}
	if ($('.home').length){
		Piano.homeAnimation();
	}
});