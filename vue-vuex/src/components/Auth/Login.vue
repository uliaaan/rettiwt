<template>
  <v-card class="paper">
    <form v-on:submit.prevent="onSubmit">
      <v-text-field color="teal lighten-1" type="email" label="Email" v-model="email" :error="errors && errors.email" :error-messages="errors && errors.email" />
      <v-text-field color="teal lighten-1" type="password" label="Password" v-model="password" :error="errors && errors.password" :error-messages="errors && errors.password" />
      <v-btn type="submit" color="teal lighten-1" depressed dark>
        Login
      </v-btn>
    </form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { LOGIN } from '@/store/actions.type';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors,
      auth: state => state.auth.isAuthenticated
    })
  },
  created() {
    if (this.auth) this.$router.push({ name: 'home' });
  },
  watch() {
    if (this.auth) this.$router.push({ name: 'home' });
  },
  methods: {
    onSubmit() {
      const userData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch(LOGIN, userData);
    }
  }
};
</script>