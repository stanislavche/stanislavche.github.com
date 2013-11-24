Piano.anim = function(){
	var monitorGlich = true;
	var $glich = $('.monitor-glich');
	myIntVal = setInterval(function(e) {
		setTimeout(function () {
			$glich.removeClass('active');
		},50);
		$glich.addClass('active');
	}, 100);
	$(".monitor").click(function(){
		clearInterval(myIntVal);
		$glich.stop().removeClass('active');
	});
};