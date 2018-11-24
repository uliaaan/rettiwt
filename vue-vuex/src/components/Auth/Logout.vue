<template>
  <div>
    Logout
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { LOGOUT } from '@/store/actions.type';

export default {
  created() {
    this.$store.dispatch(LOGOUT);
    this.$router.push({ name: 'home' });
  }
};
</script>
