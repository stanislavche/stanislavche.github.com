import React, { Component } from 'react';
import './emulator.scss';

interface EmulatorState {
	loaded: boolean;
}

class Emulator extends Component<{}, EmulatorState> {
	state: EmulatorState = { loaded: false };

	handleLoad = () => this.setState({ loaded: true });

	render() {
		const { loaded } = this.state;
		return (
			<section className="container">
				<h2 className="container__header">HELLO WORLD</h2>
				<div className="container__wrapper emulator">
					{!loaded && (
						<div className="iframe-loader">
							<span className="iframe-loader__text">LOADING</span>
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
