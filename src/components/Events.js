import React, { Component } from "react";
import './events.scss';
import 'flag-icons/css/flag-icons.min.css';
import {AppContext} from "../context/AppContext";
import { LanguageContext } from '../context/LanguageContext';

const COUNTRY_FLAGS = {
	'Russia': 'ru',
	'Latvia': 'lv',
	'Estonia': 'ee',
	'Germany': 'de',
	'Georgia': 'ge',
	'Spain': 'es',
	'Italy': 'it',
	'Ukraine': 'ua',
	'Finland': 'fi',
	'Poland': 'pl',
	'Belarus': 'by',
	'Czech Republic': 'cz',
	'Netherlands': 'nl',
	'France': 'fr',
	'UK': 'gb',
	'USA': 'us',
};

class Events extends Component {
	static contextType = AppContext;

	state = { events: [] };

	componentDidMount() {
		const ctx = this.context;
		if (ctx?.events) {
			this.setState({ events: ctx.events });
		}
	}

	render() {
		const { events } = this.state;

		// Группируем по году
		const byYear = {};
		events.forEach(item => {
			const yearMatch = (item.date || '').match(/\d{4}/);
			const year = yearMatch ? yearMatch[0] : '?';
			if (!byYear[year]) byYear[year] = [];
			byYear[year].push(item);
		});
		const years = Object.keys(byYear).sort((a, b) => b - a);

		return (
			<LanguageContext.Consumer>
				{({ t }) => (
					<section className="container">
						<h2 className="container__header">{t('events')}</h2>
						<div className="container__wrapper events">
							{years.map(year => (
								<div className="events__year-group" key={year}>
									<div className="events__year-label">{year}</div>
									<ul className="events__list">
										{byYear[year].map((item, key) => {
											const dateShort = (item.date || '').replace(/[\s,]*\d{4}[\s,]*/, '').trim();
											const flagCode = COUNTRY_FLAGS[item.country] || '';
											const row = (
												<>
													<span className="events__date">{dateShort}</span>
													<span className="events__city">
														{flagCode && <span className={`events__flag fi fi-${flagCode}`}></span>}
														{item.city || item.country}
													</span>
													<span className="events__name">{item.title}</span>
												</>
											);
											return (
												<li className="events__item" key={key}>
													{item.link ? (
														<a href={item.link} target="_blank" rel="noopener noreferrer" className="events__row events__row--link">
															{row}
														</a>
													) : (
														<div className="events__row">{row}</div>
													)}
												</li>
											);
										})}
									</ul>
								</div>
							))}
						</div>
					</section>
				)}
			</LanguageContext.Consumer>
		);
	}
}

export default Events;
