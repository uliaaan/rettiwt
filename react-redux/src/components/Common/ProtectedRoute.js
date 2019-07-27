import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../Auth/Login';

const ProtectedRoute = props => {
  const renderProtected = routeProps => {
    const { component: ProtectedComponent, auth } = props;

    return auth ? <ProtectedComponent {...routeProps} /> : <Login />;
  };

  const { component, ...rest } = props;
  return <Route {...rest} render={renderProtected} />;
};

export default connect(state => ({
  auth: !!state.auth.isAuthenticated
}))(ProtectedRoute);
