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
      <div
        class="project-card"
        v-for="n in 20"
        :key="n"
        :style="{ width: cardWidth }"
      >
        <span class="day-tag">Day {{ n }}</span>

        <div class="thumbnail">Image {{ n }}</div>

        <div class="content">
          <h4 class="title">Project {{ n }}</h4>
          <a href="#" class="btn" target="_blank">Live Demo</a>
        </div>
      </div>
    </section>

    <section class="project-about"></section>
  </div>
</template>

<script setup lang="ts">
import { useCardGrid } from "@cp/useCardGrid";
const { cardWidth } = useCardGrid(300, 5); // 300 最小卡片宽度，最多5列
</script>

<style lang="sass" scoped>
@use "@styles/home"
</style>
