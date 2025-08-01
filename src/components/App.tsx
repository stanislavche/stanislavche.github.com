import React, { Component } from 'react';
import Bio from './Bio';
import News from './News';
import Discography from './Discography';
import Cotacts from './Cotacts';
import Game from './Game';
import Emulator from './Emulator';
//import Donate from './Donate';
import Events from './Events';
import Player from './Player';
import Kits from './Kits';
import "./loadscreen.scss";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import Mup from "./Mup";

class App extends Component {
	render() {
		const ShowIndexPage = () => {
			return (
				<div className="App">
					<header className="App__header glitch">
						{/*<span role="img" aria-labelledby="peace-1">✌</span>*/}
						S_TN
						{/*<span className="App__hand-rotate" role="img" aria-labelledby="peace-2">✌</span>*/}
					</header>
					<div className="App__wrapper">
						<div className="App__wrapper-cell">
							<Bio />
						</div>
						<div className="App__wrapper-cell">
							<News />
						</div>
						<div className="App__wrapper-row">
							<Discography  />
						</div>
						<div className="App__wrapper-cell">
							<Game />
							<Player />
							<Events />
							{/*<Donate />*/}
						</div>
						<div className="App__wrapper-cell">
							{/*<Mup />*/}
							<Emulator />
							<Kits />
							<Cotacts />
						</div>
					</div>
					<footer className="App__footer">All rights belong to S_TN</footer>
				</div>
			);
		};

		const ShowErrorPage = () => {
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
				<Routes>
					<Route path="/" exact element={ <ShowIndexPage /> } />
					<Route path="/error" element={ <ShowErrorPage />} />
					<Route path='*' element={<Navigate to='/error' />} />
				</Routes>
			</Router>
		);
	}
}

export default App;
