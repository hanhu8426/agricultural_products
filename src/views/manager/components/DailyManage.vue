<script setup>
import{ref,onMounted} from 'vue'
import axios from 'axios';
import {baseUrl} from "@/main";

const DailyReportValue = ref([]);
const selectedDate = ref('');
const date = ref('');
const form = ref({
      thatDate:'',
      source:'',
      content:'',
      title:'',
    }
)
// 处理时间格式
function formatDates(dateStrings) {
  const originalDate = new Date(dateStrings);

// 提取年、月和日
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // +1 因为月份是从0开始的
  const day = originalDate.getDate().toString().padStart(2, '0');

// 创建新的格式化日期字符串
  return `${year}-${month}-${day}`;
}

const editDialogVisible = ref(false);
const searchDailyReport = async () => {
  const time = formatDates(selectedDate.value);
  console.log(time);
  try{
    const response = await axios.get(`${baseUrl}/dailyPaper/${time}`);
    DailyReportValue.value = [];
    DailyReportValue.value.push(response.data.data);
    console.log(DailyReportValue.value)
  }catch(error){
    console.log('获取日报数据失败',error)
  }
}

const handleEdit = (row) =>{
  date.value = row.thatDate;
  form.value.content = row.content;
  form.value.title = row.title;
  form.value.thatDate = row.thatDate;
  form.value.source = row.source;
  editDialogVisible.value = true;
}

const onSubmit = async () => {
  try{
    await axios.post(`${baseUrl}/dailyPaper/edit/${date.value}`,form.value)
  }catch (error){
    console.log("修改日报失败",error);
  }
  editDialogVisible.value = false;
  await searchDailyReport();
}

const fetchDailyReport = async () => {
  try{
    const response = await axios.get(`${baseUrl}/dailyPaper/all`);
    DailyReportValue.value = response.data.data;
    console.log(DailyReportValue.value)
  }catch(error){
    console.log('获取全部日报数据失败',error)
  }
}
onMounted(() => {
  fetchDailyReport();
})
</script>
<template>
  <div class="ManageSearchBar">
    <div class="select_left">
      <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="选择日期"
          :size="'default'"
      />
      <el-button type="info" style="margin-left: 10px;" @click="searchDailyReport">查询</el-button>
    </div>
  </div>
  <div class="ManageTable">
    <el-table :data="DailyReportValue" style="width: 960px;max-width: 100%;height: 100vh;background: none!important;;">
      <el-table-column prop="title" label="标题" width="200px" style="color: #aaa;"/>
      <el-table-column prop="thatDate" label="日期" width="130px" />
      <el-table-column prop="source" label="来源" width="130px" />
      <el-table-column prop="content" label="内容" width="400px" >
        <template #default="{ row }">
          <div class="ellipsis-text">{{ row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="选项" width="80px">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="editDialogVisible" title="编辑">
      <el-form :model="form">
        <el-form-item label="标题:">
          <el-input style="width: 300px" v-model="form.title" />
        </el-form-item>
        <el-form-item label="来源:">
          <el-input style="width: 300px" v-model="form.source" />
        </el-form-item>
        <el-form-item label="日期:">
          <el-input style="width: 300px" v-model="form.thatDate" />
        </el-form-item>
        <el-form-item label="内容:">
          <el-input style="width: 500px" :rows="5" type="textarea" v-model="form.content" />
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
.multiline-input {
  white-space: pre-wrap;
}
.ellipsis-text {
  white-space: nowrap;      /* 阻止文本换行 */
  overflow: hidden;         /* 隐藏溢出内容 */
  text-overflow: ellipsis;  /* 显示省略号 */
  max-width: 400px;         /* 可选：设置最大宽度以限制文本展示的宽度 */
}
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