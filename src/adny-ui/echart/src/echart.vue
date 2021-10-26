<template>
  <div class="echarts">
    <div ref="echartRefDiv" :style="{ width: width, height: height, borderRadius: '15px' }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '../hook/use-echart'
const props = withDefaults(
  defineProps<{
    options?: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '500px'
  }
)
const echartRefDiv = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEcharts(echartRefDiv.value!)
  watchEffect(() => {
    setOptions(props.options!)
  })
})
</script>

<style scoped lang="less">
.echarts {
  div {
    border-radius: 15px;
  }
}
canvas {
  border-radius: 12px;
}
</style>
