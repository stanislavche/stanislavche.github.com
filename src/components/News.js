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
				"description": "Make art not war!",
				"link": "https://stresstn.bandcamp.com/album/-",
				"type": "image",
				"media": "./images/albums/mup.jpg"
			},{
				"date": 1618007620,
				"title": "Интервью",
				"description": "Путешествие в мир 8Bit с элементами окружающей действительности",
				"link": "https://rockweek.ru/stn-201021/",
				"type": "image",
				"media": "./images/extra/boy.gif"
			}
			]
		}
	}

	render() {
		return (
			<section className="container container_news">
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
