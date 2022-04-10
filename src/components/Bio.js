import React, { Component } from 'react';

class Bio extends Component {
	render() {
		return (
			<section className="container">
				<h2 className="container__header">Bio</h2>
				<div className="container__wrapper">
					<p className="container__text">Real name&nbsp;&mdash; Stanislav, chip-musician and video game music composer from Latvia.</p>
					<p className="container__text">Since&nbsp;2008 Stanislav has started his own project&nbsp;&mdash; &laquo;S_TN&raquo;. Huge arsenal of&nbsp;musical gadgets provided new opportunities for the musician. M8 tracker, Game Boy, NES and Commodore turned into a&nbsp;weapon of&nbsp;mass destruction on&nbsp;the dance floor.</p>
				</div>
			</section>
		);
	}
}

export default Bio;