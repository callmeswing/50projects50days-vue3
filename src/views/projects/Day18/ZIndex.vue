<template>
  <div class="container">
    <div class="bg">background</div>
    <div class="neg">z-index: -1</div>
    <p class="static">static element</p>
    <div class="auto">z-auto</div>
    <div class="z0">z0</div>
    <div class="z1">z1</div>
    <div class="z10">z10</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  position: relative;
  z-index: 0; // stacking-context
  width: 400px;
  height: 200px;
  border: 2px solid burlywood;
  background: lightgrey;
  text-align: center;
  color: antiquewhite;
}

.bg {
  position: absolute;
  top: 10px;
  left: 10px;
  background: pink;
  width: 300px;
  height: 00px;
  z-index: -2; /* 比父背景还低，几乎看不见 */
  font-size: 50px;
}

.neg {
  position: absolute;
  top: 20px;
  left: 20px;
  background: orange;
  width: 150px;
  height: 80px;
  z-index: -1; /* 2. 负 z-index 层 */
  font-size: 14px;
}

.static {
  background: lightblue;
  margin: 10px;
  /* 3. 普通流 static 元素 */
  font-size: 14px;
}

.auto {
  position: relative;
  background: violet;
  width: 150px;
  height: 80px;
  // top: 0;
  /* 4. z-index:auto 定位元素 */
  font-size: 14px;
}

.z0 {
  position: absolute;
  background: yellow;
  top: 60px;
  width: 300px;
  height: 80px;
  z-index: 0; /* 5a. z-index>=0 的定位元素（从小开始） */
  font-size: 14px;
}

.z1 {
  position: absolute;
  background: green;
  width: 100px;
  height: 70px;
  top: 80px;
  left: 240px;
  z-index: 1; /* 5b. z-index=1 */
  font-size: 14px;
}

.z10 {
  position: absolute;
  background: red;
  width: 100px;
  height: 70px;
  top: 100px;
  left: 280px;
  z-index: 10; /* 5c. z-index=10 */
  font-size: 14px;
}
</style>
