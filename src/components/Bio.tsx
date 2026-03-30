import React, { Component } from 'react';
import { AppContext } from '../context/AppContext';
import { LanguageContext } from '../context/LanguageContext';

class Bio extends Component {
	static contextType = AppContext;

	render() {
		return (
			<LanguageContext.Consumer>
				{({ lang, t }) => {
					const ctx = this.context as any;
					const html = (lang === 'ru' && ctx?.bio_ru) ? ctx.bio_ru : (ctx?.bio || '');
					return (
						<section className="container">
							<h2 className="container__header">{t('bio')}</h2>
							<div
								className="container__wrapper"
								dangerouslySetInnerHTML={{ __html: html }}
							/>
						</section>
					);
				}}
			</LanguageContext.Consumer>
		);
	}
}

export default Bio;
