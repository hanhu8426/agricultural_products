<script setup>
import{ref,onMounted} from 'vue'
import axios from 'axios';
import {baseUrl} from "@/main";

const searchProductValue = ref([]);
const selectedProduct = ref('');
const options_product = [
  {
    value: '粮食',
    label: '粮食 ',
    children: [
      {
        value: '谷物',
        label: '谷物'
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
];
const selectedThirdVariety = ref('');
const form = ref({
      variety:[],
      product:''
    }
)
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);
const handleProductChange = () => {
}

const searchProduct = async () => {
  try{
    const response = await axios.get(`${baseUrl}/dropDownBox/varietisAll`,{
      params:{
        secondVariety: selectedProduct.value[1]
      }
    });
    searchProductValue.value = response.data.data;
    console.log(searchProductValue.value)
  }catch(error){
    console.log('获取省市数据失败',error)
  }
}

const add = async () =>{
  addDialogVisible.value = true;
  form.value.market = '';
  form.value.province = '';
}

const handleEdit = (row) =>{
  selectedThirdVariety.value = row.thirdVariety;
  form.value.variety[0] = row.firstVariety;
  form.value.variety[1] = row.secondVariety;
  form.value.product = row.thirdVariety;
  editDialogVisible.value = true;
}
const handleDelete = async (row) => {
  try{
    await axios.delete(`${baseUrl}/dropDownBox/variety/${row.thirdVariety}`);
  }catch(error){
    console.log("删除品种失败",error)
  }
  await searchProduct();
}
const onSubmit = async () => {
  try{
    await axios.post(`${baseUrl}/dropDownBox/variety/edit/${selectedThirdVariety.value}/
    ${form.value.variety[0]}/${form.value.variety[1]}/${form.value.product}`)
  }catch (error){
    console.log("修改品种失败",error);
  }
  editDialogVisible.value = false;
  await searchProduct();
}

const onAdd = async () => {
  try{
    await axios.post(`${baseUrl}/dropDownBox/variety/${form.value.variety[0]}/${form.value.variety[1]}/${form.value.product}`)
  }catch (error){
    console.log("添加品种小类失败",error);
  }
  addDialogVisible.value = false;
  await searchProduct();
  form.value.variety = [];
  form.value.product = '';
}

onMounted(() => {
  searchProduct();
})
</script>
<template>
  <div class="ManageSearchBar">
    <div class="select_left">
      <el-cascader
          v-model="selectedProduct"
          :options="options_product"
          @change="handleProductChange"
          placeholder="请选择产品种类"
      />
      <el-button type="info" style="margin-left: 10px;" @click="searchProduct">查询</el-button>
    </div>
    <div class="addButton">
      <el-button type="success" @click="add">添加</el-button>
      <el-dialog v-model="addDialogVisible" title="添加">
        <el-form :model="form">
          <el-form-item label="产品种类:">
            <el-cascader
                v-model="form.variety"
                :options="options_product"
                @change="handleProductChange"
                placeholder="请选择产品种类"
            />
          </el-form-item>
          <el-form-item label="品种小类">
            <el-input style="width: 300px" v-model="form.product" />
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
    <el-table :data="searchProductValue" style="width: 960px;max-width: 100%;height: 518px;">
      <el-table-column prop="firstVariety" label="品种大类" width="230px" style="color: #aaa;"/>
      <el-table-column prop="secondVariety" label="品种中类" width="230px" />
      <el-table-column prop="thirdVariety" label="品种小类" width="230px" />
      <el-table-column fixed="right" label="选项" width="200px">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="editDialogVisible" title="编辑">
      <el-form :model="form">
        <el-form-item label="产品种类:">
          <el-cascader
              v-model="form.variety"
              :options="options_product"
              @change="handleProductChange"
              placeholder="请选择产品种类"
          />
        </el-form-item>
        <el-form-item label="产品小类:">
          <el-input style="width: 300px" v-model="form.product" />
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
.el-table.is-scrolling-none th.el-table-fixed-column--left, .el-table.is-scrolling-none th.el-table-fixed-column--right {
  background-color: #f6eac5 !important;
}
.el-table__body-wrapper tr td.el-table-fixed-column--right{
  background-color: #faf6f2 !important
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
.el-button--success {
    --el-button-text-color: #05354b;
    --el-button-bg-color: var(--el-color-white);
    --el-button-border-color: #05354b;
    --el-button-outline-color: var(--el-color-success-light-5);
    --el-button-active-color: var(--el-color-success-dark-2);
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-link-text-color: var(--el-color-success-light-5);
    --el-button-hover-bg-color: var(--el-color-success-light-3);
    --el-button-hover-border-color: var(--el-color-success-light-3);
    --el-button-active-bg-color: var(--el-color-success-dark-2);
    --el-button-active-border-color: var(--el-color-success-dark-2);
    --el-button-disabled-text-color: var(--el-color-white);
    --el-button-disabled-bg-color: var(--el-color-success-light-5);
    --el-button-disabled-border-color: var(--el-color-success-light-5);
}
</style>