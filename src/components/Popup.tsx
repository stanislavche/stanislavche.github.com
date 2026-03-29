import React, { Component } from 'react';
import './popup.scss';

interface DiscData {
	title: string;
	author?: string;
	year?: string;
	coverLink?: string;
	downloadLink?: string;
	tracklist?: string[];
	bandcampAlbum?: number | string;
	bandcampTrack?: number | string;
	soundcloudPlayer?: number | string;
	youtubeId?: string;
}

interface PopupProps {
	disc: DiscData;
	onCloseClick: (event: React.MouseEvent) => void;
}

interface PopupState {
	playerLoaded: boolean;
}

class Popup extends Component<PopupProps, PopupState> {
	state: PopupState = { playerLoaded: false };

	componentDidUpdate(prevProps: PopupProps) {
		if (prevProps.disc !== this.props.disc) {
			this.setState({ playerLoaded: false });
		}
	}

	handleLoad = () => this.setState({ playerLoaded: true });

	renderLoader(isYoutube = false) {
		if (this.state.playerLoaded) return null;
		return (
			<div className={`player-loader${isYoutube ? ' player-loader--youtube' : ''}`}>
				<span className="player-loader__text">LOADING</span>
				<span className="player-loader__cursor">█</span>
			</div>
		);
	}

	renderPlayer() {
		const { disc } = this.props;
		const { playerLoaded } = this.state;

		if (disc.bandcampAlbum && disc.bandcampAlbum.toString().length > 0) {
			const link = 'https://bandcamp.com/EmbeddedPlayer/album=' + disc.bandcampAlbum + '/size=large/bgcol=333333/linkcol=4ec5ec/tracklist=false/artwork=small/transparent=true/';
			return (
				<div className="bandcamp-layer">
					{this.renderLoader(false)}
					<iframe src={link} seamless title={disc.title}
						style={{ opacity: playerLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
						onLoad={this.handleLoad}>
						<a href={disc.downloadLink}>{disc.title}</a>
					</iframe>
				</div>
			);
		}
		if (disc.bandcampTrack && disc.bandcampTrack.toString().length > 0) {
			const link = 'https://bandcamp.com/EmbeddedPlayer/track=' + disc.bandcampTrack + '/size=large/bgcol=333333/linkcol=4ec5ec/tracklist=false/artwork=small/transparent=true/';
			return (
				<div className="bandcamp-layer">
					{this.renderLoader(false)}
					<iframe src={link} seamless title={disc.title}
						style={{ opacity: playerLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
						onLoad={this.handleLoad}>
						<a href={disc.downloadLink}>{disc.title}</a>
					</iframe>
				</div>
			);
		}
		if (disc.soundcloudPlayer && disc.soundcloudPlayer.toString().length > 0) {
			return (
				<div className="bandcamp-layer">
					{this.renderLoader(false)}
					<iframe
						width="100%" height="166" scrolling="no" title={disc.title}
						frameBorder="no" allow="autoplay"
						style={{ opacity: playerLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
						onLoad={this.handleLoad}
						src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + disc.soundcloudPlayer + '&color=%235abcf2&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'}>
					</iframe>
				</div>
			);
		}
		if (disc.youtubeId && disc.youtubeId.length > 0) {
			const src = 'https://www.youtube.com/embed/' + disc.youtubeId + '?rel=0&modestbranding=1';
			return (
				<div className="bandcamp-layer bandcamp-layer--youtube">
					{this.renderLoader(true)}
					<iframe
						width="100%" height="200" src={src} title={disc.title}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						style={{ opacity: playerLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
						onLoad={this.handleLoad}
					></iframe>
				</div>
			);
		}
		return false;
	}

	render() {
		const { disc, onCloseClick } = this.props;
		const isVideo = !!(disc.youtubeId && disc.youtubeId.length > 0);
		return (
			<div className="popup">
				<div className="popup__left">
					<a className="popup__coverLink" href={disc.downloadLink} target="_blank" rel="noopener noreferrer">
						<img src={disc.coverLink} alt={disc.title} />
					</a>
					{isVideo && this.renderPlayer()}
					<ul><li></li></ul>
				</div>
				<div className="popup__wrapper">
					{!isVideo && this.renderPlayer()}
					<h4 className="popup__title">
						<a href={disc.downloadLink} target="_blank" rel="noopener noreferrer">{disc.title} - ({disc.year})</a>
					</h4>
					<div className="popup__info">
						<ul className="popup__secondary-list">
							{disc.tracklist && disc.tracklist.map((track, index) =>
								<li className="popup__secondary-item" key={index}>{track}</li>
							)}
						</ul>
					</div>
				</div>
				<div className="popup__close" onClick={onCloseClick}>&#10005;</div>
			</div>
		);
	}
}

export default Popup;

