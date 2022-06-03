import React, { Component } from "react";
import './events.scss';

class Events extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [{
					"date": "11 - 14 August 2022",
					"country": "Latvia",
					"city": "Jaunciems, Tārgale Parish",
					"title": "Festivāls Parakosm",
					"link": "https://www.facebook.com/events/512174570376446"
				},{
					"date": "08 - 11 Julu 2022",
					"country": "Estonia",
					"city": "Vana-Veski Puhkekeskus",
					"title": "Art of Nature Festival 2022",
					"link": "https://www.facebook.com/events/1017419369001223"
				},{
					"date": "23 April 2022",
					"country": "Latvia",
					"city": "Riga",
					"title": "Lokal House Hardcore Punk Party!",
					"link": "https://www.facebook.com/events/322568109862913"
				},{
					"date": "16 July 2021",
					"country": "Russia",
					"city": "Taganrog",
					"title": "OTPUSK 2021",
					"link": "https://vk.com/otpusk__2021"
				},
				{
					"date": "20 June 2021",
					"country": "Russia",
					"city": "Saint-Petersburg",
					"title": "20.06 - BleepLove 8-bit -  MOD CLUB ROOF",
					"link": "https://vk.com/bleeplove_redcups"
				},
				{
					"date": "18 June 2021",
					"country": "Russia",
					"city": "Saint-Petersburg",
					"title": "LUXURY GodOfShina в Дюнах на Лиговке",
					"link": "https://vk.com/event204992684"
				},
				{
					"date": "25 April 2021",
					"country": "Italy",
					"city": "online",
					"title": "MICROMUSIC ITALY SUNDAY JAM",
					"link": "https://youtu.be/GlTnhwDq1Ss"
				},
				{
					"date": "08 October 2020",
					"country": "Russia",
					"city": "Saint-Petersburg",
					"title": "Theremin FEST 2020",
					"link": "https://youtu.be/vI0BUcc2mAs"
				},
				{
					"date": "06 September 2020",
					"country": "Latvia",
					"city": "Riga",
					"title": "LSDJ masterclass",
					"link": "https://youtu.be/E_0T4kzRJ_g"
				},
				{
					"date": "26 June 2020",
					"country": "Latvia",
					"city": "Riga",
					"title": "Birthday Stream",
					"link": "https://www.youtube.com/watch?v=eG2uJnnNmEQ"
				},
				{
					"date": "09 January 2020",
					"country": "Russia",
					"city": "Taganrog",
					"title": "bunker.live - Stress_TN (live), Jaildigger",
					"link": "https://youtu.be/wnlOep1sgiI"
				},
				{
					"date": "28 November 2019",
					"country": "Latvia",
					"city": "Riga",
					"title": "Erica Synths Garage: Stabs, Stress_TN, Pluneptune",
					"link": "https://www.facebook.com/events/940565892987526"
				},
				{
					"date": "27 April 2019",
					"country": "Russia",
					"city": "Saint-Petersburg",
					"title": "27.04 Chiptune event • МОТИВ",
					"link": "https://vk.com/chiptuneevent"
				},
				{
					"date": "5 January 2019",
					"country": "Russia",
					"city": "Taganrog",
					"title": "PLUR Turbo",
					"link": "https://vk.com/plur_vibe"
				},
				{
					"date": "2 March 2018",
					"country": "Estonia",
					"city": "Tallin",
					"title": "Gleeetch Tallinn Express: Punker-Vintage",
					"link": "https://www.facebook.com/events/271899396674721/"
				},
				{
					"date": "15 April 2016",
					"country": "Russia",
					"city": "Taganrog",
					"title": "PLUR: Space Party",
					"link": ""
				},
				{
					"date": "22 November 2015",
					"country": "Russia",
					"city": "Taganrog",
					"title": "✖ PLUR #12 ✖",
					"link": "https://vk.com/plur_21nov"
				},
				{
					"date": "20 December 2015",
					"country": "Russia",
					"city": "Rostov-on-Don",
					"title": "ХАРД",
					"link": "https://vk.com/hardcubalibre"
				},
				{
					"date": "16 December 2012",
					"country": "World Wide Chiptune Webshow",
					"city": "",
					"title": "WWCW 2012",
					"link": ""
				},
				{
					"date": "15 November 2012",
					"country": "Russia",
					"city": "Rostov-on-Don",
					"title": "Фестиваль современного искусства СРЕЗ 5",
					"link": "https://vk.com/event45223193"
				},
				{
					"date": "6 October 2012",
					"country": "Spain",
					"city": "Barcelona",
					"title": "Low Cycle Zero",
					"link": "http://www.lowtoy.com/"
				},
				{
					"date": "1 July 2012",
					"country": "Russia",
					"city": "Saint-Petersburg",
					"title": "HOLY8BIT PRTY + Breakcore Massacre Night",
					"link": "https://vk.com/holy8bit"
				},
				{
					"date": "25 April 2012",
					"country": "Russia",
					"city": "Moscow",
					"title": "Stress_TN на 8bit.fm",
					"link": "http://8bit.fm/"
				},
				{
					"date": "6 April 2012",
					"country": "Russia",
					"city": "Taganrog",
					"title": "NO MORE SOUND Фестиваль Экспериментальной музыки",
					"link": "https://vk.com/no_more_sound"
				},
				{
					"date": "25 февраля 2012",
					"country": "Russia",
					"city": "Rostov-on-Don",
					"title": "Rostov All Stars",
					"link": ""
				},
				{
					"date": "24 February 2012",
					"country": "Russia",
					"city": "Taganrog",
					"title": "ТОЧКА СБОРКИ",
					"link": "https://vk.com/ts242"
				},{
					"date": "19 February 2012",
					"country": "Russia",
					"city": "Taganrog",
					"title": "OblackA в Закрытых пространствах",
					"link": "https://vk.com/oblacka"
				},{
					"date": "11 February 2012",
					"country": "Russia",
					"city": "Taganrog",
					"title": "INFERNAL REVEL",
					"link": "https://vk.com/event34877716"
				},{
					"date": "28 December 2011",
					"country": "Russia",
					"city": "Krasnodar",
					"title": "IN HARD WE TRUST",
					"link": "https://vk.com/event32213941"
				},{
					"date": "19 November 2011",
					"country": "Russia",
					"city": "Taganrog",
					"title": "FREE ZONE: in_dust_we_trust",
					"link": "https://vk.com/event32026801"
				},{
					"date": "14 October 2011",
					"country": "Russia",
					"city": "Taganrog",
					"title": "ТОЧКА СБОРКИ",
					"link": "https://vk.com/event30781624"
				},{
					"date": "05 January 2011",
					"country": "Russia",
					"city": "Rostov-on-Don",
					"title": "+ SUPER MEAT BASS +",
					"link": "https://vk.com/event22858496"
				},{
					"date": "26 June 2010",
					"country": "Russia",
					"city": "Taganrog",
					"title": "ZAVODPARTY.RU Festival 2010",
					"link": "https://vk.com/event18136735"
				},{
					"date": "01 May 2010",
					"country": "Russia",
					"city": "Taganrog",
					"title": "«КОНЦЕРТ ЭЛЕКТРОННОЙ МУЗЫКИ»",
					"link": "https://vk.com/event17095040"
				},{
					"date": "09 March 2010",
					"country": "Russia",
					"city": "Taganrog",
					"title": "FREE ZONE: World DJ Day @ \"STARS\"",
					"link": "https://vk.com/event16012478"
				},{
					"date": "25 июля 2009",
					"country": "Russia",
					"city": "Anapa",
					"title": "Open-Air(Part 2) \"RP White KingDom\" вечеринка",
					"link": "https://vk.com/event10727800"
				},
				{
					"date": "3 October 2009",
					"country": "Russia",
					"city": "Taganrog",
					"title": "FREE ZONE: Коридорный Рейв",
					"link": "https://vk.com/event11923043"
				}
			]
		}
	}

	render() {
		let checkLink = (item) => {
			if (item.link) {
				return (
					<a href={(item.link ? item.link : "#")} target="_blank" className="events__link events__text" rel="noopener noreferrer">{item.country} - {item.date} - {item.title}</a>
				);
			} else {
				return (
					<p className="events__text">{item.country} - {item.date} - {item.title}</p>
				);
			}
		}

		return (
			<section className="container">
				<h2 className="container__header">Events</h2>
				<div className="container__wrapper events">
					<ul className="events__list">
						{this.state.events.map((item, key) =>
							<li className="events__item" key={key}>
								{ checkLink(item) }
							</li>
						)}
					</ul>
				</div>
			</section>
		);
	}
}

export default Events;
