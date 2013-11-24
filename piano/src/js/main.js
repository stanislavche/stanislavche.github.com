$(window).load(function() {
	Piano.typewritter();
});
$(document).ready(function() {
	if (document.getElementById("monitor") !== null){
		Piano.buzz();
		Piano.anim();
	}
	
});