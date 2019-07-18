import React from 'react';
import { Provider } from 'react-redux';
import { WindowManager } from 'react-window-decorators';
import smoothscroll from 'smoothscroll-polyfill';
import ReactGA from 'react-ga';
import { gaId } from './constants/contentful';

import configureStore from './config/store';

import BREAKPOINTS from './constants/breakpoints';
import Routes from './Routes';

// tslint:disable-next-line
new WindowManager(BREAKPOINTS, 50);

// kick off the polyfill!
smoothscroll.polyfill();

const store = configureStore().store;

ReactGA.initialize(
  gaId, { testMode: true }
);

const App = () => {
  return (
    <Provider store={ store }>
      <Routes />
    </Provider>
  );
};

export default App;
