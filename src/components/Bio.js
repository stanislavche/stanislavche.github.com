import React, { Component } from 'react';

class Bio extends Component {
	render() {
		return (
			<section className="container">
				<h2 className="container__header">Bio</h2>
				<div className="container__wrapper">
					<p className="container__text">Real name&nbsp;&mdash; Stanislav, chip-musician from Russian Federation, who lives in Latvia now.</p>
					<p className="container__text">In 2006 Stanislav with friend created a project <a href="https://myspace.com/8bitbrothers/music/songs" target="_blank" rel="noopener noreferrer">&laquo;8bit brothers&raquo;</a> which played Fackebit only.</p>
					<p className="container__text">From&nbsp;2008 Stanislav created his own project&nbsp;&mdash; &laquo;Stress_TN&raquo;.Huge arsenal of&nbsp;musical gadgets provided new opportunities for the musician. For South of&nbsp;Russia it&nbsp;was a&nbsp;new wave of&nbsp;experimental music. Game Boys, NES and Commodore turned into a&nbsp;weapon of&nbsp;mass destruction on&nbsp;the dance floor into his hand.</p>
					<p className="container__text">Since 2010 year Stress_TN became a&nbsp;sound designer and composer&nbsp; for <a href="https://www.facebook.com/KintoGames/" target="_blank"  rel="noopener noreferrer">Kintogames</a>.</p>
				</div>
			</section>
		);
	}
}

export default Bio;