<template>
    <div>
      <div id="chart-container2" style="width: 842px; height: 494px;"></div>
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
      const data = [120, 200, 150, 80, 70, 110, 130];
      const maxIndex = data.indexOf(Math.max(...data)); // 找到最大值的索引
      const minIndex = data.indexOf(Math.min(...data)); // 找到最小值的索引
      // 设置ECharts配置选项
      const option = {
        toolbox: {
            show: true,
            feature: {
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
        {
            data: data,
            type: 'bar',
            itemStyle: {
                color: (params) => {
                // 根据索引设置颜色，最大值的柱子为#d87c7c，最小值的柱子为#919e8b
                if (params.dataIndex === maxIndex) {
                return '#d87c7c';
                } else if (params.dataIndex === minIndex) {
                return '#919e8b';
                } else {
                return '#6e7074';
                }
            }
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
  