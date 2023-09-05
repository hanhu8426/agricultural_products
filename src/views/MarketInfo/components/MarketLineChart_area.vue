<template>
  <div>
    <div ref="chartContainer" style="width: 100%; height: 494px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {ref, onMounted,onUnmounted,watchEffect} from "vue";
// 引入ECharts主题文件
import 'echarts/theme/vintage'; // 假设你要引入vintage主题

const chartContainer = ref(null); // 图表容器的引用
let myChart = null; // 图表实例
// 在这里配置图表的选项和数据
const option = {
  animation: true,
  animationDuration: 1000,
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
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}'
    }
  },
  series: [
    {
      name: 'Highest',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
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
    {
      name: 'Lowest',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' }
        ],
        label: {
          show: true,
          position: 'end',
          offset: [10, 0],
        },
      }
    }]
};

// 创建图表
const createChart = () => {
  myChart = echarts.init(chartContainer.value,'vintage');
  // 渲染图表
  myChart.setOption(option);
};

// 调整图表大小
const resizeChart = () => {
  if (myChart) {
    myChart.resize();
  }
};

// 监听容器大小的变化并重新调整图表大小
const resizeObserver = new ResizeObserver(resizeChart);
onMounted(() => {
  createChart();
  resizeObserver.observe(chartContainer.value);
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose(); // 在组件卸载时销毁图表实例
  }
  resizeObserver.disconnect(); // 停止监听容器大小变化
});

// 监听页面可见性变化，在页面重新可见时重新调整图表大小
watchEffect(() => {
  if (!document.hidden) {
    resizeChart();
  }
});

</script>

<style scoped>
/* 可以在这里添加样式，自定义图表容器的样式 */
</style>
  