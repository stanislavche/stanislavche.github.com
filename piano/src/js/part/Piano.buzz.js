Piano.buzz = function(){
	buzz.defaults.formats = [ 'ogg', 'mp3' ];
	buzz.defaults.preload = 'metadata';
	buzz.defaults.loop = true;

	var alphabetSounds  = {},
	alphabet        = '1c,1c$,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'.split(',');

	for( var i in alphabet ) {
	var letter = alphabet[ i ];
	alphabetSounds[ letter ] = new buzz.sound('sounds/'+ letter );
	}
	$( function() {
		var idx = 0,
		$letters = $( '.note' );
		$letters.each( function( i ) {
			$( this ).mousedown( function() {
				var letter = $( this ).text();
				if ( alphabetSounds[ letter ] ) {
					alphabetSounds[ letter ].play();
				}
			});
		});
		$letters.each( function( i ) {
			$( this ).mouseup( function() {
				var letter = $( this ).text();
				if ( alphabetSounds[ letter ] ) {
					alphabetSounds[ letter ].stop();
				}
			});
		});
	});
	$("body").on("keydown", function(e) {
		var $note1 = $(".1c");
		var $note2 = $(".1cc");
		if(e.keyCode == 90) {
			$note1.trigger('mousedown');
		}
		if(e.keyCode == 88) {
			$note2.trigger('mousedown');
			$note2.volume = 0;
		}
	});
	$("body").on("keyup", function(e) {
		var $note1 = $(".1c");
		var $note2 = $(".1cc");
		if(e.keyCode == 90) {
			$note1.trigger('mouseup');
		}
		if(e.keyCode == 88) {
			$note2.trigger('mouseup');
		}
	});
};