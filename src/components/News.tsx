import React, { Component } from "react";
import Newpost from "./Newpost";
import './news.scss';
import { AppContext } from "../context/AppContext";
import { LanguageContext } from '../context/LanguageContext';

class News extends Component {
	static contextType = AppContext;

	state = {
		news: [],
	};

	componentDidMount() {
		const ctx = this.context;
		if (ctx?.news) {
			this.setState({ news: ctx.news });
		}
	}

	render() {
		return (
			<LanguageContext.Consumer>
				{({ t }) => (
					<section className="container container_news">
						<h2 className="container__header">{t('news')}</h2>
						<div className="container__wrapper news">
							<ul className="news__list">
								{this.state.news.map((item, key) =>
									<Newpost data={item} key={key} />
								)}
							</ul>
						</div>
					</section>
				)}
			</LanguageContext.Consumer>
		);
	}
}

export default News;
