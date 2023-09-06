<script setup>
import { ref, onMounted } from 'vue';
import {baseUrl} from '@/main'
import axios from "axios";
import DailyChart from '../DataQuery/components/DailyChart.vue';
import MonthlyChart from '../DataQuery/components/MonthlyChart.vue';

const currentDate = ref(new Date());
const formattedDate = ref(formatDate(currentDate.value));
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

// 表格展示数据
const index200Table = ref([]); //初始化空数组
const productExponentArray = ref([]);
const refProductExponent = ref([]);
const vegetableBasketExponentArray = ref([]);
const refVegetableBasketExponent = ref([]);
const grainOilExponentArray = ref([]);
const refGrainOilExponent = ref([]);
const activeButton = ref('日度'); // 初始选中按钮
const handleButtonClick = (button) => {  // 点击日度、月度按钮进行跳转
  activeButton.value = button;
  if (activeButton.value === '日度') {
    getDailyExponent(); // 调用获取日度数据的方法
  } else if (activeButton.value === '月度') {
    getMonthlyExponent(); // 调用获取月度数据的方法
  }
};

// 从后端接收“农产品批发价格200日度指数”
const getDailyExponent = async () => {
  try {
    const response = await axios.get(`${baseUrl}/exponent/dailyExponent`); // 发起请求获取数据
    index200Table.value = response.data.data; // 更新tableData变量
    productExponentArray.value = response.data.data.map(item => item.productExponent);
    refProductExponent.value = productExponentArray.value.slice(0,10).reverse();
    vegetableBasketExponentArray.value = response.data.data.map(item => item.vegetableBasketExponent);
    refVegetableBasketExponent.value = vegetableBasketExponentArray.value.slice(0,10).reverse();
    grainOilExponentArray.value = response.data.data.map(item => item.grainOilExponent);
    refGrainOilExponent.value = grainOilExponentArray.value.slice(0,10).reverse();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 从后端接收“农产品批发价格200月度指数”
const getMonthlyExponent = async () => {
  try {
    const response = await axios.get(`${baseUrl}/exponent/monthlyExponent`); // 发起请求获取数据
    index200Table.value = response.data.data; // 更新tableData变量
    productExponentArray.value = response.data.data.map(item => item.productExponent);
    refProductExponent.value = productExponentArray.value.slice(0,10).reverse();
    vegetableBasketExponentArray.value = response.data.data.map(item => item.vegetableBasketExponent);
    refVegetableBasketExponent.value = vegetableBasketExponentArray.value.slice(0,10).reverse();
    grainOilExponentArray.value = response.data.data.map(item => item.grainOilExponent);
    refGrainOilExponent.value = grainOilExponentArray.value.slice(0,10).reverse();
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  onMounted(() => {
  getDailyExponent();
});
};
</script>

<template>
    <div class="Exponent">
        <div class="exponent_box">
            <div class="exponent_box_title">
                <img src="../../assets/images/exponent_pic.png" alt="" style="width: 30px;height: 30px;">
                <span style="margin-left: 10px;font-size: 22px;font-weight: 700;">农产品批发价格200指数</span>
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
                <div class="line1_data">122.39</div>
                <div class="line2_text">
                    <span style="display: block;">粮油产品批发</span>
                    <span style="display: block;text-align: center;">
                        价格指数
                        
                    </span>
                </div>
                <div class="line2_data">120.18</div>
                <div class="line0_text">
                    <span class="line0_text_200">200</span>
                    <span class="line0_text_index">指数</span>
                </div>
                <div class="line0_data"><span class="line0_data_number">122.07</span></div>
            </div>
        </div>
        <div class="exponent_chart">
            <div class="exponent_chart_title">
                <div style="display: flex;-webkit-box-align: center;align-items: center;">
                    <img src="../../assets/images/exponent_pic.png" alt="" style="width: 30px;height: 30px;">
                    <span style="margin-left: 10px;font-size: 22px;font-weight: 700;">农产品批发价格200指数</span>
                </div>
                <div>
                    <el-button type="success" plain @click="handleButtonClick('日度')" :active="activeButton === '日度'">日度</el-button>
                    <el-button type="success" plain @click="handleButtonClick('月度')" :active="activeButton === '月度'">月度</el-button>
                </div>
            </div>
            <div class="exponent_chart_line">
                <div v-if="activeButton === '日度'">
                    <DailyChart :refProductExponent="refProductExponent" :refVegetableBasketExponent="refVegetableBasketExponent" :refGrainOilExponent="refGrainOilExponent" />
                </div>
                <div v-else-if="activeButton === '月度'">
                    <MonthlyChart :refProductExponent="refProductExponent" :refVegetableBasketExponent="refVegetableBasketExponent" :refGrainOilExponent="refGrainOilExponent"></MonthlyChart>
                </div>
            </div>
        </div>
    </div>
    <div class="Analysis">
        <div class="exponent_box">
            <div class="exponent_box_title">
                <img src="../../assets/images/exponent_pic.png" alt="" style="width: 30px;height: 30px;">
                <span style="margin-left: 10px;font-size: 22px;font-weight: 700;">农产品批发价格200指数</span>
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
                <div class="line1_data">122.39</div>
                <div class="line2_text">
                    <span style="display: block;">粮油产品批发</span>
                    <span style="display: block;text-align: center;">
                        价格指数
                        
                    </span>
                </div>
                <div class="line2_data">120.18</div>
                <div class="line0_text">
                    <span class="line0_text_200">200</span>
                    <span class="line0_text_index">指数</span>
                </div>
                <div class="line0_data"><span class="line0_data_number">122.07</span></div>
            </div>
        </div>
        <div class="exponent_chart">
            <div class="exponent_chart_title">
                <div style="display: flex;-webkit-box-align: center;align-items: center;">
                    <img src="../../assets/images/exponent_pic.png" alt="" style="width: 30px;height: 30px;">
                    <span style="margin-left: 10px;font-size: 22px;font-weight: 700;">农产品批发价格200指数</span>
                </div>
                <div>
                    <el-button type="success" plain @click="handleButtonClick('日度')" :active="activeButton === '日度'">日度</el-button>
                    <el-button type="success" plain @click="handleButtonClick('月度')" :active="activeButton === '月度'">月度</el-button>
                </div>
            </div>
            <div class="exponent_chart_line">
            </div>
        </div>
    </div>
</template>

<style scoped>
.Exponent{
    width: 1240px;
    padding: 0 18px;
    padding-top: 20px;
    height: 486px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: center;
    background-color: white;
}
.exponent_box{
    float: left;
    width: 350px!important;
    height: 100%;
    background-color: #f5fdfb;
    margin: auto 0;
}
.exponent_box_title{
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0 14px;
    height: 50px;
    line-height: 50px;
    border-radius: 4px 4px 0 0;
    background: url(../../assets/images/home_title.png) no-repeat;
    background-size: 100% 100%;
}
.exponent_box_date{
    height: 40px;
    line-height: 40px;
    padding-top: 17px;
    padding-left: 24px;
    font-weight: 700;
    font-size: 20px;
}
.exponent_box_pic{
    position: relative;
    margin-top: 50px;
}
.line_all{
    height: 196px;
    width: 24px;
    border-radius: 2px;
    border: 2px solid #e28350;
    border-right: none;
}
.line_dis{
    position: absolute;
    height: 140px;
    width: 68px;
    border-radius: 2px;
    border: 2px solid #e28350;
    border-right: none;
    top: 112px;
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
    top: 48px;
    left: 83px;
}
.line1_data{
    width: 128px;
    height: 38px;
    border-radius: 2px;
    border: 2px solid #0dad3e;
    position: absolute;
    top: 94px;
    left: 92px;
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
    top: 186px;
    left: 106px;
}
.line2_data{
    width: 128px;
    height: 38px;
    border-radius: 2px;
    border: 2px solid #e8ab18;
    position: absolute;
    top: 232px;
    left: 92px;
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
    width: 165px;
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
    width: 140px;
    height: 38px;
    border: 2px solid #e42431;
    position: absolute;
    top: -18px;
    left: 189px;
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