import React, { Component } from "react";
import Newpost from "./Newpost";
import './news.scss';

class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [{
				"date": 1552824696,
				"title": "New Ep !!! ",
				"description": "LSDJ based album. Kits can be found on this page",
				"type": "image",
				"link": "https://stresstn.bandcamp.com/album/illusion-lsdj-sav",
				"media": "./images/albums/illusion.jpg"
			},{
				"date": 1552495410,
				"title": "bit Dungeon III",
				"description": "Good news, bit Dungeon will be available on STEAM store at - 4/19/2019",
				"link": "https://www.facebook.com/KintoGames/",
				"type": "video",
				"media": "https://www.youtube.com/watch?v=y2rdm0ej0_E"
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