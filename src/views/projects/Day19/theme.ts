import { computed, ref } from "vue";

type Theme = "light" | "dark" | "system";
export type EffectiveTheme = "light" | "dark";
const KEY = "THEME";

const useTheme = function () {
  const darkMode: EffectiveTheme = "dark";
  const lightMode: EffectiveTheme = "light";
  const systemMode: Theme = "system";
  // default 默认 dark
  const defaultTheme = ref<EffectiveTheme>(darkMode);
  const activeTheme = ref<EffectiveTheme>(darkMode);

  const inactiveTheme = computed(() =>
    activeTheme.value === darkMode ? lightMode : darkMode
  );

  function computeEffective(t: Theme): EffectiveTheme {
    if (t === darkMode) return darkMode;
    if (t === lightMode) return lightMode;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? darkMode
      : lightMode;
  }

  // 应用主题
  function applyTheme(t: Theme) {
    const eff = computeEffective(t);
    activeTheme.value = eff;
  }

  // 设定默认主题
  function setDefaultTheme(t: EffectiveTheme) {
    defaultTheme.value = t;
    try {
      localStorage.setItem(KEY, t);
    } catch {
      // TODO
    }
    applyTheme(t);
  }

  function switchTheme() {
    activeTheme.value = activeTheme.value === darkMode ? lightMode : darkMode;
  }

  return {
    KEY,
    darkMode,
    lightMode,
    systemMode,
    setDefaultTheme,
    switchTheme,
    applyTheme,
    defaultTheme,
    activeTheme,
    inactiveTheme,
  };
};

export default useTheme;
