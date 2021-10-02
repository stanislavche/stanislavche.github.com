import React, { Component } from 'react';
import './popup.scss';

class Popup extends Component {
	renderPlayer() {
		if (this.props.disc.bandcampAlbum && this.props.disc.bandcampAlbum.toString().length > 0) {
			let link = "https://bandcamp.com/EmbeddedPlayer/album=" + this.props.disc.bandcampAlbum + "/size=large/bgcol=333333/linkcol=4ec5ec/tracklist=false/artwork=small/transparent=true/";
			return(
				<div className="bandcamp-layer">
					<iframe
						src={link}
						seamless
						title={this.props.disc.title}
						>
							<a href="{this.props.disc.downloadLink}">{this.props.disc.title}</a>
					</iframe>
				</div>
			);
		}
		if (this.props.disc.soundcloudPlayer && this.props.disc.soundcloudPlayer.toString().length > 0) {
			return(
				<div className="bandcamp-layer">
					<iframe
						width="100%"
						height="166"
						scrolling="no"
						title={this.props.disc.title}
						frameBorder="no"
						allow="autoplay"
						src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + this.props.disc.soundcloudPlayer + "&color=%235abcf2&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"}>
					</iframe>
				</div>
			)
		}
		return false;
		
	}

	render() {
		return (
			<div className="popup">
				<div className="popup__left">
					<a className="popup__coverLink" href={this.props.disc.downloadLink} target="_blank" rel="noopener noreferrer" >
						<img src={this.props.disc.coverLink} alt={this.props.disc.title} />
					</a>
					<ul>
						<li></li>
					</ul>
				</div>
				<div className="popup__wrapper">
					{this.renderPlayer()}
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