import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
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
fetch('/data.json')
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
