import axios from 'axios';
import { REGISTER, LOGIN, GET_CURRENT_USER, LOGOUT } from './actions.type';
import {
  SET_LOGOUT,
  SET_AUTH,
  SET_ERROR,
  SET_FOLLOW,
  SET_UNFOLLOW
} from './mutations.type';
import router from '../router';
import setAuthToken from '../utils/setAuthToken';

const state = {
  isAuthenticated: false,
  user: {},
  errors: null
};

const getters = {};
const actions = {
  [REGISTER](context, credentials) {
    axios
      .post('/api/users/register', credentials)
      .then(user => router.push('/login'))
      .catch(err => context.commit(SET_ERROR, err.response.data));
  },
  [LOGIN](context, credentials) {
    axios
      .post('/api/users/login', credentials)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        context.dispatch(GET_CURRENT_USER);
      })
      .catch(err => console.log(err));
  },
  [GET_CURRENT_USER](context, credentials) {
    axios.get('/api/users/').then(res => context.commit(SET_AUTH, res.data));
  },
  [LOGOUT](context, credentials) {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    context.commit(SET_LOGOUT);
  }
};
const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
  },
  [SET_LOGOUT](state) {
    state.isAuthenticated = false;
    state.user = {};
  },
  [SET_FOLLOW](state, user) {
    state.user.following = [...state.user.following, user];
  },
  [SET_UNFOLLOW](state, user) {
    state.user.following = state.user.following.filter(item => item !== user);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
