import React, { Component } from 'react';
import Bio from './Bio';
import Announce from './Announce';
import Discography from './Discography';
import Cotacts from './Cotacts';
import Game from './Game';
import Donate from './Donate';
import Events from './Events';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App__header">Stress_TN</header>
				<div className="App__wrapper">
					<div className="App__wrapper-cell">
						<Bio />
					</div>
					<div className="App__wrapper-cell">
						<Announce />
						<Game />
					</div>
					<div className="App__wrapper-row">
						<Discography />
					</div>
					<div className="App__wrapper-cell">
						<Cotacts />
						<Donate />
					</div>
					<div className="App__wrapper-cell">
						<Events />
					</div>
				</div>
				<footer className="App__footer">All rights belong to Stress_TN. 2019</footer>
			</div>
		);
	}
}

export default App;