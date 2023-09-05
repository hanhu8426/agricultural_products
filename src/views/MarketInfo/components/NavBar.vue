<script setup>
import { ref } from 'vue'
import MarketLineChartVue from './MarketLineChart.vue';
import MarketStickChart from './MarketStickChart.vue';
import MarketPieChart from './MarketPieChart.vue';
import MarketLineChart_area from './MarketLineChart_area.vue';
import MarketStickChart_area from './MarketStickChart_area.vue';
import MarketPieChart_area from './MarketPieChart_area.vue';
import zhexiantu from '@/assets/images/zhexiantu-xianxing.png'
import zhuzhuangtu from '@/assets/images/stick.png'
import bingtu from '@/assets/images/tubiao-bingtu.png'
const activeName = ref('first')
const selectedMarket = ref([]);
const selectedProduct = ref([]);
const props = {
  expandTrigger: 'hover'
};
const selectedIndex = ref(0); // 默认选中第一个图标
const selectedIndex_2 = ref(0); // 默认选中第一个图标

const icons = [
  zhexiantu, // 本地PNG图片的相对路径
  zhuzhuangtu,
  bingtu,
];

const selectTable = (index) => {
  // 切换选中状态
  selectedIndex.value = index;
};
const selectTable_2 = (index) => {
  // 切换选中状态
  selectedIndex_2.value = index;
};
const options_product = [
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
]
const handleMarketChange = () => {

}
const handleProductChange = () => {
}
</script>

<template>
    <el-tabs v-model="activeName" class="demo-tabs" >
        <el-tab-pane label="单一品种全国平均价" name="first" >
            <div class="searchBar">
                <div class="firstSelect">
                    品种大类:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_product"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种小类:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
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
                        <p class="overView_item_title"> <img src="@/assets/images/shangsheng.png" /> 最高价格： <span class="font_red">37元</span> </p>
                        <p class="overView_item_text">新疆焉耆县光明农副产品综合批发市场</p>
                        <p class="overView_item_text">2023/08--2023/09</p>
                    </div>
                    <div class="overView_item_larger">
                        <p class="overView_item_title"> <img src="@/assets/images/xiajiang.png" /> 最低价格 <span class="font_red">37元</span> </p>
                        <p class="overView_item_text">新疆焉耆县光明农副产品综合批发市场</p>
                        <p class="overView_item_text">2023/08--2023/09</p>
                    </div>
                </div>
                <div class="tableArea">
                    <!-- 根据selectedIndex的值显示对应的表格 -->
                    <div v-if="selectedIndex === 0" class="tables">
                        <MarketLineChartVue></MarketLineChartVue>
                    </div>
                    <div v-if="selectedIndex === 1" class="tables">
                        <MarketStickChart></MarketStickChart>
                    </div>
                    <div v-if="selectedIndex === 2" class="tables">
                        <MarketPieChart></MarketPieChart>
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
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
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
                        <p class="overView_item_title"> <img src="@/assets/images/shangsheng.png" /> 最高价格： <span class="font_red">37元</span> </p>
                        <p class="overView_item_text">新疆焉耆县光明农副产品综合批发市场</p>
                        <p class="overView_item_text">2023/08--2023/09</p>
                    </div>
                    <div class="overView_item_larger">
                        <p class="overView_item_title"> <img src="@/assets/images/xiajiang.png" /> 最低价格 <span class="font_red">37元</span> </p>
                        <p class="overView_item_text">新疆焉耆县光明农副产品综合批发市场</p>
                        <p class="overView_item_text">2023/08--2023/09</p>
                    </div>
                </div>
                <div class="tableArea">
                    <!-- 根据selectedIndex的值显示对应的表格 -->
                    <div v-if="selectedIndex_2 === 0" class="tables">
                        <MarketLineChart_area></MarketLineChart_area>
                    </div>
                    <div v-if="selectedIndex_2 === 1" class="tables">
                        <MarketStickChart_area></MarketStickChart_area>
                    </div>
                    <div v-if="selectedIndex_2 === 2" class="tables">
                        <MarketPieChart_area></MarketPieChart_area>
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
            <div class="searchBar">
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="单一品种多市场对比" name="forth" >
            <div class="searchBar">
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="单一品种多地区对比" name="fifth" >
            <div class="searchBar">
                <div class="firstSelect">
                    批发市场:
                    <el-cascader
                        v-model="selectedMarket"
                        :options="options_market"
                        :props="props"
                        @change="handleMarketChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="firstSelect">
                    品种名称:
                    <el-cascader
                        v-model="selectedProduct"
                        :options="options_product"
                        :props="props"
                        @change="handleProductChange"
                        placeholder="请选择"
                    />
                </div>
                <div class="queryBox">
                    <el-button class="queryButton" type="success" plain @click="handleQuery">查询</el-button>
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
    font-family: MicrosoftYaHei;
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
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-family: MicrosoftYaHei;
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
    font-family: MicrosoftYaHei;
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

</style>