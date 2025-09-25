<template>
  <div
    class="all-container"
    :style="{ 'background-image': `url(${imgs[activeSlide]})` }"
  >
    <div class="slider-container">
      <div class="slide"></div>
      <div
        class="slide"
        v-for="(img, index) in imgs"
        :key="index"
        :style="{ 'background-image': `url(${img})` }"
        :class="{ active: activeSlide === index }"
      ></div>
      <button class="arrow left-arrow" @click="handleBackgroundSwitch(0)">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button class="arrow right-arrow" @click="handleBackgroundSwitch(1)">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const imgs: Array<string> = [
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
  "https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80",
  "https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
];

const activeSlide = ref<number>(0);

const handleBackgroundSwitch = function (direction: number) {
  if (direction === 0) {
    activeSlide.value =
      activeSlide.value > 0
        ? activeSlide.value - 1
        : (activeSlide.value = imgs.length - 1);
  } else if (direction === 1) {
    activeSlide.value =
      activeSlide.value < imgs.length - 1 ? activeSlide.value + 1 : 0;
  }
  // console.log(activeSlide.value);
};

/**
⭐ note

- FontAwesome 
		习惯用<i>标签，fas开头

- 样式的修改不要求绑定的数据是响应式的
		比如当前的background-image修改！绑定的是数组imgs(非响应式数据)，仅对下标作修改就能触发样式更新

 */
</script>

<style lang="scss" scoped>
@use "./background-slider.scss";
</style>
