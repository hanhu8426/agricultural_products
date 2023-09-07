<template>
    <div>
      <div id="chart-container" style="width: 842px; height: 494px;"></div>
    </div>
  </template>
  
  <script setup>
  import * as echarts from 'echarts';
  import {onMounted} from "vue";
  // 引入ECharts主题文件
  import 'echarts/theme/vintage'; // 假设你要引入vintage主题

  const { selectedProductValue_p1, combinedData } = defineProps([
  'selectedProductValue_p1',
  'combinedData'
]);
  
  onMounted(()=>{
    {
      // 使用ECharts初始化图表
      const chartContainer = document.getElementById('chart-container');
      const chart = echarts.init(chartContainer, 'vintage'); // 使用vintage主题
      // 设置ECharts配置选项
      const option = {
        legend: {
            top: 'bottom'
        },
        tooltip: {
          show: true,
        },
        toolbox: {
            show: true,
            feature: {
            saveAsImage: { show: true }
            }
        },
        series: [
            {
            name: selectedProductValue_p1,
            type: 'pie',
            radius: [0, '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: combinedData
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
  