import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './pages/Home/Home';

import { routeCodes } from './constants/routes';

const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path={ routeCodes.HOME } component={ Home } />
        </Switch>
    </BrowserRouter>
  );
};

export default Routes;
