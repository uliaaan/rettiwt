import axios from 'axios';
import {
  GET_POSTS,
  ADD_POST,
  GET_POSTS_BY_FOLLOWING_USERS
} from './actions.type';
import { SET_POSTS, SET_POST, SET_POSTS_LOADING } from './mutations.type';

const state = {
  list: null,
  loading: false
};

const getters = {};
const actions = {
  [GET_POSTS](context, credentials) {
    context.commit(SET_POSTS_LOADING);
    axios.get('/api/posts/').then(res => context.commit(SET_POSTS, res.data));
  },
  [GET_POSTS_BY_FOLLOWING_USERS](context, credentials) {
    context.commit(SET_POSTS_LOADING);
    axios
      .get('/api/posts/', {
        params: {
          following: credentials
        }
      })
      .then(res => context.commit(SET_POSTS, res.data));
  },
  [ADD_POST](context, credentials) {
    axios.post('/api/posts', credentials);
    // .then(res => context.commit(SET_POST, res.data));
  }
};
const mutations = {
  [SET_POSTS_LOADING](state) {
    state.loading = true;
  },
  [SET_POSTS](state, posts) {
    state.list = posts;
    state.loading = false;
  },
  [SET_POST](state, post) {
    state.list = [post, ...state.list];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
