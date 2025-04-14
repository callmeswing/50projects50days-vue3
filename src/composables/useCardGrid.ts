import { ref, computed, onMounted, onUnmounted } from "vue";

export function useCardGrid(minCardWidth = 300, maxColumns = 5) {
  const windowWidth = ref(window.innerWidth);

  const updateWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => window.addEventListener("resize", updateWidth));
  onUnmounted(() => window.removeEventListener("resize", updateWidth));

  const columns = computed(() => {
    return Math.min(Math.floor(windowWidth.value / minCardWidth), maxColumns);
  });

  const cardWidth = computed(() => {
    return `${100 / columns.value}%`;
  });

  return { columns, cardWidth };
}
