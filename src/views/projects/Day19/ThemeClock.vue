<template>
  <div class="container" :class="activeTheme">
    <div class="clock-container">
      <div class="clock">
        <div class="needle hour" ref="hourEl"></div>
        <div class="needle minute" ref="minuteEl"></div>
        <div class="needle second" ref="secondEl"></div>
        <div class="center-point"></div>
      </div>

      <div class="time">
        <span>{{ timeTable }}</span>
      </div>

      <div class="date">
        {{ dateTable }} <span class="circle">{{ dayTable }}</span>
      </div>
    </div>

    <button class="mode-btn" @click="switchTheme">
      {{ inactiveTheme }} mode
    </button>
    <button
      class="set-default"
      v-show="activeTheme !== defaultTheme"
      @click="setDefaultTheme(activeTheme)"
    >
      Set this mode as default.
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { days, months, scale } from "./time";
import useTheme from "./theme";
import type { EffectiveTheme } from "./theme";

/**
思路：
	样式切换方式 - 通过动态添加class修改（直接在顶容器添加即可 dark | light）
	默认模式 - 默认是dark，可以修改为light，设置存储在本地（那么进入页面就需要读取本地）

进阶：
	1. 可切换默认主题，通过storage存储（初始默认主题dark）✔
	2. 提取脚本到外部 ✔
 */

const {
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
} = useTheme();

onMounted(() => {
  // 读取、判断主题设置
  try {
    const saved = localStorage.getItem(KEY) as EffectiveTheme | null;
    if (saved && (saved === darkMode || saved === lightMode)) {
      defaultTheme.value = saved;
      applyTheme(saved);
      console.log("read success: " + saved);
    } else {
      // 尝试读取系统主题
      applyTheme(systemMode);
      console.log("read faild then go sysytem");
    }
  } catch {
    // TODO
  }

  console.log(defaultTheme.value);
  console.log(activeTheme.value + " " + inactiveTheme.value);

  setTime();
  setInterval(setTime, 1_000);
});

onMounted(() => {});

const hourEl = ref<HTMLDivElement | null>(null);
const minuteEl = ref<HTMLDivElement | null>(null);
const secondEl = ref<HTMLDivElement | null>(null);
const timeTable = ref<string | null>(null);
const dateTable = ref<string | null>(null);
const dayTable = ref<number | null>(null);

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const hours = time.getHours();
  const hoursForClock = hours % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  dayTable.value = time.getDate();

  (
    hourEl.value as HTMLDivElement
  ).style.transform = `translate(-50%, -100%) rotate(${scale(
    hoursForClock,
    0,
    11,
    0,
    360
  )}deg)`;

  (
    minuteEl.value as HTMLDivElement
  ).style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    59,
    0,
    360
  )}deg)`;

  (
    secondEl.value as HTMLDivElement
  ).style.transform = `translate(-50%, -100%) rotate(${scale(
    seconds,
    0,
    59,
    0,
    360
  )}deg)`;

  timeTable.value = `${hoursForClock}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`;

  dateTable.value = `${days[day]}, ${months[month]}`;
}
</script>

<style lang="scss" scoped>
@use "./theme-clock.scss";
</style>
