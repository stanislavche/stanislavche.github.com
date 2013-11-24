jQuery(document).ready(function($) {
	if (document.getElementById("monitor") !== null){
		Piano.buzz();
		Piano.anim();
	}
	if (document.getElementById("loadscreen") !== null){
		Piano.typewritter();
	}
});