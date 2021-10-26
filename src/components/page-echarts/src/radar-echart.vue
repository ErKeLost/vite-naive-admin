<template>
  <div class="rose-echart">
    <adny-echart :options="options"></adny-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import AdnyEchart from '@/adny-ui/echart'
import { IDataType } from '../types'
const props = defineProps<{
  values: any[]
  radarLabels: string[]
}>()
const options = computed(() => {
  return {
    legend: {
      bottom: 0,
      data: ['访问', '购买']
    },
    tooltip: {},
    radar: {
      radius: '60%',
      splitNumber: 8,
      indicator: props.radarLabels
    },
    series: [
      {
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1
        },
        data: [
          {
            value: props.values,
            name: '访问',
            itemStyle: {
              color: '#abf'
            }
          },
          {
            value: [100000, 130000, 90000, 40000, 60000, 120000],
            name: '购买',
            itemStyle: {
              color: '#fba'
            }
          }
        ]
      }
    ]
  }
})
</script>

<style scoped></style>
