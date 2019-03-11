import React, { Component } from "react";

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
				<h2 className="container__header">News</h2>
				<div className="container__wrapper news">
					<ul className="news__list">
						{this.state.news.map((item, key) =>
							<li className="news__item" key={key}>
								{item.title}
							</li>
						)}
					</ul>
				</div>
			</section>
		);
	}
}

export default Announce;