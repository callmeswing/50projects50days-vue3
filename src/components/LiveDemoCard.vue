<template>
  <!-- card 展示组件 -->
  <!-- 需要接收的数据：span天数 image路径 h4内容 href路径 -->
  <div>
    <span class="day-tag">Day {{ dayNumber }}</span>
    <img class="thumbnail" :src="imageSrc" />
    <div class="content">
      <h4 class="title">{{ title }}</h4>
      <a :href="route" class="btn" target="_blank">Live Demo</a>
    </div>
  </div>
</template>
<script setup lang="ts">
const { dayNumber, imageSrc, title, route } = defineProps<{
  dayNumber: number;
  imageSrc: string;
  title: string;
  route: string;
}>();
</script>
