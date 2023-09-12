<script setup>
import {
  CaretBottom,
  Setting,
} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {ref} from 'vue'
import { loadFull } from "tsparticles";

const options = {
      background: {
        color: {
          value: "#fef8ef",//粒子颜色
          opacity: 0.5,
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",//可用的click模式有: "push", "remove", "repulse", "bubble"。
          },
          onHover: {
            enable: true,
            mode: "grab",//可用的hover模式有: "grab", "repulse", "bubble"。
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: '#893448',
        },
        links: {
          color: '#893448',//'#dedede'。线条颜色。
          distance: 150,//线条长度
          enable: true,//是否有线条
          opacity: 0.5,//线条透明度。
          width: 1,//线条宽度。
        },
        collisions: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 2,//粒子运动速度。
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,//粒子数量。
        },
        opacity: {
          value: 0.5,//粒子透明度。
        },
        shape: {
          type: "none", //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: true,
    };
    const particlesInit = async engine => {
        await loadFull(engine);
};
const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
}

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const toMarket = () => {
  router.push('/manage');
}
const toVariety = () => {
  router.push('/manage/variety');
}
const toLink = () => {
  router.push('/manage/link');
}
const toDaily = () => {
  router.push('/manage/daily');
}
const toMonthly = () => {
  router.push('/manage/monthly');
}
const toForecast = () => {
  router.push('/manage/forecast');
}
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');

// 点击退出按钮进行退出
const router = useRouter();
const handleCommand = (command)=> {
  console.log(command);
  if (command === 'logout') {
    // 使用 Vue Router 的编程式导航跳转到另一个路由
    router.push('/login'); // 假设路由的名称是 'logout'
  }
}
</script>

<template>
  <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="options"
      />
  <div class="common-layout">
    <el-header style="background-color: #f3f3f3;">
      <div class="title" style="font-size: 18px; display: flex">农产品市场数据分析平台后台管理
        <div style="display:flex;justify-content: center;">
          <el-avatar :size="30" :src="circleUrl" />
          <el-dropdown trigger="click" style="font-size: 12px;padding-top: 6px; margin-left: 7px" @command="handleCommand">
            <span class="el-dropdown-link">
              系统管理员
              <el-icon class="el-icon--right"><caret-bottom /></el-icon>
            </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item class="clearfix" command="logout">
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
          </el-dropdown>
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
              default-active="1"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
              style="height: 100vh"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><setting /></el-icon>
                <span>系统管理</span>
              </template>
                <el-menu-item index="1-1" @click="toMarket">市场管理</el-menu-item>
                <el-menu-item index="1-2" @click="toVariety">农产品种类管理</el-menu-item>
                <el-menu-item index="1-3" @click="toLink">链接管理</el-menu-item>
                <el-menu-item index="1-4" @click="toDaily">日报管理</el-menu-item>
                <el-menu-item index="1-5" @click="toMonthly">周报管理</el-menu-item>
                <el-menu-item index="1-6" @click="toForecast">预测报告管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <RouterView>
        </RouterView>
      </el-main>
    </el-container>
  </div>
</template>

<style>
el-container {
  overflow: hidden;
}
.common-layout{
  width:1240px;
  height: 100vh;
  position: relative;
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
.el-dropdown__popper {
  --el-dropdown-menu-box-shadow: var(--el-box-shadow-light);
  --el-dropdown-menuItem-hover-fill: #545c64;
  --el-dropdown-menuItem-hover-color: white;
  --el-dropdown-menu-index: 10;
}

</style>