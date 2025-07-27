<template>
  <div class="container">
    <h1>Drink Water</h1>
    <h2>Goal: 2 Liters</h2>
    <div class="big-bottle" :style="{ height: bigBottleHeight + 'px' }">
      <div class="remained" v-show="isRemainedVisible">
        {{ remained }} L remained
      </div>
      <div
        class="percent"
        :style="{ height: percentHeight + 'px' }"
        v-show="isPercentVisible"
      >
        {{ percent }} %
      </div>
    </div>
    <p>Select how many glasses of water that you have drank</p>
    <div class="small-bottle-container">
      <div
        class="small-bottle"
        v-for="item in smallBootleList"
        :key="item.id"
        :class="{ full: item.isFull }"
        @click="changeStatu(item)"
      >
        {{ small_capacity }} ml
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/** ⭐ 进阶：小杯和大杯容量客制化 */

import { computed, reactive, ref } from "vue";

interface SmallBottle {
  id: number;
  isFull: boolean;
}

/** ❓值得学一下的写法 */
const smallBootleList = reactive<SmallBottle[]>(
  Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    isFull: false,
  }))
);

const lastOne = ref<number>(0);

function changeStatu(bottle: SmallBottle) {
  if (bottle.isFull) {
    // 取消
    if (bottle.id === lastOne.value) {
      // 1.当前是最后一个满杯，则取消当前
      bottle.isFull = false;
      lastOne.value = bottle.id - 1;
    } else {
      // 2.当前非最后一个满杯，则取消至当前+1
      smallBootleList.forEach((item) => {
        if (bottle.id < item.id) {
          item.isFull = false;
        }
      });
      lastOne.value = bottle.id;
    }
  } else {
    // 灌满到当前bottle
    smallBootleList.forEach((item) => {
      if (item.id <= bottle.id) {
        item.isFull = true;
        lastOne.value = item.id;
      }
    });
  }

  // 计算大杯倍量
  calculateBigBottle(lastOne.value, smallBootleList.length * small_capacity);
}

const small_capacity = 250;
const remained = ref<number>((small_capacity * smallBootleList.length) / 1000);
const percent = ref<number>(0);

const isRemainedVisible = computed(() => {
  return remained.value !== 0;
});

const bigBottleHeight = 340;
// ref不会自动监听另一个red 需要使用computed
const percentHeight = computed(() => {
  return (bigBottleHeight * percent.value) / 100;
});

const isPercentVisible = computed(() => {
  return percentHeight.value !== 0;
});

function calculateBigBottle(last: number, capacity: number) {
  remained.value = (capacity - last * small_capacity) / 1000;
  percent.value = ((last * small_capacity) / capacity) * 100;
}
</script>

<style lang="scss" scoped>
@use "./drink-water.scss";
</style>
