<script setup>
import { ref } from 'vue'
const activeName = ref('first')
const activeButton = ref('日度'); // 初始选中按钮
const handleButtonClick = (button) => {
  activeButton.value = button;
};

const tableData = [
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
]
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
          <el-table :data="tableData" height="400" class="custom-table">
            <el-table-column prop="date" label="时间" width="180" />
            <el-table-column prop="name" label="农产品批发价格200指数"  />
            <el-table-column prop="address" label="‘菜篮子’产品批发价格200指数"/>
            <el-table-column prop="address" label="粮油产品批发价格200指数"/>
          </el-table>
        </div>

        <div class="map">
          <div class="topTitle">
            <p class="underline-text">
              农业农村部”农产品批发价格200指数“{{activeButton}}走势图
            </p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全国批发市场价格行情" name="second" strech="true">Price</el-tab-pane>
  </el-tabs>
</template>

<style  lang="scss">
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
  padding-bottom: 30px;
}

.el-button + .el-button {
  margin-left: 0px;
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
.map{
  background-color: #f5fdfb;
}
</style>