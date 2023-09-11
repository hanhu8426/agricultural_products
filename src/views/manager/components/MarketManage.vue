<script setup>
import{ref,onMounted} from 'vue'
import axios from 'axios';
import {baseUrl} from "@/main";

const searchMarketValue = ref([]);
const selectedProvince = ref('');
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
];
const handleProvinceChange = () => {
}
const searchMarket = async () => {
    try{
        const response = await axios.get(`${baseUrl}/dropDownBox/marketsAll`,{
            params:{
                province: selectedProvince.value[0]
            }
        });
        searchMarketValue.value = response.data.data;
        console.log(searchMarketValue.value)
    }catch(error){
        console.log('获取省市数据失败',error)
    }
}

onMounted(() => {
    searchMarket();
})
</script>
<template>
    <div class="ManageSearchBar">
        <div class="select_left">
            <el-cascader
                v-model="selectedProvince"
                :options="options_province"
                @change="handleProvinceChange"
                placeholder="请选择省市"
            />
            <el-button type="info" style="margin-left: 10px;" @click="searchMarket">查询</el-button>
        </div>
        <div class="addButton">
            <el-button type="success">添加</el-button>
        </div>
    </div>
    <div class="ManageTable">
        <el-table :data="searchMarketValue" style="width: 960px;max-width: 100%;height: 518px;">
            <el-table-column prop="province" label="省市" width="230px" style="color: #aaa;"/>
            <el-table-column prop="market" label="市场" width="430px" />
            <el-table-column fixed="right" label="选项" width="300px">
            <template #default>
                <el-button link type="primary" size="small" @click="handleClick"
                >编辑</el-button
                >
                <el-button link type="primary" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style>
.ManageSearchBar{
    width: 960px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 20px;
}
.ManageTable{
    height: 518px;
    width: 960px;
    margin: 0 20px;
}
.select_left{
    display: flex;
}
.el-table.is-scrolling-none th.el-table-fixed-column--left, .el-table.is-scrolling-none th.el-table-fixed-column--right {
    background-color: #37cba3 !important;
}
.el-table__body-wrapper tr td.el-table-fixed-column--right{
  background-color: #f5fdfb !important
}
.el-button--primary.is-plain, .el-button--primary.is-text, .el-button--primary.is-link {
    --el-button-text-color: #545c64;
    --el-button-bg-color: var(--el-color-primary-light-9);
    --el-button-border-color: var(--el-color-primary-light-5);
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-bg-color: var(--el-color-primary);
    --el-button-hover-border-color: var(--el-color-primary);
    --el-button-active-text-color: #545c64
}
.el-button.is-link:hover, .el-button.is-link:focus {
    color: #545c64;
}
</style>