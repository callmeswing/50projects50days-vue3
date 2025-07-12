<template>
  <div class="container">
    <div class="wrapper">
      <h3 class="prompt" v-html="prompt" />
      <textarea
        placeholder="Enter choices here..."
        id="textarea"
        maxlength="200"
        v-model="choices"
        @keyup.enter.prevent="startRandomSelect"
      ></textarea>
      <div class="choice-container">
        <span
          class="choice"
          :class="{ highlight: highlightedIndex === idx }"
          v-for="(item, idx) in finalChoiceArray"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const prompt =
  "Enter all of the choices divided by a comma (',').<br>Press enter when you're done";

const choices = ref<string>("");
const highlightedIndex = ref<number>(-1);

const choiceArray = computed(() => {
  return choices.value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
});

// 感觉稍显鸡肋
// 每次输入变更时，同步更新 tags（如果想要只在回车时更新，可以移除这段，在 startRandomSelect 里手动同步）
const finalChoiceArray = ref<string[]>([]);
watch(choiceArray, (arr) => {
  finalChoiceArray.value = arr;
});

// 拿到 textarea 元素，用于最后清空输入 （不需要了 在nextTick里面做始终v-model双向绑定的数据会被从新写入）
// const textareaEl = ref<HTMLTextAreaElement>();

function startRandomSelect() {
  // a. 快照
  const snapshot = [...finalChoiceArray.value];
  // b. 清空输入，tags 也会先清空 DOM 上的标签列表
  choices.value = "";
  // c. 动画
  doFlashAnimation(snapshot);
}

// 感觉有问题 暂停在这里
function doFlashAnimation(list: string[]) {
  if (!list.length) return;

  const totalFlashes = 30;
  const intervalMs = 100;
  let count = 0;

  console.log(2);

  const intervalId = setInterval(() => {
    flashRandomChoice();
    count++;
    if (count >= totalFlashes) {
      clearInterval(intervalId);
      // 最后选定
      setTimeout(() => {
        flashRandomChoice(true);
      }, intervalMs);
    }
  }, intervalMs);
}

// 高亮逻辑，final=true 时不取消高亮
function flashRandomChoice(final = false) {
  const len = choiceArray.value.length;
  if (len === 0) return;

  const idx = Math.floor(Math.random() * len);
  highlightedIndex.value = idx;

  if (!final) {
    // 100ms 后取消高亮
    setTimeout(() => {
      highlightedIndex.value = -1;
    }, 100);
  }
}
</script>

<style lang="scss" scoped>
@use "./random-choice-picker.scss";
</style>
