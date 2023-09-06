<script setup>
import {onMounted, ref} from 'vue'
import MarketLineChartVue from './MarketLineChart.vue';
import MarketStickChart from './MarketStickChart.vue';
import MarketPieChart from './MarketPieChart.vue';
import MarketLineChart_area from './MarketLineChart_area.vue';
import MarketStickChart_area from './MarketStickChart_area.vue';
import MarketPieChart_area from './MarketPieChart_area.vue';
import MarketLineChart_multiCategory from './MarketLineChart_multiCategory.vue'
import MarketStickChart_multiCategory from './MarketStickChart_multiCategory.vue'
import MarketRadarChart_multiCategory from './MarketRadarChart_multiCategory.vue'
import MarketLineChart_multiMarket from './MarketLineChart_multiMarket.vue'
import MarketStickChart_multiMarket from './MarketStickChart_multiMarket.vue'
import MarketRadarChart_multiMarket from './MarketRadarChart_multiMarket.vue'
import MarketLineChart_multiArea from './MarketLineChart_multiArea.vue'
import MarketStickChart_multiArea from './MarketStickChart_multiArea.vue'
import MarketRadarChart_multiArea from './MarketRadarChart_multiArea.vue'
import zhexiantu from '@/assets/images/zhexiantu-xianxing.png'
import zhuzhuangtu from '@/assets/images/stick.png'
import bingtu from '@/assets/images/tubiao-bingtu.png'
import leidatu from '@/assets/images/leidatu.png'
import axios from "axios";
import {baseUrl} from "@/main";
const activeName = ref('first')
const props = {
  expandTrigger: 'hover'
};
const props_p3 ={
  expandTrigger: 'hover',
}
const selectedIndex = ref(0); // 默认选中第一个图标
const selectedIndex_2 = ref(0); // 默认选中第一个图标
const selectedIndex_3 = ref(0); // 默认选中第一个图标
const selectedIndex_4 = ref(0); // 默认选中第一个图标
const selectedIndex_5 = ref(0); // 默认选中第一个图标

const icons = [
  zhexiantu, // 本地PNG图片的相对路径
  zhuzhuangtu,
  bingtu,
];
const icons_2 = [
  zhexiantu, // 本地PNG图片的相对路径
  zhuzhuangtu,
  leidatu,
];
const selectTable = (index) => {
  // 切换选中状态
  selectedIndex.value = index;
};
const selectTable_2 = (index) => {
  // 切换选中状态
  selectedIndex_2.value = index;
};
const selectTable_3 = (index) => {
  // 切换选中状态
  selectedIndex_3.value = index;
};
const selectTable_4 = (index) => {
  // 切换选中状态
  selectedIndex_4.value = index;
};
const selectTable_5 = (index) => {
  // 切换选中状态
  selectedIndex_5.value = index;
};

// 处理时间选择器时间格式的函数
function formatDates(dateStrings) {
  return dateStrings.map((dateString) => {
    const originalDate = new Date(dateString);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // +1 因为月份从 0 开始
    const day = originalDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
}


const timeFrame_p3 = ref('')
const timeFrame_p4 = ref('')
const timeFrame_p5 = ref('')
// 设置时间选择时的快捷键
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

// 接收第一标签页的品种类别
const selectedProduct_p1 = ref([]);
const selectedProductValue_p1 = ref([]);
const timeFrame_p1 = ref('') // 接收时间范围的值
const time_start_p1 = ref('');
const time_end_p1 = ref('');
const highestPrice_p1 = ref('');
const highestMarket_p1 = ref('');
const highestTime_p1 = ref('');
const lowestPrice_p1 = ref('');
const lowestMarket_p1 = ref('');
const lowestTime_p1 = ref('');
const content_p1 = ref([]); // 接收后端返回的varietyNationalAverageList
const refDate_p1 = ref([]);
const refPrice_p1 = ref([]);
const combinedData = ref([]);
// 第二标签页中的地区，品种类别
const selectedProvince_p2 = ref('');
const selectedProduct_p2 = ref([]);
const selectedProductValue_p2 = ref([]);
const timeFrame_p2 = ref('');
const time_start_p2 = ref('');
const time_end_p2 = ref('');
const highestPrice_p2 = ref('');
const highestMarket_p2 = ref('');
const highestTime_p2 = ref('');
const lowestPrice_p2 = ref('');
const lowestMarket_p2 = ref('');
const lowestTime_p2 = ref('');
const content_p2 = ref([]); // 接收后端返回数组
const refDate_p2 = ref([]);
const refPrice_p2 = ref([]);
const combinedData_p2 = ref([]);
// 第三标签页中的批发市场，多选产品
const selectedMarket_p3 = ref([]);
const selectedProduct_p3 = ref([]);
const selectedItems_p3 = ref([]);
const lastLevelItems_p3 = ref([]);
const time_start_p3 = ref('');
const time_end_p3 = ref('');
const allProductInfo = ref([]);
async function fetchProduct_p3 () {
  // 获得选中的大类名称
  const encodedValue = encodeURIComponent(selectedProduct_p3.value[1]);
  // 发送异步请求到后端获取子项数据
  try {
    const response = await axios.get(`${baseUrl}/dropDownBox/varietis?secondVariety=${encodedValue}`);
    console.log(response);
    lastLevelItems_p3.value = response.data.data;
  } catch (error) {
    console.error('获取子项数据失败', error);
  }
}

// 向后端获取多选框中的每一项对应的数据
async function fetchProductPrice (item) {
  try {
    // 在这里执行查询操作，发送选中的值到后端
    const time = formatDates(timeFrame_p3.value);
    time_start_p3.value = time[0];
    time_end_p3.value = time[1];
    const selectedMarket = selectedMarket_p3.value[1];
    const response = await axios.get(`${baseUrl}/priceQuery/marketAveragePrices/${selectedMarket}/${item}/${time_start_p3.value}/${time_end_p3.value}`);
    allProductInfo.value.push(response.data.data);
  } catch(error) {
    // 处理请求错误
    console.error('请求失败', error);
  }
}

// 第四个标签页中的多选市场，单选产品
const selectedProduct_p4 = ref([]);
const selectedProvince_p4 = ref('');
const options_province_p4 = ref([
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
]); // 第四标签页特制省市数组
const selectedItems_p4 = ref([]); // 多选选中的市场
const lastLevelItems_p4 = ref([]);// 后端传过来每个省市对应的市场数组
const options_product_p3 = ref([
  {
    value: '粮食',
    label: '粮食 ',
    children: [
      {
        value: '谷物',
        label: '谷物',
      },
      {
        value: '豆类',
        label: '豆类',
      },
      {
        value: '薯类',
        label: '薯类',
      },
      {
        value: '其他粮食',
        label: '其他粮食',
      },
    ],
  },
  {
    value: '油料',
    label: '油料',
    children: [
      {
        value: '食用油籽',
        label: '食用油籽',
      },
      {
        value: '非食用油籽',
        label: '非食用油籽',
      },
    ],
  },
  {
    value: '糖烟茶',
    label: '糖烟茶',
    children: [
      {
        value: '糖类',
        label: '糖类',
      },
    ],
  },
  {
    value: '蔬菜',
    label: '蔬菜',
    children: [
      {
        value: '叶菜类',
        label: '叶菜类',
      },
      {
        value: '根和根茎类',
        label: '根和根茎类',
      },
      {
        value: '芽、花类',
        label: '芽、花类',
      },
      {
        value: '瓜果类',
        label: '瓜果类',
      },
      {
        value: '食用菌类',
        label: '食用菌类',
      },
      {
        value: '其他蔬菜类',
        label: '其他蔬菜类',
      },
    ],
  },
  {
    value: '果品',
    label: '果品',
    children: [
      {
        value: '仁果类',
        label: '仁果类',
      },
      {
        value: '浆果类',
        label: '浆果类',
      },
      {
        value: '核果类',
        label: '核果类',
      },
      {
        value: '坚果类',
        label: '坚果类',
      },
      {
        value: '柑果类',
        label: '柑果类',
      },
      {
        value: '热带及亚热带水果',
        label: '热带及亚热带水果',
      },
      {
        value: '瓜类水果',
        label: '瓜类水果',
      },
      {
        value: '其他果品',
        label: '其他果品',
      },
    ],
  },
  {
    value: '药材',
    label: '药材',
    children: [
      {
        value: '种子果实类',
        label: '种子果实类',
      },
      {
        value: '其他果实类',
        label: '其他果实类',
      },
    ],
  },
  {
    value: '植物油',
    label: '植物油',
    children: [
      {
        value: '食用植物油',
        label: '食用植物油',
      },
      {
        value: '非食用植物油',
        label: '非食用植物油',
      },
    ],
  },
  {
    value: '畜禽产品',
    label: '畜禽产品',
    children: [
      {
        value: '家畜',
        label: '家畜',
      },
      {
        value: '家禽',
        label: '家禽',
      },
      {
        value: '特种养殖动物',
        label: '特种养殖动物',
      },
      {
        value: '禽蛋',
        label: '禽蛋',
      },
      {
        value: '动物皮毛',
        label: '动物皮毛',
      },
      {
        value: '其他畜禽产品',
        label: '其他畜禽产品',
      },
    ],
  },
  {
    value: '水产品',
    label: '水产品',
    children: [
      {
        value: '淡水鱼',
        label: '淡水鱼',
      },
      {
        value: '海水鱼',
        label: '海水鱼',
      },
      {
        value: '虾蟹及两栖类',
        label: '虾蟹及两栖类',
      },
      {
        value: '螺贝及软体类',
        label: '螺贝及软体类',
      },
      {
        value: '海水植物',
        label: '海水植物',
      },
      {
        value: '水产加工品',
        label: '水产加工品',
      },
      {
        value: '加工副产品',
        label: '加工副产品',
      },
      {
        value: '其他水产品',
        label: '其他水产品',
      },
    ],
  },
])  // 第三标签页特制产品数组
async function fetchMarket_p4 () {
  // 获得选中的省市名称
  const encodedValue = encodeURIComponent(selectedProvince_p4.value);
  // 发送异步请求到后端获取子项数据
  try {
    const response = await axios.get(`${baseUrl}/dropDownBox/markets?province=${encodedValue}`);
    lastLevelItems_p4.value = response.data.data;
  } catch (error) {
    console.error('获取子项数据失败', error);
  }
}

// 第五个标签页中的多选省市，单选产品
const selectedItems_p5 = ref([]);
const selectedProduct_p5 = ref([]);
// 创建ref数组接收后端数据
const options_product = ref([
  {
    value: '粮食',
    label: '粮食 ',
    children: [
      {
        value: '谷物',
        label: '谷物',
        children: [],
      },
      {
        value: '豆类',
        label: '豆类',
        children: [],
      },
      {
        value: '薯类',
        label: '薯类',
        children: [],
      },
      {
        value: '其他粮食',
        label: '其他粮食',
        children: [],
      },
    ],
  },
  {
    value: '油料',
    label: '油料',
    children: [
      {
        value: '食用油籽',
        label: '食用油籽',
        children: [],
      },
      {
        value: '非食用油籽',
        label: '非食用油籽',
        children: [],
      },
    ],
  },
  {
    value: '糖烟茶',
    label: '糖烟茶',
    children: [
      {
        value: '糖类',
        label: '糖类',
        children: []
      },
    ],
  },
  {
    value: '蔬菜',
    label: '蔬菜',
    children: [
      {
        value: '叶菜类',
        label: '叶菜类',
        children: []
      },
      {
        value: '根和根茎类',
        label: '根和根茎类',
        children: []
      },
      {
        value: '芽、花类',
        label: '芽、花类',
        children: []
      },
      {
        value: '瓜果类',
        label: '瓜果类',
        children: [],
      },
      {
        value: '食用菌类',
        label: '食用菌类',
        children: []
      },
      {
        value: '其他蔬菜类',
        label: '其他蔬菜类',
        children: []
      },
    ],
  },
  {
    value: '果品',
    label: '果品',
    children: [
      {
        value: '仁果类',
        label: '仁果类',
        children: []
      },
      {
        value: '浆果类',
        label: '浆果类',
        children: []
      },
      {
        value: '核果类',
        label: '核果类',
        children: []
      },
      {
        value: '坚果类',
        label: '坚果类',
        children: []
      },
      {
        value: '柑果类',
        label: '柑果类',
        children: []
      },
      {
        value: '热带及亚热带水果',
        label: '热带及亚热带水果',
        children: []
      },
      {
        value: '瓜类水果',
        label: '瓜类水果',
        children: []
      },
      {
        value: '其他果品',
        label: '其他果品',
        children: []
      },
    ],
  },
  {
    value: '药材',
    label: '药材',
    children: [
      {
        value: '种子果实类',
        label: '种子果实类',
        children: []
      },
      {
        value: '其他果实类',
        label: '其他果实类',
        children: []
      },
    ],
  },
  {
    value: '植物油',
    label: '植物油',
    children: [
      {
        value: '食用植物油',
        label: '食用植物油',
        children: []
      },
      {
        value: '非食用植物油',
        label: '非食用植物油',
        children: []
      },
    ],
  },
  {
    value: '畜禽产品',
    label: '畜禽产品',
    children: [
      {
        value: '家畜',
        label: '家畜',
        children: []
      },
      {
        value: '家禽',
        label: '家禽',
        children: []
      },
      {
        value: '特种养殖动物',
        label: '特种养殖动物',
        children: []
      },
      {
        value: '禽蛋',
        label: '禽蛋',
        children: []
      },
      {
        value: '动物皮毛',
        label: '动物皮毛',
        children: []
      },
      {
        value: '其他畜禽产品',
        label: '其他畜禽产品',
        children: []
      },
    ],
  },
  {
    value: '水产品',
    label: '水产品',
    children: [
      {
        value: '淡水鱼',
        label: '淡水鱼',
        children: []
      },
      {
        value: '海水鱼',
        label: '海水鱼',
        children: []
      },
      {
        value: '虾蟹及两栖类',
        label: '虾蟹及两栖类',
        children: []
      },
      {
        value: '螺贝及软体类',
        label: '螺贝及软体类',
        children: []
      },
      {
        value: '海水植物',
        label: '海水植物',
        children: []
      },
      {
        value: '水产加工品',
        label: '水产加工品',
        children: []
      },
      {
        value: '加工副产品',
        label: '加工副产品',
        children: []
      },
      {
        value: '其他水产品',
        label: '其他水产品',
        children: []
      },
    ],
  },
])  // 品种数组
const options_market = ref([
  {
    value: '北京市',
    label: '北京市',
    children: [],
  },
  {
    value: '天津市',
    label: '天津市',
    children: [],
  },
  {
    value: '河北省',
    label: '河北省',
    children: [],
  },
  {
    value: '山西省',
    label: '山西省',
    children: [],
  },
  {
    value: '内蒙古自治区',
    label: '内蒙古自治区',
    children: [],
  },
  {
    value: '辽宁省',
    label: '辽宁省',
    children: [],
  },
  {
    value: '吉林省',
    label: '吉林省',
    children: [],
  },
  {
    value: '黑龙江省',
    label: '黑龙江省',
    children: [],
  },
  {
    value: '上海市',
    label: '上海市',
    children: [],
  },
  {
    value: '江苏省',
    label: '江苏省',
    children: [],
  },
  {
    value: '浙江省',
    label: '浙江省',
    children: [],
  },
  {
    value: '安徽省',
    label: '安徽省',
    children: [],
  },
  {
    value: '福建省',
    label: '福建省',
    children: [],
  },
  {
    value: '江西省',
    label: '江西省',
    children: [],
  },
  {
    value: '山东省',
    label: '山东省',
    children: [],
  },
  {
    value: '河南省',
    label: '河南省',
    children: [],
  },
  {
    value: '湖南省',
    label: '湖南省',
    children: [],
  },
  {
    value: '广东省',
    label: '广东省',
    children: [],
  },
  {
    value: '湖北省',
    label: '湖北省',
    children: [],
  },
  {
    value: '广东省',
    label: '广东省',
    children: [],
  },
  {
    value: '广西壮族自治区',
    label: '广西壮族自治区',
    children: [],
  },
  {
    value: '海南省',
    label: '海南省',
    children: [],
  },
  {
    value: '重庆市',
    label: '重庆市',
    children: [],
  },
  {
    value: '四川省',
    label: '四川省',
    children: [],
  },
  {
    value: '贵州省',
    label: '贵州省',
    children: [],
  },
  {
    value: '云南省',
    label: '云南省',
    children: [],
  },
  {
    value: '西藏自治区',
    label: '西藏自治区',
    children: [],
  },
  {
    value: '陕西省',
    label: '陕西省',
    children: [],
  },
  {
    value: '甘肃省',
    label: '甘肃省',
    children: [],
  },
  {
    value: '青海省',
    label: '青海省',
    children: [],
  },
  {
    value: '宁夏回族自治区',
    label: '宁夏回族自治区',
    children: [],
  },
  {
    value: '新疆维吾尔自治区',
    label: '新疆维吾尔自治区',
    children: [],
  },
  {
    value: '台湾',
    label: '台湾',
    children: [],
  },
  {
    value: '香港特别行政区',
    label: '香港特别行政区',
    children: [],
  },
  {
    value: '澳门特别行政区',
    label: '澳门特别行政区',
    children: [],
  },
])   // 市场数组
const options_province = [
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
] // 第二个标签页中固定的省市数组
const handleMarketChange = () => {
}
const handleProductChange = () => {
}

// 获得市场第一级后面的children
async function fetchSecondLevelDataMarket(firstLevelOption_market) {
  try {
    const encodedValue = encodeURIComponent(firstLevelOption_market.value);
    const response = await axios.get(`${baseUrl}/dropDownBox/markets?province=${encodedValue}`);
    // 更新一级市场的 children 属性
    const marketNames = response.data.data;
    for (const marketName of marketNames) {
      firstLevelOption_market.children.push({
        value: marketName,
        label: marketName,
      });
    }
  } catch (error) {
    console.error('获取第二级数据失败', error);
  }
}

// 获得产品第二级后面的children
async  function fetchThirdLevelDataProduct(secondLevelOption_product){
  try {
    const encodedValue = encodeURIComponent(secondLevelOption_product.value);
    const response = await axios.get(`${baseUrl}/dropDownBox/varietis?secondVariety=${encodedValue}`);
    // 更新一级市场的 children 属性
    const productNames = response.data.data;
    for (const marketName of productNames) {
      secondLevelOption_product.children.push({
        value: marketName,
        label: marketName,
      });
    }
  } catch (error) {
    console.error('获取第二级数据失败', error);
  }
}

// 为每一个标签页的“查询”按钮写接口
const handleQueryP1 = () => {
  // 在这里执行查询操作，发送选中的值到后端
  const time = formatDates(timeFrame_p1.value);
  selectedProductValue_p1.value = selectedProduct_p1.value[2];
  time_start_p1.value = time[0];
  time_end_p1.value = time[1];
  // 发送请求到后端，传递选中的值
  // 可以使用axios或其他方式发送HTTP请求
  axios.get(`${baseUrl}/marketSituation/nationalAveragePrices/${selectedProductValue_p1.value}/${time_start_p1.value}/${time_end_p1.value}`)
      .then((response) => {
        // 处理从后端返回的数据
        // 更新组件中的数据以供模板使用
        content_p1.value = response.data.data.varietyNationalAverageList;
        highestPrice_p1.value = response.data.data.highestPrice;
        highestMarket_p1.value = response.data.data.highestPriceMarket;
        highestTime_p1.value = response.data.data.highestPriceDate;
        lowestPrice_p1.value = response.data.data.bottomPrice;
        lowestMarket_p1.value = response.data.data.bottomPriceMarket;
        lowestTime_p1.value = response.data.data.bottomPriceDate;
        refDate_p1.value = content_p1.value.map(item => item.collectDate);
        refPrice_p1.value = content_p1.value.map(item => item.averagePrice);
        combinedData.value = content_p1.value.map(item => ({
          value: item.averagePrice,
          name: item.collectDate
        }));
      })
      .catch((error) => {
        // 处理请求错误
        console.error('请求失败', error);
      });
};
const handleQueryP2 = () => {
  // 在这里执行查询操作，发送选中的值到后端
  const time = formatDates(timeFrame_p2.value);
  const province = selectedProvince_p2.value;
  selectedProductValue_p2.value = selectedProduct_p2.value[2];
  time_start_p2.value = time[0];
  time_end_p2.value = time[1];
  // 发送请求到后端，传递选中的值
  // 可以使用axios或其他方式发送HTTP请求
  axios.get(`${baseUrl}/marketSituation/regionalAveragePrices/${province}/${selectedProductValue_p2.value}/${time_start_p2.value}/${time_end_p2.value}`)
      .then((response) => {
        // 处理从后端返回的数据
        // 更新组件中的数据以供模板使用
        content_p2.value = response.data.data.varietyRegionalAverageList;
        highestPrice_p2.value = response.data.data.highestPrice;
        highestMarket_p2.value = response.data.data.highestPriceMarket;
        highestTime_p2.value = response.data.data.highestPriceDate;
        lowestPrice_p2.value = response.data.data.bottomPrice;
        lowestMarket_p2.value = response.data.data.bottomPriceMarket;
        lowestTime_p2.value = response.data.data.bottomPriceDate;
        refDate_p2.value = content_p2.value.map(item => item.collectDate);
        refPrice_p2.value = content_p2.value.map(item => item.averagePrice);
        combinedData_p2.value = content_p2.value.map(item => ({
          value: item.averagePrice,
          name: item.collectDate
        }));
      })
      .catch((error) => {
        // 处理请求错误
        console.error('请求失败', error);
      });
};
const handleQueryP3 = async () => {
  const selectedProductValue = selectedItems_p3.value;
  const fetchPromises = selectedProductValue.map(item => fetchProductPrice(item));
  await Promise.all(fetchPromises);
};
const handleQueryP4 = () => {
  // 在这里执行查询操作，发送选中的值到后端
  const selectedMarketValue = selectedMarket.value[1];
  const selectedProductValue = selectedProduct.value[2];
  // 发送请求到后端，传递选中的值
  // 可以使用axios或其他方式发送HTTP请求
  axios.get(`${baseUrl}/priceQuery/PriceData`, {
    params: {
      market: selectedMarketValue,
      variety: selectedProductValue,
    },
  })
      .then((response) => {
        // 处理从后端返回的数据
        // 更新组件中的数据以供模板使用
        priceTable.value = response.data.data;
      })
      .catch((error) => {
        // 处理请求错误
        console.error('请求失败', error);
      });
};
const handleQueryP5 = () => {
  // 在这里执行查询操作，发送选中的值到后端
  const selectedMarketValue = selectedMarket.value[1];
  const selectedProductValue = selectedProduct.value[2];
  // 发送请求到后端，传递选中的值
  // 可以使用axios或其他方式发送HTTP请求
  axios.get(`${baseUrl}/priceQuery/PriceData`, {
    params: {
      market: selectedMarketValue,
      variety: selectedProductValue,
    },
  })
      .then((response) => {
        // 处理从后端返回的数据
        // 更新组件中的数据以供模板使用
        priceTable.value = response.data.data;
      })
      .catch((error) => {
        // 处理请求错误
        console.error('请求失败', error);
      });
};


// 挂载时加载产品三级一级省市二级批发市场
onMounted(async () => {
  // 遍历所有的一级下拉框
  for (const firstLevelOption_market of options_market.value) {
    // 调用函数获取二级数据
    await fetchSecondLevelDataMarket(firstLevelOption_market);
  }

  for (const firstLevelOption_product of options_product.value) {
    // 调用函数获取第三级数据
    for (const secondLevelOption_product of firstLevelOption_product.children) {
      await fetchThirdLevelDataProduct(secondLevelOption_product);
    }
  }
});

</script>

<template>
    <el-tabs v-model="activeName" class="demo-tabs" >
        <el-tab-pane label="单一品种全国平均价" name="first" >
            <div class="searchBar">
                <div class="firstTab_kind">
                    品种类别:
                    <el-cascader
                        v-model="selectedProduct_p1"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="timeSelect">
                  <p class="select_title">时间范围：</p>
                  <el-date-picker
                      v-model="timeFrame_p1"
                      type="daterange"
                      unlink-panels
                      range-separator="To"
                      start-placeholder="Start date"
                      end-placeholder="End date"
                      :shortcuts="shortcuts"
                      :size="'default'"
                  />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQueryP1">查询</el-button>
                </div>
            </div>
            <div class="content">
                <div class="overView">
                    <div class="overView_title">查询结果</div>
                    <div class="overView_item">
                        <p class="overView_item_title"> <img src="@/assets/images/shijian.png" /> 时间范围 </p>
                        <p class="overView_item_text">{{time_start_p1}}--{{time_end_p1}}</p>
                    </div>
                    <div class="overView_item_larger">
                        <p class="overView_item_title"> <img src="@/assets/images/shangsheng.png" /> 最高价格： <span class="font_red">{{ highestPrice_p1 }}元</span> </p>
                        <p class="overView_item_text">{{highestMarket_p1}}</p>
                        <p class="overView_item_text">{{ highestTime_p1 }}</p>
                    </div>
                    <div class="overView_item_larger">
                        <p class="overView_item_title"> <img src="@/assets/images/xiajiang.png" /> 最低价格： <span class="font_red">{{lowestPrice_p1}}元</span> </p>
                        <p class="overView_item_text">{{ lowestMarket_p1 }}</p>
                        <p class="overView_item_text">{{ lowestTime_p1}}</p>
                    </div>
                </div>
                <div class="tableArea">
                    <!-- 根据selectedIndex的值显示对应的表格 -->
                    <div v-if="selectedIndex === 0" class="tables">
                        <MarketLineChartVue :selectedProductValue_p1="selectedProductValue_p1" :refDate_p1="refDate_p1" :refPrice_p1="refPrice_p1"></MarketLineChartVue>
                    </div>
                    <div v-if="selectedIndex === 1" class="tables">
                        <MarketStickChart :selectedProductValue_p1="selectedProductValue_p1" :refDate_p1="refDate_p1" :refPrice_p1="refPrice_p1"></MarketStickChart>
                    </div>
                    <div v-if="selectedIndex === 2" class="tables">
                        <MarketPieChart :selectedProductValue_p1="selectedProductValue_p1" :combinedData="combinedData"></MarketPieChart>
                    </div>
                    <div class="icon_container">
                        <!-- 使用ref来引用图标元素 -->
                        <img class="tableImg"
                            v-for="(icon, index) in icons"
                            :key="index"
                            :src="icon"
                            :ref="`iconRef${index}`"
                            @click="selectTable(index)"
                            :style="{ 
                                filter: selectedIndex === index ? 'none' : 'brightness(3) grayscale(100%)' ,
                                cursor: 'pointer'
                                }"
                        />
                    </div>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="单一品种地区平均价" name="second" >
            <div class="searchBar">
                <div class="secondTab">
                    <p class="secondTab_title">地区:</p>
                    <el-cascader
                        v-model="selectedProvince_p2"
                        :options="options_province"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="secondTab">
                  <p class="secondTab_title">品种类别:</p>
                  <el-cascader
                      v-model="selectedProduct_p2"
                      :options="options_product"
                      :props="props"
                      @change="handleProductChange"
                      placeholder="请选择"
                  />
                </div>
                <div class="secondTimeSelect">
                  <p class="secondTab_title">时间范围:</p>
                  <el-date-picker
                      v-model="timeFrame_p2"
                      type="daterange"
                      unlink-panels
                      range-separator="To"
                      start-placeholder="Start date"
                      end-placeholder="End date"
                      :shortcuts="shortcuts"
                      :size="'default'"
                  />
                </div>
                <div class="smallQueryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQueryP2">查询</el-button>
                </div>
            </div>
            <div class="content">
                <div class="overView">
                    <div class="overView_title">查询结果</div>
                    <div class="overView_item">
                        <p class="overView_item_title"> <img src="@/assets/images/shijian.png" /> 时间范围 </p>
                        <p class="overView_item_text">{{ time_start_p2 }}--{{time_end_p2}}</p>
                    </div>
                    <div class="overView_item_larger">
                        <p class="overView_item_title"> <img src="@/assets/images/shangsheng.png" /> 最高价格： <span class="font_red">{{ highestPrice_p2 }}元</span> </p>
                        <p class="overView_item_text">{{ highestMarket_p2 }}</p>
                        <p class="overView_item_text">{{highestTime_p2}}</p>
                    </div>
                    <div class="overView_item_larger">
                        <p class="overView_item_title"> <img src="@/assets/images/xiajiang.png" /> 最低价格： <span class="font_red">{{ lowestPrice_p2 }}元</span> </p>
                        <p class="overView_item_text">{{ lowestMarket_p2 }}</p>
                        <p class="overView_item_text">{{ lowestTime_p2 }}</p>
                    </div>
                </div>
                <div class="tableArea">
                    <!-- 根据selectedIndex的值显示对应的表格 -->
                    <div v-if="selectedIndex_2 === 0" class="tables">
                        <MarketLineChart_area :selectedProductValue_p2="selectedProductValue_p2" :refDate_p2="refDate_p2" :refPrice_p2="refPrice_p2"></MarketLineChart_area>
                    </div>
                    <div v-if="selectedIndex_2 === 1" class="tables">
                        <MarketStickChart_area :selectedProductValue_p2="selectedProductValue_p2" :refDate_p2="refDate_p2" :refPrice_p2="refPrice_p2"></MarketStickChart_area>
                    </div>
                    <div v-if="selectedIndex_2 === 2" class="tables">
                        <MarketPieChart_area :selectedProductValue_p2="selectedProductValue_p2" :combinedData_p2="combinedData_p2"></MarketPieChart_area>
                    </div>
                    <div class="icon_container">
                        <!-- 使用ref来引用图标元素 -->
                        <img class="tableImg"
                            v-for="(icon, index) in icons"
                            :key="index"
                            :src="icon"
                            :ref="`iconRef${index}`"
                            @click="selectTable_2(index)"
                            :style="{
                                filter: selectedIndex_2 === index ? 'none' : 'brightness(3) grayscale(100%)' ,
                                cursor: 'pointer'
                                }"
                        />
                    </div>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="单一市场多品种对比" name="third" >
            <div class="searchBar_p3">
                <div class="thirdTab_search_1">
                  <div class="thirdTab">
                    <p class="thirdTab_title">批发市场：</p>
                    <el-cascader
                        v-model="selectedMarket_p3"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                  </div>
                  <div class="thirdTab">
                    <p class="thirdTab_title">品种大类：</p>
                    <el-cascader
                        v-model="selectedProduct_p3"
                        :options="options_product_p3"
                        :props="props_p3"
                        placeholder="请选择"
                        @change="fetchProduct_p3"
                    />
                  </div>
                  <div class="thirdTab">
                    <p class="thirdTab_title">品种小类：</p>
                    <el-select
                        v-model="selectedItems_p3"
                        multiple
                        collapse-tags
                        collapse-tags-tooltip
                        multiple-limit="3"
                        placeholder="可多选"
                        style="width: 240px"
                    >
                      <el-option
                          v-for="item in lastLevelItems_p3"
                          :key="item"
                          :label="item"
                          :value="item"
                      />
                    </el-select>
                  </div>
                </div>
                <div class="thirdTab_search_2">
                  <div class="thirdTimeSelect">
                    <p class="thirdTab_title">时间范围:</p>
                    <el-date-picker
                        v-model="timeFrame_p3"
                        type="daterange"
                        unlink-panels
                        range-separator="To"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        :shortcuts="shortcuts"
                        :size="'default'"
                    />
                  </div>
                  <div class="smallQueryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQueryP3">查询</el-button>
                  </div>
                </div>
            </div>
            <div class="content">
            <div class="overView">
              <div class="overView_title">查询结果</div>
              <div class="overView_item">
                <p class="overView_item_title"> <img src="@/assets/images/shijian.png" /> 时间范围 </p>
                <p class="overView_item_text">2023/08--2023/09</p>
              </div>
              <div class="overView_item_larger">
                <p class="overView_item_title"> <img src="@/assets/images/shangsheng.png" /> 最高价格： </p>
                <div class="select_name">
                  <span class="name_box">牛肉</span>
                  <span class="name_box">羊肉</span>
                  <span class="name_box">猪肉</span>
                </div>
                <div class="price_high">
                  <span class="price_box">37元</span>
                  <span class="price_box">30元</span>
                  <span class="price_box">15元</span>
                </div>
              </div>
              <div class="overView_item_larger">
                <p class="overView_item_title"> <img src="@/assets/images/xiajiang.png" /> 最低价格：  </p>
                <div class="select_name">
                  <span class="name_box">牛肉</span>
                  <span class="name_box">羊肉</span>
                  <span class="name_box">猪肉</span>
                </div>
                <div class="price_high">
                  <span class="price_box">37元</span>
                  <span class="price_box">30元</span>
                  <span class="price_box">15元</span>
                </div>
              </div>
            </div>
            <div class="tableArea">
              <!-- 根据selectedIndex的值显示对应的表格 -->
              <div v-if="selectedIndex_3 === 0" class="tables">
                <MarketLineChart_multiCategory></MarketLineChart_multiCategory>
              </div>
              <div v-if="selectedIndex_3 === 1" class="tables">
                <MarketStickChart_multiCategory></MarketStickChart_multiCategory>
              </div>
              <div v-if="selectedIndex_3 === 2" class="tables">
                <MarketRadarChart_multiCategory></MarketRadarChart_multiCategory>
              </div>
              <div class="icon_container">
                <!-- 使用ref来引用图标元素 -->
                <img class="tableImg"
                     v-for="(icon, index) in icons_2"
                     :key="index"
                     :src="icon"
                     :ref="`iconRef${index}`"
                     @click="selectTable_3(index)"
                     :style="{
                                  filter: selectedIndex_3 === index ? 'none' : 'brightness(3) grayscale(100%)' ,
                                  cursor: 'pointer'
                                  }"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="单一品种多市场对比" name="forth" >
          <div class="searchBar_p3">
            <div class="thirdTab_search_1">
              <div class="thirdTab">
                <p class="thirdTab_title">品种类别：</p>
                <el-cascader
                    v-model="selectedProduct_p4"
                    :options="options_product"
                    :props="props"
                    @change="handleProductChange"
                    placeholder="请选择"
                />
              </div>
              <div class="thirdTab">
                <p class="thirdTab_title">地区：</p>
                <el-cascader
                    v-model="selectedProvince_p4"
                    :options="options_province_p4"
                    :props="props"
                    placeholder="请选择"
                    @change="fetchMarket_p4"
                />
              </div>
              <div class="thirdTab">
                <p class="thirdTab_title">批发市场：</p>
                <el-select
                    v-model="selectedItems_p4"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    multiple-limit="3"
                    placeholder="可多选"
                    style="width: 240px"
                >
                  <el-option
                      v-for="item in lastLevelItems_p4"
                      :key="item"
                      :label="item"
                      :value="item"
                  />
                </el-select>
              </div>
            </div>
            <div class="thirdTab_search_2">
              <div class="thirdTimeSelect">
                <p class="thirdTab_title">时间范围:</p>
                <el-date-picker
                    v-model="timeFrame_p4"
                    type="daterange"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :shortcuts="shortcuts"
                    :size="'default'"
                />
              </div>
              <div class="smallQueryBox">
                <el-button class="queryButton" type="success" plain @click="handleQueryP3">查询</el-button>
              </div>
            </div>
          </div>
            <div class="content">
            <div class="overView">
              <div class="overView_title">查询结果</div>
              <div class="overView_item">
                <p class="overView_item_title"> <img src="@/assets/images/shijian.png" /> 时间范围 </p>
                <p class="overView_item_text">2023/08--2023/09</p>
              </div>
              <div class="overView_item_larger">
                <p class="overView_item_title"> <img src="@/assets/images/shangsheng.png" /> 最高价格：  </p>
                <div class="select_name">
                  <span class="name_box">牛肉</span>
                  <span class="name_box">羊肉</span>
                  <span class="name_box">猪肉</span>
                </div>
                <div class="price_high">
                  <span class="price_box">37元</span>
                  <span class="price_box">30元</span>
                  <span class="price_box">15元</span>
                </div>
              </div>
              <div class="overView_item_larger">
                <p class="overView_item_title"> <img src="@/assets/images/xiajiang.png" /> 最低价格：  </p>
                <div class="select_name">
                  <span class="name_box">牛肉</span>
                  <span class="name_box">羊肉</span>
                  <span class="name_box">猪肉</span>
                </div>
                <div class="price_high">
                  <span class="price_box">37元</span>
                  <span class="price_box">30元</span>
                  <span class="price_box">15元</span>
                </div>
              </div>
            </div>
            <div class="tableArea">
              <!-- 根据selectedIndex的值显示对应的表格 -->
              <div v-if="selectedIndex_4 === 0" class="tables">
                <MarketLineChart_multiMarket></MarketLineChart_multiMarket>
              </div>
              <div v-if="selectedIndex_4 === 1" class="tables">
                <MarketStickChart_multiMarket></MarketStickChart_multiMarket>
              </div>
              <div v-if="selectedIndex_4 === 2" class="tables">
                <MarketRadarChart_multiMarket></MarketRadarChart_multiMarket>
              </div>
              <div class="icon_container">
                <!-- 使用ref来引用图标元素 -->
                <img class="tableImg"
                     v-for="(icon, index) in icons_2"
                     :key="index"
                     :src="icon"
                     :ref="`iconRef${index}`"
                     @click="selectTable_4(index)"
                     :style="{
                                  filter: selectedIndex_4 === index ? 'none' : 'brightness(3) grayscale(100%)' ,
                                  cursor: 'pointer'
                                  }"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="单一品种多地区对比" name="fifth" >
            <div class="searchBar">
              <div class="thirdTab">
                <p class="thirdTab_title">地区：</p>
                <el-select
                    v-model="selectedItems_p5"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    multiple-limit="3"
                    placeholder="可多选"
                    style="width: 180px"
                >
                  <el-option
                      v-for="item in options_province"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </div>
              <div class="thirdTab">
                <p class="thirdTab_title">品种名称：</p>
                <el-cascader
                    v-model="selectedProduct_p5"
                    :options="options_product"
                    :props="props"
                    @change="handleProductChange"
                    placeholder="请选择"
                />
              </div>
              <div class="thirdTimeSelect">
                <p class="thirdTab_title">时间范围:</p>
                <el-date-picker
                    v-model="timeFrame_p5"
                    type="daterange"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :shortcuts="shortcuts"
                    :size="'default'"
                />
              </div>
              <div class="smallQueryBox">
                <el-button class="queryButton" type="success" plain @click="handleQueryP5">查询</el-button>
              </div>
            </div>
            <div class="content">
            <div class="overView">
              <div class="overView_title">查询结果</div>
              <div class="overView_item">
                <p class="overView_item_title"> <img src="@/assets/images/shijian.png" /> 时间范围 </p>
                <p class="overView_item_text">2023/08--2023/09</p>
              </div>
              <div class="overView_item_larger">
                <p class="overView_item_title"> <img src="@/assets/images/shangsheng.png" /> 最高价格：  </p>
                <div class="select_name">
                  <span class="name_box">牛肉</span>
                  <span class="name_box">羊肉</span>
                  <span class="name_box">猪肉</span>
                </div>
                <div class="price_high">
                  <span class="price_box">37元</span>
                  <span class="price_box">30元</span>
                  <span class="price_box">15元</span>
                </div>
              </div>
              <div class="overView_item_larger">
                <p class="overView_item_title"> <img src="@/assets/images/xiajiang.png" /> 最低价格：  </p>
                <div class="select_name">
                  <span class="name_box">牛肉</span>
                  <span class="name_box">羊肉</span>
                  <span class="name_box">猪肉</span>
                </div>
                <div class="price_high">
                  <span class="price_box">37元</span>
                  <span class="price_box">30元</span>
                  <span class="price_box">15元</span>
                </div>
              </div>
            </div>
            <div class="tableArea">
              <!-- 根据selectedIndex的值显示对应的表格 -->
              <div v-if="selectedIndex_5 === 0" class="tables">
                <MarketLineChart_multiArea></MarketLineChart_multiArea>
              </div>
              <div v-if="selectedIndex_5 === 1" class="tables">
                <MarketStickChart_multiArea></MarketStickChart_multiArea>
              </div>
              <div v-if="selectedIndex_5 === 2" class="tables">
                <MarketRadarChart_multiArea></MarketRadarChart_multiArea>
              </div>
              <div class="icon_container">
                <!-- 使用ref来引用图标元素 -->
                <img class="tableImg"
                     v-for="(icon, index) in icons_2"
                     :key="index"
                     :src="icon"
                     :ref="`iconRef${index}`"
                     @click="selectTable_5(index)"
                     :style="{
                                  filter: selectedIndex_5 === index ? 'none' : 'brightness(3) grayscale(100%)' ,
                                  cursor: 'pointer'
                                  }"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
    </el-tabs>
</template>

<style lang="scss">
.el-tabs__item {
    padding: 0 40px;
    height: var(--el-tabs-header-height);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    font-size: var(--el-font-size-base);
    font-weight: bold;
    color: var(--el-text-color-primary);
    position: relative;
    width: auto;
}
.content{
    display: flex;
    width: 90%;
    margin: 0 auto;
    padding-top: 20px;
}
.overView{
    width: 200px;
    min-height: 400px;
    background-color: #fff;
    box-shadow: 1px 2px 16px 0 rgba(6,0,1,.04);
    border-radius: 6px;
    box-sizing: border-box;
    padding: 0 10px;
}
.overView_title{
    width: 200px;
    height: 46px;
    text-align: center;
    background-color: #37cba3;
    border-radius: 6px 6px 0 0;
    font-size: 18px;
    font-weight: normal;
    line-height: 46px;
    color: #fff;
    margin-left: -10px;
}
.overView_item{
    border-bottom: 1px dashed #ddd;
    min-height: 100px;
    box-sizing: border-box;
    padding: 0 10px;
}
.overView_item_larger{
    border-bottom: 1px dashed #ddd;
    min-height: 140px;
    box-sizing: border-box;
    padding: 0 10px;
}
.overView_item_title{
    text-align: center;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-size: 16px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0;
    color: #333;
}
p img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    background: transparent;
}
.tableImg{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    background: transparent;
}
.overView_item_text{
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0;
    color: #666;
    text-align: center;
}
.font_red{
    font-size: 22px;
    color: #c50b03;
}
.select_name{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.price_high{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.name_box{
  color: #777;
    display: block;
    width: 110px;
    height: 24px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    line-height: 24px;
}
.price_box{
    line-height: 50px;
    font-size: 14px;
    color: #777;
    text-align: center;
    display: block;
    width: 110px;
    text-overflow: ellipsis;
}
.tableArea{
    position: relative;
    width: 100%;
    height: 494px;
    margin: 0 0 0 30px;
    background-color: #fef8ef;
}
.tables{
    width: 95%;
    height: 494px;
}
.icon_container{
    display: grid;
    grid-template-columns: 1fr; /* 一个列，使子项竖直排列 */
    grid-gap: 30px;
    position: absolute;
    right: 0;
    top: 60px;
}

// 第一个标签页
.firstTab_kind{
  margin-left: 35px;
  margin-top: 15px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
  margin-right: 50px;
}
.timeSelect{
  display: flex;
  justify-content: center;
  margin-top: 15px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
  margin-right: 50px;
} // 时间选择器
.select_title{
  margin-top: 1px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.smallQueryBox{
  padding-top: 15px;
  padding-left: 40px;
  padding-right: 10px;
}

//第二个标签页
.secondTab{
  display: flex;
  justify-content: center;
  margin-left: 10px;
  margin-top: 15px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
  margin-right: 10px;
}
.secondTab_title {
  margin-top: 3px;
  margin-right: 3px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
}
.secondTimeSelect{
  display: flex;
  justify-content: center;
  margin-top: 15px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
  margin-right: 30px;
  margin-left: 15px;
}

//第三个标签页
.thirdTab{
  display: flex;
  justify-content: center;
  margin-left: 10px;
  margin-top: 16px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
  margin-right: 0px;
}
.thirdTab_title{
  margin-top: 3px;
  margin-right: 2px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
}
.thirdTimeSelect{
  display: flex;
  justify-content: center;
  margin-top: 15px;
  font-size: 18px;
  font-weight: normal;
  color: #615551;
  margin-left: 10px;
}
.thirdTab_search_1{
  display: flex;
  justify-content: center;
}
.thirdTab_search_2{
  display: flex;
  justify-content: center;
}
.searchBar_p3{
  display: flex;
  flex-direction: column; /* 垂直方向排列子元素 */
  justify-content: center; /* 在垂直方向上居中对齐子元素 */
  align-content: center;
}


</style>