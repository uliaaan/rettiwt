<template>
  <v-flex xs4 offset-xs4>
    <form v-on:submit.prevent="onSubmit">
      <v-text-field
      append-icon="search"
        class="mx-3"
        color="white"
        flat
        label="Search"
        solo-inverted
        v-model="text"
      />
    </form>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';
import { SEARCH } from '@/store/actions.type';

export default {
  name: 'searchForm',
  data() {
    return {
      text: ''
    };
  },
  methods: {
    onSubmit() {
      const searchData = {
        text: this.text
      };
      this.text = '';
      this.$store.dispatch(SEARCH, searchData);
    }
  }
};
</script>



