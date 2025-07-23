<template>
  <div class="home-page">
    <div class="header" ref="headerRef" :class="{ active: isHeaderActive }">
      <div class="container">
        <h1 class="header-title"><a href="#" v-html="title"></a></h1>
        <nav class="header-nav">
          <ul>
            <li><a href="#" class="current">Home</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <section class="intro">
      <div class="container">
        <h1 v-html="intro"></h1>
        <p>
          Practice your front-end skills every day by building mini projects
        </p>
        <p>Interest is the best teacher</p>
      </div>
    </section>

    <section class="project-gallery">
      <LiveDemoCard
        :style="{ width: cardWidth }"
        v-for="card in cards"
        :key="card.id"
        :dayNumber="card.id"
        :imageSrc="card.image"
        :title="card.title"
        :route="card.link"
      ></LiveDemoCard>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import LiveDemoCard from "@cp/LiveDemoCard.vue";
import { useCardGrid } from "@/composables/useCardGrid";
import type { ProjectCard } from "@/types/projectCard";
import { typedGet } from "@/utils/http";

const title = ref(
  `50 <span style="color: #c0392b;">Pro</span>jects in 50 days`
);

const intro = ref(
  `This website for show my VUE <span style="color: #c0392b;"> + </span>Scss skills`
);

const { cardWidth } = useCardGrid(150, 5); //最小卡片宽度，最多5列

const cards = ref<ProjectCard[]>([]);

onMounted(async () => {
  try {
    const result = await typedGet<ProjectCard[]>("/api/cards");
    if (result.code === 200) {
      cards.value = result.data;
    } else {
      return new Error("code is not 200...");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const headerRef = ref<HTMLElement | null>(null);
const isHeaderActive = ref(false);

// 1.简单节流函数
function throttle(fn: () => void, delay = 50) {
  let last = 0;
  return () => {
    const now = Date.now();
    if (now - last >= delay) {
      fn();
      last = now;
    }
  };
}

// 2. 滚动检测逻辑
function onScroll() {
  if (!headerRef.value) return;
  const triggerY = headerRef.value.offsetHeight + 150;
  isHeaderActive.value = window.scrollY > triggerY;
}

// 3.绑定
onMounted(() => {
  const handler = throttle(onScroll, 100);
  window.addEventListener("scroll", handler);
  // 立即执行一次，确保初始状态正确
  handler();

  onUnmounted(() => {
    window.removeEventListener("scroll", handler);
  });
});
</script>

<style lang="scss" scoped>
@use "@styles/home";
</style>
