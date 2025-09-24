<template>
  <div class="card">
    <div class="poster">
      <img :src="background" :alt="title" />
    </div>
    <div class="info">
      <span class="title">
        {{ title }}
      </span>
      <span class="score" :style="{ color: scoreColor }">
        {{ score }}
      </span>
    </div>
    <div class="overview" v-if="overview">
      <h3>Overview</h3>
      {{ overview }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const { background, title, score, overview } = defineProps<{
  background: string;
  title: string;
  score: number;
  overview: string;
}>();

// const title =
//   "Ethan Hunt and team continue their search for the terrifying AI known as the Entity";
// const score = 8.2;

const FIRST = "#90EE89";
const SECOND = "#FFA513";
const THIRD = "#FF0000";
const DEFAULT = "#22254b";
const scoreColor = ref<string>(DEFAULT);

const decideColor = function (score: number) {
  if (score >= 8) {
    scoreColor.value = FIRST;
  } else if (score >= 5.5) {
    scoreColor.value = SECOND;
  } else {
    scoreColor.value = THIRD;
  }
};

onMounted(() => {
  decideColor(score);
});
</script>

<style lang="scss" scoped>
$primary-color: #22254b;
$second-color: #373b69;
$second-color-light: #777ecc;

.card {
  width: 300px;
  height: 550px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.poster {
  height: 80%;
  // background-color: bisque;

  img {
    width: 100%;
    height: 100%;
  }
}

.info {
  flex: 1;
  background-color: $second-color;
  display: flex;
  position: relative;
}

.title {
  // background-color: palevioletred;
  width: 70%;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding: 14px;
  padding-right: 0;
  line-height: 1.2;
  display: -webkit-box; /* ⭐多行截断三件套 */
  -webkit-line-clamp: 3; /* 最多 3 行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* 让高度可预期：行高 * 行数（可选，加强一致性） */
  max-height: calc(1.4em * 3);
}

.score {
  background-color: $primary-color;
  position: absolute;
  border-radius: 4px;
  font-size: 18px;
  padding: 3px 6px;
  right: 16px;
  top: 24px;
}

.overview {
  background-color: #fff;
  color: rgb(22, 22, 22);
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  max-height: 100%;
  padding: 2rem;
  line-height: 1.4rem;
  letter-spacing: 1px;

  h3 {
    margin-bottom: 20px;
  }

  transform: translateY(101%);
  transition: transform 0.3s ease-in;
}

.card:hover .overview {
  transform: translateY(0);
}
</style>
