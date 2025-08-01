import React, { Component } from 'react';
import App from './components/App';

import LazyLinePainter from 'lazy-line-painter'
import { ReactComponent as GameboySvg } from './image/gameboy.svg';

import { AppContext } from './context/AppContext';
import data from '../src/api/data.json'; // если используешь import

class Gameboy extends Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}

	componentDidMount() {
		let el = document.querySelector('#gameboy');
		let wrapper = document.querySelector('.wrapper');
		let aniContainer = document.querySelector('#animation');
		let gameboyScreen = document.querySelector('#gameboy_screen');
		let myAnimation = new LazyLinePainter(el, {
			"strokeWidth" : 2.2,
			"drawSequential": false,
			"strokeColor": "#f7e6e4",
			speedMultiplier: 3,
			"ease": 'easeInOutSine'
		});
		aniContainer.classList.add("active");
		myAnimation.paint();
		myAnimation.on('complete', () => {
			aniContainer.classList.remove("disactive");
			gameboyScreen.classList.add("active");
			wrapper.classList.add("active");
			setTimeout(() => {
				this.props.root.render(
					<AppContext.Provider value={data}>
						<App />
					</AppContext.Provider>
				);
				myAnimation.destroy();
			}, 2000);
		});
	}

	render() {
		return (
			<GameboySvg />
		);
		
	}
}

export default Gameboy;
