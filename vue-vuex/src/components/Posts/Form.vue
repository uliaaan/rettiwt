<template>
  <v-card class="paper-card">
    <form v-on:submit.prevent="onSubmit">
      <v-text-field color="teal lighten-1" type="text" label="What's new? Young fella" v-model="text" />
      <v-btn flat color="white" type="submit" class="btn">
        Send
      </v-btn>
    </form>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { ADD_POST } from '@/store/actions.type';

export default {
  name: 'postForm',
  data() {
    return {
      text: ''
    };
  },
  methods: {
    onSubmit() {
      const userData = {
        text: this.text
      };
      this.text = '';
      this.$store.dispatch(ADD_POST, userData);
    }
  }
};
</script>

<style scoped>
.btn {
  width: 100%;
  color: #fff;
  background-color: #33ab9f;
  margin: 0;
}
</style>
