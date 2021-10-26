<template>
  <!-- Active Users Card -->
  <n-card class="dashboard-bar-chart shadow-md">
    <template #cover>
      <line-echart height="200px" class="dashboard-line-echart"></line-echart>
    </template>
    <div class="flex mt-4 justify-between">
      <n-button>随机刷新</n-button>
      <n-button>添加一条</n-button>
      <n-button>移除一条</n-button>
    </div>
  </n-card>
  <!-- Active Users Card -->
</template>

<script lang="ts">
// Bar chart for "Active Users" card.
import LineEchart from '@/components/page-echarts/src/line-echart.vue'
export default {
  components: {
    LineEchart
  },
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.dashboard-text {
  padding: 15px;
}
.dashboard-bar-chart {
  // height: 450px;
  overflow: hidden;
  border-radius: 6px;
  font-size: 18px;
}
.text-success {
  color: #67c23a;
}
.dashboard-line-echart {
  border-radius: 15px;
}
.card-footer {
  h4 {
    font-size: 22px;
    margin: 10px 0;
  }
}
</style>
