<template>
  <div>
    <!-- <n-grid :y-gap="24" :x-gap="24" item-responsive responsive="screen">
      <n-gi span="xs:24 m:24 xl:24">
        <AdnyHeader />
      </n-gi>
      <n-gi span="xs:24 m:12 xl:12">
        <CardBarChart />
      </n-gi>
      <n-gi span="xs:24 m:12 xl:12">
        <CardLineChart />
      </n-gi>
    </n-grid>-->
    <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
      <n-gi span="xs:24 m:24 xl:24">
        <AdnyHeader />
      </n-gi>
      <n-gi span="xs:24 m:12 xl:12">
        <AdnyCenter />
      </n-gi>
      <n-gi span="xs:24 m:12 xl:2">
        <CardLineChart />
      </n-gi>
      <n-gi span="xs:24 m:12 xl:2">
        <CardBarChart />
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import AdnyHeader from './comp/header.vue'
import AdnyCenter from './comp/center.vue'
import CardLineChart from './comp/cardLineChart.vue'
import CardBarChart from './comp/cardBarChart.vue'
</script>

<style scoped>
</style>
