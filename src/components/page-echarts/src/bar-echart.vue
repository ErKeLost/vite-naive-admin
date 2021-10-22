<template>
  <div class="rose-echart">
    <adny-echart
      class="radio-border"
      :width="width"
      :height="height"
      :options="options"
    ></adny-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AdnyEchart from '@/adny-ui/echart'
import * as echarts from 'echarts'
defineProps<{
  values?: any[]
  xlabels?: string[]
  width?: string
  height?: string
}>()
const options = computed(() => {
  return {
    backgroundColor: new echarts.graphic.LinearGradient(
      0,
      0,
      1,
      0,
      [
        {
          offset: 0,
          color: '#f78fb3'
        },
        {
          offset: 0.5,
          color: '#f8a5c2'
        },
        {
          offset: 1,
          color: '#f7d794'
        }
      ],
      false
    ),
    xAxis: {
      axisTick: {
        show: false
      },
      type: 'category',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff'
        }
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#ffffff50'
        }
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: '26%',
        color: '#fff',
        itemStyle: {
          borderRadius: 10
        }
      }
    ]
  }
})
</script>

<style scoped></style>
