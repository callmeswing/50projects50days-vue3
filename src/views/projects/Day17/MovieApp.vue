<template>
  <div class="container">
    <div class="header">
      <input
        type="text"
        class="searcher"
        placeholder="search.."
        :maxlength="SEARCH_MAX_LENGTH"
        v-model="search"
        @keyup.enter="handelSearch(search)"
      />
    </div>
    <div class="content">
      <movie-card
        v-for="movie in movies"
        :key="movie.id"
        :background="posterAPIprefix + movie.poster_path"
        :title="movie.title"
        :score="movie.vote_average"
        :overview="movie.overview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MovieCard from "./MovieCard.vue";

const SEARCH_MAX_LENGTH = 16;
const movies = ref<Array<movieInfo>>([]);
const search = ref<string>("");

onMounted(async () => {
  fetchFirstPage();
});

interface movieInfo {
  id: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  overview: string;
}

const firstPageAPI =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const serachAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const posterAPIprefix = "https://image.tmdb.org/t/p/w1280/";

const fetchFirstPage = async function () {
  let response = await fetch(firstPageAPI);
  if (response.ok) {
    let json = await response.json();
    // console.log(json);
    movies.value = json.results;
    // console.log(movies);
  } else {
    alert("data fetch fail");
  }
};

const handelSearch = async function (key: string) {
  key = key.trim();
  if (key) {
    let response = await fetch(serachAPI + key);
    if (response.ok) {
      let json = await response.json();
      // console.log(json);
      movies.value = json.results;
      // console.log(movies);
    } else {
      alert("search fail");
    }
  }
};
</script>

<style lang="scss" scope>
@use "./movie-app.scss";
</style>
