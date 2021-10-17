<template>
  <div>
    <n-card title="带封面的卡片">
      <template #cover>
        <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      </template>
      卡片内容
    </n-card>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.n-card {
  max-width: 300px;
}
</style>
