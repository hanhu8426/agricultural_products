<template>
    <div>
      <div id="chart-container2" style="width: 100%; height: 494px;"></div>
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
      const chartContainer = document.getElementById('chart-container2');
      const chart = echarts.init(chartContainer, 'vintage'); // 使用vintage主题
      // 设置ECharts配置选项
      const option = {
        legend: {
            top: 'bottom'
        },
        toolbox: {
            show: true,
            feature: {
            saveAsImage: { show: true }
            }
        },
        series: [
            {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 8
            },
            data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
            ]
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
  