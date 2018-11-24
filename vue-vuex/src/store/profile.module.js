import axios from 'axios';
import {
  GET_USER,
  GET_USER_POSTS,
  FOLLOW,
  UNFOLLOW,
  SEARCH
} from './actions.type';
import {
  SET_USER,
  SET_POSTS,
  SET_PROFILE_LOADING,
  SET_FOLLOW,
  SET_UNFOLLOW,
  SET_ADD_FOLLOWERS,
  SET_REMOVE_FOLLOWERS
} from './mutations.type';
import router from '../router';

const state = {
  user: null,
  loading: false
};

const getters = {};
const actions = {
  [GET_USER](context, credentials) {
    context.commit(SET_PROFILE_LOADING);
    axios
      .get(`/api/users/${credentials}`)
      .then(res => context.commit(SET_USER, res.data));
  },
  [GET_USER_POSTS](context, credentials) {
    axios
      .get(`/api/posts/${credentials}`)
      .then(res => context.commit(SET_POSTS, res.data));
  },
  [FOLLOW](context, credentials) {
    axios.post(`/api/users/follow`, { userId: credentials }).then(res => {
      context.commit(SET_FOLLOW, res.data.userId);
      context.commit(SET_ADD_FOLLOWERS, res.data.userId);
    });
  },
  [UNFOLLOW](context, credentials) {
    axios.post(`/api/users/unfollow`, { userId: credentials }).then(res => {
      context.commit(SET_UNFOLLOW, res.data.userId);
      context.commit(SET_REMOVE_FOLLOWERS, res.data.userId);
    });
  },
  [SEARCH](context, credentials) {
    axios.post('/api/users/search', credentials).then(res => {
      if (res.data._id) {
        router.push(`/profile/${res.data._id}`);
      } else {
        router.push(`/search`);
      }
    });
  }
};
const mutations = {
  [SET_PROFILE_LOADING](state) {
    state.loading = true;
  },
  [SET_USER](state, user) {
    state.user = user;
    state.loading = false;
  },
  [SET_ADD_FOLLOWERS](state, user) {
    state.user.followers = [...state.user.followers, user];
  },
  [SET_REMOVE_FOLLOWERS](state, user) {
    state.user.followers = state.user.followers.filter(item => item !== user);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
