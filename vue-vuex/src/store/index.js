import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth.module';
import posts from './posts.module';
import profile from './profile.module';

export default new Vuex.Store({
  modules: {
    auth,
    posts,
    profile
  }
});
