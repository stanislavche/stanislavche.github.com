import React, { Component } from 'react';
import image from '../image/c64.jpg';

class Game extends Component {
	render() {
		return (
			<section className="container">
				<h2 className="container__header">Game</h2>
				<div className="container__wrapper game">
					<a classname="game__link" href="../piano.html" >
						<img src={image} alt="game" />
					</a>
				</div>
			</section>
		);
	}
}

export default Game;