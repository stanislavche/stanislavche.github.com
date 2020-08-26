document.addEventListener('DOMContentLoaded', function(){
	const scene = document.getElementsByClassName('wrapper');
	const layNin = document.getElementsByClassName('logo');
	const laySta = document.getElementsByClassName('earth');
	const laySpa = document.getElementsByClassName('space');
	const layPl1 = document.getElementsByClassName('planet1');
	const layPl2 = document.getElementsByClassName('planet2');
	const layMSt = document.getElementsByClassName('mainStar');
	const layArt = document.getElementsByClassName('artist');
	const layPla = document.getElementsByClassName('playlist');
	const layShi = document.getElementsByClassName('ship');
	const layEqu = document.getElementsByClassName('equilizer');
	const layMain = document.getElementsByClassName('mainScreen');
	const start = document.getElementsByClassName('start');
	
	const scenes = [
		{
			step: 2,
			delay: 0
		},
		{
			step: 3,
			delay: 6000
		},
		{
			step: 4,
			delay: 10000
		},
		{
			step: 5,
			delay: 20000
		}
	];
	function changeSeen(step, time) {
			setTimeout(() => {
				console.log(step, time);
				const regex = /\d/;
				scene[0].className = scene[0].className.replace(regex, step);
			}, time);
		}

	

	setInterval(function(){
		start[0].classList.toggle("active");
	}, 500);

	changeSeen(0, 0);
	changeSeen(1, 2000);

	function startAnimation() {
		scenes.forEach(action => {
			changeSeen(action.step, action.delay);
		});
	}

	start[0].addEventListener('click', startAnimation);
});

