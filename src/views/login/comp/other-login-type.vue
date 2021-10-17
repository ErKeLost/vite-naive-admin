<template>
  <div class="text-center">
    <span class="h-px w-16 bg-gray-400"></span>
    <span class="text-gray-400 font-normal">第三方登录</span>
    <span class="h-px w-16 bg-gray-200"></span>
  </div>
  <div class="flex flex-row justify-center items-center space-x-10">
    <adny-icon icon="wechat" size="3" color="#67C23A"></adny-icon>
    <adny-icon icon="github" size="3"></adny-icon>
    <adny-icon icon="instagram" size="3" color="#F56C6C"></adny-icon>
    <adny-icon icon="facebook" size="3" color="#409EFF"></adny-icon>
  </div>
</template>

<script setup>
import AdnyIcon from '@/adny-ui/icon'
</script>

<style lang="scss" scoped></style>
