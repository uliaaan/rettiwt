<template>
  <div>
    <h1 class="h1">LOADING</h1>
    <div class="email">LOADING</div>
    <div class="statBlock">
      <div class="stat">
        0
        <span class="statTitle">Posts</span>
      </div>
      <div class="stat">
        0
        <span class="statTitle">Following</span>
      </div>
      <div class="stat">
        0
        <span class="statTitle">Followers</span>
      </div>
      <div class="button">
        <v-btn flat color="#cacaca" class="button-unfollow">LOADING</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h1 {
  color: #cacaca;
  background-color: #cacaca;
  width: 150px;
  margin: 0 0 5px 0;
}
.email {
  background-color: #cacaca;
  margin-bottom: 10px;
  width: 100px;
  color: #cacaca;
}
.button {
  width: 100%;
  text-align: right;
}
.button-unfollow {
  border-color: #cacaca;
  background-color: #cacaca;
  color: #cacaca;
}
.stat {
  background-color: #cacaca;
  color: #cacaca;
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
