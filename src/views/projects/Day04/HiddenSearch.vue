<template>
  <div class="container-wrapper">
    <div
      ref="searchContainer"
      class="search-container"
      :class="[searchActive ? 'active' : '']"
    >
      <input
        ref="searchInput"
        type="text"
        class="search-input"
        placeholder="Google it .."
        v-model="searchQuery"
        @keyup.enter="handleSearch"
      />
      <button
        class="search-btn"
        @click="
          () => {
            searchActive = !searchActive;
          }
        "
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const searchActive = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const searchQuery = ref<string>("");

// 打开后自动获取焦点
watch(searchActive, async (newVal) => {
  if (newVal) {
    await nextTick(); // 等待DOM更新完成
    searchInput.value?.focus();
  }
});

const handleSearch = () => {
  const queryInfo = searchQuery.value.trim();
  if (queryInfo != "") {
    // URL 编码 🌟
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      queryInfo
    )}`;
    window.open(url, "_blank");
  } else {
    // 触发新增的动画
    triggerShake();
  }
};

// 新增动画内容
const searchContainer = ref<HTMLElement | null>(null);
const triggerShake = () => {
  if (searchContainer.value) {
    // 直接在脚本中操作DOM的class属性
    searchContainer.value.classList.remove("shake"); // 先移除，确保能重新触发动画
    void searchContainer.value.offsetWidth; // 强制重绘，重新触发 animation
    searchContainer.value.classList.add("shake");
  }
};
</script>

<style lang="scss" scoped>
@use "./hidden-search.scss";
</style>
