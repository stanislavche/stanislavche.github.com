import React, { Component } from 'react';
import './emulator.scss';
import { LanguageContext } from '../context/LanguageContext';

interface EmulatorState {
	loaded: boolean;
}

class Emulator extends Component<{}, EmulatorState> {
	static contextType = LanguageContext;
	declare context: React.ContextType<typeof LanguageContext>;

	state: EmulatorState = { loaded: false };

	handleLoad = () => this.setState({ loaded: true });

	render() {
		const { loaded } = this.state;
		const { t } = this.context;
		return (
			<section className="container">
				<h2 className="container__header">{t('helloWorld')}</h2>
				<div className="container__wrapper emulator">
					{!loaded && (
						<div className="iframe-loader">
							<span className="iframe-loader__text">{t('loading')}</span>
							<span className="iframe-loader__cursor">█</span>
						</div>
					)}
					<iframe
						width={'100%'}
						title={"emulator"}
						src={"https://s-tn.space/helloworld/"}
						sandbox='allow-scripts allow-same-origin'
						style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
						onLoad={this.handleLoad}
					></iframe>
				</div>
			</section>
		);
	}
}

export default Emulator;
