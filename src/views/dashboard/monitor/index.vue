<template>
  <div>
    <div class="container"> 我是monitor </div>
    <n-button @click="gp">我是安妮</n-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const gp = () => {
  router.push({ path: '/dashboard/workspace' })
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 50vh;
  background-color: #abf;
}
</style>
