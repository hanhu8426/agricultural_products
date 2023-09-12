<script setup>
import { ref, onMounted,watch } from 'vue'
import axios from "axios";
import {baseUrl} from "@/main";
import * as echarts from 'echarts';
import 'echarts/theme/essos';

const props = {
  expandTrigger: 'hover'
};
const activeName = ref('first')

// 分页展示日周度报告
const currentPage = ref(1); // 当前页码
const pageSize = ref(3); // 每页显示数量
const totalSize = ref(0);
// displayData是获取到每一页的展示数据
const displayedData = ref([]);

// 获取分页日报内容
async function fetchDailyReport () {
  try {
    const response = await axios.get(`${baseUrl}/dailyPaper/queryDailyPaperAtPage/${currentPage.value}/${pageSize.value}`);
    displayedData.value = response.data.data.records;
    totalSize.value = response.data.data.pages * pageSize.value;
  } catch (error) {
    console.error('获取日报数据失败', error);
  }
}

// 获取分页周报
const totalWeeklySize = ref (0);
const weeklyData = ref([]);
async function fetchWeeklyReport () {
  try {
    const response = await axios.get(`${baseUrl}/weeklyPaperText/atPage/${currentPage.value}/${pageSize.value}`);
    weeklyData.value = response.data.data.records;
    totalWeeklySize.value = response.data.data.pages * pageSize.value;
  } catch (error) {
    console.error('获取日报数据失败', error);
  }
}

// 处理传过来的时间
function formatDate(dateString) {
  const parts = dateString.split('-'); // 使用 "-" 分割字符串
  const year = parseInt(parts[0], 10); // 提取并解析年份为整数
  const month = parseInt(parts[1], 10).toString().padStart(2,'0'); // 提取并解析月份为整数
  const day = parseInt(parts[2], 10).toString().padStart(2,'0');
  const yearAndMonth = `${year}/${month}`;
  return [yearAndMonth,day];
}
// 将内容完整展示
const options_province = [
  {
    value: '全国',
    label: '全国',
  },
  {
    value: '北京市',
    label: '北京市',
  },
  {
    value: '天津市',
    label: '天津市',
  },
  {
    value: '河北省',
    label: '河北省',
  },
  {
    value: '山西省',
    label: '山西省',
  },
  {
    value: '内蒙古自治区',
    label: '内蒙古自治区',
  },
  {
    value: '辽宁省',
    label: '辽宁省',
  },
  {
    value: '吉林省',
    label: '吉林省',
  },
  {
    value: '黑龙江省',
    label: '黑龙江省',
  },
  {
    value: '上海市',
    label: '上海市',
  },
  {
    value: '江苏省',
    label: '江苏省',
  },
  {
    value: '浙江省',
    label: '浙江省',
  },
  {
    value: '安徽省',
    label: '安徽省',
  },
  {
    value: '福建省',
    label: '福建省',
  },
  {
    value: '江西省',
    label: '江西省',
  },
  {
    value: '山东省',
    label: '山东省',
  },
  {
    value: '河南省',
    label: '河南省',
  },
  {
    value: '湖南省',
    label: '湖南省',
  },
  {
    value: '广东省',
    label: '广东省',
  },
  {
    value: '湖北省',
    label: '湖北省',
  },
  {
    value: '广东省',
    label: '广东省',
  },
  {
    value: '广西壮族自治区',
    label: '广西壮族自治区',
  },
  {
    value: '海南省',
    label: '海南省',
  },
  {
    value: '重庆市',
    label: '重庆市',
  },
  {
    value: '四川省',
    label: '四川省',
  },
  {
    value: '贵州省',
    label: '贵州省',
  },
  {
    value: '云南省',
    label: '云南省',
  },
  {
    value: '西藏自治区',
    label: '西藏自治区',
  },
  {
    value: '陕西省',
    label: '陕西省',
  },
  {
    value: '甘肃省',
    label: '甘肃省',
  },
  {
    value: '青海省',
    label: '青海省',
  },
  {
    value: '宁夏回族自治区',
    label: '宁夏回族自治区',
  },
  {
    value: '新疆维吾尔自治区',
    label: '新疆维吾尔自治区',
  },
  {
    value: '台湾',
    label: '台湾',
  },
  {
    value: '香港特别行政区',
    label: '香港特别行政区',
  },
  {
    value: '澳门特别行政区',
    label: '澳门特别行政区',
  },
]
const options_product = [
  {
    label:'猪肉',
    value:'猪肉'
  },
  {
    label:'羊肉',
    value:'羊肉'
  },
  {
    label:'牛肉',
    value:'牛肉'
  },
  {
    label:'鸡蛋',
    value:'鸡蛋'
  },
  {
    label:'白条鸡',
    value:'白条鸡'
  },
  {
    label:'活草鱼',
    value:'活草鱼'
  },
  {
    label:'活鲫鱼',
    value:'活鲫鱼'
  },
  {
    label:'活鲤鱼',
    value:'活鲤鱼'
  },
  {
    label:'白鲢活鱼',
    value:'白鲢活鱼'
  },
  {
    label:'花鲢活鱼',
    value:'花鲢活鱼'
  },
  {
    label:'大带鱼',
    value:'大带鱼'
  },
  {
    label:'大黄花鱼',
    value:'大黄花鱼'
  },
  {
    label:'菠菜',
    value:'菠菜'
  },
  {
    label:'莴笋',
    value:'莴笋'
  },
  {
    label:'韭菜',
    value:'韭菜'
  },
  {
    label:'菜花',
    value:'菜花'
  },
  {
    label:'豆角',
    value:'豆角'
  },
  {
    label:'胡萝卜',
    value:'胡萝卜'
  },
  {
    label:'油菜',
    value:'油菜'
  },
  {
    label:'青椒',
    value:'青椒'
  },
  {
    label:'土豆',
    value:'土豆'
  },
  {
    label:'西红柿',
    value:'西红柿'
  },
  {
    label:'富士苹果',
    value:'富士苹果'
  },
  {
    label:'巨峰葡萄',
    value:'巨峰葡萄'
  },
  {
    label:'菠萝',
    value:'菠萝'
  },
  {
    label:'香蕉',
    value:'香蕉'
  },
  {
    label:'西瓜',
    value:'西瓜'
  },
  {
    label:'鸭梨',
    value:'鸭梨'
  },
]
function handlePageChange(newPage) {
  currentPage.value = newPage;
  fetchDailyReport();
}

// 接收所有的预测报告
const allForecastReport = ref([]);
async function fetchForecastReport () {
  try{
    const response = await axios.get(`${baseUrl}/predict/predictReports`);
    allForecastReport.value = response.data.data;
  } catch (error) {
    console.error('获取预测报告数据失败', error);
  }
}


// 预测曲线部分
const selectedProvince = ref('全国');
const selectedProduct = ref('猪肉');
const originPrice = ref([23.287,23.4636,23.4318,23.135,23.2545,23.7435,23.5958]);
const originDate = ref([]);
const predictPrice = ref([23.287,23.4636,23.4318,23.135,23.2545,23.7435,23.5958,23.4431,23.417,23.4134,23.4307,23.4641,23.5065,23.55]);
const predictDate = ref(["2023-09-01","2023-09-02","2023-09-03","2023-09-04","2023-09-05","2023-09-06","2023-09-07","2023-09-08","2023-09-09","2023-09-10","2023-09-11","2023-09-12","2023-09-13","2023-09-14"]);
// 1.获取原始七天价格数据
async function fetchData (province,product){
  try{
    const response_originPrice = await axios.get(`${baseUrl}/predict/originPrices/${product}/${province}`)
    const response_originDate = await axios.get(`${baseUrl}/predict/originPricesDate/${product}/${province}`)
    const response_predictPrice = await axios.get(`${baseUrl}/predict/predictPrices/${product}/${province}`)
    const response_predictDate = await axios.get(`${baseUrl}/predict/predictPricesDate/${product}/${province}`)
    originPrice.value = response_originPrice.data.data;
    originDate.value = response_originDate.data.data;
    predictPrice.value = response_predictPrice.data.data;
    predictDate.value = response_predictDate.data.data;
  } catch(error){
    console.log("获取原始数据失败",error);
  }
}

const handleQuery = async () => {
  await fetchData(selectedProvince.value, selectedProduct.value);
}
const handleProductChange = () => {
}
const handleProvinceChange = () => {
}

//图表
const ReportLineChartInit = () => {
  const chartContainer = document.getElementById('chart-container');
  let chart_p1 = echarts.init(chartContainer, 'essos');
  // 设置ECharts配置选项
  const option = {
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
          data: predictDate.value
      },
      yAxis: {
          type: 'value',
          axisLabel: {
          formatter: '{value}'
          }
      },
      series: [
          {
          name: '原始数据',
          type: 'line',
          data: originPrice.value,
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
          name: '预测数据',
          type: 'line',
          data: predictPrice.value,
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
          }
      ]
    };

  chart_p1.setOption(option);
};

onMounted(() => {
  fetchDailyReport();
  fetchWeeklyReport();
  fetchForecastReport();
  ReportLineChartInit();
  // 监听以重新初始化图表
  watch([predictDate,originPrice,predictPrice], () => {
    ReportLineChartInit();
  });
});
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" >
    <el-tab-pane label="日度报告" name="first" strech="true" >
      <!--报告的边框-->
      <div class="report_border" >
        <!--报告的内容（三条）-->
        <div class="report_item" v-for="item in displayedData" :key="item.id">
          <!--左侧日历栏 -->
          <div class="date">
            <p class="yearAndMonth">{{formatDate(item.thatDate)[0]}}</p>
            <p class="day">{{formatDate(item.thatDate)[1]}}</p>
          </div>
          <!-- 右侧标题和内容-->
          <div class="content" @click="item.isPopupVisible = true">
            <div class="content_title">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="source">
                {{item.source}}
              </div>
            </div>
            <div class="content_main">
              {{item.content}}
            </div>
          </div>
          <el-dialog
              v-model="item.isPopupVisible"
              title="日度报告"
              width="60%"
              align-center
          >
            <span>{{item.content}}</span>
          </el-dialog>
        </div>

      </div>

      <div class="pagination">
        <el-pagination
            :page-size="pageSize"
            :pager-count="11"
            layout="prev, pager, next"
            :total="totalSize"
            @current-change="handlePageChange"
        />
      </div>
    </el-tab-pane>
    <el-tab-pane label="周度报告" name="second" strech="true">
      <!--报告的边框-->
      <div class="report_border" >
        <!--报告的内容（三条）-->
        <div class="report_item" v-for="item in weeklyData" :key="item.id">
          <!--左侧日历栏 -->
          <div class="date">
            <p class="yearAndMonth">{{formatDate(item.firstDate)[0]}}</p>
            <p class="day">{{formatDate(item.firstDate)[1]}}</p>
          </div>
          <!-- 右侧标题和内容-->
          <div class="content" @click="item.isPopupVisible = true">
            <div class="content_title">
              <div class="title">
                {{item.title}}
              </div>
              <div class="source">
                {{item.source}}
              </div>
            </div>
            <div class="content_main">
              {{item.content}}
            </div>
          </div>
          <el-dialog
              v-model="item.isPopupVisible"
              title="周度报告"
              width="60%"
              align-center
          >
            <span>{{item.content}}</span>
          </el-dialog>
        </div>
      </div>

      <div class="pagination">
        <el-pagination
            :page-size="pageSize"
            :pager-count="11"
            layout="prev, pager, next"
            :total="totalWeeklySize"
            @current-change="handlePageChange"
        />
      </div>
    </el-tab-pane>
  </el-tabs>

  <div class="forecast">
    <div class="forecast_report" >
      <p class="forecast_report_title">预测新闻</p>
      <div class="forecast_report_content">
        <li class="forecast_report_item" v-for="(item,index) in allForecastReport" :key="index">
          <i class="icon"></i>
          <p @click="item.isPopupVisible = true">{{item.title}}</p>
          <el-dialog
              v-model="item.isPopupVisible"
              :title=item.title
              width="60%"
              align-center
          >
            <span>{{item.passage}}</span>
          </el-dialog>
        </li>
      </div>
    </div>
    <div class="forecast_chart">
      <div class="forecast_chart_title">
        <p class="forecast_chart_title_content">
          常见农产品各省市（全国）均价预测表
        </p>
      </div>
      <div class="forecast_chart_searchBar">
        <div style="display: flex;">
          <div class="selectOption">
            省市:
            <el-cascader
                v-model="selectedProvince"
                :options="options_province"
                :props="props"
                @change="handleProvinceChange"
                placeholder="请选择"
            />
          </div>
          <div class="selectOption">
            品种:
            <el-cascader
                v-model="selectedProduct"
                :options="options_product"
                :props="props"
                @change="handleProductChange"
                placeholder="请选择"
            />
          </div>
        </div>
        
        <div class="query">
          <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
        </div>
      </div>
      <div class="forecast_chart_content">
        <div id="chart-container" style="width: 842px; height: 310px;margin-top: 10px;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-tabs{
  width: 1240px;
}
.report_item{
  height: 100px;
  width: 1240px;
  border-bottom: 1px dashed #e5e5e5;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 20px;
  cursor: pointer;
}
.date{
  width: 90px;
  height: 66px;
  border: 1px solid #c50b03;
  text-align: center;
  vertical-align: middle;
  margin-right: 20px;
  border-radius: 4px;
}
.content{
  display: flex;
  flex-direction: column; /* 在垂直方向上排列子元素 */
  align-items: center; /* 在水平方向上居中对齐 */
  width: calc(100% - 80px);
  padding-top: 0;
}
.day{
  font-size: 30px;
  font-weight: 600;
  color: #c50b03;
  padding: 0;
  margin: 0;
}
.content_title{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.content_main{
  width: 100%;
  color: #333;
  font-size: 14px;
  font-weight: normal;
  line-height: 22px;
  letter-spacing: 1px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
}

// 弹框格式
.index_dialog .el-dialog__header {
  height: 54px;
  background: #00b2b2;
  border-radius: 10px 10px 0 0;
  font-weight: 700;
  color: #fff;
  line-height: 58px;
  padding: 0;
}

.title{
  font-size: 18px;
  font-weight: 600;
  color: #000;
  margin-bottom: 10px;
  letter-spacing: 1px;
}
.source{
  font-size: 14px;
  font-weight: 400;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 1px;
  color: #999;
}

.forecast{
  display: flex;
  justify-content:normal;/* 水平对齐 */
  margin-top: 30px;
  height:400px;
  width: 1240px;
}
.forecast_report{
  width: 25%;
  height: 100%;
  border: 1px solid #c6c6c6;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 40px;
  position: relative;
}
.forecast_report_title{
  padding-left: 20px;
  border-radius: 10px 10px 0 0;
  background: #faf3d9;
  line-height: 40px;
}
.forecast.forecast_report.forecast_report_title {
  border-radius: 10px 10px 0 0;
  background: #f2fbfb;
}
.icon{
  width: 6px;
  height: 6px;
  display: block;
  background-color: #ff7457;
  margin-top: 15px;
  margin-left: 12px;
  margin-right: 8px;
}
.forecast_report_content{
  height: calc(100% - 40px);
  overflow-y: auto;
  width: 100%;
  border-radius: 0 0 10px 10px;
  font-weight: normal;
}
.forecast_report_item{
  border-bottom: 1px dashed #ccc; /* 添加底部分割线*/
  line-height: 36px;
  font-size: 13px;
  font-weight: normal;
  color: #828282;
  cursor: pointer;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.forecast_report_item:last-child {
  border-bottom: none;
}
.forecast_report_item p {
  white-space: nowrap; /* 禁止文本换行 */
  overflow: hidden; /* 隐藏文本溢出部分 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.forecast_chart_searchBar{
  font-size: 15px;
  display: flex;
}

.selectOption{
  margin-right: 30px;
}

.forecast_chart_title_content{
  color: #b32b2e;
  font-weight: bold;
  font-size: 20px;
  display: inline-block; /* 让下划线仅包围文本 */
  position: relative;
  margin-bottom: 20px;
}
.p{
  font-weight: normal;
}
.query{
  padding-left: 30px;
  position: relative;
}

</style>
<style lang="scss">
.el-dialog__header {
  padding: 0;
  padding-bottom: 0;
  margin: auto 0;
  height: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: #fdf7d3;
}
.el-dialog__title {
    line-height: var(--el-dialog-font-line-height);
    font-size: var(--el-dialog-title-font-size);
    color: var(--el-text-color-primary);
    align-items: center;
    margin: auto 0;
}
.el-dialog {
    --el-dialog-width: 50%;
    --el-dialog-margin-top: 15vh;
    --el-dialog-bg-color: var(--el-bg-color);
    --el-dialog-box-shadow: var(--el-box-shadow);
    --el-dialog-title-font-size: var(--el-font-size-large);
    --el-dialog-content-font-size: 14px;
    --el-dialog-font-line-height: var(--el-font-line-height-primary);
    --el-dialog-padding-primary: 20px;
    --el-dialog-border-radius: var(--el-border-radius-small);
    position: relative;
    margin: var(--el-dialog-margin-top, 15vh) auto 50px;
    background: var(--el-dialog-bg-color);
    border-radius: 10px;
    box-shadow: var(--el-dialog-box-shadow);
    box-sizing: border-box;
    width: var(--el-dialog-width, 50%);
}
.el-dialog__headerbtn:focus .el-dialog__close, .el-dialog__headerbtn:hover .el-dialog__close {
    color: #010531;
}
</style>
