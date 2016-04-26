Piano.Error = function() {
	var $text = $(".error-text");
	var currenturl = $(location).attr('href');
	$text.text(currenturl);
};