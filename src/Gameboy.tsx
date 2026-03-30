import React, { Component } from 'react';
import App from './components/App';

import LazyLinePainter from 'lazy-line-painter';
import GameboySvg from './image/gameboy.svg?react';

import { AppContext } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';

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
			const _ghOwner  = import.meta.env.VITE_GITHUB_OWNER;
			const _ghRepo   = import.meta.env.VITE_GITHUB_REPO;
			const _ghBranch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
			const dataUrl   = (_ghOwner && _ghRepo)
				? `https://raw.githubusercontent.com/${_ghOwner}/${_ghRepo}/${_ghBranch}/public/data.json`
				: '/data.json';

			const res = await fetch(`${dataUrl}?t=` + Date.now());
			const json = await res.json();

			this.props.root.render(
				<LanguageProvider>
					<AppContext.Provider value={json}>
						<App />
					</AppContext.Provider>
				</LanguageProvider>
			);

			localStorage.setItem('stn_gameboy_shown', '1');
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
