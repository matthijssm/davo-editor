import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import './resources/sass/main.scss';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('app'));
