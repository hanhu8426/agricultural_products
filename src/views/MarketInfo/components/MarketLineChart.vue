<template>
    <div>
      <div id="chart-container" style="width: 800px; height: 400px;"></div>
    </div>
  </template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";
// 引入ECharts主题文件
import 'echarts/theme/vintage'; // 假设你要引入vintage主题

onMounted(()=>{
  {
    // 使用ECharts初始化图表
    const chartContainer = document.getElementById('chart-container');
    const chart = echarts.init(chartContainer, 'vintage'); // 使用vintage主题

    // 设置ECharts配置选项
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };

    // 渲染图表
    chart.setOption(option);

    // 可选：监听窗口大小变化，自适应调整图表大小
    window.addEventListener('resize', () => {
      chart.resize();
    });
  }
})

</script>
  
  <style scoped>
  /* 可以在这里添加样式，自定义图表容器的样式 */
  </style>
  