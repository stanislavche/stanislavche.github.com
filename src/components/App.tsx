import { Component } from 'react';
import Bio from './Bio';
import News from './News';
import Discography from './Discography';
import Cotacts from './Cotacts';
import Game from './Game';
import Emulator from './Emulator';
import Donate from './Donate';
import Events from './Events';
import Player from './Player';
import Kits from './Kits';
import "./loadscreen.scss";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import Mup from "./Mup";
import { AppContext } from '../context/AppContext';
import AdminPanel from './admin/AdminPanel';
import { LanguageContext, useLanguage } from '../context/LanguageContext';

// ── Переключатель языка ──────────────────────────────────────────────────────
function LangSwitcher() {
	const { lang, setLang } = useLanguage();
	return (
		<div className="lang-switcher">
			<button
				className={`lang-switcher__btn${lang === 'ru' ? ' lang-switcher__btn--active' : ''}`}
				onClick={() => setLang('ru')}
				aria-label="Русский"
			>RU</button>
			<span className="lang-switcher__sep">/</span>
			<button
				className={`lang-switcher__btn${lang === 'en' ? ' lang-switcher__btn--active' : ''}`}
				onClick={() => setLang('en')}
				aria-label="English"
			>EN</button>
		</div>
	);
}

class App extends Component {
	static contextType = AppContext;

	state = {
		visibleSections: null
	};

	componentDidMount() {
		const ctx = this.context;
		if (ctx?.visibleSections) {
			this.setState({ visibleSections: ctx.visibleSections });
		}
	}

	render() {
		const ShowIndexPage = () => {
			const visible = this.state.visibleSections || {};
			return (
				<LanguageContext.Consumer>
					{({ t }) => (
						<div className="App">
							<header className="App__header glitch">
								S_TN
								<LangSwitcher />
							</header>
							<div className="App__wrapper">
								{visible.bio && (
									<div className="App__wrapper-cell">
										<Bio />
									</div>
								)}
								{visible.news && (
									<div className="App__wrapper-cell">
										<News />
									</div>
								)}
								{visible.discography && (
									<div className="App__wrapper-row">
										<Discography />
									</div>
								)}
								<div className="App__wrapper-cell">
									{visible.game && <Game />}
									{visible.player && <Player />}
									{visible.events && <Events />}
									{visible.donate && <Donate />}
									{visible.contacts && <Cotacts />}
								</div>
								<div className="App__wrapper-cell">
									{visible.mup && <Mup />}
									{visible.emulator && <Emulator />}
									{visible.kits && <Kits />}
								</div>
							</div>
							<footer className="App__footer">{t('footer')}</footer>
						</div>
					)}
				</LanguageContext.Consumer>
			);
		};

		const ShowErrorPage = () => {
			return (
				<LanguageContext.Consumer>
					{({ t }) => (
						<div id="error" className="loadscreen errorLink">
							<div className="loadscreen__c64-preview">
								<p className="loadscreen__c64-preview_title">
									{t('error404title')}
									<br />
									{t('error404code')}
								</p>
								<p className="loadscreen__c64-preview_ram">{t('errorReady')}</p>
								<p className="loadscreen__c64-preview_ram error-text"></p>
								<p className="loadscreen__c64-preview_ram">{t('errorFileNotFound')}</p>
								<Link to="/" className="loadscreen__c64-preview_ram">{t('errorGotoMain')}</Link>
							</div>
						</div>
					)}
				</LanguageContext.Consumer>
			);
		};

		return (
			<Router>
				<Routes>
					<Route path="/" exact element={ <ShowIndexPage /> } />
					<Route path="/cms" element={ <AdminPanel /> } />
					<Route path="/admin" element={ <Navigate to="/cms" replace /> } />
					<Route path="/admin/*" element={ <Navigate to="/cms" replace /> } />
					<Route path="/error" element={ <ShowErrorPage />} />
					<Route path='*' element={<Navigate to='/error' />} />
				</Routes>
			</Router>
		);
	}
}

export default App;
