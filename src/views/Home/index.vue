<script setup>
import { ref, onMounted, watch } from 'vue';
import {baseUrl} from '@/main'
import axios from "axios";
import * as echarts from 'echarts';
import 'echarts/theme/essos';
import DailyChart from '../DataQuery/components/DailyChart.vue';
import MonthlyChart from '../DataQuery/components/MonthlyChart.vue';
import chinaJson from './china.json'

const currentDate = ref(new Date());
const formattedDate = ref(formatDate(currentDate.value));
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

const options = [
  {
    value: '猪肉',
    label: '猪肉',
  },
  {
    value: '羊肉',
    label: '羊肉',
  },
  {
    value: '牛肉',
    label: '牛肉',
  },
  {
    value: '鸡蛋',
    label: '鸡蛋',
  },
  {
    value: '白条鸡',
    label: '白条鸡',
  },
  {
    value: '活草鱼',
    label: '活草鱼',
  },
  {
    value: '活鲫鱼',
    label: '活鲫鱼',
  },
  {
    value: '活鲤鱼',
    label: '活鲤鱼',
  },
  {
    value: '白鲢活鱼',
    label: '白鲢活鱼',
  },
  {
    value: '花鲢活鱼',
    label: '花鲢活鱼',
  },
  {
    value: '大带鱼',
    label: '大带鱼',
  },
  {
    value: '大黄花鱼',
    label: '大黄花鱼',
  },
  {
    value: '菠菜',
    label: '菠菜',
  },
  {
    value: '莴笋',
    label: '莴笋',
  },
  {
    value: '豆角',
    label: '豆角',
  },
  {
    value: '韭菜',
    label: '韭菜',
  },
  {
    value: '菜花',
    label: '菜花',
  },
  {
    value: '胡萝卜',
    label: '胡萝卜',
  },
  {
    value: '油菜',
    label: '油菜',
  },
  {
    value: '西红柿',
    label: '西红柿',
  },
  {
    value: '青椒',
    label: '青椒',
  },
  {
    value: '土豆',
    label: '土豆',
  },
  {
    value: '富士苹果',
    label: '富士苹果',
  },
  {
    value: '巨峰葡萄',
    label: '巨峰葡萄',
  },
  {
    value: '香蕉',
    label: '香蕉',
  },
  {
    value: '菠萝',
    label: '菠萝',
  },
  {
    value: '西瓜',
    label: '西瓜',
  },
  {
    value: '鸭梨',
    label: '鸭梨',
  },
]
const TypeOptions = [
  {
    value: '猪',
    label: '猪',
  },
  {
    value: '羊',
    label: '羊',
  },
  {
    value: '牛',
    label: '牛',
  },
  {
    value: '禽蛋',
    label: '禽蛋',
  },
  {
    value: '禽类',
    label: '禽类',
  },
  {
    value: '奶制品',
    label: '奶制品',
  }
]
const TimeOptions = [
    {
        value:'2023-07',
        label:'2023-07',
    },
    {
        value:'2023-06',
        label:'2023-06',
    },
    {
        value:'2023-05',
        label:'2023-05',
    },
    {
        value:'2023-04',
        label:'2023-04',
    },
    {
        value:'2023-03',
        label:'2023-03',
    },
    {
        value:'2023-02',
        label:'2023-02',
    },
    {
        value:'2023-01',
        label:'2023-01',
    }
]
const customColor = ref('#a00712');
const customColor_2 = ref('#e28350');
const customColor_3 = ref('#4b565b');
const customColor_4 = ref('#919e8b');
const customColor_5 = ref('#aaa');

// 表格展示数据
const activeButton = ref('日度'); // 初始选中按钮
const handleButtonClick = (button) => {  // 点击日度、月度按钮进行跳转
  activeButton.value = button;
};


//获得最新200指数数据
const latestExponent = ref();
const latestVegetable = ref();
const latestOil = ref();
const getLatestExponent = async () => {
  try {
    const response = await axios.get(`${baseUrl}/exponent/dailyExponent/latest`); // 发起请求获取数据
    latestExponent.value = response.data.data.productExponent;
    latestVegetable.value = response.data.data.vegetableBasketExponent;
    latestOil.value = response.data.data.grainOilExponent;
    console.log('最新'+latestExponent.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//获取下拉框数据
const LBType = ref('猪肉');
const RBType = ref('猪');
const RBTime = ref('2023-07');

//获取价格最高的五个市场信息
let HighestMarketName = ref([]);//市场名
let HighestMarketPrice = ref([]);//价格
const getMarketName = async () => {
  try {
    const response = await axios.get(`${baseUrl}/priceQuery/fiveMarketAveragePricesMarket/${LBType.value}`); // 发起请求获取数据
    HighestMarketName.value = response.data.data;
    console.log(HighestMarketName.value)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const getMarketPrice = async () => {
  try {
    const response = await axios.get(`${baseUrl}/priceQuery/fiveMarketAveragePrices/${LBType.value}`); // 发起请求获取数据
    HighestMarketPrice.value = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//获取出口量数据
let ProvinceName = ref([]);//市场名
let ProvinceData = ref([]);//价格
let PieCombined = ref([]);
const getProvinceName = async () => {
  try {
    const response = await axios.get(`${baseUrl}/homePage/export/exportProvince/${RBTime.value}/${RBType.value}`); // 发起请求获取数据
    ProvinceName.value = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const getProvinceData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/homePage/export/exportVolume/${RBTime.value}/${RBType.value}`); // 发起请求获取数据
    ProvinceData.value = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const combine = () =>{
  PieCombined = ref([]);
  for (let i = 0; i < ProvinceData.value.length; i++) {
      PieCombined.value.push({
        value: ProvinceData.value[i],
        name: ProvinceName.value[i]
      });
    }
  console.log(PieCombined.value);
}


//获取地图数据
let chartProvince = ref([]);
let chartNumber = ref([]);
let combinedData = ref([]);
const getChartProvince = async () => {
  try {
    const response = await axios.get(`${baseUrl}/homePage/markets`); // 发起请求获取数据
    chartProvince.value = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const getChartNumber = async () => {
  try {
    const response = await axios.get(`${baseUrl}/homePage/marketQuantity`); // 发起请求获取数据
    chartNumber.value = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const combineMap = () =>{
  combinedData = ref([]);
  for (let i = 0; i < chartProvince.value.length; i++) {
    combinedData.value.push({
        name: chartProvince.value[i],
        value: chartNumber.value[i]
      });
    }
  console.log(PieCombined.value);
}



  onMounted( async () => {
  await getLatestExponent();
  await getMarketName();
  await getMarketPrice();
  await getProvinceName();
  await getProvinceData();
  await getChartProvince();
  await getChartNumber();
  combine();
  combineMap();
  const chartContainer = document.getElementById('chart-container_RB');
  let chart_p1 = echarts.init(chartContainer, 'essos');
  const chartContainer_2 = document.getElementById('chart-container_center');
  let myChart = echarts.init(chartContainer_2, 'essos');
  const HomePieChart_Init = () => {

    // 设置ECharts配置选项
  const  option = {
      tooltip: {
          trigger: 'item'
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
      series: [
          {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
          },
          label: {
              show: false,
              position: 'center'
          },
          emphasis: {
              label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
              }
          },
          labelLine: {
              show: false
          },
          data: PieCombined.value
          }
      ]
      };

    chart_p1.setOption(option);
  };
  const mapChart = () => {
    
    echarts.registerMap('China', chinaJson);
    const option = {
      title: {
        text: 'USA Population Estimates (2012)',
        subtext: 'Data from www.census.gov',
        sublink: 'http://www.census.gov/popest/data/datasets.html',
        left: 'right',
        show: false
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: 26,
        inRange: {
          color: [
            '#4b565b',
            '#919e8b',
            '#ebdba4',
            '#e28350',
            '#a00712',
            '#893448'
          ]
        },
        text: ['High', 'Low'],
        calculable: true
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '全国各省市市场数量',
          type: 'map',
          roam: true,
          map: 'China',
          emphasis: {
            label: {
              show: true
            }
          },
          data: combinedData.value
        }
      ]
    };
    myChart.setOption(option);

  };
  HomePieChart_Init();
  mapChart();
  watch([LBType], () => {
    getMarketName();
    getMarketPrice();
  });
  watch([RBTime,RBType], async () => {
     await getProvinceName();
     await getProvinceData();
     combine();
     HomePieChart_Init();
  });
});

</script>

<template>
    <div style="display: flex;">
        <div class="left">
            <div class="left_top">
                <div class="exponent_box_title">
                    <img src="../../assets/images/zhexiantu-xianxing.png" alt="" style="width: 20px;height: 20px;margin-left: 10px;background: none;">
                    <span style="margin-left: 10px;font-size: 16px;font-weight: bold;width: 260px;">农产品批发价格200指数</span>
                </div>
                <p class="exponent_box_date">{{ formattedDate }}</p>
                <div class="exponent_box_pic">
                    <div class="line_all"></div>
                    <div class="line_dis"></div>
                    <div class="line1_text">
                        <span style="display: block;">“菜篮子”产品批发</span>
                        <span style="display: block;text-align: center;">
                            价格指数 
                        </span>
                    </div>
                    <div class="line1_data">{{ latestVegetable }}</div>
                    <div class="line2_text">
                        <span style="display: block;">粮油产品批发</span>
                        <span style="display: block;text-align: center;">
                            价格指数 
                        </span>
                    </div>
                    <div class="line2_data">{{ latestOil }}</div>
                    <div class="line0_text">
                        <span class="line0_text_200">200</span>
                        <span class="line0_text_index">指数</span>
                    </div>
                    <div class="line0_data"><span class="line0_data_number">{{ latestExponent }}</span></div>
                </div>
            </div>
            <div class="left_bottom">
                <div class="exponent_box_title">
                    <img src="../../assets/images/shangsheng.png" alt="" style="width: 20px;height: 20px;margin-left: 10px;background: none;">
                    <span style="margin-left: 10px;font-size: 16px;font-weight: bold;width: 260px;">批发价格最高排名</span>
                </div>
                <div style="padding-left: 10px;">
                    <el-select v-model="LBType" class="m-2" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </div>
                <div>
                    <ul style="width: 290px;height: 254px;margin: 10px auto;border: 1px solid #fe9781;border-radius: 4px;">
                        <li class="listDiv-ul-li-title">
                            <p style="padding-left: 30px;font-size: 14px;line-height: 40px;">批发市场名称</p>
                            <span style="    display: inline-block;line-height: 40px;position: absolute;top: 0;right: 17%;font-size: 14px;">价格（元/公斤）</span>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName" >
                                <i data-v-809e91fc class="bgNum">1</i>
                                {{HighestMarketName[0]}}
                            </p>
                            <span class="price">{{ HighestMarketPrice[0] }}</span>
                            <el-progress :percentage="100" :show-text="false" :color="customColor"/>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum_2">2</i>
                                {{HighestMarketName[1]}}
                            </p>
                            <span class="price_2">{{ HighestMarketPrice[1] }}</span>
                            <el-progress :percentage="80" :show-text="false" :color="customColor_2"/>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum_3">3</i>
                                {{HighestMarketName[2]}}
                            </p>
                            <span class="price_3">{{ HighestMarketPrice[2] }}</span>
                            <el-progress :percentage="60" :show-text="false" :color="customColor_3"/>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum_4">4</i>
                                {{HighestMarketName[3]}}
                            </p>
                            <span class="price_4">{{ HighestMarketPrice[3] }}</span>
                            <el-progress :percentage="40" :show-text="false" :color="customColor_4"/>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum_5">5</i>
                                {{HighestMarketName[4]}}
                            </p>
                            <span class="price_5">{{ HighestMarketPrice[4] }}</span>
                            <el-progress :percentage="20" :show-text="false" :color="customColor_5"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="center">
          <div class="exponent_box_title">
              <img src="../../assets/images/地图.png" alt="" style="width: 20px;height: 20px;margin-left: 10px;background: none;">
              <span style="margin-left: 10px;font-size: 16px;font-weight: bold;width: 200px;">各省市市场数量热力图</span>
          </div>
          <div id="chart-container_center" style="width: 580px; height: 680px;"></div>
        </div>
        <div class="right">
            <div class="right_top">
                <div class="exponent_box_title">
                    <img src="../../assets/images/zhexiantu-xianxing.png" alt="" style="width: 20px;height: 20px;margin-left: 10px;background: none;">
                    <span style="margin-left: 10px;font-size: 16px;font-weight: bold;width: 130px;">200指数趋势图</span>
                    <div style="margin-left: 20px;">
                        <el-button type="success" plain @click="handleButtonClick('日度')" :active="activeButton === '日度'">日度</el-button>
                        <el-button type="success" plain @click="handleButtonClick('月度')" :active="activeButton === '月度'">月度</el-button>
                    </div>
                </div>
                <div class="exponent_chart_line">
                    <div v-if="activeButton === '日度'">
                        <DailyChart  />
                    </div>
                    <div v-else-if="activeButton === '月度'">
                        <MonthlyChart ></MonthlyChart>
                    </div>
                </div>
            </div>
            <div class="right_bottom">
                <div class="exponent_box_title">
                    <img src="../../assets/images/tubiao-bingtu.png" alt="" style="width: 20px;height: 20px;margin-left: 10px;background: none;">
                    <span style="margin-left: 10px;font-size: 16px;font-weight: bold;width: 200px;">农产品各省市出口量</span>
                    <span style="font-size: 12px;font-weight: normal;color: #aaa;">单位：万吨</span>
                </div>
                <div style="display: flex;padding-left: 10px;">
                    <el-select v-model="RBTime" class="m-2" placeholder="请选择">
                        <el-option
                        v-for="item in TimeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                    <el-select v-model="RBType" class="m-2" placeholder="请选择">
                        <el-option
                        v-for="item in TypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </div>
                <div id="chart-container_RB" style="width: 330px; height: 300px;"></div>
            </div>
        </div>
    </div>
    
    
</template>

<style scoped>
.left{
    width: 310px;
    height: 720px;
    justify-content: center;
    border: 2px solid #e28350;
    border-left: none;
    box-shadow: 1px 2px 16px 0 rgba(6, 0, 1, 0.04);
    border-radius: 6px;
    box-sizing: border-box;
}
.left_top{
    width: 310px;
    height: 350px;
    justify-content: center;
    align-items: center;
    background-color: #fcf6e7;
    position: relative;
}
.exponent_box_title{
    width: 100%;
    height: 30px;
    display: flex;
    margin-top: 10px;
    align-items: center;
    position: relative;
}
.left_bottom{
    width: 310px;
    height: 350px;
    justify-content: center;
    align-items: center;
    background-color: #fcf6e7;
    position: relative;
}
.listDiv-ul-li-title{
    line-height: 40px;
    font-size: 14px;
    display: flex;
    background-color: #a00712;
    color: #fff;
    line-height: 40px;
    height: 40px;
    position: relative;
}
.marketName{
    width: 50%;
    line-height: 42px;
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
}
.bgNum{
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 4px 0 0 4px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-left: 8px;
    margin-right: 8px;
    background: #a00712;
    position: relative;
}
.bgNum_2{
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 4px 0 0 4px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-left: 8px;
    margin-right: 8px;
    background: #e28350;
    position: relative;
}
.bgNum_3{
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 4px 0 0 4px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-left: 8px;
    margin-right: 8px;
    background: #4b565b;
    position: relative;
}
.bgNum_4{
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 4px 0 0 4px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-left: 8px;
    margin-right: 8px;
    background: #919e8b;
    position: relative;
}
.bgNum_5{
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 4px 0 0 4px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-left: 8px;
    margin-right: 8px;
    background: #aaa;
    position: relative;
}
.price{
    font-size: 12px;
    color: #a00712;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
    position: relative;
}
.price_2{
    font-size: 12px;
    color: #e28350;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
    position: relative;
}
.price_3{
    font-size: 12px;
    color: #4b565b;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
    position: relative;
}
.price_4{
    font-size: 12px;
    color: #919e8b;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
    position: relative;
}
.price_5{
    font-size: 12px;
    color: #aaa;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
    position: relative;
}
.center{
    width: 580px;
    height: 720px;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    position: relative;
    background-color: #fcf6e7;
}
.right{
    width: 330px;
    height: 720px;
    justify-content: center;
    border: 2px solid #e28350;
    border-right: none;
    box-shadow: 1px 2px 16px 0 rgba(6, 0, 1, 0.04);
    border-radius: 6px;
    box-sizing: border-box;
}
.right_top{
    width: 330px;
    height: 350px;
    justify-content: center;
    background-color: #fcf6e7;
    position: relative;
}
.right_bottom{
    width: 330px;
    height: 350px;
    justify-content: center;
    background-color: #fcf6e7;
    position: relative;
}

.exponent_box_date{
    height: 20px;
    line-height: 20px;
    padding-top: 5px;
    padding-left: 30px;
    font-weight: bold;
    font-size: 16px;
    position: relative;
}
.exponent_box_pic{
    position: relative;
    margin-top: 35px;
}
.line_all{
    height: 160px;
    width: 24px;
    border-radius: 2px;
    border: 2px solid #e28350;
    border-right: none;
}
.line_dis{
    position: absolute;
    height: 120px;
    width: 56px;
    border-radius: 2px;
    border: 2px solid #e28350;
    border-right: none;
    top: 100px;
    left: 24px;
}
.line1_text{
    font-weight: 700;
    font-size: 15px;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 1px;
    color: #4f7051;
    position: absolute;
    top: 34px;
    left: 71px;
}
.line1_data{
    width: 128px;
    height: 38px;
    border-radius: 2px;
    border: 2px solid #4f7051;
    position: absolute;
    top: 82px;
    left: 80px;
    text-align: center;
    line-height: 36px;
    font-family: Impact;
    font-size: 24px;
    font-weight: 400;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #a00712;
}
.line2_text{
    font-weight: 700;
    font-size: 15px;
    font-stretch: normal;
    line-height: 22px;
    letter-spacing: 1px;
    color: #e1a412;
    position: absolute;
    top: 155px;
    left: 94px;
}
.line2_data{
    width: 128px;
    height: 38px;
    border-radius: 2px;
    border: 2px solid #e8ab18;
    position: absolute;
    top: 201px;
    left: 80px;
    text-align: center;
    line-height: 36px;
    font-family: Impact;
    font-size: 24px;
    font-weight: 400;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #4f7051;
}
.line0_text{
    width: 150px;
    height: 38px;
    line-height: 38px;
    background-color: #a00712;
    position: absolute;
    top: -18px;
    left: 24px;
    text-align: center;
}
.line0_text_200{
    text-align: center;
    font-family: Exponent;
    font-size: 28px;
    font-weight: 400;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #fff;
    display: inline-block;
}
.line0_text_index{
    text-align: center;
    font-family: Exponent;
    font-size: 28px;
    font-weight: 400;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #fff;
    display: inline-block;
}
.line0_data{
    width: 130px;
    height: 38px;
    border: 2px solid #a00712;
    position: absolute;
    top: -18px;
    left: 174px;
    text-align: center;
}
.line0_data_number{
    height: 36px;
    font-family: Impact;
    font-size: 28px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 2px;
    color: #333;
}
.exponent_chart{
    float: right;
    margin-left: 20px;
    width: 800px!important;
    height: 100%;
}
.exponent_chart_title{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    height: 50px;
    line-height: 50px;
    border-radius: 4px 4px 0 0;
    background: url(../../assets/images/home_chart_title.png) no-repeat;
    background-size: 100% 100%;
}
.Analysis{
    width: 1240px;
    padding: 0 18px;
    padding-top: 20px;
    height: 486px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: center;
    background-color: white;
}
</style>
<style>
.el-progress--line {
  width: 60px;
}
</style>