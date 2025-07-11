<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <div class="card-container">
      <QuesCard
        v-for="item in questions"
        :question="item.question"
        :anser="item.answer"
        :is-open="item.isOpen"
        @toggle="toggle(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import QuesCard from "./QuesCard.vue";

interface Question {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

const title = "Frequently Asked Questions";
const questions = ref<Question[]>([
  {
    id: 1,
    question: "Why shouldn't we trust atoms?",
    answer: "They make up everything.",
    isOpen: true,
  },
  {
    id: 2,
    question: "What do you call someone with no body and no nose?",
    answer: "Nobody knows",
    isOpen: false,
  },
  {
    id: 3,
    question: "What's the object-oriented way to become wealthy?",
    answer: "Inheritance.",
    isOpen: false,
  },
  {
    id: 4,
    question: "How many tickles does it take to tickle an octopus?",
    answer: "Ten-tickles!",
    isOpen: false,
  },
  {
    id: 5,
    question: "What is: 1 + 1?",
    answer: "Depends on who are you askin.",
    isOpen: false,
  },
]);

function toggle(id: number) {
  const q = questions.value.find((x) => x.id === id);
  if (q) {
    q.isOpen = !q.isOpen;
  }
}
</script>

<style lang="scss" scoped>
@use "./fal-collapse.scss";
</style>
