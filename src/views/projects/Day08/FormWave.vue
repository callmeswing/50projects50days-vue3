<template>
  <div class="container">
    <div class="login-card">
      <h1 class="title">Sign up 👇</h1>

      <form action="">
        <div class="input-container">
          <!-- 关于邮箱长度 根据协议 邮箱最长也就254 -->
          <input
            type="text"
            size="254"
            class="email"
            id="email"
            v-model="email"
            @blur="validateEmial"
            :class="[emailHang ? 'hang' : '', emailError ? 'error' : '']"
            @focus="
              () => {
                emailHang = true;
                emailError = false;
              }
            "
          />
          <label for="email" class="email-label">
            <span style="transition-delay: 0ms">E</span>
            <span style="transition-delay: 50ms">m</span>
            <span style="transition-delay: 100ms">a</span>
            <span style="transition-delay: 150ms">i</span>
            <span style="transition-delay: 200ms">l</span>
          </label>
        </div>

        <div class="input-container password-container">
          <input
            :type="[eyeOpen ? 'text' : 'password']"
            class="password"
            id="password"
            v-model="password"
            @blur="validatePssword"
            :class="[passwordHang ? 'hang' : '', passwordErorr ? 'error' : '']"
            @focus="
              () => {
                passwordHang = true;
                passwordErorr = false;
              }
            "
          />

          <button
            type="button"
            class="eye-status"
            @mousedown.prevent="
              () => {
                eyeOpen = !eyeOpen;
              }
            "
          >
            <!-- 图标 i 需要字体支持 -->
            <i
              style="font-family: 'Font Awesome 6 Free'"
              class="fas"
              :class="[eyeOpen ? 'fa-eye-slash' : 'fa-eye']"
              :hidden="!passwordHang"
            ></i>
          </button>

          <label for="password" class="password-label">
            <span style="transition-delay: 0ms">P</span>
            <span style="transition-delay: 40ms">a</span>
            <span style="transition-delay: 80ms">s</span>
            <span style="transition-delay: 120ms">s</span>
            <span style="transition-delay: 160ms">w</span>
            <span style="transition-delay: 200ms">o</span>
            <span style="transition-delay: 240ms">r</span>
            <span style="transition-delay: 280ms">d</span>
          </label>

          <!-- 这里想做淡入淡出的效果 但是发现hidden没办法实现：hidden本质是通过display:none 而display是无法被transition影响的 -->
          <!-- 用 opacity、transform、visibility 等配合 transition -->
          <span
            ref="shakeReminder"
            class="password-reminder"
            style="transition-delay: 160ms"
            >8-16 digits, capital and lower-case letter, numbers and those (
            !@#*+\-=._ ) are allowd</span
          >
        </div>

        <button
          type="button"
          class="btn"
          :disabled="!btnActive"
          @click="signUp"
        >
          Sign up
        </button>

        <div class="to-register">
          <span
            >Already have account?
            <a href="#">&nbsp;&nbsp;Sign in 👾&nbsp;&nbsp;&nbsp;</a></span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 表单数据
const email = ref<string>("");
const password = ref<string>("");

// 登录按钮控制
const btnActive = ref(false);

// input label 状态
const emailHang = ref(false);
const emailError = ref(false);
const passwordHang = ref(false);
const passwordErorr = ref(false);
const eyeOpen = ref(false);

// 校验规则
const emailRegex =
  /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=[\w!@#*+\-=.]{8,16}$)[\w!@#*+\-=.]+$/;

function validateEmial() {
  btnActive.value = false;
  email.value = email.value.trim();
  if (email.value === "") {
    // 默认值，不校验，字符位置还原，不进行提示
    emailHang.value = false;
  } else {
    // 校验，通过与否样式都不还原，不通过需要提示，并将字体颜色修改，再次input的时候修正
    if (emailRegex.test(email.value)) {
      if (passwordRegex.test(password.value)) {
        btnActive.value = true;
      }
    } else {
      emailError.value = true;
      notification.warn({
        message: "Invalid email",
        description: "Please enter a valid email address",
      });
    }
  }
}

function validatePssword() {
  btnActive.value = false;
  password.value = password.value.trim();
  if (password.value != "") {
    // 1.不为空，进行校验
    if (passwordRegex.test(password.value)) {
      // 1.1正确 校验一次email 通过放行按钮
      if (emailRegex.test(email.value)) {
        btnActive.value = true;
      }
    } else {
      // 1.2错误 error样式，动画以及提示
      passwordErorr.value = true;
      triggerShake();
      notification.warn({
        message: "Invalid password",
        description: "Please follow the password requirements",
      });
    }
  } else {
    // 2.为空 取消hang
    passwordHang.value = false;
    eyeOpen.value = false;
  }
}

// 触发动画
const shakeReminder = ref<HTMLElement | null>(null);
const triggerShake = () => {
  if (shakeReminder.value) {
    shakeReminder.value.classList.remove("shake"); // 先移除，确保能重新触发动画
    void shakeReminder.value.offsetWidth; // 强制重绘，重新触发 animation
    shakeReminder.value.classList.add("shake");
  }
};

// Success
function signUp() {
  router.push("/");
}
</script>

<style lang="scss" scoped>
@use "./form-wave.scss";
</style>
