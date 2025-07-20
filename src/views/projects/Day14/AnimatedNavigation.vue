<template>
  <div class="container">
    <div class="nav-bar" :class="isNavActive ? 'active' : ''">
      <ul class="nav-ul">
        <li class="nav-li" v-for="(item, idx) in navNodeList">
          <a href="#">{{ item.nav }}</a>
        </li>
      </ul>
      <button class="icon" id="toggle" @click="navToggle">
        <div class="line line1"></div>
        <div class="line line2"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isNavActive = ref<boolean>(true);

function navToggle() {
  isNavActive.value = !isNavActive.value;
}

interface NavNode {
  id: number;
  nav: string;
}

const navNodeList = ref<NavNode[]>([
  { id: 1, nav: "Home" },
  { id: 2, nav: "Works" },
  { id: 3, nav: "Abot" },
  { id: 4, nav: "Contact" },
]);
</script>

<style lang="scss" scoped>
@use "./animated-navigation.scss";
</style>
