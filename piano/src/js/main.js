$(".content-wrap").load(function() {
	$('.content-wrap').css("opacity","0");
	Piano.typewritter();
});
$(document).ready(function() {
	$('#loadscreen').fadeOut(300);
	$('.content-wrap').css("opacity","1");
	if (document.getElementById("monitor") !== null){
		Piano.anim();
		Piano.buzz();
	}
});