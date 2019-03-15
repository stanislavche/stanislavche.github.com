import React, { Component } from "react";
import './kits.scss';

class Kits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			kits : [
				{
					"title": "C64 Sam Reciter 1",
					"link": "../kits/C64_Sam_Reciter_1.kit"
				},{
					"title": "C64 Sam Reciter 2",
					"link": "../kits/C64_Sam_Reciter_2.kit"
				},{
					"title": "C64 Sam Reciter 3",
					"link": "../kits/C64_Sam_Reciter_3.kit"
				},{
					"title": "C64 Sam Reciter 4",
					"link": "../kits/C64_Sam_Reciter_4.kit"
				},{
					"title": "Reggae",
					"link": "../kits/Reggae.kit"
				},{
					"title": "Scream",
					"link": "../kits/Scream.kit"
				},{
					"title": "Speak and Spell numbers",
					"link": "../kits/Speak_and_Spell_numbers.kit"
				},{
					"title": "Speak and Spell Voice 1",
					"link": "../kits/Speak_and_Spell_Voice_1.kit"
				},{
					"title": "Speak and Spell Voice 2",
					"link": "../kits/Speak_and_Spell_Voice_2.kit"
				},{
					"title": "Speak and Spell Voice 3",
					"link": "../kits/Speak_and_Spell_Voice_3.kit"
				},{
					"title": "Speak and Spell Voice 4",
					"link": "../kits/Speak_and_Spell_Voice_4.kit"
				}
			]
		}
	}

	render() {
		return (
			<section className="container">
				<h2 className="container__header">LSDJ KITS</h2>
				<div className="container__wrapper kits">
					<ul className="kits__list">
						{this.state.kits.map((item, key) =>
							<li className="kits__item" key={key}>
								<a className="kits__link" href={item.link} title={item.title} download>{item.title}</a>
							</li>
						)}
					</ul>
				</div>
			</section>
		);
	}
}

export default Kits;