<template>
  <v-layout row>
    <v-flex xs12>
      <v-card-title class="white--text">
        <span class="headline">
          <router-link to="/">RETTIWT</router-link>
        </span>
        <v-spacer>
          <Search />
        </v-spacer>
        <v-menu bottom left>
          <v-btn slot="activator" class="white--text" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(item, i) in menu" :key="i" @click="">
              <router-link :to="item.to">
                <v-list-tile-title>
                  {{ item.title }}
                </v-list-tile-title>
              </router-link>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
    </v-flex>
  </v-layout>
</template>

<script>
import Search from './Search';
import { mapState } from 'vuex';

export default {
  components: {
    Search
  },
  computed: {
    ...mapState({
      user: state => state.auth
    }),
    url: function() {
      return {
        guest: [
          { title: 'Login', to: '/login' },
          { title: 'Register', to: '/register' }
        ],
        auth: [
          { title: 'Profile', to: `/profile/${this.user.user.id}` },
          { title: 'Logout', to: '/logout' }
        ]
      };
    },
    menu: function() {
      return this.user.isAuthenticated ? this.url.auth : this.url.guest;
    }
  }
};
</script>