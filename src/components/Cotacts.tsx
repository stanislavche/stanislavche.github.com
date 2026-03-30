import React, { Component } from 'react';
import FcSvg from '../image/fc.svg?react';
import ScSvg from '../image/sc.svg?react';
import TwSvg from '../image/tw.svg?react';
import YtSvg from '../image/yt.svg?react';
import IgSvg from '../image/ig.svg?react';
import KgSvg from '../image/kg.svg?react';
import EmSvg from '../image/em.svg?react';
import BcSvg from '../image/bc.svg?react';
import VkSvg from '../image/vk.svg?react';
import SpotiSvg from '../image/spoti.svg?react';
import { LanguageContext } from '../context/LanguageContext';

class Cotacts extends Component {
	static contextType = LanguageContext;
	declare context: React.ContextType<typeof LanguageContext>;

	render() {
		const { t } = this.context;
		return (
			<section className="container">
				<h2 className="container__header">{t('subscribe')}</h2>
				<div className="container__wrapper">
					<ul className="contact-list">
						<li className="contact-list__item">
							<a href="https://open.spotify.com/artist/4pqWR0lco3CjTBzIWuour7" className="contact-list__link contact-list__link_spoti" target="_blank" rel="noopener noreferrer">
								<SpotiSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://www.facebook.com/StressTN/" className="contact-list__link contact-list__link_fc" target="_blank" rel="noopener noreferrer">
								<FcSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://soundcloud.com/stress_tn" className="contact-list__link contact-list__link_sc" target="_blank" rel="noopener noreferrer">
								<ScSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://twitter.com/Stress_TN" className="contact-list__link contact-list__link_tw" target="_blank" rel="noopener noreferrer">
								<TwSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://www.youtube.com/@S_TN" className="contact-list__link contact-list__link_yt" target="_blank" rel="noopener noreferrer">
								<YtSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://www.instagram.com/s_tn_space/" className="contact-list__link contact-list__link_ig" target="_blank" rel="noopener noreferrer">
								<IgSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://stresstn.bandcamp.com/" className="contact-list__link contact-list__link_bc" target="_blank" rel="noopener noreferrer">
								<BcSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://vk.com/club14953852" className="contact-list__link contact-list__link_vk" target="_blank" rel="noopener noreferrer">
								<VkSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="mailto:stress_tn@yahoo.com" className="contact-list__link contact-list__link_em" target="_blank" rel="noopener noreferrer">
								<EmSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://www.facebook.com/KintoGames/" className="contact-list__link contact-list__link_kg" target="_blank" rel="noopener noreferrer">
								<KgSvg />
							</a>
						</li>
					</ul>
				</div>
			</section>
		);
	}
}

export default Cotacts;
