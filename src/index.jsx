import React from 'react';
import { hydrate, render } from 'react-dom';

import App from './App';
import './scss/index.scss';

import initModernizr from './utils/init-modernizer';
import isSnap from './utils/is-snap';

// Don't initialize modernizr for statically generated pages
if (!isSnap) {
  initModernizr();
}

const rootElement = document.getElementById('root');

if (rootElement && rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
