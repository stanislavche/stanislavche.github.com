import React, { Component } from 'react';
import Iframe from 'react-iframe'

class Emulator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts : [
				{
					fileName: '123',
					image: '/images/extra/cart.png',
					title: 'Bit dungeon I'
				},{
					fileName: 'mgb',
					image: '/images/extra/cart.png',
					title: 'Illusion'
				}, {
					fileName: '123',
					image: '/images/extra/cart.png',
					title: 'Absurd'
				}
			],
			selectedCart: null
		}
	}

	
	render() {
		let iframeBlock = () => {
			if (!this.state.selectedCart) {
				this.setState({selectedCart: this.state.carts[0]});
			}

			let fileName = "/gb/#" + this.state.selectedCart.fileName;

			return (
				<div>
					<Iframe
						url={fileName}
						width="600px"
						height="600px"
						id="emulator"
						className="myClassname"
						display="initial"
						position="relative" />
				</div>
			);
		};

		return (
			<section className="container">
				<h2 className="container__header">Select Cartridge</h2>
				<div className="container__wrapper">
					<div className="container__row">
						<div className="container__cell">
							<ul className="cart__list">
								{this.state.carts.map((item, key) =>
									<div key={key}>{item.title}</div>
								)}
							</ul>
						</div>
						<div className="container__cell">
							{ iframeBlock() }
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Emulator;