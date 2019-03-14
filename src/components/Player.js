import React, { Component } from "react";
import ReactPlayer from 'react-player'
import './player.scss';

class Announce extends Component {
	render() {
		let playlist = 'https://soundcloud.com/stress_tn/sets/playlist-for-website';
		return (
			<section className="container">
				<div className="container__wrapper player">
					<ReactPlayer url={playlist} width="100%" height="260px" />
				</div>
			</section>
		);
	}
}

export default Announce;