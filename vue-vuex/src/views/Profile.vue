<template>
  <div>
    <v-card class="paper-card">
      <div v-if="loading">
        <PreLoader />
      </div>
      <div v-else>
        <div v-if="list && listLingth">
          <Info :profile="user" :listLingth="listLingth" />
        </div>
      </div>
    </v-card>
    <div v-if="!loading && list">
      <List :list="list" />
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { GET_USER, GET_USER_POSTS } from '@/store/actions.type';

import List from '@/components/Posts/List.vue';
import Info from '@/components/Profile/Info.vue';
import PreLoader from '@/components/Profile/PreLoader.vue';
import Loader from '@/components/Common/Loader.vue';

export default {
  name: 'profile',
  components: {
    List,
    Info,
    PreLoader,
    Loader
  },
  computed: {
    ...mapState({
      user: state => state.profile.user,
      list: state => state.posts.list,
      loading: state => state.profile.loading
    }),
    listLingth: function() {
      return this.list.length;
    }
  },
  created() {
    this.$store.dispatch(GET_USER, this.$route.params.id);
    this.$store.dispatch(GET_USER_POSTS, this.$route.params.id);
  },
  watch: {
    $route: function(refreshPage) {
      this.$store.dispatch(GET_USER, this.$route.params.id);
      this.$store.dispatch(GET_USER_POSTS, this.$route.params.id);
    }
  }
};
</script>