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
      <!-- <div
        class="project-card"
        v-for="n in 1"
        :key="n"
        :style="{ width: cardWidth }"
      >
        <span class="day-tag">Day {{ n }}</span>

        <div class="thumbnail">Image {{ n }}</div>

        <div class="content">
          <h4 class="title">Project {{ n }}</h4>
          <a href="#" class="btn" target="_blank">Live Demo</a>
        </div>
      </div> -->
      <LiveDemoCard
        class="project-card"
        :style="{ width: cardWidth }"
        v-for="card in cards"
        :key="card.id"
        :dayNumber="card.id"
        :imageSrc="card.image"
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

const { cardWidth } = useCardGrid(300, 5); // 300 最小卡片宽度，最多5列

const cards = ref<ProjectCard[]>([]);

onMounted(async () => {
  try {
    const result = await typedGet<ProjectCard[]>("/api/cards");

    console.log(result);

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

<style lang="sass">
@use "@styles/home"
</style>
