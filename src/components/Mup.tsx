import React, { Component } from 'react';
import './mup.scss';

interface MupState {
	loaded: boolean;
	error: boolean;
}

class Mup extends Component<{}, MupState> {
	state: MupState = { loaded: false, error: false };

	handleLoad = () => this.setState({ loaded: true });
	handleError = () => this.setState({ loaded: true, error: true });

	render() {
		const { loaded } = this.state;
		return (
			<section className="container">
				<h2 className="container__header">MUP</h2>
				<div className="container__wrapper mup">
					{!loaded && (
						<div className="iframe-loader">
							<span className="iframe-loader__text">LOADING</span>
							<span className="iframe-loader__cursor">█</span>
						</div>
					)}
					<iframe
						width={'100%'} height={'450px'} title={"mir"}
						src={"https://s-tn.space/mup/?animation=hide"}
						sandbox='allow-scripts allow-same-origin'
						style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
						onLoad={this.handleLoad}
						onError={this.handleError}
					></iframe>
				</div>
			</section>
		);
	}
}

export default Mup;