import React, { Component } from 'react';
import './popup.scss';

class Popup extends Component {

	render() {
		let checkLinkStatus = () => {
			return this.props.disc.downloadLink.length > 0;
		};

		return (
			<div className="popup">
				<a className="popup__coverLink" href={this.props.disc.downloadLink} target="_blank" rel="noopener noreferrer" >
					<img src={this.props.disc.coverLink} alt={this.props.disc.title} />
				</a>
				<div className="popup__wrapper">
					<h4 className="popup__title">
						<a href={this.props.disc.downloadLink} target="_blank" rel="noopener noreferrer">{this.props.disc.title} - ({this.props.disc.year})</a>
					</h4>
					<div className="popup__info">
						<ul className="popup__secondary-list">
							{ this.props.disc.tracklist && this.props.disc.tracklist.map((track, index) =>
								<li className="popup__secondary-item" key={index}>{track}</li>
							)}
						</ul>
					</div>
				</div>
				<div className="popup__close" onClick={this.props.onCloseClick}>&#128473;</div>
			</div>
		);
	}
}

export default Popup;