Piano.anim = function(){
	var n;
	var $breaksound = new Audio('sounds/break.mp3');
		$breaksound.preload = 'auto';
		$breaksound.load();
	var $glich = $('.monitor-glich');
	n=0;
	myIntVal = setInterval(Piano.glich, 100);
	$(".monitor").click(function(){
		n++;
		clearInterval(myIntVal);
		$glich.stop().removeClass('active');
		$breaksound.currentTime=0;
		$breaksound.play();
		if(n==3){
			n=0;
			setInterval(Piano.glich, 100);
		}
	});
};
Piano.glich = function() {
	var $glich = $('.monitor-glich');
	setTimeout(function () {
		$glich.removeClass('active');
	},50);
	$glich.addClass('active');
};