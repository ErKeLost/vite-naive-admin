<template>
  <div class="text-center flex justify-around">
    <img class="w-20 h-20" src="~@/assets/images/unknown.svg" alt="" />
    <h2 class="mt-6 text-3xl font-bold text-gray-900">{{
      isLogin === false ? 'ADNY DESIGN' : 'ADNY DESIGN'
    }}</h2>
  </div>
  <div class="flex items-center justify-center space-x-2">
    <span class="h-px w-16 bg-gray-200"></span>
    <span class="text-gray-300 font-normal">{{
      isLogin === false ? '使用账号密码登录' : '使用手机号码注册'
    }}</span>
    <span class="h-px w-16 bg-gray-200"></span>
  </div>
</template>

<script setup lang="ts">
import { isLogin } from '@/hooks/login/isLoginComponent'
</script>

<style scoped>
</style>
