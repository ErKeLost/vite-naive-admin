<template>
  <adny-card :bordered="false" class="dashboard-bar-line header-solid">
    <div class="dashboard-card-title">
      <div>
        <h6>Sales Overview😎😎</h6>
        <p>than last year <span class="text-success">+66%</span></p>
      </div>
      <div>
        <i class="mdi mdi-dots-vertical icon-dot"></i>
      </div>
    </div>
    <bar-echart height="340px"></bar-echart>
  </adny-card>
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
.text-success {
  color: #67c23a;
}
.dashboard-bar-line {
  h6,
  p {
    font-size: 20px;
    margin: 15px;
  }
}
.dashboard-card-title {
  display: flex;
  justify-content: space-between;
  position: relative;
  img {
    height: 200px;
    position: absolute;
    top: -20%;
    right: 15%;
    // z-index: 999;
  }
}
.icon-dot {
  font-size: 30px;
  border-radius: 50%;
  padding: 3px 10px;
}
</style>
