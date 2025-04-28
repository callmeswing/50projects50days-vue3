<template>
  <div class="container">
    <div class="progress-container">
      <div class="progress" :style="{ width: `${progressWidth}%` }"></div>
      <div
        v-for="circle in circles"
        :key="circle.id"
        class="circle"
        :class="{ active: circle.active }"
      >
        {{ circle.id }}
      </div>
    </div>

    <div class="buttons">
      <button
        class="btn"
        id="prev"
        @click="prev"
        :disabled="currentLastActiveId === minActiveId"
      >
        prev
      </button>
      <button
        class="btn"
        id="next"
        @click="next"
        :disabled="currentLastActiveId === maxActiveId"
      >
        next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const circles = reactive<{ id: number; active: boolean }[]>([
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: false },
  { id: 4, active: false },
  { id: 5, active: false },
]);

const minActiveId = 1;
const maxActiveId = circles.length;

const currentLastActiveId = ref(1);

const progressWidth = ref(0);

function next() {
  if (currentLastActiveId.value < maxActiveId) {
    currentLastActiveId.value++;
    updateActiveNext(currentLastActiveId.value);
    updateProgressWidth();
  }
  test();
}

function updateActiveNext(id: number) {
  circles.forEach((circles, index) => {
    if (index + 1 === id) {
      circles.active = true;
      return;
    }
  });
}

function prev() {
  if (currentLastActiveId.value > minActiveId) {
    currentLastActiveId.value--;
    updateActivePrev(currentLastActiveId.value);
    updateProgressWidth();
  }
  test();
}

function updateActivePrev(id: number) {
  circles.forEach((circle, index) => {
    if (id === index) {
      circle.active = false;
      return;
    }
  });
}

function updateProgressWidth() {
  progressWidth.value =
    ((currentLastActiveId.value - 1) / (circles.length - 1)) * 95;
}

function test() {
  const activeIds = circles
    .filter((circle) => circle.active)
    .map((circle) => circle.id);
  console.log("now active ids: ", activeIds);
  console.log(progressWidth.value);
  console.log(currentLastActiveId.value);
}
</script>

<style lang="scss" scoped>
@use "./progress-steps.scss";
</style>
