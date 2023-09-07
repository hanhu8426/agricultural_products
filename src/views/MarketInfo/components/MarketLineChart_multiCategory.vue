<template>
  <div>
    <div id="chart-container3" style="width: 842px; height: 494px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {defineProps,onMounted} from "vue";
// 引入ECharts主题文件
import 'echarts/theme/vintage'; // 假设你要引入vintage主题

const { LineChartInfo, refDate_p3 } = defineProps([
  'LineChartInfo',
  'refDate_p3'
]);

onMounted(()=>{
  {
    // 使用ECharts初始化图表
    const chartContainer = document.getElementById('chart-container3');
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
          data: refDate_p3
      },
      yAxis: {
          type: 'value',
          axisLabel: {
          formatter: '{value}'
          }
      },
      series: LineChartInfo
    };


    // 渲染图表
    chart.setOption(option);

    // 可选：监听窗口大小变化，自适应调整图表大小
    // window.addEventListener('resize', () => {
    //   chart.resize();
    // });
  }
})


</script>

<style scoped>
/* 可以在这里添加样式，自定义图表容器的样式 */
</style>
