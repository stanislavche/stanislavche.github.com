import React from 'react';
import './index.scss';
import Gameboy from './Gameboy';
import * as serviceWorker from './serviceWorker';
import * as Utils from './common/Utils';
import App from './components/App';
import * as ReactDOMClient from 'react-dom/client';
import { AppContext } from './context/AppContext';

Utils.setAnimatedFavicon();

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
			window.navigator.userAgent.indexOf("Edge") > -1 ||
			/iPad|iPhone|iPod/.test(navigator.userAgent)
		) {
			// iPhone: сразу рендерим App
			root.render(
				<React.StrictMode>
					<AppContext.Provider value={data}>
						<App />
					</AppContext.Provider>
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
