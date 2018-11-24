<template>
  <div>
    <PostForm />
    <v-switch color="red" v-model="allPosts" :label="allPosts ? 'Posts By Following Users' : 'All Posts' "></v-switch>
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else>
      <List :list="list" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { GET_POSTS, GET_POSTS_BY_FOLLOWING_USERS } from '@/store/actions.type';
import { SET_POST } from '@/store/mutations.type';

import List from '@/components/Posts/List.vue';
import PostForm from '@/components/Posts/Form.vue';
import Loader from '@/components/Common/Loader.vue';
import socket from '@/socket.js';

export default {
  name: 'start',
  data: () => ({
    allPosts: false
  }),
  components: {
    List,
    PostForm,
    Loader
  },
  computed: {
    ...mapState({
      list: state => state.posts.list,
      loading: state => state.posts.loading,
      user: state => state.auth.user
    })
  },
  watch: {
    allPosts: function(val) {
      return this.allPosts
        ? this.$store.dispatch(
            GET_POSTS_BY_FOLLOWING_USERS,
            this.user.following
          )
        : this.$store.dispatch(GET_POSTS);
    }
  },
  created() {
    socket.instance.on('newPost', data => {
      console.log(`newPost: ${JSON.stringify(data)}`);
      this.$store.commit(SET_POST, data);
    });
    this.$store.dispatch(GET_POSTS);
  },
  destroyed() {
    socket.instance.removeListener('newPost');
  }
};
</script>
