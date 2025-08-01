import React, { Component } from "react";
import './events.scss';
import {AppContext} from "../context/AppContext";

class Events extends Component {
	static contextType = AppContext;

	state = {
		events: [],
	};

	componentDidMount() {
		const ctx = this.context;
		if (ctx?.events) {
			this.setState({ events: ctx.events });
		}
	}

	render() {
		let checkLink = (item) => {
			if (item.link) {
				return (
					<a href={(item.link ? item.link : "#")} target="_blank" className="events__link events__text" rel="noopener noreferrer">{item.country} - {item.date} - {item.title}</a>
				);
			} else {
				return (
					<p className="events__text">{item.country} - {item.date} - {item.title}</p>
				);
			}
		}

		return (
			<section className="container">
				<h2 className="container__header">Events</h2>
				<div className="container__wrapper events">
					<ul className="events__list">
						{this.state.events.map((item, key) =>
							<li className="events__item" key={key}>
								{ checkLink(item) }
							</li>
						)}
					</ul>
				</div>
			</section>
		);
	}
}

export default Events;
