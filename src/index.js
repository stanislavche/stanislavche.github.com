import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gameboy from './Gameboy';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Gameboy />, document.getElementById('animation'));

serviceWorker.unregister();