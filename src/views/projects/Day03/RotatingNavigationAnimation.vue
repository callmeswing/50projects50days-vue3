<template>
  <div class="container-wrapper">
    <div class="container" :class="[showNav ? 'show-nav' : '']">
      <!-- 开关区 -->
      <div class="circle-container">
        <div class="circle">
          <button id="open" @click="showNav = true">
            <!-- i标签：本设计是没有语义的斜体 现在常被用做图标容器 -->
            <i class="fas fa-bars" />
          </button>
          <button id="close" @click="showNav = false">
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
      <!-- 主内容区 -->
      <div class="main">
        <router-view #="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </div>
    </div>

    <!-- 侧边导航区 -->
    <nav class="side-nav">
      <ul>
        <li v-for="nav in navList" :key="nav.id" @click="switchNav(nav.path)">
          <i :class="nav.class"></i><span>{{ nav.name }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// useRouter是Hook函数 不能直接在函数或回调中适用，在setup顶层调用并声明 🌟
const router = useRouter();

const showNav = ref(false);

interface NavItem {
  id: number;
  path: string;
  class: string;
  name: string;
}

const navList = reactive<NavItem[]>([
  {
    id: 1,
    path: "/projects/rotating-navigation-animation/griezmann",
    class: "fas fa-user-alt",
    name: "griezmann",
  },
  {
    id: 2,
    path: "/projects/rotating-navigation-animation/sonny",
    class: "fas fa-user-alt",
    name: "son heung-min",
  },
  {
    id: 3,
    path: "/projects/rotating-navigation-animation/harrykane",
    class: "fas fa-user-alt",
    name: "harry kane",
  },
]);

function switchNav(path: string): void {
  showNav.value = false;
  router.push(path);
}
</script>

<style lang="scss" scoped>
@use "./rotating-navigation-animation.scss";
</style>
