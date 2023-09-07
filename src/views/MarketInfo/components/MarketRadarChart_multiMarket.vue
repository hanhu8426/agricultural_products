<template>
  <div>
    <div id="chart-container4" style="width: 842px; height: 494px;"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";
// 引入ECharts主题文件
import 'echarts/theme/vintage'; // 假设你要引入vintage主题

const { nameInfo_p4, refDate_p4, priceInfo_p4 } = defineProps([
  'nameInfo_p4',
  'refDate_p4',
  'priceInfo_p4'
]);
const radarName = [];
for (const Name of refDate_p4) {
        radarName.push({
        name: Name
      });
    }

onMounted(()=>{
  {
    // 使用ECharts初始化图表
    const chartContainer = document.getElementById('chart-container4');
    const chart = echarts.init(chartContainer, 'vintage'); // 使用vintage主题

    // 设置ECharts配置选项
    const option = {
      title: {
        text: 'Basic Radar Chart',
        show: false
      },
      legend: {
      },
      tooltip: {
        show: true
      },
      radar: {
        // shape: 'circle',
        indicator: radarName,
        showEmpty: false,
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: priceInfo_p4[0],
              name: nameInfo_p4[0]
            },
            {
              value: priceInfo_p4[1],
              name: nameInfo_p4[1]
            },
            {
              value: priceInfo_p4[2],
              name: nameInfo_p4[2]
            }
          ]
        }
      ]
      
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
