import React from 'react';
import { Route } from 'react-router-dom';

import WelCome from '../WelCome';


const PrivateRoute = () => {
  return (
    <div>
      <Route exact={true} path='/' component={WelCome} />
    </div>
  );
}

export default PrivateRoute;