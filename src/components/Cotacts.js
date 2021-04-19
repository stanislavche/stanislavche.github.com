import React, { Component } from 'react';
import { ReactComponent as FcSvg } from '../image/fc.svg';
import { ReactComponent as ScSvg } from '../image/sc.svg';
import { ReactComponent as TwSvg } from '../image/tw.svg';
import { ReactComponent as YtSvg } from '../image/yt.svg';
import { ReactComponent as IgSvg } from '../image/ig.svg';
import { ReactComponent as KgSvg } from '../image/kg.svg';
import { ReactComponent as EmSvg } from '../image/em.svg';
import { ReactComponent as BcSvg } from '../image/bc.svg';
import { ReactComponent as VkSvg } from '../image/vk.svg';
import { ReactComponent as SpotiSvg } from '../image/spoti.svg';

class Cotacts extends Component {
	render() {
		return (
			<section className="container">
				<h2 className="container__header">Subscribe</h2>
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
							<a href="https://www.youtube.com/user/stresstn" className="contact-list__link contact-list__link_yt" target="_blank" rel="noopener noreferrer">
								<YtSvg />
							</a>
						</li>
						<li className="contact-list__item">
							<a href="https://instagram.com/stress_tn" className="contact-list__link contact-list__link_ig" target="_blank" rel="noopener noreferrer">
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