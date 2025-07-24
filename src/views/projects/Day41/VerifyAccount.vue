<template>
  <div class="container">
    <div class="verify-frame">
      <h2>Verify Your Account</h2>
      <p>
        We emailed you the six digit code to cool_guy@email.com Enter the code
        below to confirm your email address.
      </p>
      <div class="code-container">
        <input
          class="code"
          v-for="(digit, index) in digits"
          :key="index"
          placeholder="0"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="1"
          v-model="digits[index]"
          @input="onInput(index, $event)"
          required
        />
      </div>
      <button @click="submitCode" class="sub-btn" :disabled="!isComplete">
        submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive } from "vue";

/** 存放校验码 */
const digits = reactive<string[]>(["", "", "", "", "", ""]);
/** btn 可用校验 */
const isComplete = computed(() => digits.every((d) => /^\d$/.test(d)));
// const isComplete = false;

/** input事件 */
function onInput(index: number, e: Event) {
  const el = e.target as HTMLInputElement;
  // maxLengh = 1  能确保输入1位
  // numeric  用于触发移动端web的数字键盘
  // pattern  仅用于校验，并不能确保输入的是非数字，且还能粘贴

  // 所以  这里替换掉非数字，仅保留数字（最后一位）
  const value = el.value.replace(/\D/g, "").slice(-1);
  digits[index] = value;

  // 切换焦点
  if (value && index < digits.length - 1) {
    (el.nextElementSibling as HTMLInputElement)?.focus();
  }
}

/** 提交并清空digits */
function submitCode() {
  if (!isComplete.value) {
    return;
  }

  const code = digits.join("");
  window.alert("you submit code is: 👉" + code);
  digits.fill("");

  // 可选 归位
  nextTick(() => {
    const first = document.querySelector<HTMLInputElement>(
      ".code-container input"
    );
    first?.focus();
  });
}

/** 进阶 ⭐考虑禁用submit的时机 ⭐考虑enter触发submit */
// 禁用思路：button的disable属性 绑定一个computed变量
// enter思路：暂时不做...
</script>

<style lang="scss" scoped>
@use "./verify-account.scss";
</style>
