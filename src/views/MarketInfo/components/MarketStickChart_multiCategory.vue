<template>
    <div>
      <div id="chart-container3" style="width: 842px; height: 494px;"></div>
    </div>
  </template>
  
  <script setup>
  import * as echarts from 'echarts';
  import {onMounted} from "vue";
  // 引入ECharts主题文件
  import 'echarts/theme/vintage'; // 假设你要引入vintage主题

  const { nameInfo, refDate_p3, priceInfo } = defineProps([
  'nameInfo',
  'refDate_p3',
  'priceInfo'
]);
  
  onMounted(()=>{
    {
      // 使用ECharts初始化图表
      const chartContainer = document.getElementById('chart-container3');
      const chart = echarts.init(chartContainer, 'vintage'); // 使用vintage主题
      // 设置ECharts配置选项
      const option = {
        title: {
          text: 'Rainfall vs Evaporation',
          subtext: 'Fake Data',
          show: false
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: refDate_p3
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: nameInfo[0],
            type: 'bar',
            data: priceInfo[0],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: nameInfo[1],
            type: 'bar',
            data: priceInfo[1],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: nameInfo[2],
            type: 'bar',
            data: priceInfo[2],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
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
  