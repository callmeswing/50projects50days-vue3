<template>
  <div class="container">
    <h2>Scroll to see animation</h2>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
    <div class="box">Content</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// 原网址方案 GPT给出了给更优的原生方案 见下方
onMounted(() => {
  // 这里没有办法通过模板修改样式达成效果，因为元素相对视窗距离在模板中获取不到，所以需要手动
  const boxes = document.querySelectorAll(".box");
  console.log(boxes);
  window.addEventListener("scroll", updateTriggerBottom);
  updateTriggerBottom();

  function updateTriggerBottom() {
    let triggerBottom = (window.innerHeight / 5) * 4;
    boxes.forEach((box) => {
      // 元素顶部对于视窗顶部的距离 就是这个获取不到在模板中
      const boxTop = box.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        box.classList.add("show");
      } else {
        box.classList.remove("show");
      }
    });
  }
});

// IntersectionObserver API
// 浏览器提供的「观察元素是否进入某个可视区域」的机制，不用你自己算 .top，浏览器帮你做了
// but 这个方案不适合！ hidden掉的元素无法被观察到！ shit
// onMounted(() => {
//   const boxes = document.querySelectorAll(".box");
//   //   console.log(boxes);
//   console.log("IntersectionObserver" in window);

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         console.log("entry:", entry);
//         if (entry.isIntersecting) {
//           entry.target.classList.add("show");
//         } else {
//           entry.target.classList.remove("show");
//         }
//       });
//     },
//     {
//       threshold: 0.2, // 触发的可见比例，0.2 = 20%可见时触发
//     }
//   );

//   boxes.forEach((box) => observer.observe(box));
// });
</script>

<style lang="scss" scoped>
@use "./scroll-animation.scss";
</style>
