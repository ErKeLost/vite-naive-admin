<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <h1 class="text-9xl text-left text-blue-600">hello world</h1>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <n-button>按钮</n-button>
  <n-card title="带封面的卡片">
    <template #cover>
      <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
    </template>
    卡片内容
  </n-card>
  <n-carousel autoplay>
    <img
      class="carousel-img"
      src="https://s.anw.red/fav/1623979004.jpg!/fw/600/quality/77/ignore-error/true"
    />
    <img
      class="carousel-img"
      src="https://s.anw.red/news/1623372884.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
    />
    <img
      class="carousel-img"
      src="https://s.anw.red/news/1623177220.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
    />
    <img
      class="carousel-img"
      src="https://s.anw.red/news/1623152423.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true"
    />
  </n-carousel>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.n-card {
  max-width: 300px;
}
.carousel-img {
  width: 80%;
  height: 240px;
  object-fit: cover;
}
</style>
