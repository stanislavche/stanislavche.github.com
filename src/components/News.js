import React, { Component } from "react";
import Newpost from "./Newpost";
import './news.scss';

class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [{
				"date": 1624046400,
				"title": "20.06 - BleepLove 8-bit - Red Cups",
				"description": "🔥Press start: Nuclear Mushroom Boom / S_TN / ZAN / VRUMZSSSR / Poiu Poiu",
				"link": "https://vk.com/bleeplove_redcups",
				"type": "image",
				"media": "./images/extra/210620.jpg"
			},{
				"date": 1624035600,
				"title": "LUXURY GodOfShina в Дюнах на Лиговке",
				"description": "Shoom and B1per weeding party",
				"link": "https://vk.com/luxuryofgod",
				"type": "image",
				"media": "./images/extra/210618.jpg"
			},{
				"date": 1618207620,
				"title": "МИР",
				"description": "FIRST CHIPTUNE ALBUM INTO THE SPACE",
				"link": "https://stresstn.bandcamp.com/album/-",
				"type": "image",
				"media": "./images/albums/mup.jpg"
			},{
				"date": 1619359200,
				"title": "MICROMUSIC ITALY SUNDAY JAM",
				"description": "ONLINE STREAM",
				"link": "https://www.twitch.tv/micromusicitaly",
				"type": "image",
				"media": "./images/extra/micromusic.jpg"
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