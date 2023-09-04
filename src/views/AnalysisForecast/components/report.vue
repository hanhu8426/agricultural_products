<script setup>
import { ref, onMounted,computed } from 'vue'
const activeName = ref('first')

// 分页展示日周度报告
const currentPage = ref(1); // 当前页码
const pageSize = ref(3); // 每页显示数量
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
onMounted(() => {

});
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" >
    <el-tab-pane label="日度报告" name="first" strech="true" >
      <!--报告的边框-->
      <div class="report_border" v-for="item in displayedData" :key="item.id">
      <!--报告的内容（三条）-->
        <div class="report_item">
          <!--左侧日历栏 -->
          <div class="date">

          </div>
          <!-- 右侧标题和内容-->
          <div class="content">
            <div class="content_title">
              <div class="title">

              </div>
              <div class="source">

              </div>
            </div>
            <div class="content_main">

            </div>
          </div>
        </div>
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
    <el-tab-pane label="周度报告" name="second" strech="true">
      <!--报告的边框-->
      <div class="report_border" v-for="item in displayedData" :key="item.id">
        <!--报告的内容（三条）-->
        <div class="report_item">
          <!--左侧日历栏 -->
          <div class="date">

          </div>
          <!-- 右侧标题和内容-->
          <div class="content">
            <div class="content_title">
              <div class="title">

              </div>
              <div class="source">

              </div>
            </div>
            <div class="content_main">

            </div>
          </div>
        </div>
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

<style scoped lang="scss">
.report_item{
  height: 100px;
  width: 100%;
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
  width: calc(100% - 80px);
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
  line-height: 22px;
  letter-spacing: 1px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
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

</style>