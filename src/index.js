import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Gameboy from './Gameboy';
import * as serviceWorker from './serviceWorker';
import * as Utils from './common/Utils';
import App from './components/App';
import * as ReactDOMClient from 'react-dom/client';

Utils.setAnimatedFavicon();
const root = ReactDOMClient.createRoot(document.getElementById("root"));
const gameboy = ReactDOMClient.createRoot(document.getElementById("animation"));
if (window.navigator.userAgent.indexOf("Edge") > -1 || (/iPad|iPhone|iPod/.test(navigator.userAgent))) {
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
} else {
	gameboy.render(
		<React.StrictMode>
			<Gameboy root={root}/>
		</React.StrictMode>
	);
}

serviceWorker.unregister();