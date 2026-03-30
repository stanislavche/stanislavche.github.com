import React, { Component } from "react";
import ReactPlayer from 'react-player'
import './player.scss';
import { LanguageContext } from '../context/LanguageContext';

class Announce extends Component {
	static contextType = LanguageContext;
	declare context: React.ContextType<typeof LanguageContext>;

	render() {
		const { t } = this.context;
		let playlist = 'https://soundcloud.com/stress_tn/sets/playlist-for-website';
		return (
			<section className="container">
				<h2 className="container__header">{t('music')}</h2>
				<div className="container__wrapper player">
					<ReactPlayer url={playlist} width="100%" height="401px" />
				</div>
			</section>
		);
	}
}

export default Announce;