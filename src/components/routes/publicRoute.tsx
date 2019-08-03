import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import VerifyEmail from 'components/VerifyEmail';
import React from 'react';
import { Route } from 'react-router-dom';


const PublicRoute = () => {
  return (
    <div>
      <Route path='/verify/:token' component={VerifyEmail} />
      <Route exact={true} path='/signup' component={SignUp} />
      <Route exact={true} path='/' component={SignIn} />
    </div>
  );
}

export default PublicRoute;