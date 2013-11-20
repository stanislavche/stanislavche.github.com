Piano.anim = function(){
	var $glich = $('.monitor-glich');
	setTimeout(function () {
		$glich.addClass('active');
	},4000);
	setTimeout(function () {
		$glich.removeClass('active');
	},1000);
};