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

let shouldHydrate = false;
if (rootElement) {
  // We hydrate all of the pages, but grid which is completely re-rendered on the client
  // This allows us access to the window size which is used for scaling calculations
  // This is mandatory as since React 16 you can't rely on React SSR patching up differences
  // https://github.com/reactjs/reactjs.org/issues/25
  shouldHydrate = rootElement.hasChildNodes() && !(window.location.pathname.search('/') === 0);
}

if (shouldHydrate) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
