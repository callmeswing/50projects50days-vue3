<template>
  <div class="container">
    <div
      v-for="(image, index) in cardList"
      :key="index"
      class="panel"
      :class="image.active ? 'active' : ''"
      :style="{ backgroundImage: `url(${image.url})` }"
      @click="toggleActive(index)"
    >
      <h4>{{ image.title }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imageList } from "./imageList";

const cardList = imageList;

function toggleActive(index: number) {
  cardList.value.forEach((image, index_in_list) => {
    image.active = index_in_list === index;
  });
}
</script>

<style lang="scss" scoped>
@use "./expanding-cards.scss";
</style>
