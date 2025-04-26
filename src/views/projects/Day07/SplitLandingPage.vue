<template>
  <div
    class="container"
    :class="[
      mouseSide === mouseLeft
        ? mouseLeft
        : mouseSide === mouseRight
        ? mouseRight
        : mouseleave,
    ]"
  >
    <div
      class="split left"
      @mouseenter="mouseSide = mouseLeft"
      @mouseleave="mouseSide = mouseleave"
    >
      <h1>Playstation 5</h1>
      <a href="#" class="btn">Buy Now</a>
    </div>

    <div
      class="split right"
      @mouseenter="mouseSide = mouseRight"
      @mouseleave="mouseSide = mouseleave"
    >
      <h1>XBox Series X</h1>
      <a href="#" class="btn">Buy Now</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const mouseSide = ref("");
const mouseLeft = "left";
const mouseRight = "right";
const mouseleave = "";

// 原网址的实现方式  👇 我们按照vue的方式来 👆

// const left = document.querySelector(".left");
// const right = document.querySelector(".right");
// const container = document.querySelector(".container");

// left.addEventListener("mouseenter", () =>
//   container.classList.add("hover-left")
// );
// left.addEventListener("mouseleave", () =>
//   container.classList.remove("hover-left")
// );

// right.addEventListener("mouseenter", () =>
//   container.classList.add("hover-right")
// );
// right.addEventListener("mouseleave", () =>
//   container.classList.remove("hover-right")
// );
</script>

<style lang="scss" scoped>
@use "./split-landing-page.scss";
</style>
