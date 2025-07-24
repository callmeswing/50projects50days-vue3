<template>
  <div class="container">
    <!-- frame -->
    <div class="mobile">
      <!--img-->
      <div class="imgs">
        <img
          class="content"
          v-for="item in navInfoList"
          :src="item.src"
          :alt="item.ref"
          :class="{ active: item.ref === activeNav }"
        />
      </div>
      <!-- nav -->
      <nav class="nav">
        <ul>
          <li
            class="navItem"
            v-for="item in navInfoList"
            :class="{ active: item.ref === activeNav }"
            @click="navChange(item.ref)"
          >
            <i :class="item.icon" />
            <p>{{ item.nav }}</p>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeNav = ref("home");

interface NavInfo {
  nav: string;
  icon: string;
  src: URL;
  ref: string;
}

const navInfoList = ref<NavInfo[]>([
  {
    nav: "Home",
    icon: "fas fa-home",
    src: new URL("@/views/projects/Day38/imgs/home.jpg", import.meta.url),
    ref: "home",
  },
  {
    nav: "Work",
    icon: "fas fa-box",
    src: new URL("@/views/projects/Day38/imgs/work.jpg", import.meta.url),
    ref: "work",
  },
  {
    nav: "Blog",
    icon: "fas fa-book-open",
    src: new URL("@/views/projects/Day38/imgs/blog.jpg", import.meta.url),
    ref: "blog",
  },
  {
    nav: "About Us",
    icon: "fas fa-users",
    src: new URL("@/views/projects/Day38/imgs/about-us.jpg", import.meta.url),
    ref: "about-us",
  },
]);

function navChange(nowNav: string) {
  activeNav.value = nowNav;
}

// 1.设置默认ref的样式
// 2.func 根据点击调整样式
</script>

<style lang="scss" scoped>
@use "./mobile-tab-navigation.scss";
</style>
