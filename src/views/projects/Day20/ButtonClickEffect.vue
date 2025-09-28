<template>
  <div class="container">
    <button class="btn">{{ btnLabel }}</button>
  </div>
</template>

<script setup lang="ts">
const btnLabel = "Click me";
</script>

<style lang="scss" scoped>
@use "./button-click-effect.scss";
</style>
