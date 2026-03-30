import React from 'react';
import './index.scss';
import Gameboy from './Gameboy';
import * as serviceWorker from './serviceWorker';
import * as Utils from './common/Utils';
import App from './components/App';
import * as ReactDOMClient from 'react-dom/client';
import { AppContext } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';

const isCmsRoute = window.location.pathname.startsWith('/cms') || window.location.pathname.startsWith('/admin');

if (isCmsRoute) {
	// Фавикон
	const favicon = document.getElementById('dynamic-favicon');
	if (favicon) { favicon.href = '/cms/icon.png'; favicon.type = 'image/png'; }

	// PWA-теги для "Добавить на экран Домой" (iOS / Android)
	const head = document.head;
	const addMeta = (name, content) => {
		const m = document.createElement('meta');
		m.name = name; m.content = content;
		head.appendChild(m);
	};
	const addLink = (rel, href, extra = {}) => {
		const l = document.createElement('link');
		l.rel = rel; l.href = href;
		Object.assign(l, extra);
		head.appendChild(l);
	};
	addMeta('apple-mobile-web-app-capable', 'yes');
	addMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
	addMeta('apple-mobile-web-app-title', 'S_TN Admin');
	addMeta('mobile-web-app-capable', 'yes');
	addMeta('theme-color', '#0d0d0d');
	addLink('apple-touch-icon', '/cms/icon.png');
	addLink('manifest', '/cms/manifest.json');

	document.title = 'S_TN Admin';
} else {
	Utils.setAnimatedFavicon();
}

const root = ReactDOMClient.createRoot(document.getElementById("root"));
const gameboy = ReactDOMClient.createRoot(document.getElementById("animation"));

// Загружаем JSON
// Если заданы VITE_GITHUB_OWNER и VITE_GITHUB_REPO — берём данные прямо из GitHub Raw.
// Тогда изменения в админке отражаются БЕЗ пересборки сайта (экономия build-минут).
const _ghOwner  = import.meta.env.VITE_GITHUB_OWNER;
const _ghRepo   = import.meta.env.VITE_GITHUB_REPO;
const _ghBranch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
const DATA_URL  = (_ghOwner && _ghRepo)
    ? `https://raw.githubusercontent.com/${_ghOwner}/${_ghRepo}/${_ghBranch}/public/data.json`
    : '/data.json';

fetch(`${DATA_URL}?t=${Date.now()}`)
	.then((res) => res.json())
	.then((data) => {
		if (
			isCmsRoute ||
			localStorage.getItem('stn_gameboy_shown') === '1' ||
			window.navigator.userAgent.indexOf("Edge") > -1 ||
			/iPad|iPhone|iPod/.test(navigator.userAgent)
		) {
			// Анимация пропускается — сразу включаем фоновый шум
			document.querySelector('.wrapper')?.classList.add('active');

			// CMS/Admin и iPhone: сразу рендерим App без анимации
			root.render(
				<React.StrictMode>
					<LanguageProvider>
						<AppContext.Provider value={data}>
							<App />
						</AppContext.Provider>
					</LanguageProvider>
				</React.StrictMode>
			);
		} else {
			// Остальные: Gameboy анимация
			gameboy.render(
				<React.StrictMode>
					<Gameboy root={root} data={data} />
				</React.StrictMode>
			);
		}
	})
	.catch((err) => {
		console.error("Ошибка загрузки data.json", err);
		// fallback
		root.render(<div>Error loading data</div>);
	});

serviceWorker.unregister();
