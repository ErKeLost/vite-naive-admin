<template>
  <div>我是main页面</div>
  <router-link to="./login">123</router-link>
  <n-button @click="pull">456</n-button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = userRouter()

</script>

<style lang="scss" scoped></style>
