<script setup>
import{ref,onMounted} from 'vue'
import axios from 'axios';
import {baseUrl} from "@/main";
import {InfoFilled} from "@element-plus/icons-vue";

const allPredictReport = ref([]);
const selectedTitle = ref('');
const form = ref({
      date:'',
      passage:'',
      source:'',
      title:''
    }
)
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);

const searchLink = async () => {
  try{
    const response = await axios.get(`${baseUrl}/predict/predictReports`);
    allPredictReport.value = response.data.data;
    console.log(allPredictReport.value)
  }catch(error){
    console.log('获取省市数据失败',error)
  }
}//获取所有预测报告

const add = async () =>{
  addDialogVisible.value = true;
  form.value.market = '';
  form.value.province = '';
}//添加打开

const handleEdit = (row) =>{
  selectedTitle.value = row.title;
  form.value.title = row.title;
  form.value.passage = row.passage;
  form.value.date = row.date;
  form.value.source = row.source
  editDialogVisible.value = true;
}//编辑弹窗打开
const handleDelete = async (row) => {
  try{
    await axios.delete(`${baseUrl}/predict/predictReports/${row.title}`);
  }catch(error){
    console.log("删除市场失败",error)
  }
  await searchLink();
}//删除
const onSubmit = async () => {
  try{
    await axios.post(`${baseUrl}/predict/predictReports/edit/${selectedTitle.value}`,form.value)
  }catch (error){
    console.log("修改市场失败",error);
  }
  editDialogVisible.value = false;
  await searchLink();
}//编辑提交

const onAdd = async () => {
  console.log("调用添加函数");
  try{
    await axios.post(`${baseUrl}/predict/predictReports`,form.value)
  }catch (error){
    console.log("添加链接失败",error);
  }
  addDialogVisible.value = false;
  await searchLink();
}//添加提交

onMounted(() => {
  searchLink();
})
</script>
<template>
  <div class="ManageSearchBar">
    <div class="addButton">
      <el-button type="success" @click="add">添加</el-button>
      <el-dialog v-model="addDialogVisible" title="添加">
        <el-form :model="form">
          <el-form-item label="标题:">
            <el-input style="width: 300px" v-model="form.title" />
          </el-form-item>
          <el-form-item label="日期:">
            <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期"
                :size="'default'"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="来源:">
            <el-input style="width: 300px" v-model="form.source" />
          </el-form-item>
          <el-form-item label="内容:">
            <el-input style="width: 500px" :rows="5" type="textarea" v-model="form.passage" />
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
    <el-table :data="allPredictReport" style="width: 960px;max-width: 100%;height: 100%;">
      <el-table-column prop="title" label="标题" width="220px" style="color: #aaa;"/>
      <el-table-column prop="date" label="日期" width="130px" />
      <el-table-column prop="source" label="来源" width="130px" />
      <el-table-column prop="passage" label="内容" width="400px" >
        <template #default="{ row }">
          <div class="ellipsis-text">{{ row.passage }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="选项" width="80px">
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
        <el-form-item label="标题:">
          <el-input style="width: 300px" v-model="form.title" />
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              :size="'default'"
              value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="来源:">
          <el-input style="width: 300px" v-model="form.source" />
        </el-form-item>
        <el-form-item label="内容:">
          <el-input style="width: 500px" :rows="5" type="textarea" v-model="form.passage" />
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
</style>