<template>
  <Login />
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Auth/Login.vue';

export default {
  name: 'auth',
  components: {
    Login
  }
};
</script>