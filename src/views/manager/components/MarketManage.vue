<script setup>
import{ref,onMounted} from 'vue'
import axios from 'axios';
import {baseUrl} from "@/main";
import { InfoFilled } from '@element-plus/icons-vue'

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
];//所有可选省市
const selectedMarket = ref('');
const form = ref({
  province:'',
  market:''
    }
)
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);
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
}//按省市获取市场（可不选省市，即为拉取所有市场）

const add = async () =>{
  addDialogVisible.value = true;
  form.value.market = '';
  form.value.province = '';
}//打开添加

const handleEdit = (row) =>{
  selectedMarket.value = row.market;
  form.value.province = row.province;
  form.value.market = row.market;
  editDialogVisible.value = true;
}//打开编辑
const handleDelete = async (row) => {
  try{
    await axios.delete(`${baseUrl}/dropDownBox/markets/${row.province}/${row.market}`);
  }catch(error){
    console.log("删除市场失败",error)
  }
  await searchMarket();
}//删除
const onSubmit = async () => {
  try{
    await axios.post(`${baseUrl}/dropDownBox/markets/edit/${selectedMarket.value}/${form.value.market}/${form.value.province}`);
  }catch (error){
    console.log("修改市场失败",error);
  }
  editDialogVisible.value = false;
  await searchMarket();
}//编辑提交

const onAdd = async () => {
  try{
    await axios.post(`${baseUrl}/dropDownBox/markets/${form.value.province}/${form.value.market}`)
  }catch (error){
    console.log("添加市场失败",error);
  }
  addDialogVisible.value = false;
  await searchMarket();
}//添加提交

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
          <a class="app-sidebar-link" @click="add">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </a>
            <el-dialog v-model="addDialogVisible" title="添加">
              <el-form :model="form">
                <el-form-item label="省市:">
                  <el-select v-model="form.province" class="m-2" placeholder="请选择">
                    <el-option
                        v-for="item in options_province"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="市场名称:">
                  <el-input style="width: 300px" v-model="form.market" />
                </el-form-item>
              </el-form>
              <template #footer>
            <span class="dialog-footer">
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="onAdd">
              确认
            </el-button>
            </span>
              </template>
            </el-dialog>
        </div>
    </div>
    <div class="ManageTable">
      <el-table :data="searchMarketValue" style="width: 960px;max-width: 100%;height: 100%;">
          <el-table-column prop="province" label="省市" width="230px" style="color: #aaa;"/>
          <el-table-column prop="market" label="市场" width="430px" />
          <el-table-column fixed="right" label="选项" width="300px">
          <template #default="scope">
              <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-popconfirm
                  width="220"
                  confirm-button-text="OK"
                  cancel-button-text="Cancel"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="确定要删除本条数据？"
                  @confirm="handleDelete(scope.row)"
              >
                <template #reference>
                  <el-button link type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
          </template>
          </el-table-column>
      </el-table>
      <el-dialog v-model="editDialogVisible" title="编辑">
        <el-form :model="form">
          <el-form-item label="省市:">
            <el-select v-model="form.province" class="m-2" placeholder="请选择">
              <el-option
                  v-for="item in options_province"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="市场名称:">
            <el-input style="width: 300px" v-model="form.market" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit">
            确认
          </el-button>
          </span>
        </template>
      </el-dialog>
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
.el-button:hover, .el-button:focus {
    color: white;
    border-color: #05354b;
    background-color: #05354b;
    outline: none;
}
.el-button--primary {
    --el-button-text-color: #05354b;
    --el-button-bg-color: white;
    --el-button-border-color: #05354b;
    --el-button-outline-color: var(--el-color-primary-light-5);
    --el-button-active-color: #05354b;
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-link-text-color: var(--el-color-primary-light-5);
    --el-button-hover-bg-color: var(--el-color-primary-light-3);
    --el-button-hover-border-color: var(--el-color-primary-light-3);
    --el-button-active-bg-color: var(--el-color-primary-dark-2);
    --el-button-active-border-color: var(--el-color-primary-dark-2);
    --el-button-disabled-text-color: var(--el-color-white);
    --el-button-disabled-bg-color: var(--el-color-primary-light-5);
    --el-button-disabled-border-color: var(--el-color-primary-light-5);
}
</style>