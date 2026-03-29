import React, { Component } from "react";
import './events.scss';
import {AppContext} from "../context/AppContext";

const COUNTRY_FLAGS = {
	'Russia': '🇷🇺',
	'Latvia': '🇱🇻',
	'Estonia': '🇪🇪',
	'Germany': '🇩🇪',
	'Georgia': '🇬🇪',
	'Spain': '🇪🇸',
	'Italy': '🇮🇹',
	'Ukraine': '🇺🇦',
	'Finland': '🇫🇮',
	'Poland': '🇵🇱',
	'Belarus': '🇧🇾',
	'Czech Republic': '🇨🇿',
	'Netherlands': '🇳🇱',
	'France': '🇫🇷',
	'UK': '🇬🇧',
	'USA': '🇺🇸',
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
			<section className="container">
				<h2 className="container__header">Events</h2>
				<div className="container__wrapper events">
					{years.map(year => (
						<div className="events__year-group" key={year}>
							<div className="events__year-label">{year}</div>
							<ul className="events__list">
								{byYear[year].map((item, key) => {
									const dateShort = (item.date || '').replace(/[\s,]*\d{4}[\s,]*/, '').trim();
									const flag = COUNTRY_FLAGS[item.country] || '';
									const row = (
										<>
											<span className="events__date">{dateShort}</span>
											<span className="events__city">
												{flag && <span className="events__flag">{flag}</span>}
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
		);
	}
}

export default Events;
