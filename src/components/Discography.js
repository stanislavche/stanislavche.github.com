import React, { Component } from 'react';
import Disc from './Disc';
import Popup from './Popup';

class Discography extends Component {
	constructor(props) {
		super(props);
		this.state = {
			albums : [
				{
					"title": "bit Dungeon 2 OST",
					"author": "Stress_TN",
					"year": "2014",
					"labelName": "",
					"labelLink": "",
					"releaseId": "",
					"coverLink": "../images/albums/bitdungeon2.jpg",
					"downloadLink": "https://stresstn.bandcamp.com/album/bit-dungeon-2-ost",
					"tracklist": [
						"Castle",
						"Commodore bass preview",
						"Firstflower",
						"Game boy sketch",
						"Herovo gore",
						"Senseless war",
						"Victory madnes"
					]
				},
				{
					"title": "bit Dungeon OST",
					"author": "Stress_TN",
					"year": "2013",
					"labelName": "Noisechannel",
					"labelLink": "http://www.noisechannel.org/",
					"releaseId": "nc054",
					"coverLink": "../images/albums/bitdungeon.png",
					"downloadLink": "http://www.noisechannel.org/downloads/nc054.php",
					"tracklist": [
						"bit Dungeon intro",
						"bit Dungeon part 1",
						"bit Dungeon part 2"
					]
				},
				{
					"title": "Happy",
					"author": "Stress TN, VRUMZSSSR, 3an",
					"year": "2013",
					"labelName": "Bleeplove",
					"labelLink": "https://bleeplove.bandcamp.com/",
					"releaseId": "",
					"coverLink": "../images/albums/happy.png",
					"downloadLink": "http://archive.org/details/Bleeplove-Happy",
					"tracklist": [
						"VRUMZSSSR - Showdown",
						"VRUMZSSSR - Marry Xmans",
						"Stress_TN - Skachki krotov",
						"Stress_TN - Cosmo warrior",
						"<3an - Looooov3"
					]
				},
				{
					"title": "Gangsta With Blasta",
					"author": "Stress TN, GameGate, Milkdrop",
					"year": "2012",
					"labelName": "Lowtoy",
					"labelLink": "http://www.lowtoy.com/",
					"releaseId": "lwt 13",
					"coverLink": "../images/albums/GangstaWithBlasta.jpg",
					"downloadLink": "http://www.lowtoy.com/portfolio/va-gangsta-with-blasta/",
					"tracklist": [
						"Milkdrop – Red Cat And Skinny Rat",
						"Milkdrop – Alice",
						"Stress_TN & Milkdrop – Get Me Magic",
						"Stress_TN – Huracan",
						"Stress_TN & Game Gate – Space",
						"Game Gate – Apolo",
						"Game Gate – Lonely Soldier"
					]
				},
				{
					"title": "Great Pixel Storm",
					"author": "Stress_TN, Мой сосед Лао Цзы",
					"year": "2012",
					"labelName": "Bleeplove",
					"labelLink": "https://bleeplove.bandcamp.com/",
					"releaseId": "",
					"coverLink": "../images/albums/greatpixelstorm.jpg",
					"downloadLink": "https://drive.google.com/uc?authuser=0&id=1rFhX9VU8DeqQwpAkDYMzn22Scqv-D9zI&export=download",
					"tracklist": [
						"Stress_TN - Computa",
						"Мой сосед Лао Цзы - Nothing Has Changed",
						"Мой сосед Лао Цзы – A Sparrow",
						"Stress_TN – Pixel punks",
						"Stress_TN – Race for a dream",
						"Мой сосед Лао Цзы – Heroes Of Time"
					]
				},
				{
					"title": "Consolisation",
					"author": "Stress_TN",
					"year": "2011",
					"labelName": "Lowtoy",
					"labelLink": "http://www.lowtoy.com/",
					"releaseId": "lwt 09",
					"coverLink": "../images/albums/consolisation.jpg",
					"downloadLink": "https://stresstn.bandcamp.com/album/consolisation-lsdj-sav-file-include",
					"tracklist": [
						"Pixel Bombing",
						"Tank Resistance",
						"Rescue Expedition",
						"Last Chance",
						"Decisive Battle",
						"Enslaving Of People Melody",
						"Consolisation Win Melody",
						"Enslaving Of People Melody (CMOS Killers Remix)",
						"Consolisation win melody (Gidropony Remix)",
						"NES Games Bonus"
					]
				},
				{
					"title": "Smoking Fighters",
					"author": "Stress_TN",
					"year": "2011",
					"labelName": "Chippanze",
					"labelLink": "https://chippanze.bandcamp.com/",
					"releaseId": "CP035",
					"coverLink": "../images/albums/smokingfighters.jpg",
					"downloadLink": "https://chippanze.bandcamp.com/album/cp035-smoking-fighters",
					"tracklist": [
						"Square power",
						"Prima Shooter",
						"Wob Bob",
						"Decibel",
						"Piz.DOS",
						"Invanders lunch",
						"Siberia",
						"TMNT rmx (Bonus track)"
					]
				},
				{
					"title": "Chipolino Alliance",
					"author": "Stress_TN, BOB The Builder!, Fat Frumos, 8bitchyfruit",
					"year": "2010",
					"labelName": "Bitmasters",
					"labelLink": "",
					"releaseId": "",
					"coverLink": "../images/albums/chipolino.jpg",
					"downloadLink": "",
					"tracklist": [
						"Fat Frumos - Badman",
						"Fat Frumos - Hil' with pixel eyes",
						"BOB The Builder! - Gazmanov's somersault",
						"BOB The Builder! - Jeso cristo",
						"Stress_TN - Schranz Reserved",
						"Stress_TN - Tick Tack Boom",
						"8[bit]chyfruit - b.l.n.t.o.e.t",
						"8[bit]chyfruit - Lone Rugrat"
					]
				},
				{
					"title": "Terrible Noize",
					"author": "Stress_TN",
					"year": "2010",
					"labelName": "Bitmasters",
					"labelLink": "",
					"releaseId": "",
					"coverLink": "../images/albums/terriblenoise.gif",
					"downloadLink": "",
					"tracklist": [
						"Destiny",
						"Flying",
						"LonelyNes",
						"Memory",
						"Rasta"
					]
				},
				{
					"title": "Omlet",
					"author": "Stress_TN",
					"year": "2010",
					"labelName": "Ruszud",
					"labelLink": "https://vk.com/ruszud",
					"releaseId": "rz157",
					"coverLink": "../images/albums/omlet.jpg",
					"downloadLink": "https://archive.org/details/rz_157",
					"tracklist": [
						"Happy Twist",
						"Xyp",
						"Omlet",
						"Dnb",
						"Right"
					]
				},
				{
					"title": "First Console Aid",
					"author": "Stress_TN, 2NRO8OT, Nextspace",
					"year": "2010",
					"labelName": "Breakcoreyourself",
					"labelLink": "",
					"releaseId": "",
					"coverLink": "../images/albums/FirstConsoleAid.png",
					"downloadLink": "",
					"tracklist": [
						"2NRO8OT - Evacuation",
						"2NRO8OT - NGC 1300",
						"2NRO8OT - Ravenosnie Sosudi (Raveносные Сосуды)",
						"2NRO8OT - Visit To Other Galaxy (Посещение Другой Галактики)",
						"Stress_TN - Empire",
						"Stress_TN - lepricon",
						"Stress_TN - lyric",
						"Stress_TN - melok",
						"Nextspace - Electric Robots",
						"Nextspace - I'N'U",
						"Nextspace - monobit"
					]
				},
				{
					"title": "Littreschranzdj",
					"author": "Stress_TN",
					"year": "2010",
					"labelName": "3pan Records",
					"labelLink": "",
					"releaseId": "3PND001",
					"coverLink": "../images/albums/littleschranzdj.jpg",
					"downloadLink": "",
					"tracklist": [
						"Shturm",
						"Littleschranzdj",
						"Meeting",
						"Paranoya",
						"Last Power",
						"Chris Li",
						"Chiptech"
					]
				}
			],
			singles : [
				{
					"title": "Chiptunes From Russia",
					"author": "Various Artist",
					"year": "2016",
					"labelName": "Forest",
					"labelLink": "https://forestlabel.bandcamp.com/",
					"releaseId": "",
					"coverLink": "../images/albums/chiptunesfromrussia.jpg",
					"downloadLink": "https://forestlabel.bandcamp.com/album/chiptunes-from-russia",
					"tracklist": [
						"AlexOgre - stay wavy",
						"Marshall Art - Goodbye, Oil Age",
						"EyeScream - Dear Airstrike",
						"Purely Grey - Tides",
						"Zan - Moon",
						"Final Sketch - Need For Adventures",
						"Stress_TN - acid forest theme",
						"Chippusetto - Brothers with explosive fists",
						"burryleak - spark",
						"daletune - wasted",
						"Screamwod - Wonder Eyes"
					]
				},
				{
					"title": "Bleep Love Vol.4",
					"author": "Various Artist",
					"year": "2013",
					"labelName": "Bleeplove",
					"labelLink": "https://bleeplove.bandcamp.com/",
					"releaseId": "",
					"coverLink": "../images/albums/Bleeplove4.png",
					"downloadLink": "https://bleeplove.bandcamp.com/album/bleeplove-vol-4",
					"tracklist": [
						"BOOSH! - 16:Boner Dust",
						"GameGate - Snowy city night",
						"Twistboy - Tower Jump",
						"Awesome Force - Rocket park",
						"Console killer - Destiny",
						"Solarbear - How to Properly Use a Semicolon",
						"Laffe the Fox - Apathetic Theme",
						"Chasingbleeps - Last Summer",
						"Balloonbear - Slack-Jawed (ft. Skip Sandwich DX)",
						"Duatiga Attack! - The Saddest Song",
						"Men of Mega - Ruan McGrath",
						"AlexOgre - Petunia",
						"Bubu - Flow",
						"Electric children - Cerulean Sunrise",
						"<3an - Sw∆g",
						"CHAINSAW POLICE - Bear punch",
						"Starpilot - Flux Ropes",
						"Dj CUTMAN - Cycle (BleepLove mix}",
						"Skip Cloud - 157 Miles",
						"Porter Robinson Vs Zedd - Clear Language (Mega Flare Mash Up) Final",
						"Skip Sandwich DX - Juice Box Junkie",
						"VRUMZSSSR - Asume me, Kraken",
						"MisfitChris - Zommie_Feat_Zommie",
						"Joseph Eidson - Children of Fire",
						"Reboot Me - Runaway",
						"Holy Konni - Loves Russia",
						"The Trick - Pixel’s",
						"Orbital Strike - ¥acht €lub",
						"Stress_TN - Classic voyage",
						"Together We Are Robots - Ghost Stories"
					]
				},
				{
					"title": "Russia in 8bits",
					"author": "Various Artist",
					"year": "2013",
					"labelName": "Coucou",
					"labelLink": "",
					"releaseId": "coucou23",
					"coverLink": "../images/albums/Russia_in_8bits.jpg",
					"downloadLink": "https://archive.org/details/COUCOU023",
					"tracklist": [
						"Alex Ogre - Midnight Magic",
						"Gidropony - Discokidz",
						"VRUMZSSSR - Marry Xmans",
						"ChinaToy - Variouz TEC2",
						"KOSMOPOP2 - 008080",
						"Stress_TN - Barcelona nights",
						"Fat Frumos - The day when my computer was die",
						"Nuclear Mushroom Boom - Otto",
						"Balloonbear - Depth",
						"Feonaoh - Sweet Nightmare"
					]
				},
				{
					"title": "Chip Country",
					"author": "Various Artist",
					"year": "2012",
					"labelName": "",
					"labelLink": "",
					"releaseId": "",
					"coverLink": "../images/albums/Chip_Country.png",
					"downloadLink": "https://dkvine.com/features/music/chip_country/",
					"tracklist": [
						"HeavyW8bit ChampionChip - Theme/Cranky's Theme",
						"Nyhlin - DK Island Swing",
						"Men of Mega - Bonus Room Blitz",
						"AlexOgre - Aquatic Ambiance",
						"Balloonbear - Fear Factory",
						"MyLifeIsPixels - Lockjaw's Saga",
						"PANDAstar - Funky's in da Forest (Forest Interlude)",
						"S.P.R.Y. - Funky's Fugue",
						"Sombreronegro - Lockjaw's Saga",
						"Laffe the Fox - Hot Head Bop",
						"National Broadcast Network - Disco Train",
						"Bitman - Kannon's Klaim",
						"spOOked - Simian Segue",
						"Homonintendus - Sinister Jungle Groove (DK Island Swing)",
						"Stress_TN - Aquatic Ambiance",
						"8-BITchin'tendo - Life in the Mines",
						"AQ64 - Bonus Room Blitz",
						"BOOSH! - Water World",
						"KOMH - Funky's Fugue",
						"Iron Curtain - Flight of the Zinger",
						"Laffe the Fox - Run, Rambi! Run!",
						"AciDnB - Disco Train",
						"woahfox - Stickerbrush Symphony",
						"Superboy - In a Snow-Bound Land",
						"Nestrogen - Aquatic Ambiance",
						"PolarBirds - Fear Factory (Dystopia Rendition)",
						"AQ64 - Gangplank Galleon",
						"MINTENDO - Crocodile Cacophony",
						"Pieces of Eight - Land, Air, and Sea (Northern Kremisphere)",
						"Zalza - Bayou Boogie (Panic Monkey Remix)"
					]
				},
				{
					"title": "BleepLove vol.3 part 2",
					"author": "Various Artist",
					"year": "2012",
					"labelName": "https://bleeplove.bandcamp.com/",
					"labelLink": "",
					"releaseId": "",
					"coverLink": "../images/albums/bleepLove3.png",
					"downloadLink": "https://bleeplove.bandcamp.com/album/bleeplove-vol-3-2",
					"tracklist": [
						"My Neighbor Lao Tzu - Fe2O3",
						"TV or not TV - Dead on The Dancefloor",
						"Stress_TN - Gameball",
						"Reboot Me - Like A Plastic Bag",
						"Kubbi - Television for robots",
						"EyeScream - Through the New Dawn",
						"The trick - Tr-Dos",
						"SkweeeRRL vs. porno-UZI - Melancholia",
						"MyLifeIsPixels - Silica Dream",
						"fakediscoclub - YW",
						"Ulitka boogie - Young boy in love",
						"Feonaoh - The Last"
					]
				},
				{
					"title": "Bleeplove vol.1",
					"author": "Various Artist",
					"year": "2011",
					"labelName": "Bleeplove",
					"labelLink": "https://bleeplove.bandcamp.com/",
					"releaseId": "",
					"coverLink": "../images/albums/bleeplove1.png",
					"downloadLink": "https://archive.org/details/BleeploveVol.1",
					"tracklist": [
						"Dispex64 - Looking for Happiness",
						"My Neighbor Lao Tzu / Stress TN - Little Ship Inside The Chip",
						"AlexOgre - Twisted vendor",
						"VRUMZSSSR - Dakota, Dansa & Neon",
						"<3an - BleepLove",
						"Nextspace - Turtle",
						"Spacemilk - Colombo (Bonus track)"
					]
				},
				{
					"title": "Chafer",
					"author": "Various Artist",
					"year": "2011",
					"labelName": "Ruszud",
					"labelLink": "https://vk.com/ruszud",
					"releaseId": "rz220",
					"coverLink": "../images/albums/chafer.jpg",
					"downloadLink": "http://www.archive.org/details/rz220",
					"tracklist": [
						"vefiretiwina - C3POs rampage",
						"NEMO - Mary-go-Round",
						"MICROCOBRA - Scorpion vs Cobra",
						"Stress TN - Power wave",
						"<3an - skipjack",
						"Moaner - SOS",
						"Nextspace - dodo XD",
						"fakediscoclub - wOOt",
						"Synthetic Boy - Box with basses",
						"Max Tailord - Fucking boy"
					]
				},
				{
					"title": "New Year Battle 2011",
					"author": "Various Artist",
					"year": "2011",
					"labelName": "8081",
					"labelLink": "https://8081.bandcamp.com/",
					"releaseId": "8081-va005",
					"coverLink": "../images/albums/newyearbattle.gif",
					"downloadLink": "https://8081.bandcamp.com/album/new-year-battle-2011",
					"tracklist": [
						"xiaoxiao - happy new year",
						"Dhara Vara - snow haribol",
						"Moaner - -30c",
						"Мой Сосед Лао Цзы - Час до Рождества",
						"BOB The Builder! - christmas spirit hohoho",
						"Neverover! - Forget It",
						"$ele№, Pixel Rat - N.R.R.",
						"Captain Rainbow - Snowflakes Whirl At A Rapid Pace",
						"fakediscoclub - xoxo",
						"CJ Noks - Magic Snow Holidays",
						"microcobra - Ded Moroz, Drunk Nose",
						"<3an - Last Christmas",
						"ogre - dancing winter snow",
						"Stress_TN - Morning surprise",
						"Nuclear Mushroom Boom - Two Weightlifters"
					]
				},
				{
					"title": "The Pulse Of The Blue Star",
					"author": "Various Artist",
					"year": "2010",
					"labelName": "8081",
					"labelLink": "",
					"releaseId": "8081-va002",
					"coverLink": "../images/albums/pulse.jpg",
					"downloadLink": "https://8081.bandcamp.com/album/the-pulse-of-the-blue-star",
					"tracklist": [
						"Мой сосед Лао Цзы - Emptiness",
						"<3an - Flying in the sky",
						"ogre - to the stars",
						"Stress_TN - Vacuum Machine",
						"$ele№, Pixel Rat - 05",
						"MICROCOBRA - RAKETA",
						"<3an - Go to space",
						"ogre - extra"
					]
				},
				{
					"title": "BITMASTERS VOL.2: Vital Sines",
					"author": "Various Artist",
					"year": "2010",
					"labelName": "Bitmasters",
					"labelLink": "",
					"releaseId": "",
					"coverLink": "../images/albums/bitmasters2.gif",
					"downloadLink": "http://www.mediafire.com/file/k00tdgemjm4/BITMASTERS+VOL.2.zip",
					"tracklist": [
						"Sycamore Drive - Happiness In Winter",
						"Alucard - Nightfall",
						"Cartoon Bomb - Speed Of Dark",
						"DEADBEATBLAST - Cross Vector",
						"Hellz - Riviera ~ Encounter! (Remix)",
						"TWELVE INSOMNIA - Shibuya on Fire",
						"MicroD - Palisade",
						"We The Sick - And Yet We Keep on Trying",
						"Standby emulator - 061109",
						"Phazeshift - Sally",
						"Je M'appelle - The Dust Dance",
						"ZAZI - Azure Dreams",
						"Bleepshit - We Can't Die Coz We Are Living!",
						"Zomvor - Peach Pupils",
						"robochip漀 - 24 and friend",
						"Robinerd - Town Music",
						"Broken Board Broken Life - RRR",
						"Jophish - Error Pending",
						"BEASTMODE - DEADLY WEAPON",
						"Stress_TN - Lazy Cat"
					]
				},
				{
					"title": "The Chip Tribute To Aphex Twin",
					"author": "Various Artist",
					"year": "2010",
					"labelName": "",
					"labelLink": "",
					"releaseId": "",
					"coverLink": "../images/albums/aphextwin.png",
					"downloadLink": "http://www.milkcrate.com.au/emar/AFX/",
					"tracklist": [
						"Brother Android - IZ-US [Come To Daddy EP]",
						"Emar - On [On EP]",
						"Baron Knoxburry - Alberto Balsam [I Care Because You Do]",
						"Jellica - VBS redlof B(Cab Elite Floss Snorts version) [Analord 11]",
						"Sneedlehog - Pulsewidth [Selected Ambient Works 85-92]",
						"Motone - Metapharstic [Classics]",
						"Nyarlathotep - BitYips [OG Composition]",
						"Phase Terminale - Untitled #6 [Melodies from Mars]",
						"Poke-1,170 - Curtain [selected ambient works VOL 2]",
						"Firebrand Boy - Avril 14th [Drukqs]",
						"Zomvor - Soltox [OG Composition]",
						"Shame_boy - Logon Witch Rock [Melodies from Mars]",
						"Stress_TN - Come to Daddy [Come to Daddy EP]"
					]
				}
			],
			activeItem : null
		};

		this.resizeMe = this.resizeMe.bind(this);
		this.onClosePopup = this.onClosePopup.bind(this);
	}

	resizeMe(event, element) {
		event.preventDefault();
		if (element === this.state.activeItem) {
			this.setState({activeItem: null});
		} else {
			this.setState({activeItem: element});
		}
	}

	onClosePopup(event) {
		event.preventDefault();
		this.setState({activeItem: null});
	}

	showPopup() {
		if (this.state.activeItem) {
			return <Popup disc={this.state.activeItem} onCloseClick={this.onClosePopup} />;
		} else {
			return '';
		}
	}

	render() {
		return (
			<section className="container">
				{/*<h2 className="container__header">Discography</h2>*/}
				<div className="container__wrapper discography">
					<h3 className="container__sub-header">Albums & EPs</h3>
					<ul className="discography__list">
						{this.state.albums.map((item, key) =>
							<Disc disc={item} key={key} triggerClick={(event) => this.resizeMe(event, item)} active={item === this.state.activeItem}/>
						)}
					</ul>
					<h3 className="container__sub-header">Singles and Remixes</h3>
					<ul className="discography__list">
						{this.state.singles.map((item, key) =>
							<Disc disc={item} key={key} triggerClick={(event) => this.resizeMe(event, item)} active={item === this.state.activeItem}/>
						)}
					</ul>
					
				</div>
				{this.showPopup()}
			</section>
		);
	}
}

export default Discography;