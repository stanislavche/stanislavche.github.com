import React, { Component } from 'react';

class Discography extends Component {
	constructor(props) {
		super(props);
		this.state = {
			discography : [
				{
					"title": "Littreschranzdj",
					"author": "Stress_TN",
					"year": "2010",
					"labelName": "3pan Records",
					"labelLink": "#",
					"ReleaseId": "3PND001",
					"coverLink": "../albums/littleschranzdj.jpg",
					"downloadLink": "#",
					"tracklist": [{
						"title": "Shturm",
						"link": "#"
					},{
						"title": "Littleschranzdj",
						"link": "#"
					},{
						"title": "Meeting",
						"link": "#"
					},{
						"title": "Paranoya",
						"link": "#"
					},{
						"title": "Last Power",
						"link": "#"
					},{
						"title": "Chris Li",
						"link": "#"
					},{
						"title": "Chiptech",
						"link": "#"
					}]
				}
			]
		}
	}

	render() {
		return (
			<section className="container">
				<h2 className="container__header">Discography</h2>
				<div className="container__wrapper discography">
					<ul className="discography__list">
						{this.state.discography.map((item, key) =>
							<li className="discography__item" key={key}>
								<a href="{item.downloadLink}" target="_blank" rel="noopener noreferrer" className="discography__coverLink"><img src={item.coverLink} alt={item.title} /></a>
								<div className="discography__wrapper">
									<h3 className="discography__title">
										<a href="{item.downloadLink}" target="_blank" rel="noopener noreferrer">{item.title}</a>
									</h3>
									<div className="discography__info">
										<ul className="discography__secondary-list">
											{item.tracklist.map((track, index) =>
												<li className="discography__secondary-item" key={index}>{track.title}</li>
											)}
										</ul>
									</div>
								</div>
							</li>
						)}
					</ul>
				</div>
			</section>
		);
	}
}

export default Discography;