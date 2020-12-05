import React, { Component } from "react";
import Newpost from "./Newpost";
import './news.scss';

class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [{
				"date": 1607161580,
				"title": "COLD FLAME EP",
				"description": "Release based on M8 tracker",
				"link": "https://stresstn.bandcamp.com/album/cold-flame",
				"type": "image",
				"media": "./images/albums/cold_flame.png"
			},{
				"date": 1602201600,
				"title": "Theremin FEST 2020",
				"description": "live for Theremin FEST 2020",
				"link": "https://youtu.be/vI0BUcc2mAs?t=26",
				"type": "video",
				"media": "https://youtu.be/vI0BUcc2mAs?t=26"
			},{
				"date": 1593194400,
				"title": "Birthday Stream",
				"description": "BleepLove live // Stress_TN - HappyBirthday stream",
				"link": "https://www.youtube.com/watch?v=eG2uJnnNmEQ",
				"type": "video",
				"media": "https://www.youtube.com/watch?v=eG2uJnnNmEQ"
			},
			{
				"date": 1578598200,
				"title": "Video translation",
				"description": "bunker.live - Stress_TN (live), Jaildigger",
				"link": "https://youtu.be/wnlOep1sgiI?t=1",
				"type": "video",
				"media": "https://youtu.be/wnlOep1sgiI?t=1"
			},{
				"date": 1552495410,
				"title": "bit Dungeon III GAME",
				"description": "Bit Dungeon III has been released",
				"link": "https://store.steampowered.com/app/856210/bit_Dungeon_III/",
				"type": "video",
				"media": "https://www.youtube.com/watch?v=y2rdm0ej0_E"
			},{
				"date": 1552824696,
				"title": "Illusion EP",
				"description": "LSDJ based album. Kits can be found on this page",
				"type": "image",
				"link": "https://stresstn.bandcamp.com/album/illusion-lsdj-sav",
				"media": "./images/albums/illusion.jpg"
			}]
		}
	}

	render() {
		return (
			<section className="container">
				<h2 className="container__header">News</h2>
				<div className="container__wrapper news">
					<ul className="news__list">
						{this.state.news.map((item, key) =>
							<Newpost data={item} key={key} />
						)}
					</ul>
				</div>
			</section>
		);
	}
}

export default News;