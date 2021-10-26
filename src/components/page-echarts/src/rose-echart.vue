<template>
  <div class="rose-echart">
    <adny-echart :options="options"></adny-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue'
import AdnyEchart from '@/adny-ui/echart'
import { IDataType } from '../types'
const props = defineProps<{
  roseData: IDataType[]
}>()
const options = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '面积模式',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
