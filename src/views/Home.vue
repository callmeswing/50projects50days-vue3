<template>
  <div class="home-page">
    <header class="home-header">
      <h1 class="title">50 Projects in 50 Days</h1>
      <nav class="nav">
        <a href="#">Home</a><a href="#">Projects</a><a href="#">About</a>
      </nav>
    </header>

    <section class="home-intro">
      <p>Practice your front-end skills every day by building mini projects.</p>
    </section>

    <section class="project-gallery">
      <LiveDemoCard
        :style="{ width: cardWidth }"
        v-for="card in cards"
        :key="card.id"
        :dayNumber="card.id"
        :imageSrc="card.image.href"
        :title="card.title"
        :route="card.link"
      ></LiveDemoCard>
    </section>

    <section class="project-about"></section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import LiveDemoCard from "@cp/LiveDemoCard.vue";
import { useCardGrid } from "@/composables/useCardGrid";
import type { ProjectCard } from "@/types/projectCard";
import { typedGet } from "@/utils/http";

const { cardWidth } = useCardGrid(150, 5); //最小卡片宽度，最多5列

const cards = ref<ProjectCard[]>([]);

onMounted(async () => {
  try {
    const result = await typedGet<ProjectCard[]>("/api/cards");

    // console.log(result);

    if (result.code === 200) {
      cards.value = result.data;
    } else {
      return new Error("code is not 200...");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style lang="scss" scoped>
@use "@styles/home";
</style>
