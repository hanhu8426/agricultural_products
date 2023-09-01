<script setup>
// 引入其他组件
import trendChart from './DailyChart.vue';
import MonthlyChart from './MonthlyChart.vue';

// 引入Vue中的函数
import { ref ,computed, onMounted} from 'vue'
import axios from "axios";

// 创建变量
const activeName = ref('first')  //默认打开第一个标签页（农产品批发价格200指数）
const activeButton = ref('日度'); // 初始选中按钮
const handleButtonClick = (button) => {  // 点击日度、月度按钮进行跳转
  activeButton.value = button;
  if (activeButton.value === '日度') {
    getDailyExponent(); // 调用获取日度数据的方法
  } else if (activeButton.value === '月度') {
    getMonthlyExponent(); // 调用获取月度数据的方法
  }
};

// 接收系统时间并以正常格式显示
const currentDate = ref(new Date());
const formattedDate = ref(formatDate(currentDate.value));
function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

// 分页展示价格行情
const currentPage = ref(1); // 当前页码
const pageSize = ref(20); // 每页显示数量
const priceTable = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
// displayData是获取到每一页的展示数据
const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return priceTable.value.slice(startIndex, endIndex);
});
function handlePageChange(newPage) {
  currentPage.value = newPage;
}

// 选择框选中内容
const value = ref([]);
const props = {
  expandTrigger: 'hover'
};
const handleChange = (value) => {
  console.log(value)
}

// options_market是市场的选项，options_product是产品选项
const options_market = [
  {
    value: '北京市',
    label: '北京市',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
      },
    ],
  },
  {
    value: '天津市',
    label: '天津市',
    children: [
      {
        value: 'basic',
        label: 'Basic',
      },
    ],
  },
  {
    value: '河北省',
    label: '河北省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '山西省',
    label: '山西省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '内蒙古自治区',
    label: '内蒙古自治区',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '辽宁省',
    label: '辽宁省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '吉林省',
    label: '吉林省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '黑龙江省',
    label: '黑龙江省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '上海市',
    label: '上海市',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '江苏省',
    label: '江苏省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '浙江省',
    label: '浙江省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '安徽省',
    label: '安徽省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '福建省',
    label: '福建省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '江西省',
    label: '江西省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '山东省',
    label: '山东省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '河南省',
    label: '河南省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '湖南省',
    label: '湖南省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '湖北省',
    label: '湖北省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '广西壮族自治区',
    label: '广西壮族自治区',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '海南省',
    label: '海南省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '重庆市',
    label: '重庆市',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '四川省',
    label: '四川省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '贵州省',
    label: '贵州省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '云南省',
    label: '云南省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '西藏自治区',
    label: '西藏自治区',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '陕西省',
    label: '陕西省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '甘肃省',
    label: '甘肃省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '青海省',
    label: '青海省',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '宁夏回族自治区',
    label: '宁夏回族自治区',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '新疆维吾尔自治区',
    label: '新疆维吾尔自治区',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '台湾',
    label: '台湾',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '香港特别行政区',
    label: '香港特别行政区',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
  {
    value: '澳门特别行政区',
    label: '澳门特别行政区',
    children: [
      {
        value: 'azure',
        label: 'Azure Components',
      },
    ],
  },
]

const options_product = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

// 从后端接收“农产品批发价格200日度指数”
const index200Table = ref([]); //初始化空数组
const getDailyExponent = async () => {
  try {
    const response = await axios.get('http://10.203.234.177:8081/exponent/dailyExponent'); // 发起请求获取数据
    index200Table.value = response.data.data; // 更新tableData变量
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 从后端接收“农产品批发价格200月度指数”
const getMonthlyExponent = async () => {
  try {
    const response = await axios.get('http://10.203.234.177:8081/exponent/monthlyExponent'); // 发起请求获取数据
    index200Table.value = response.data.data; // 更新tableData变量
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


// 在组件加载时获取数据
onMounted(() => {
  getDailyExponent();
});


</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" >
      <el-tab-pane label="农产品批发价格200指数" name="first" strech="true" >
        <div class="topButton">
          <el-button type="success" plain @click="handleButtonClick('日度')" :active="activeButton === '日度'">日度</el-button>
          <el-button type="success" plain @click="handleButtonClick('月度')" :active="activeButton === '月度'">月度</el-button>
        </div>

        <div class="topTitle">
          <p class="underline-text">
            农业农村部”农产品批发价格200指数“{{activeButton}}数据
          </p>
        </div>

        <div class="scrollTable">
          <el-table :data="index200Table" height="400" class="custom-table" stripe style="width: 100%">
            <el-table-column prop="collectDate" label="时间" width="180" />
            <el-table-column prop="productExponent" label="农产品批发价格200指数"  />
            <el-table-column prop="vegetableBasketExponent" label="‘菜篮子’产品批发价格200指数"/>
            <el-table-column prop="grainOilExponent" label="粮油产品批发价格200指数"/>
          </el-table>
        </div>

        <div class="map">
          <div class="topTitle">
            <br><br>
            <p class="underline-text">
              农业农村部”农产品批发价格200指数“{{activeButton}}走势图
            </p>
          </div>

          <div v-if="activeButton === '日度'">
            <trendChart></trendChart>
          </div>
          <div v-else-if="activeButton === '月度'">
            <MonthlyChart></MonthlyChart>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全国批发市场价格行情" name="second" strech="true">
        <div>
          <p class="priceTitle">{{ formattedDate }}农业农村部全国农产品批发市场价格行情</p>
        </div>

        <div class="searchBar">
          <div class="firstSelect">
            批发市场:
            <el-cascader
                v-model="value"
                :options="options_market"
                :props="props"
                @change="handleChange"
                placeholder="请选择"
            />
          </div>
          <div class="firstSelect">
            品种名称:
            <el-cascader
                v-model="value"
                :options="options_product"
                :props="props"
                @change="handleChange"
                placeholder="请选择"
            />
          </div>
          <div class="queryBox">
            <el-button class="queryButton" type="success" plain >查询</el-button>
          </div>
          <div class="remark">
            单位：元/公斤
          </div>
        </div>
        <div class="scrollTable">
          <el-table :data="displayedData" class="custom-table">
            <el-table-column prop="address" label="批发市场"/>
            <el-table-column prop="date" label="品种" width="180" />
            <el-table-column prop="name" label="最高价"  />
            <el-table-column prop="date" label="最低价" width="180" />
            <el-table-column prop="date" label="大宗价" width="180" />
            <el-table-column prop="address" label="产地"/>
          </el-table>
        </div>

        <div class="pagination">
          <el-pagination
              :page-size="20"
              :pager-count="11"
              layout="prev, pager, next"
              :total="1000"
              @current-change="handlePageChange"
          />
        </div>
      </el-tab-pane>
  </el-tabs>
</template>

<style  lang="scss">
.pagination{
  padding-left:743px;
}

.remark{
  color: #959494;
  font-weight: normal;
  padding-top: 22px;
  padding-left: 150px;
  justify-content: right;
}
.queryBox{
  padding-top: 15px;
  padding-left: 40px;
  padding-right: 80px;
}
.queryButton{
  background-color: var(--el-color-success);
  color: var(--el-color-white);
}
.firstSelect{
  padding-left: 40px;
  padding-top: 5px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
  margin: auto 0;
  height: 40px;
  width: 30%;
}
.searchBar{
  background-color:#f7f5f6 ;
  height: 60px;
  display: flex;
  width: 90%;
  margin: 0 auto;
}
.el-input {
  --el-input-height: var(--el-component-size);
  position: relative;
  font-size: var(--el-font-size-base);
  display: inline-flex;
  width: 180px;
  line-height: var(--el-input-height);
  box-sizing: border-box;
  vertical-align: middle;
}
.demo-tabs{
  background: white;
  --el-tabs-header-height: 60px;
  --el-font-size-base:16px;
}
.el-tabs--top .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--bottom .el-tabs__item.is-bottom:last-child {
  padding-right: 50%;
  padding-left: 50%;
  font-weight: bold;
}
.el-tabs--top .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
  padding-left: 85%;
  padding-right: 50%;
  font-weight: bold;
}
.topButton{
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding-top: 20px;
  padding-bottom: 20px;
}
.scrollTable{
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding-top: 20px;
}

.el-button + .el-button {
  margin-left: 0;
}

.el-button--success.is-plain, .el-button--success.is-text, .el-button--success.is-link {
  --el-button-text-color: var(--el-color-success);
  --el-button-bg-color: white;
  --el-button-border-color: var(--el-color-success-light-5);
  --el-button-hover-text-color: var(--el-color-white);
  --el-button-hover-bg-color: var(--el-color-success);
  --el-button-hover-border-color: var(--el-color-success);
  --el-button-active-text-color: var(--el-color-white);
}
.topTitle{
  padding-left: 5%;
  padding-bottom: 5px;
}
.underline-text {
  color: #b32b2e;
  font-weight: bold;
  font-size: 16px;
  display: inline-block; /* 让下划线仅包围文本 */
  position: relative;

}

.underline-text::after {
  content: '';
  position: absolute;
  bottom: -5px; /* 下划线与文本的距离 */
  left: 0;
  width: 100%;
  border-bottom: 2px solid #b32b2e; /* 下划线的样式和颜色 */
}
.el-table {
  position: relative;
  box-sizing: border-box;
  height: fit-content;
  width: 90%;
  max-width: 90%;
  background-color: var(--el-table-bg-color);
  font-size: 14px;
  color: var(--el-table-text-color);
}

.custom-table {
  border: 1px solid #e0e0e0; /* 添加外边框 */
}

.el-table th,
.el-table tr,
.el-table td {
  border: 1px solid #e0e0e0; /* 添加单元格边框 */
  padding: 8px; /* 添加单元格内边距 */
  text-align: center; /* 居中文本 */
  background-color: #f5fdfb;
}

.el-table th.el-table__cell{
  background-color: #37cba3;
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: bolder;
}
.el-table td.el-table__cell div {
  box-sizing: border-box;
  text-align: center;
}
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  font-weight: bold;
}
.priceTitle{
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style>