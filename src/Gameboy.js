import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import LazyLinePainter from 'lazy-line-painter'
import { ReactComponent as GameboySvg } from './image/gameboy.svg';

class Gameboy extends Component {
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
	}

	componentDidMount() {
		let el = document.querySelector('#gameboy');
		let aniContainer = document.querySelector('#animation');
		let gameboyScreen = document.querySelector('#gameboy_screen');
		let myAnimation = new LazyLinePainter(el, {
			"strokeWidth" : 1.5,
			"drawSequential": false,
			"strokeColor": "#000",
			"ease": 'easeInOutSine'
		});

		myAnimation.paint();
		myAnimation.on('complete', () => {
			aniContainer.classList.remove("disactive");
			gameboyScreen.classList.add("active");
			setTimeout(() => {
				ReactDOM.render(<App />, document.getElementById('root'));
				ReactDOM.unmountComponentAtNode(document.getElementById('animation'));
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