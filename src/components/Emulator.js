import React, { Component } from 'react';
import Iframe from 'react-iframe'

class Emulator extends Component {
	render() {
		return (
			<section className="container">
				<h2 className="container__header">Select Cartridge</h2>
				<div className="container__wrapper">
					<Iframe
						url="/gb/#123"
				        width="600px"
				        height="600px"
				        id="emulator"
				        className="myClassname"
				        display="initial"
				        position="relative"/>
				</div>
			</section>
		);
	}
}

export default Emulator;