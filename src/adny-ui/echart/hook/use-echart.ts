import * as echarts from 'echarts'

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updateResize = () => {
    echartInstance.resize()
  }
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
