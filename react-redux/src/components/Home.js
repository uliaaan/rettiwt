import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from './Posts/List';
import Login from './Auth/Login';

class Home extends Component {
  render() {
    const { auth } = this.props;
    return auth ? <List /> : <Login />;
  }
}

Home.propTypes = {
  auth: PropTypes.bool
};

export default connect(state => ({
  auth: !!state.auth.isAuthenticated
}))(Home);
