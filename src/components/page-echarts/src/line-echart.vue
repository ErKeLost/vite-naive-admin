<template>
  <div class="rose-echart">
    <adny-echart class="radio-border" :width="width" :height="height" :options="options"></adny-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AdnyEchart from '@/adny-ui/echart'
import { IDataType } from '../types'
import * as echarts from 'echarts'
import { useDesignSettingStore } from '@/store/modules/designSetting'
const designStore = useDesignSettingStore()
const color = computed(() => designStore.appTheme)
defineProps<{
  values?: any[]
  xlabels?: string[]
  width?: string
  height?: string
}>()
const options = computed(() => {
  return {
    backgroundColor: color.value,
    title: {
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#fff'
      },
      left: '6%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B'
        }
      }
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#fff'
          }
        },
        data: ['01', '02', '03', '04', '05', '06', '07', '08']
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          margin: 10,
          fontSize: 14
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#ffffff50'
          }
        }
      }
    ],
    series: [
      {
        name: 'ADNY',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          width: 3
        },
        itemStyle: {
          color: '#fba',
          borderColor: 'rgba(0,196,132,0.2)',
          extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
          borderWidth: 10
        },
        data: [820, 382, 691, 234, 950, 120, 610, 325]
      }
    ]
  }
})
</script>

<style scoped>
.radio-border {
  border-radius: 15px;
}
</style>

.radio-border {
  border-radius: 15px;
}
