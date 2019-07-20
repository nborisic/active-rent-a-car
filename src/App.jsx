import React from 'react';
import { Provider } from 'react-redux';
import { WindowManager } from 'react-window-decorators';
import smoothscroll from 'smoothscroll-polyfill';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


import configureStore from './config/store';

import BREAKPOINTS from './constants/breakpoints';
import Routes from './Routes';
import ErrorHandler from './pages/ErrorHandle/ErrorHandle';

// tslint:disable-next-line
new WindowManager(BREAKPOINTS, 50);

// kick off the polyfill!
smoothscroll.polyfill();

const store = configureStore().store;

const App = () => {
  return (
    <Provider store={ store }>
      <ErrorHandler>
        <Routes />
      </ErrorHandler>
    </Provider>
  );
};

export default App;
