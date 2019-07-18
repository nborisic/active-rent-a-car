import React from 'react';
import { Provider } from 'react-redux';
import { WindowManager } from 'react-window-decorators';
import createHistory from 'history/createBrowserHistory'
import smoothscroll from 'smoothscroll-polyfill';
import ReactGA from 'react-ga';


import configureStore from './config/store';

import BREAKPOINTS from './constants/breakpoints';
import Routes from './Routes';

// tslint:disable-next-line
new WindowManager(BREAKPOINTS, 50);

// kick off the polyfill!
smoothscroll.polyfill();

const store = configureStore().store;

const history = createHistory();
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
  console.log(location.pathname)
});


const App = () => {
  return (
    <Provider store={ store }>
      <Routes />
    </Provider>
  );
};

export default App;
