import React, { Component } from 'react';
import Bio from './Bio';
import Announce from './Announce';
import Discography from './Discography';
import Cotacts from './Cotacts';
import Game from './Game';
import Donate from './Donate';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header"></header>
				<div className="App-wrapper">
					<Bio />
					<Announce />
					<Discography />
					<Cotacts />
					<Game />
					<Donate />
				</div>
				<footer>All rights belong to Stress_TN. 2019</footer>
			</div>
		);
	}
}

export default App;