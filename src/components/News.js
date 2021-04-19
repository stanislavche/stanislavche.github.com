import React, { Component } from "react";
import Newpost from "./Newpost";
import './news.scss';

class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: [{
				"date": 1618207620,
				"title": "МИР",
				"description": "NEW ALBUM",
				"link": "https://stresstn.bandcamp.com/album/-",
				"type": "image",
				"media": "./images/albums/mup.jpg"
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
			},{
					"date": 1578598200,
					"title": "Video translation",
					"description": "bunker.live - Stress_TN (live), Jaildigger",
					"link": "https://youtu.be/wnlOep1sgiI?t=1",
					"type": "video",
					"media": "https://youtu.be/wnlOep1sgiI?t=1"
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