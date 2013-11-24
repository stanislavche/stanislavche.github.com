$(window).load(function() {
	Piano.typewritter();
	$('#loadscreen').fadeOut(300);
});
$(document).ready(function() {
	if (document.getElementById("monitor") !== null){
		Piano.anim();
		Piano.buzz();
	}
});