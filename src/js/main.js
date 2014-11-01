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