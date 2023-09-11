<script setup>
import { ref, onMounted } from 'vue';
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
const TimeOptions = [
    {
        value:'2023-07',
        label:'2023-07',
    }
]
const customColor = ref('rgb(255, 115, 88)');
const customColor_2 = ref('rgb(253, 215, 108)');
const customColor_3 = ref('#19d1c5');
const customColor_4 = ref('rgb(143, 215, 141)');
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
const LBType = ref('');
const RBType = ref('');
const RBTime = ref('');

//初始化图表
// const chartProvince = ref([]);
// const chartNumber = ref([]);
// const combinedData = ref([])

const HomePieChart_Init = () => {
  const chartContainer = document.getElementById('chart-container_RB');
  let chart_p1 = echarts.init(chartContainer, 'essos');
  // 设置ECharts配置选项
const  option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
          show: true,
          textStyle: {
            fontSize: 9, // 设置系列名称的字体大小
          },
        },
    series: [
        {
        name: 'Access From',
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
        data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
        ]
        }
    ]
    };

  chart_p1.setOption(option);
};
const mapChart = () => {
  const chartContainer = document.getElementById('chart-container_center');
  let myChart = echarts.init(chartContainer, 'essos');
  echarts.registerMap('China', chinaJson);
  const option = {
    title: {
      text: 'USA Population Estimates (2012)',
      subtext: 'Data from www.census.gov',
      sublink: 'http://www.census.gov/popest/data/datasets.html',
      left: 'right'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: 'right',
      min: 500000,
      max: 38000000,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
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
        name: 'USA PopEstimates',
        type: 'map',
        roam: true,
        map: 'China',
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { name: '北京市', value: 4822023 },
        ]
      }
    ]
  };
  myChart.setOption(option);

};

  onMounted( async () => {
  await getLatestExponent();
  HomePieChart_Init();
  mapChart();
});

</script>

<template>
    <div style="display: flex;background-color: #fdfcf5;">
        <div class="left">
            <div class="left_top">
                <div class="exponent_box_title">
                    <img src="../../assets/images/exponent_pic.png" alt="" style="width: 20px;height: 20px;margin-left: 10px;">
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
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum">1</i>
                                福建福鼎市场服务中心
                            </p>
                            <span class="price">26.2</span>
                            <el-progress :percentage="100" :show-text="false" :color="customColor"/>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum_2">2</i>
                                福建福鼎市场服务中心
                            </p>
                            <span class="price_2">26.2</span>
                            <el-progress :percentage="80" :show-text="false" :color="customColor_2"/>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum_3">3</i>
                                福建福鼎市场服务中心
                            </p>
                            <span class="price_3">26.2</span>
                            <el-progress :percentage="60" :show-text="false" :color="customColor_3"/>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum_4">4</i>
                                福建福鼎市场服务中心
                            </p>
                            <span class="price_4">26.2</span>
                            <el-progress :percentage="40" :show-text="false" :color="customColor_4"/>
                        </li>
                        <li style="line-height: 40px;font-size: 14px;display: flex;">
                            <p class="marketName">
                                <i data-v-809e91fc class="bgNum_5">5</i>
                                福建福鼎市场服务中心
                            </p>
                            <span class="price_5">26.2</span>
                            <el-progress :percentage="20" :show-text="false" :color="customColor_5"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="center">
          <div id="chart-container_center" style="width: 600px; height: 600px;"></div>
        </div>
        <div class="right">
            <div class="right_top">
                <div class="exponent_box_title">
                    <img src="../../assets/images/exponent_pic.png" alt="" style="width: 20px;height: 20px;margin-left: 10px;">
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
                    <span style="margin-left: 10px;font-size: 16px;font-weight: bold;width: 260px;">批发价格最高排名</span>
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
}
.exponent_box_title{
    width: 100%;
    height: 30px;
    display: flex;
    margin-top: 10px;
    align-items: center;
}
.left_bottom{
    width: 310px;
    height: 350px;
    justify-content: center;
    align-items: center;
}
.listDiv-ul-li-title{
    line-height: 40px;
    font-size: 14px;
    display: flex;
    background-color: #ff765a;
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
    background: #ff0404;
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
    background: #ffb10a;
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
    background: #19d1c5;
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
    background: rgb(143, 215, 141);
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
}
.price{
    font-size: 12px;
    color: #ff0404;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
}
.price_2{
    font-size: 12px;
    color: #ffb10a;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
}
.price_3{
    font-size: 12px;
    color: #19d1c5;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
}
.price_4{
    font-size: 12px;
    color: rgb(143, 215, 141);
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
}
.price_5{
    font-size: 12px;
    color: #aaa;
    width: 25%;
    line-height: 42px;    
    font-weight: 550;    
    text-align: center;
}
.center{
    width: 600px;
    height: 720px;
    display: flex;
    justify-content: center;
    align-items: center;
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
}
.right_bottom{
    width: 330px;
    height: 350px;
    justify-content: center;
}

.exponent_box_date{
    height: 20px;
    line-height: 20px;
    padding-top: 5px;
    padding-left: 30px;
    font-weight: bold;
    font-size: 16px;
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
    color: #0dad3e;
    position: absolute;
    top: 34px;
    left: 71px;
}
.line1_data{
    width: 128px;
    height: 38px;
    border-radius: 2px;
    border: 2px solid #0dad3e;
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
    color: #f7523f;
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
    color: #7dc53b;
}
.line0_text{
    width: 150px;
    height: 38px;
    line-height: 38px;
    background-color: #e42431;
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
    border: 2px solid #e42431;
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