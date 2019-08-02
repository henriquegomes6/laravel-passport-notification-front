import PublicRoute from 'components/routes/publicRoute';
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import authService from 'services/auth';

import PrivateRoute from './components/routes/privateRoute';

export default class App extends PureComponent {

  render() {
    return (
      <Router>
        <Switch>
          {
            authService.checkIsLogin() ?
              <PrivateRoute />
              :
              <PublicRoute />
          }
        </Switch>
      </Router>
    );
  }
}