<template>
    <div>
      <div id="chart-container" style="width: 100%; height: 320px;"></div>
    </div>
  </template>
  
  <script setup>
  import * as echarts from 'echarts';
  import axios from 'axios';
  import {baseUrl} from '@/main'
  import {ref,onMounted,watch} from "vue";
  // 引入ECharts主题文件
  import 'echarts/theme/essos'; 

  //获取日度200指数
  const date = ref([]);
  const productExponent = ref([]);
  const vegetableBasketExponent =ref([]);
  const grainOilExponent = ref([]);

  const getDate = async () => {//获取全部数据
  try {
    const response = await axios.get(`${baseUrl}/exponent/dailyExponent/date`); // 发起请求获取数据
    date.value = response.data.data; // 更新tableData变量
    console.log('调用')
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
//提取总指数
const getProduct = async () => {
  try {
    const response = await axios.get(`${baseUrl}/exponent/dailyExponent/Product`); // 发起请求获取数据
    productExponent.value = response.data.data; // 更新tableData变量
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
//提取菜篮子
const getVegetable = async () => {
  try {
    const response = await axios.get(`${baseUrl}/exponent/dailyExponent/VegetableBasket`); // 发起请求获取数据
    vegetableBasketExponent.value = response.data.data; // 更新tableData变量
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
//提取粮油
const getOil = async () => {
  try {
    const response = await axios.get(`${baseUrl}/exponent/dailyExponent/GrainOil`); // 发起请求获取数据
    grainOilExponent.value = response.data.data; // 更新tableData变量
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
//初始化图表函数
const renderChart = () => {
  const chartContainer = document.getElementById('chart-container');
  const chart = echarts.init(chartContainer, 'essos');

  const option = {
        // Make gradient line here
        visualMap: [
            {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
            }
        ],
        title: [
        ],
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
          show: true,
          right: 'right',
          bottom: 'bottom',
          feature: {
            saveAsImage: { show: true }
          }
        },
        legend: {
          show: true,
          textStyle: {
            fontSize: 9, // 设置系列名称的字体大小
          },
        },
        xAxis: [
            {
            data: date.value
            }
        ],
        yAxis: [
            {
            type: 'value',
            axisLabel: {
                interval: 'auto', // 自动计算刻度标签间隔
                formatter: '{value}', // 刻度标签的格式化方式
            },
            min: 115, // 设置刻度的最小值为数据的最小值
            max: 125,
        }
        ],
        series: [
            {
                name: '农产品批发价格200指数',
                type: 'line',
                showSymbol: false,
                data: productExponent.value
            },
            {
                name: '‘菜篮子’产品批发价格200指数',
                type: 'line',
                showSymbol: false,
                data: vegetableBasketExponent.value
            },
            {
                name: '粮油产品批发价格200指数',
                type: 'line',
                showSymbol: false,
                data: grainOilExponent.value
            }
        ]
        };

  chart.setOption(option);
};
//监听变化以实时更新
watch([date, productExponent, vegetableBasketExponent, grainOilExponent], () => {
    renderChart();
});
 
  
  onMounted( async ()=>{
    {
          getDate();
          getProduct();
          getVegetable();
          getOil();
        renderChart();
        
    }
  })
  
  
  </script>
  
  <style scoped>
  /* 可以在这里添加样式，自定义图表容器的样式 */
  </style>
  