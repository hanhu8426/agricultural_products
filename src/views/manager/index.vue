<script setup>
import {
  Setting,
} from '@element-plus/icons-vue'
import {ref} from 'vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
</script>

<template>
  <div class="common-layout">
    <el-header style="border-bottom: 1px solid #545c64">
      <div class="title" style="font-size: 18px; display: flex">农产品市场数据分析平台后台管理
        <div style="display:flex;justify-content: center;">
          <el-avatar :size="30" :src="circleUrl" />
          <p style="font-size: 12px;padding-top: 6px">系统管理员</p>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <div class="header_right" >

      </div>
    </el-header>
    <el-container style="height: 100%">
      <el-aside width="200px">
        <el-col :span="12" style="width: 100%;max-width: 100%;min-height: 100%">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
              style="height: 598px"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><setting /></el-icon>
                <span>系统管理</span>
              </template>
                <el-menu-item index="1-1">市场管理</el-menu-item>
                <el-menu-item index="1-2">农产品种类管理</el-menu-item>
                <el-menu-item index="1-3">链接管理</el-menu-item>
                <el-menu-item index="1-4">日报管理</el-menu-item>
                <el-menu-item index="1-5">周报管理</el-menu-item>
                <el-menu-item index="1-6">预测报告管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<style>
.common-layout{
  width:1240px;
  height: 100%;
}
el-header{
  display: flex;
}
.title{
  padding-top: 18px;
  justify-content: space-between;
}
el-avatar{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>