<template>
  <div>
    <div class="container"> 我是dashboard </div>
    <n-button @click="$router.push({ path: '/dashboard/monitor' })">我是erkelost</n-button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .container {
    width: 100%;
    height: 50vh;
    background-color: #fba;
  }
</style>
