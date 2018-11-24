<template>
  <div>
    <div v-if="auth">
      <Start />
    </div>
    <div v-else>
      <Login />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Start from './Start';
import Login from '@/components/Auth/Login.vue';

export default {
  name: 'home',
  components: {
    Login,
    Start
  },
  computed: {
    ...mapState({
      auth: state => state.auth.isAuthenticated
    })
  }
};
</script>
