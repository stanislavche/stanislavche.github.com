import React, { Component } from "react";
import './player.scss';

class Announce extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [{
				"date": "Сегодня",
				"title": "Новость",
				"description": "",
				"image": "",
				"media": "",
				"type": ""
			}]
		}
	}

	render() {
		return (
			<section className="container">
				<h2 className="container__header">Player</h2>
				<div className="container__wrapper player">
				</div>
			</section>
		);
	}
}

export default Announce;