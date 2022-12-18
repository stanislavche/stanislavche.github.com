import React, { Component } from 'react';

class Bio extends Component {
	render() {
		return (
			<section className="container">
				<h2 className="container__header">Bio</h2>
				<div className="container__wrapper">
					<p className="container__text">Stas or <b>S_TN, Stress_TN,</b> 1/2 of <b>8bit brothers</b> - chip-musician and video game music composer.</p>
					<p className="container__text">Since&nbsp;2008 I has started music project based on retro sound. Game consoles and vintage computers are turning into musical instruments.</p>
					<p>The main goal of the project is to unlock the potential of these sound chips in the underground culture. Some times it sound weird &#128526; - I call it <b>TERRIBLE NOISE (TN)</b></p>
					<p>P.S. This project is being developed for entertainment purposes only. Your support, criticism and feedback is very encouraging for me as an author. Thank you for being interested in chiptune and my work!</p>
				</div>
			</section>
		);
	}
}

export default Bio;
