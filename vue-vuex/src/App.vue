<template>
  <v-app>
    <v-toolbar app class="teal lighten-1">
      <Header />
    </v-toolbar>
    <v-content>
      <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 sm12 md8 offset-xs0 offset-sm0 offset-md2>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import jwt_decode from 'jwt-decode';
import { GET_CURRENT_USER, LOGOUT } from '@/store/actions.type';
import Header from '@/components/Main/Header';
import Footer from '@/components/Main/Footer';
import setAuthToken from '@/utils/setAuthToken';

export default {
  components: {
    Header,
    Footer
  },
  created() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      this.$store.dispatch(GET_CURRENT_USER);

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.$store.dispatch(LOGOUT);
        window.location.href = '/';
      }
    }
  }
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

a {
  color: #26a69a !important;
  text-decoration: none;
}

nav a {
  font-weight: bold;
  color: #fff !important;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.paper {
  padding: 20px;
}

.paper-card {
  margin: 10px 0;
  padding: 8px;
  display: flex;
  text-align: left;
}
</style>
