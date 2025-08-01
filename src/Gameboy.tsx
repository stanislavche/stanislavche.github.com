import React, { Component } from 'react';
import App from './components/App';

import LazyLinePainter from 'lazy-line-painter';
import { ReactComponent as GameboySvg } from './image/gameboy.svg';

import { AppContext } from './context/AppContext';
import siteData from '../public/data.json'; // <= короткий путь (если Vite)

class Gameboy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}

	componentDidMount() {
		const el = document.querySelector('#gameboy');
		const wrapper = document.querySelector('.wrapper');
		const aniContainer = document.querySelector('#animation');
		const gameboyScreen = document.querySelector('#gameboy_screen');

		const animation = new LazyLinePainter(el, {
			strokeWidth: 2.2,
			drawSequential: false,
			strokeColor: "#f7e6e4",
			speedMultiplier: 3,
			ease: 'easeInOutSine'
		});

		aniContainer.classList.add("active");
		animation.paint();

		animation.on('complete', () => {
			aniContainer.classList.remove("disactive");
			gameboyScreen.classList.add("active");
			wrapper.classList.add("active");


			setTimeout(() => {
				this.loadDataAndRenderApp(animation);
			}, 2000);
		});
	}

	async loadDataAndRenderApp(animation) {
		try {
			const res = await fetch('/data.json?t=' + Date.now());
			const json = await res.json();

			this.props.root.render(
				<AppContext.Provider value={json}>
					<App />
				</AppContext.Provider>
			);

			animation.destroy();
		} catch (err) {
			console.error("Ошибка загрузки данных:", err);
		}
	}

	render() {
		return <GameboySvg />;
	}
}

export default Gameboy;
