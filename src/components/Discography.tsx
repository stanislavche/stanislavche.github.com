import React, { Component } from 'react';
import Disc from './Disc';
import Popup from './Popup';
import { AppContext } from '../context/AppContext';
import { DiscographyItem } from '../types/appData'

class Discography extends Component {
	static contextType = AppContext;

	state: {
		albums: DiscographyItem[];
		singles: DiscographyItem[];
		activeItem: DiscographyItem | null;
	} = {
		albums: [],
		singles: [],
		activeItem: null
	};

	componentDidMount() {
		this.resizeMe = this.resizeMe.bind(this);
		this.onClosePopup = this.onClosePopup.bind(this);
		const ctx = this.context;
		if (ctx?.discography) {
			this.setState({
				albums: ctx.discography.filter((disc: DiscographyItem) => {
					return disc.type === 'album'
				}),
				singles: ctx.discography.filter((disc: DiscographyItem) => {
					return disc.type === 'single'
				}),
			});
		}
	}

	resizeMe(event, element) {
		event.preventDefault();
		if (element === this.state.activeItem) {
			this.setState({activeItem: null});
		} else {
			this.setState({activeItem: element});
			let target = document.getElementById('discography');
			if (window.innerWidth < 840) {
				target.scrollIntoView({block: "start", behavior: "smooth"});
			} else {
				target.scrollIntoView({block: "center", behavior: "smooth"});

			}
		}
	}

	onClosePopup(event) {
		event.preventDefault();
		this.setState({activeItem: null});
	}

	showPopup() {
		if (this.state.activeItem) {
			return <Popup disc={this.state.activeItem} onCloseClick={this.onClosePopup} />;
		} else {
			return '';
		}
	}

	render() {
		return (
			<section className="container">
				{/*<h2 className="container__header">Discography</h2>*/}
				<div id="discography" className="container__wrapper discography">
					<h3 className="container__sub-header">Albums & EPs</h3>
					<ul className="discography__list">
						{this.state.albums.map((item, key) => {
							if (item.show) {
								return <Disc disc={item}
									key={key}
									triggerClick={(event) => this.resizeMe(event, item)}
									active={item === this.state.activeItem}
								/>
							}
							return true
						})}
					</ul>
					<h3 className="container__sub-header">Singles and Remixes</h3>
					<ul className="discography__list">
						{this.state.singles.map((item, key) => {
							if (item.show) {
								return <Disc
											disc={item}
											key={key}
											triggerClick={(event) => this.resizeMe(event, item)}
											active={
												item === this.state.activeItem
											}
										/>
							}
							return true;
						})}
					</ul>

				</div>
				{this.showPopup()}
			</section>
		);
	}
}

export default Discography;
