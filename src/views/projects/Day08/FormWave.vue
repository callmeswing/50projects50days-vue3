<template>
  <div class="container">
    <div class="login-card">
      <h1 class="title">Login 😸</h1>

      <form action="">
        <div class="input-container">
          <input
            type="email"
            class="email"
            id="email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
          />
          <label for="email" class="email-label">
            <span style="transition-delay: 0ms">E</span>
            <span style="transition-delay: 50ms">m</span>
            <span style="transition-delay: 100ms">a</span>
            <span style="transition-delay: 150ms">i</span>
            <span style="transition-delay: 200ms">l</span>
          </label>
        </div>

        <div class="input-container">
          <input
            type="text"
            class="password"
            id="password"
            pattern="[A-Za-z0-9]+"
            required
          />
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
        </div>

        <button type="button" class="btn">Login</button><br />

        <div class="to-register">
          <span
            >Don't have an account? <a href="#">&nbsp;&nbsp;Sign up</a></span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use "./form-wave.scss";
</style>
