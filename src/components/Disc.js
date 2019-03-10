import React, { Component } from 'react';

class Disc extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<li className="discography__item">
				<a href="{this.props.disc.downloadLink}" target="_blank" rel="noopener noreferrer" className="discography__coverLink"><img src={this.props.disc.coverLink} alt={this.props.disc.title} /></a>
				<div className="discography__wrapper">
					<h4 className="discography__title">
						<a href="{this.props.disc.downloadLink}" target="_blank" rel="noopener noreferrer">{this.props.disc.title}</a>
					</h4>
					<div className="discography__info">
						<ul className="discography__secondary-list">
							{ this.props.disc.tracklist && this.props.disc.tracklist.map((track, index) =>
								<li className="discography__secondary-item" key={index}>{track}</li>
							)}
						</ul>
					</div>
				</div>
			</li>
		);
	}
}

export default Disc;