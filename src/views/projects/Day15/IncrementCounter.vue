<template>
  <div class="container">
    <div class="tags-container">
      <ul class="tag-ul">
        <li class="tag-li" v-for="item in data">
          <i :class="item.icon"></i>
          <h3>{{ item.followers }}</h3>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";

interface MediaTagInfo {
  icon: string;
  followers: number;
  followers_target: number;
  name: string;
}

const data = reactive<MediaTagInfo[]>([
  {
    icon: "fab fa-twitter fa-3x",
    followers: 0,
    followers_target: 12000,
    name: "Twitter",
  },
  {
    icon: "fab fa-youtube fa-3x",
    followers: 0,
    followers_target: 5000,
    name: "Youtube",
  },
  {
    icon: "fab fa-facebook fa-3x",
    followers: 0,
    followers_target: 7500,
    name: "Facebook",
  },
]);

// 同一时间（3s）渲染followers 从0到目标量
onMounted(() => {
  const duration = 1500;
  const startTime = performance.now();

  const tick = () => {
    const now = performance.now();
    const elapsed = now - startTime;

    // 进度[0, 1]
    const progress = Math.min(elapsed / duration, 1);

    // update
    data.forEach((item) => {
      item.followers = Math.floor(item.followers_target * progress);
    });

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      data.forEach((item) => {
        item.followers = item.followers_target;
      });
    }
  };

  requestAnimationFrame(tick);
});
</script>

<style lang="scss" scoped>
@use "./increment-counter.scss";
</style>
