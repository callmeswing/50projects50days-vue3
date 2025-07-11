<template>
  <div class="container">
    <div class="card-zone">
      <LittleCard v-if="start" :msg="'Press any key to get the keyCode'" />
      <template v-else>
        <LittleCard
          :msg="keyInfo.key === ' ' ? keyInfo.code : keyInfo.key"
          :label="'key'"
        />
        <LittleCard :msg="keyInfo.keyCode" :label="'keyCode'" />
        <LittleCard :msg="keyInfo.code" :label="'code'" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./LittleCard.vue";
import LittleCard from "./LittleCard.vue";
import { onMounted, onUnmounted, ref } from "vue";

interface KeyInfo {
  key: string;
  keyCode: number;
  code: string;
}

const start = ref(true);
const keyInfo = ref<KeyInfo>({ key: "", keyCode: 0, code: "" });

function onKeydown(event: KeyboardEvent) {
  keyInfo.value = {
    key: event.key,
    keyCode: event.keyCode,
    code: event.code,
  };
  start.value = false;
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<style lang="scss" scoped>
@use "./event-keycodes.scss";
</style>
