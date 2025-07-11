<template>
  <div class="card">
    {{ msg }}
    <small class="label">{{ label }}</small>
  </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string | number; label?: string }>();
</script>

<style lang="scss" scoped></style>
