<template>
  <div>
    <v-card v-for="item in list" :key="item._id" class="paper-card">
      <Item :post="item" />
    </v-card>
  </div>
</template>

<script>
import Item from './Item';

export default {
  name: 'list',
  props: ['list'],
  components: {
    Item
  }
};
</script>