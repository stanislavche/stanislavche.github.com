document.addEventListener('DOMContentLoaded', function(){
	const scene = document.getElementsByClassName('wrapper');
	const layNin = document.getElementsByClassName('logo');
	const laySta = document.getElementsByClassName('earth');
	const laySpa = document.getElementsByClassName('space');
	const layPl1 = document.getElementsByClassName('planet1');
	const layPl2 = document.getElementsByClassName('planet2');
	const layMSt = document.getElementsByClassName('mainStar');
	const layArt = document.getElementsByClassName('artist');
	const layAlb = document.getElementsByClassName('album');
	const layPla = document.getElementsByClassName('playlist');
	const layShi = document.getElementsByClassName('ship');
	const layEqu = document.getElementsByClassName('equilizer');
	const scenes = [
		{
			step: 0,
			delay: 0
		},
		{
			step: 1,
			delay: 2000
		},
		{
			step: 2,
			delay: 6000
		},
		{
			step: 3,
			delay: 12000
		},
		{
			step: 4,
			delay: 20000
		},
		{
			step: 5,
			delay: 30000
		}
	];

	function changeSeen(step, time) {
		setTimeout(() => {
			console.log(step, time);
			const regex = /\d/;
			scene[0].className = scene[0].className.replace(regex, step);
		}, time);
	}

	scenes.forEach(action => {
		changeSeen(action.step, action.delay);
	});
});

