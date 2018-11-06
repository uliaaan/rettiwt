import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../Auth/Login';

class ProtectedRoute extends Component {
  render() {
    const { component, ...rest } = this.props;
    return <Route {...rest} render={this.renderProtected} />;
  }

  renderProtected = routeProps => {
    const { component: ProtectedComponent, auth } = this.props;

    return auth ? <ProtectedComponent {...routeProps} /> : <Login />;
  };
}

export default connect(state => ({
  auth: !!state.auth.isAuthenticated
}))(ProtectedRoute);
