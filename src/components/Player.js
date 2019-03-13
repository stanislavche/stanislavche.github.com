import React, { Component } from "react";
import ReactPlayer from 'react-player'
import './player.scss';

class Announce extends Component {
	render() {
		let playlist = 'https://soundcloud.com/stress_tn/sets/playlist-for-website';
		return (
			<section className="container">
				<h2 className="container__header">Player</h2>
				<div className="container__wrapper player">
					<ReactPlayer url={playlist} width="100%" height="500px" />
				</div>
			</section>
		);
	}
}

export default Announce;