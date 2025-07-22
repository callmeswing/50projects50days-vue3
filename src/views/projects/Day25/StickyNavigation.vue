<template>
  <div class="container">
    <!-- nav -->
    <nav class="nav" ref="navRef" :class="{ active: isActive }">
      <div class="nav-container">
        <h1 class="nav-logo">
          <a href="#">My Website</a>
        </h1>
        <ul>
          <li><a href="#" class="current">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
        </ul>
      </div>
    </nav>
    <!-- intro -->
    <div class="intro">
      <div class="intro-container">
        <h1>Welcome to My Website</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores,
          consequuntur?
        </p>
      </div>
    </div>
    <!-- content -->
    <section class="content">
      <h2>Content One</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
        dolorem voluptates eveniet tempora ut cupiditate magnam, sapiente, hic
        quo in ipsum iste soluta eaque perferendis nihil recusandae dolore
        officia aperiam corporis similique. Facilis quos tempore labore totam!
        Consectetur molestiae iusto ducimus error reiciendis aspernatur dolor,
        modi dolorem sit architecto, voluptate magni sunt unde est quas?
        Voluptates a dolorum voluptatum quo perferendis aut sit. Aspernatur
        libero laboriosam ab eligendi omnis delectus earum labore, placeat
        officiis sint illum rem voluptas ipsum repellendus iste eius recusandae
        quae excepturi facere, iure rerum sequi? Illum velit delectus dicta et
        iste dolorum obcaecati minus odio eligendi!
      </p>
      <h3>Content Two</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
        provident nostrum possimus inventore nisi laboriosam consequatur modi
        nulla eos, commodi, omnis distinctio! Maxime distinctio impedit
        provident, voluptates illo odio nostrum minima beatae similique a sint
        sapiente voluptatum atque optio illum est! Tenetur tempora doloremque
        quae iste aperiam hic cumque repellat?
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const navRef = ref<HTMLElement | null>(null);
const isActive = ref(false);

// 简单节流函数
function throttle(fn: () => void, delay = 100) {
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
  if (!navRef.value) return;
  const triggerY = navRef.value.offsetHeight + 150;
  isActive.value = window.scrollY > triggerY;
}

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
@use "./sticky-navigation.scss";
</style>
