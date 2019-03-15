import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Gameboy from './Gameboy';
import * as serviceWorker from './serviceWorker';
import * as Utils from './common/Utils';
import App from './components/App';

Utils.setAnimatedFavicon();

if (window.navigator.userAgent.indexOf("Edge") > -1 || (/iPad|iPhone|iPod/.test(navigator.userAgent))) {
	ReactDOM.render(<App />, document.getElementById('root'));
} else {
	ReactDOM.render(<Gameboy />, document.getElementById('animation'));
}


serviceWorker.unregister();