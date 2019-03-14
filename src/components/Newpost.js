import React, { Component } from "react";
import ReactPlayer from 'react-player'

class Newpost extends Component {
	render() {
		let renderMediaBlock = () => {
			switch(this.props.data.type) {
				case "video":
					return (<ReactPlayer url={this.props.data.media} controls width="50%" height="70%" className="news__media" /> );
				case "image":
					if (this.props.data.link.length > 0) {
						return (<a className="news__link" href={this.props.data.link} title={this.props.data.title}><img className="news__media" src={this.props.data.media} alt="this.props.data.title" /></a>);
					}
					return (<img className="news__media" src={this.props.data.media} alt="this.props.data.title" />);
				default:
					return ("");
			}
		};
		let checkLink = () => {
			if (this.props.data.link.length > 0) {
				return (<a className="news__link" href={this.props.data.link} title={this.props.data.title}><h4 className="news__title">{this.props.data.title}</h4></a>);
			}
			return (<h4 className="news__title">{this.props.data.title}</h4>);
		};
		let postDate = (new Date(this.props.data.date)).toUTCString();
		return (
			<li className="news__item">
				{checkLink()}
				<p className="news__date">({postDate})</p>
				{renderMediaBlock()}
				<p className="news__description">{this.props.data.description}</p>
			</li>
		);
	}
}

export default Newpost;