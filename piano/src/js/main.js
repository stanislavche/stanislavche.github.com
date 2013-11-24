window.onload = function() {
	Piano.typewritter();
	$('.content-wrap').css("display","none");
};
$(window).load(function() {
	$('.content-wrap').css("display","block");
	$('#loadscreen').fadeOut(300);
});
$(document).ready(function() {
	if (document.getElementById("monitor") !== null){
		Piano.anim();
		Piano.buzz();
	}
});