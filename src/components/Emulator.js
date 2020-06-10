import React, { Component } from 'react';
import Iframe from 'react-iframe'
import './emulator.scss';

class Emulator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts : [
				{
					id: 1,
					fileName: '123',
					image: '/images/extra/cart3.png',
					title: 'New EP',
					description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo iste non inventore aliquid exercitationem tempora similique numquam sint nihil eum iure repudiandae nisi cumque, quibusdam ullam blanditiis et odio fugit.',
					status: 'not-available'
				},{
					id: 2,
					fileName: 'mgb',
					image: '/images/extra/cart2.png',
					title: 'Illusion',
					description: '567',
					status: 'available'
				}, {
					id: 3,
					fileName: '123',
					image: '/images/extra/cart1.png',
					title: 'Bit dungeon I',
					description: '123',
					status: 'available'
				}
			],
			buttons: [{
				mode: 'game',
				title: 'Play Cart'
			},{
				mode: 'info',
				title: 'Cartridge info'
			},{
				mode: 'buy',
				title: 'Buy Cart'
			},{
				mode: 'download',
				title: 'Download Rom'
			}],
			selectedCart: null,
			viewMode: 'info'
		}
		this.iframeBlock = this.iframeBlock.bind(this);
		this.cartInfoBlock = this.cartInfoBlock.bind(this);
		this.onCartClick = this.onCartClick.bind(this);
		this.onSwitchModeClick = this.onSwitchModeClick.bind(this);
	}

	componentDidMount() {
		if (!this.state.selectedCart) {
			this.setState({selectedCart: this.state.carts[0]});
		}
	}

	cartInfoBlock() {
		if (this.state.selectedCart && this.state.viewMode === 'info') {
			return (
				<div key={'info_' + this.state.selectedCart.id}>
					<h2>{ this.state.selectedCart.title }</h2>
					<p>{ this.state.selectedCart.description }</p>
				</div>
			);
		}

		return (null);
	}

	iframeBlock() {
		if (this.state.selectedCart && this.state.viewMode === 'game') {
			return (
				<div key={'iframe_' + this.state.selectedCart.id}>
					<Iframe
						url={"/gb/#" + this.state.selectedCart.fileName}
						width="100%"
						height="600px"
						id="emulator"
						className="myClassname"
						display="initial"
						position="relative" />
				</div>
			);
		}

		return (null);
	}

	orderBlock() {
		if (this.state.selectedCart && this.state.viewMode === 'buy') {
			return (
				<div key={'buy_' + this.state.selectedCart.id}>
					This item will be sold as soon as possible
				</div>
			);
		}

		return (null);
	}

	onCartClick(item) {
		this.setState({selectedCart: item});
	}

	onSwitchModeClick(e, mode) {
		e.preventDefault();
		if (mode === 'download') {
			fetch('./gb/rom/' + this.state.selectedCart.fileName +'.gb')
				.then(response => {
					response.blob().then(blob => {
						let url = window.URL.createObjectURL(blob);
						let a = document.createElement('a');
						a.href = url;
						a.download = this.state.selectedCart.title +'.gb';
						a.click();
					});
		});
		} else {
			this.setState({viewMode: mode});
		}
		
	}

	setButtonSet() {
		if (this.state.selectedCart) {
			return (
				<div className="container__button-set">
					{this.state.buttons.map((item, key) =>
						item.mode !== this.state.viewMode && this.state.selectedCart.status === 'available' ? <button key={"button_" + item.mode} onClick={($event) => this.onSwitchModeClick($event, item.mode)}>{item.title}</button> : null
					)}
				</div>
			);
		}
	}

	render() {
		return (
			<section className="container emulator">
				<h2 className="container__header">Select Cartridge</h2>
				<div className="container__wrapper ">
					<div className="container__row cart">
						<ul className="container__cell cart__list">
							{this.state.carts.map((item, key) =>
								<li className="cart__item" key={'cart_' + key} onClick={() => this.onCartClick(item)}>
									<img className={"cart__image " + (this.state.selectedCart && this.state.selectedCart.id === item.id ? 'active' : '')} src={item.image} title={item.title} />
								</li>
							)}
						</ul>

						<div className="container__cell cart__data">
							<div className="emulator__info"> { this.cartInfoBlock() } </div>
							<div className="emulator__game"> { this.iframeBlock() } </div>
							<div className="emulator__order"> { this.orderBlock() } </div>
							{ this.setButtonSet() }
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Emulator;