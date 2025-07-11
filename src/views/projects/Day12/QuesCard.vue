<template>
  <div :class="['card-wrapper', { active: isOpen }]">
    <h3 class="question">{{ question }}</h3>
    <p v-if="isOpen">{{ anser }}</p>
    <button class="card-toggle" @click.prevent="$emit('toggle')">
      <i class="fas fa-chevron-down"></i>
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
// 其实此处如果父组件的interface提取出来 可以直接define一个对象出来
defineProps<{ question: string; anser: string; isOpen: boolean }>();
defineEmits<{ (e: "toggle"): void }>();
</script>

<style lang="scss" scoped></style>
