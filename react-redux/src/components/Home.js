import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Posts from './Posts';
import Login from './Auth/Login';
import Form from './Form';

const Home = ({ auth }) => {
  if (!auth) return <Login />;

  return (
    <>
      <Form />
      <Posts />
    </>
  );
};

Home.propTypes = {
  auth: PropTypes.bool
};

export default connect(state => ({
  auth: !!state.auth.isAuthenticated
}))(Home);
