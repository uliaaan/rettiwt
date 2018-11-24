import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Profile from './views/Profile';
import Login from '@/components/Auth/Login.vue';
import Logout from '@/components/Auth/Logout.vue';
import Register from '@/components/Auth/Register.vue';
import NotFound from '@/components/Main/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/search',
      name: 'search',
      component: NotFound
    }
  ]
});
