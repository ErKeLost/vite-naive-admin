<template>
  <n-card class="dashboard-bar-line header-solid shadow-md">
    <template #cover>
      <bar-echart class="dashboard-bar-line-chart" height="200px"></bar-echart>
    </template>
    <div class="flex mt-4 justify-between">
      <n-button>随机刷新</n-button>
      <n-button>添加一条</n-button>
      <n-button>移除一条</n-button>
    </div>
  </n-card>
</template>

<script lang="ts">
// Bar chart for "Active Users" card.
import BarEchart from '@/components/page-echarts/src/bar-echart.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setUp() {
    return {}
  },
  components: {
    BarEchart
  }
})
</script>
<style lang="less" scoped>
.dashboard-bar-line-chart {
  border-radius: 6px;
}
.dashboard-bar-line {
  overflow: hidden;
  border-radius: 6px;
  h6,
  p {
    font-size: 20px;
    margin: 15px;
  }
}
</style>
