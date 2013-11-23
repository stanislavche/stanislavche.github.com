Piano.typewritter = function(){
	var where, when; //added
	$.fn.teletype = function(opts){
		var $this = this,
			defaults = {
				animDelay: 50
			},
			settings = $.extend(defaults, opts);
		var letters = settings.text.length; //added
		where = '#' + $($this).attr('id'); //added
		when = settings.animDelay; //added
		$.each(settings.text, function(i, letter){
			setTimeout(function(){
				$this.html($this.html() + letter);
				if( $($this).html().length == letters );
			}, settings.animDelay * i);
		});
	};
	$(function(){
		$('#c64monitor').teletype({
			animDelay: 100,
			text: 'Now is the time for all good men to come to the aid of their country...'
		});
	});
};