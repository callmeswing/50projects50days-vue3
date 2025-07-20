<template>
  <div class="container">
    <div class="wrapper">
      <p class="prompt" v-html="prompt" />
      <!-- 监听input事件，更新displayedTags-->
      <!-- 监听enter的up事件，用于开始渲染，并同时清空输入框且暂时禁用-->
      <!-- 动画中禁用 -->
      <textarea
        placeholder="Enter choices here..."
        id="textarea"
        maxlength="200"
        v-model="choices"
        @input="onInput"
        @keyup.enter.prevent="startRandomSelect"
        :disabled="isAnimating"
      ></textarea>
      <!-- 渲染 displayedTags，而不是直接渲染 computed -->
      <div class="choice-container">
        <span
          class="choice"
          :class="{ highlight: highlightedIndex === idx }"
          v-for="(item, idx) in displayedTags"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

// 动画中标识
const isAnimating = ref<boolean>(false);

// 提示信息
const prompt =
  "Enter all of the choices divided by a comma (',').<br>Press enter when you're done";

// 高亮元素的下表
const highlightedIndex = ref<number>(-1);

// v-model 双向绑定的 原始输入信息
const choices = ref<string>("");

// computed 计算输入信息，拆分为数组（在onInput的时候工作）
const choiceArray = computed(() => {
  return choices.value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
});

// 真正渲染使用的数组，在@input的时候拷贝computed出来的数据，不会因为computed数据丢失而丢失渲染数组
const displayedTags = ref<string[]>([]);

function onInput() {
  // 情况高亮下标
  if (highlightedIndex.value != -1) {
    highlightedIndex.value = -1;
  }
  displayedTags.value = choiceArray.value;
}

// 开始最终渲染
function startRandomSelect() {
  // 1. 清空输入 同时也会清空掉computed
  choices.value = "";
  // 2. 设置标识
  isAnimating.value = true;
  // 3. 开始渲染
  doFlashAnimation();
  // 4. 结束的设置标识在最终渲染处（但是感觉有风险，应该try、catch一下也设置回去？）
  // 还有一个方案就是传递一个回调函数出去，在回调中设置标识
}

// 感觉有问题 暂停在这里
function doFlashAnimation() {
  if (!displayedTags.value.length) return;

  // 渲染多少次
  const totalFlashes = 20;
  // 渲染间隔 ms
  const intervalMs = 100;
  // 计数器
  let count = 0;

  const intervalId = setInterval(() => {
    flashRandomChoice(false, intervalMs);
    count++;
    if (count >= totalFlashes) {
      clearInterval(intervalId);
      // 最终选择
      setTimeout(() => {
        flashRandomChoice(true, intervalMs);
      }, intervalMs);
    }
  }, intervalMs);
}

// 高亮逻辑
function flashRandomChoice(final: boolean, intervalMs: number) {
  const len = displayedTags.value.length;

  const idx = Math.floor(Math.random() * len);
  highlightedIndex.value = idx;

  if (!final) {
    // 取消高亮
    setTimeout(() => {
      highlightedIndex.value = -1;
    }, intervalMs * (2 / 3));
  } else {
    // 动画结束
    isAnimating.value = false;
  }
}
</script>

<style lang="scss" scoped>
@use "./random-choice-picker.scss";
</style>
