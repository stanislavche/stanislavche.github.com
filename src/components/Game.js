import React, { Component } from 'react';
import './game.scss';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameList : [
				{
					"title": "bit Dungeon III",
					"image": "../images/games/bitDungeonIII.png",
					"link": "https://store.steampowered.com/app/856210/bit_Dungeon_III/"
				},
				{
					"title": "bit Dungeon II",
					"image": "../images/games/bd2_logo.png",
					"link": "http://store.steampowered.com/app/331440/bit_Dungeon_II/"
				},{
					"title": "bit Dungeon",
					"image": "../images/games/bd_logo.png",
					"link": "https://www.kongregate.com/games/kintogames/bit-dungeon/"
				},{
					"title": "King Story",
					"image": "../images/games/ks_logo.png",
					"link": "http://www.kongregate.com/games/KintoGames/king-story/"
				},{
					"title": "Zombie Punch",
					"image": "../images/games/zp_logo.png",
					"link": "https://www.kongregate.com/games/KintoGames/zombie-punch/"
				}
			]
		}
	}

	render() {
		return (
			<section className="container">
				<h2 className="container__header">Games with S_TN music</h2>
				<div className="container__wrapper game">
					<ul className="game__list">
						{this.state.gameList.map((item, key) =>
							<li className="game__item" key={key}>
								<a className="game__link" href={item.link} title={item.title}>
									<img src={item.image} alt={item.title} />
								</a>
							</li>
						)}
					</ul>
				</div>
			</section>
		);
	}
}

export default Game;