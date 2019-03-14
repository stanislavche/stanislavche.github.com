import React, { Component } from 'react';
import Bio from './Bio';
import News from './News';
import Discography from './Discography';
import Cotacts from './Cotacts';
import Game from './Game';
import Donate from './Donate';
import Events from './Events';
import Player from './Player';
import "./loadscreen.scss";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class App extends Component {
	render() {
		let showIndexPage = () => {
			return (
				<div className="App">
					<header className="App__header glitch">Stress_TN</header>
					<div className="App__wrapper">
						<div className="App__wrapper-cell">
							<Bio />
							<Cotacts />
							<Game />
						</div>
						<div className="App__wrapper-cell">
							<News />
						</div>
						<div className="App__wrapper-row">
							<Discography />
						</div>
						<div className="App__wrapper-cell">
							<Player />
							<Donate />
						</div>
						<div className="App__wrapper-cell">
							<Events />
						</div>
					</div>
					<footer className="App__footer">All rights belong to Stress_TN. 2019</footer>
				</div>
			);
		};

		let showErrorPage = () => {
			return (
				<div id="error" className="loadscreen errorLink">
					<div className="loadscreen__c64-preview">
						<p className="loadscreen__c64-preview_title">
							**** PAGE NOT FOUND ****
						<br />
							ERROR 404
						</p>
						<p className="loadscreen__c64-preview_ram">READY.</p>
						<p className="loadscreen__c64-preview_ram error-text"></p>
						<p className="loadscreen__c64-preview_ram">FILE NOT FOUND</p>
						<Link to="/" className="loadscreen__c64-preview_ram">GOTO MAIN PAGE</Link>
					</div>
			    </div>
			);
		};

		return (
			<Router>
				<Switch>
					<Route path="/" exact component={showIndexPage} />
					<Route path="/error" component={showErrorPage} />
					<Redirect from='*' to='/error' />
				</Switch>
			</Router>
		);
	}
}

export default App;