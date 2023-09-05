<template>
  <div>
    <div id="chart-container" style="width: 842px; height: 494px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {ref,defineProps,onMounted,watch} from "vue";
// 引入ECharts主题文件
import 'echarts/theme/vintage'; 

// 使用 defineProps 获取多个 props 并创建响应式变量
const { selectedProductValue_p1, refDate_p1, refPrice_p1 } = defineProps([
  'selectedProductValue_p1',
  'refDate_p1',
  'refPrice_p1'
]);

// 直接创建响应式变量，无需额外变量
const selectedProduct_p1 = ref(selectedProductValue_p1);
const refDateValue_p1 = ref(refDate_p1);
const refPriceValue_p1 = ref(refPrice_p1);

onMounted(()=>{
  {
    // 使用ECharts初始化图表
    const chartContainer = document.getElementById('chart-container');
    const chart = echarts.init(chartContainer, 'vintage'); // 使用vintage主题

    // 设置ECharts配置选项
    const option = {
      title: {
          text: 'Temperature Change in the Coming Week',
          show: false
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {},
      toolbox: {
          show: true,
          feature: {
          saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: refDateValue_p1.value
      },
      yAxis: {
          type: 'value',
          axisLabel: {
          formatter: '{value}'
          }
      },
      series: [
          {
          name: selectedProduct_p1.value,
          type: 'line',
          data: refPriceValue_p1.value,
          markPoint: {
              data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
              ]
          },
          markLine: {
              data: [{ type: 'average', name: 'Avg' }],
              label: {
              show: true,
              position: 'end',
              offset: [10, 0],
              },
          }
          },
          ]
    };


    // 渲染图表
    chart.setOption(option);
    watch([refPriceValue_p1], () => {
      chart.setOption(option);
  });
  }
})


</script>

<style scoped>
/* 可以在这里添加样式，自定义图表容器的样式 */
</style>
