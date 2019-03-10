import React, { Component } from 'react';

class Disc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		}
		this.resizeMe = this.resizeMe.bind(this);
	}

	resizeMe(event) {
		event.preventDefault();
		this.setState({active: !this.state.active});
	}

	render() {
		return (
			<li className={"discography__item " + (this.state.active ? "discography__item_active" : "")} >
				<a href="#" rel="noopener noreferrer" className="discography__coverLink" onClick={this.resizeMe}>
					<div className="discography__anotation">
						<p className="discography__anotation-test">{this.props.disc.author + ' - ' + this.props.disc.title}</p>
					</div>
					<img src={this.props.disc.coverLink} alt={this.props.disc.title} />
				</a>
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