<template>
  <audio
    v-for="sound in sounds"
    :id="sound.name"
    :key="sound.name"
    :src="sound.src"
  ></audio>

  <div class="container">
    <div class="btn-bars" id="btn-bars"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const sounds = ref([]);

onMounted(() => {
  // Vite项目动态读取文件名，Vite提供的获取指定目录下的匹配文件，eager表立即加载而非返回懒加载函数
  // modules 是一个对象，键是相对路径字符串，值是模块内容（此处是每个 .mp3 文件的 URL）
  const modules = import.meta.glob("./sounds/*.mp3", { eager: true });

  // 提取名称，path即是循环的keys，filter过滤掉null
  sounds.value = Object.keys(modules)
    .map((path) => {
      const match = path.match(/\/([^/]+)\.mp3$/);
      if (!match) return null;
      return {
        name: match[1],
        src: modules[path].default,
      };
    })
    .filter(Boolean);

  // 这样插入的DOM节点还不受scoped样式的影响
  sounds.value.forEach((sound) => {
    const btn = document.createElement("button");
    btn.classList.add("btn"); // id, src 则是采用赋值方式如 id='...'
    btn.innerText = sound.name;
    btn.style =
      "background-color: #663399; color: azure; font-size:1.2rem; padding:1.5rem 2rem; margin:1rem; border-radius:3px; border:0; cursor:pointer";
    btn.addEventListener("click", () => {
      stopSongs();

      document.getElementById(sound.name).play();
    });

    document.getElementById("btn-bars").appendChild(btn);
  });
});

function stopSongs() {
  sounds.value.forEach((sound) => {
    const song = document.getElementById(sound.name);
    song.pause();
    song.currentTime = 0;
  });
}
</script>

<style lang="scss" scoped>
@use "./sound-board.scss";
</style>
