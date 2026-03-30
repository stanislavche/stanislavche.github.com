import React, { Component } from 'react';
import './popup.scss';

interface DiscData {
	title: string;
	author?: string;
	year?: string;
	coverLink?: string;
	downloadLink?: string;
	description?: string;
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
	bandcampDescription: string | null;
	descLoading: boolean;
}

class Popup extends Component<PopupProps, PopupState> {
	state: PopupState = { playerLoaded: false, bandcampDescription: null, descLoading: false };

	componentDidMount() {
		this.fetchDescription(this.props.disc);
	}

	componentDidUpdate(prevProps: PopupProps) {
		if (prevProps.disc !== this.props.disc) {
			this.setState({ playerLoaded: false, bandcampDescription: null, descLoading: false });
			this.fetchDescription(this.props.disc);
		}
	}

	fetchDescription(disc: DiscData) {
		// Если описание уже задано вручную — не загружаем с Bandcamp
		if (disc.description) return;
		// Загружаем только если есть ссылка на Bandcamp
		if (!disc.downloadLink) return;

		this.setState({ descLoading: true });
		fetch('/api/bandcamp-desc', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url: disc.downloadLink }),
		})
			.then(r => r.json())
			.then(data => {
				if (data.description) {
					this.setState({ bandcampDescription: data.description, descLoading: false });
				} else {
					this.setState({ descLoading: false });
				}
			})
			.catch(() => this.setState({ descLoading: false }));
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
		const { bandcampDescription, descLoading } = this.state;
		const isVideo = !!(disc.youtubeId && disc.youtubeId.length > 0);
		// Приоритет: собственное описание > загруженное с Bandcamp
		const displayDescription = disc.description || bandcampDescription;
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
						{displayDescription && (
							<div className="popup__description">
								{displayDescription.split('\n').map((line, i) =>
									line.trim() ? <p key={i}>{line}</p> : null
								)}
							</div>
						)}
						{!displayDescription && descLoading && (
							<div className="popup__desc-loading">
								<span className="popup__desc-loading-cursor">█</span>
							</div>
						)}
					</div>
				</div>
				<div className="popup__close" onClick={onCloseClick}>&#10005;</div>
			</div>
		);
	}
}

export default Popup;

