<template>
  <div class="container">
    <div class="btn-bars">
      <div v-if="requestLoading" class="loading">Loading ...</div>

      <div v-else-if="requestError && !requestLoading" class="error">
        Resource acquisition failure
      </div>

      <div v-else>
        <button
          v-for="sound in sounds"
          :id="sound.name"
          :key="sound.id"
          class="btn"
          @click="playSound(sound.src)"
        >
          {{ sound.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requestWithTimeout } from "@/utils/requestWithTimeout";
import { onMounted, ref } from "vue";
import type { ApiResponse } from "@/types/apiTypes";

interface Sound {
  id: number;
  name: string;
  src: string;
}

const sounds = ref<Sound[]>();
const requestError = ref(false);
const requestLoading = ref(true);

const currentAudio = ref<HTMLAudioElement | null>(null);

function playSound(src: string) {
  // 如果有旧的正在播放，先暂停
  if (currentAudio.value) {
    currentAudio.value.pause();
    currentAudio.value.currentTime = 0; // 重置播放进度
  }

  // 创建新的音频并播放
  const audio = new Audio(src);
  currentAudio.value = audio;
  audio.play().catch((e) => {
    console.error("音频播放失败:", e.message);
  });
}

onMounted(async () => {
  try {
    const res = (await requestWithTimeout(
      "/api/sound-board/sounds"
    )) as ApiResponse<Sound[]>;

    if (res.code == 200) {
      sounds.value = res.data;
    } else {
      throw new Error("data abnormal");
    }
  } catch (e: any) {
    console.warn("request error: ", e.message);
    requestError.value = true;
  } finally {
    requestLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
@use "./sound-board.scss";
</style>
