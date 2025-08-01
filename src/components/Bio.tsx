import React, { Component } from 'react';
import { AppContext } from '../context/AppContext';

class Bio extends Component {
	static contextType = AppContext;

	state = {
		bio: '',
	};

	componentDidMount() {
		const ctx = this.context;
		if (ctx?.bio) {
			this.setState({ bio: ctx.bio });
		}
	}

	render() {
		return (
			<section className="container">
				<h2 className="container__header">Bio</h2>
				<div
					className="container__wrapper"
					dangerouslySetInnerHTML={{ __html: this.context.bio }}
				/>
			</section>
		);
	}
}

export default Bio;
