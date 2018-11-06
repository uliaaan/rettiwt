import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { getCurrentUser, logoutUser } from './actions/authActions';

import store from './store';
// import ProtectedRoute from './components/Common/ProtectedRoute';
import Main from './components/Main/Main';
import Home from './components/Home';
import NotFound from './components/Main/NotFound';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import Search from './components/Search/NotFound';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(getCurrentUser());

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile/:userid" component={Profile} />
              <Route path="/search" component={Search} />
              <Route component={NotFound} />
            </Switch>
          </Main>
        </Router>
      </Provider>
    );
  }
}

export default App;
