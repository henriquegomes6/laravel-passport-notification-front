import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import VerifyEmail from 'components/VerifyEmail';

export default class App extends PureComponent {

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/verify/:token' component={VerifyEmail} />
          <Route path='/signup' component={SignUp} />
          <Route path='/' component={SignIn} />
        </Switch>
      </Router>
    );
  }
}