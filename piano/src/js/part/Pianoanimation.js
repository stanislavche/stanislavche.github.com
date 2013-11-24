Piano.anim = function(){
	var monitorGlich = true;
	var interval = 100;
	var $glich = $('.monitor-glich');
	if(monitorGlich){
		setInterval(function() {
			setTimeout(function () {
				$glich.addClass('active');
			},4000);
			setTimeout(function () {
				$glich.removeClass('active');
			},1000);
		}, interval);
	}else{
		$glich.removeClass('active');
	}
	$(".monitor").click(function(){
		interval = 200000;
		monitorGlich = false;
		console.log(interval);
	});
};