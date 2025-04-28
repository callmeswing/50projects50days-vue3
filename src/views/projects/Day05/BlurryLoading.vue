<template>
  <div class="container">
    <div class="bg-wrapper" :style="{ filter: `blur(${blurLevel}px)` }"></div>
    <div class="loading-text" :style="{ opacity: loadingOpacity }">
      {{ loading }} %
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

// 脚本内容，动态修改wrapper的blur，loading以及loading-text的opacity
const loading = ref<number>(0);
const loadingOpacity = ref<number>(1);
const blurLevel = ref<number>(30);

// 思路：拿到进度百分比 再根据另一个数字的range求值
const scaleByMySelf = (
  num: number,
  numStart: number,
  numEnd: number,
  outStart: number,
  outEnd: number
) => {
  return (
    (Math.abs(((num - numStart) / (numEnd - numStart)) * 1000) / 1000) *
      (outEnd - outStart) +
    outStart
  );
};
// 源网址方案
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
// const scale = (num, in_min, in_max, out_min, out_max) => {
//   return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
// }

onMounted(() => {
  const interval = setInterval(blurStart, 20);

  function blurStart() {
    loading.value++;

    if (loading.value > 99) {
      clearInterval(interval);
    }

    blurLevel.value = scaleByMySelf(loading.value, 0, 100, 30, 0);
    loadingOpacity.value = scaleByMySelf(loading.value, 0, 100, 1, 0);
  }
});
</script>

<style lang="scss" scoped>
@use "./blurry-loading.scss";
</style>
