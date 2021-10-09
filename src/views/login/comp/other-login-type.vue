<template>
  <div class="text-center">
    <span class="h-px w-16 bg-gray-400"></span>
    <span class="text-gray-400 font-normal">第三方登录</span>
    <span class="h-px w-16 bg-gray-200"></span>
  </div>
  <div class="flex flex-row justify-center items-center space-x-10">
    <!-- <i class="mt-6 text-3xl mdi mdi-github text-black"></i>
    <i class="mt-6 text-3xl mdi mdi-wechat text-green-300 text-opacity-100"></i>
    <i class="mt-6 text-3xl mdi mdi-instagram text-pink-400"></i>
    <i class="mt-6 text-3xl mdi mdi-facebook text-blue-400"></i> -->
    <adny-icon icon="wechat" size="4"></adny-icon>
    <adny-icon icon="github" size="4"></adny-icon>
    <adny-icon icon="instagram" size="4"></adny-icon>
    <adny-icon icon="facebook" size="4"></adny-icon>
  </div>
</template>

<script setup>
import AdnyIcon from '@/adny-ui/icon'
</script>

<style lang="scss" scoped>
</style>
