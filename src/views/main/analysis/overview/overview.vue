<template>
  <div>
    <n-dropdown trigger="hover" @select="handleSelect" :options="options">
      <n-button>国际化</n-button>
    </n-dropdown>
    <div>{{ tm('title') }}</div>
    <n-grid cols="2" item-responsive responsive="screen" :x-gap="12" :y-gap="8">
      <n-gi span="xs:2 m:2 xl:2">
        <AdnyHeader />
      </n-gi>
      <n-gi span="xs:2 s:2 m:2 xl:2">
        <AdnyCenter />
      </n-gi>
      <n-gi span="xs:2 m:2 xl:1">
        <CardLineChart />
      </n-gi>
      <n-gi span="xs:2 m:2 xl:1">
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
import { i18n } from '@/i18n'
import { useI18n } from "vue-i18n";
import { reactive } from 'vue'
const { tm } = useI18n();
const handleSelect = (key: string, value: string) => {
  // useI18n().locale.value = 'en-US'
  console.log(value.value);

  i18n.global.locale.value = value.value
}
const options = [{
  value: 'zh-CN',
  label: '中文',
},
{
  value: 'en-US',
  label: 'English',
}]
</script>

<style scoped>
</style>
