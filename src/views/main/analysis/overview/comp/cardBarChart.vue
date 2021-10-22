<template>
  <!-- Active Users Card -->
  <adny-card :bordered="false" class="dashboard-bar-chart">
    <line-echart height="200px" class="dashboard-line-echart"></line-echart>
    <div class="card-title">
      <h6>Active Users</h6>
      <p>than last week <span class="text-success">+23%</span></p>
    </div>
    <div class="card-content">
      <p>
        We have created multiple options for you to put together and customise into pixel perfect
        pages.
      </p>
    </div>
    <n-row class="card-footer" type="flex" justify="center" align="top">
      <n-col :span="6">
        <h4>3,6K</h4>
        <span>Users</span>
      </n-col>
      <n-col :span="6">
        <h4>2m</h4>
        <span>Clicks</span>
      </n-col>
      <n-col :span="6">
        <h4>$772</h4>
        <span>Sales</span>
      </n-col>
      <n-col :span="6">
        <h4>82</h4>
        <span>Items</span>
      </n-col>
    </n-row>
  </adny-card>
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
.dashboard-bar-chart {
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
