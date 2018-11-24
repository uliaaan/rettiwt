<template>
  <v-card class="paper">
    <form v-on:submit.prevent="onSubmit">
      <v-text-field color="teal lighten-1" type="text" label="Login" v-model="login" :error="errors && errors.login" :error-messages="errors && errors.login" />
      <v-text-field color="teal lighten-1" type="email" label="Email" v-model="email" :error="errors && errors.email" :error-messages="errors && errors.email" />
      <v-text-field color="teal lighten-1" type="password" label="Password" v-model="password" :error="errors && errors.password" :error-messages="errors && errors.password" />
      <v-text-field color="teal lighten-1" type="password" label="Repeat password" v-model="password2" :error="errors && errors.password2" :error-messages="errors && errors.password2" />

      <v-btn type="submit" color="teal lighten-1" depressed dark>
        Register
      </v-btn>
    </form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { REGISTER } from '@/store/actions.type';

export default {
  name: 'register',
  data() {
    return {
      login: '',
      email: '',
      password: '',
      password2: ''
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
  methods: {
    onSubmit() {
      const newUser = {
        login: this.login,
        email: this.email,
        password: this.password,
        password2: this.password2
      };
      this.$store.dispatch(REGISTER, newUser);
    }
  }
};
</script>