<script setup>
import{ref,onMounted} from 'vue'
import axios from 'axios';
import {baseUrl} from "@/main";
import {InfoFilled} from "@element-plus/icons-vue";

const searchLinkValue = ref([]);
const selectedLink = ref('');
const form = ref({
      link:'',
      linkName:''
    }
)
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);

const searchLink = async () => {
  try{
    const response = await axios.get(`${baseUrl}/links`);
    searchLinkValue.value = response.data.data;
    console.log(searchLinkValue.value)
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
  selectedLink.value = row.linkName;
  form.value.linkName = row.linkName;
  form.value.link = row.link;
  editDialogVisible.value = true;
}
const handleDelete = async (row) => {
  try{
    await axios.delete(`${baseUrl}/links/${row.linkName}`);
  }catch(error){
    console.log("删除市场失败",error)
  }
  await searchLink();
}
const onSubmit = async () => {
  try{
    await axios.post(`${baseUrl}/links/edit/${selectedLink.value}`,form.value)
  }catch (error){
    console.log("修改市场失败",error);
  }
  editDialogVisible.value = false;
  await searchLink();
}

const onAdd = async () => {
  console.log("调用添加函数");
  try{
    await axios.post(`${baseUrl}/links/add`,form.value)
  }catch (error){
    console.log("添加链接失败",error);
  }
  addDialogVisible.value = false;
  await searchLink();
}

onMounted(() => {
  searchLink();
})
</script>
<template>
  <div class="ManageSearchBar_link">
    <div class="addButton">
      <a class="app-sidebar-link" @click="add">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </a>
      <el-dialog v-model="addDialogVisible" title="添加">
        <el-form :model="form">
          <el-form-item label="链接名称:">
            <el-input style="width: 300px" v-model="form.linkName" />
          </el-form-item>
          <el-form-item label="链接地址:">
            <el-input style="width: 300px" v-model="form.link" />
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
    <el-table :data="searchLinkValue" style="width: 960px;max-width: 100%;height: 100%;">
      <el-table-column prop="linkName" label="链接名称" width="300px" style="color: #aaa;"/>
      <el-table-column prop="link" label="链接地址" width="430px" />
      <el-table-column fixed="right" label="选项" width="230px">
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
        <el-form-item label="链接名称:">
          <el-input style="width: 300px" v-model="form.linkName" />
        </el-form-item>
        <el-form-item label="链接地址:">
          <el-input style="width: 300px" v-model="form.link" />
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
.ManageSearchBar_link{
  width: 960px;
  height: 40px;
  display: flex;
  justify-content: right;
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
</style>