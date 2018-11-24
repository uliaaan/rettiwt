<template>
  <div class="item">
    <div class="avatar" :style="{backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}`}" />
    <div>
      <h3 class="login">
        <router-link :to="`/profile/${post.user.id}`">{{ post.user.login }}</router-link>
        <span class="time">{{ time }}</span>
      </h3>
      {{post.text}}
    </div>
  </div>
</template>

<script>
import calcTime from '@/utils/timeConverter.js';
export default {
  name: 'item',
  props: ['post'],
  computed: {
    time: function() {
      return calcTime(this.post.createdAt);
    }
  }
};
</script>

<style scoped>
.item {
  display: flex;
  text-align: left;
}
.avatar {
  min-width: 10px;
  margin: 4px 10px 4px 4px;
  border-radius: 3px;
}
.login {
  margin-top: 0;
  margin-bottom: 5px;
}
.time {
  font-size: 14px;
  margin-left: 10px;
  font-weight: normal;
  color: #bbb;
}
</style>
