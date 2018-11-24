<template>
  <div>
    <h1>{{ profile.login }}</h1>
    <div class="email">{{ profile.email }}</div>
    <div class="statBlock">
      <div class="stat">
        {{ listLingth }}
        <span class="statTitle">Posts</span>
      </div>
      <div class="stat">
        {{ profile.following.length }}
        <span class="statTitle">Following</span>
      </div>
      <div class="stat">
        {{ profile.followers.length }}
        <span class="statTitle">Followers</span>
      </div>
      <div class="button" v-if="user.isAuthenticated">
        <v-btn outline color="teal lighten-1" class="button-follow" v-if="alreadyFollowing" @click="follow">
          Follow
        </v-btn>
        <v-btn flat class="button-unfollow" v-else @click="unfollow">
          Unfollow
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { FOLLOW, UNFOLLOW } from '@/store/actions.type';

export default {
  name: 'info',
  props: ['profile', 'listLingth'],
  computed: {
    ...mapState({
      user: state => state.auth
    }),
    alreadyFollowing: function() {
      return this.user.user.following.indexOf(this.profile._id) === -1;
    }
  },
  methods: {
    follow: function() {
      this.$store.dispatch(FOLLOW, this.profile._id);
    },
    unfollow: function() {
      this.$store.dispatch(UNFOLLOW, this.profile._id);
    }
  }
};
</script>

<style scoped>
.email {
  margin-bottom: 10px;
  color: #888;
}
.button {
  width: 100%;
  text-align: right;
}
.button-follow {
  border-color: #009688;
  color: #009688;
}
.button-follow:hover {
  background-color: #009688 !important;
  color: #fff !important;
}
.button-unfollow {
  border-color: #009688 !important;
  background-color: #009688 !important;
  color: #fff !important;
}
.button-unfollow:hover {
  border-color: #bbb !important;
  background-color: #bbb !important;
  color: #fff !important;
}
.statBlock {
  display: flex;
}
.stat {
  float: left;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}
.statTitle {
  display: block;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: normal;
}
</style>
