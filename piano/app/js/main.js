window.Piano = {};;
Piano.anim = function(){
	var $glich = $('.monitor-glich');
	setTimeout(function () {
		$glich.addClass('active');
	},4000);
	setTimeout(function () {
		$glich.removeClass('active');
	},1000);
};;
jQuery(document).ready(function($) {
	if (document.getElementById("monitor") !== null){
		var counter = 200;
		var myFunction = function(){
			clearInterval(interval);
			counter *= 10;
			interval = setInterval(myFunction, counter);
		};
		var interval = setInterval(myFunction, counter);
		setInterval(function() { Piano.anim(); }, interval);
	}
});