import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Manage from '@/views/manager/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import DataQuery from '@/views/DataQuery/index.vue'
import MarketInfo from '@/views/MarketInfo/index.vue'
import AnalysisForecast from '@/views/AnalysisForecast/index.vue'
import Market from '@/views/manager/components/MarketManage.vue'
import Variety from '@/views/manager/components/VarietyManage.vue'
import Link from '@/views/manager/components/LinkManage.vue'
import Daily from '@/views/manager/components/DailyManage.vue'
import Monthly from '@/views/manager/components/WeeklyManage.vue'
import Forecast from '@/views/manager/components/ForecastManage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component: Layout,
      children:[
        {
          path:'',
          component: Home//首页
        },
        {
          path:'dataQuery',
          component: DataQuery//数据查询
        },
        {
          path:'marketInfo',
          component: MarketInfo//市场行情
        },
        {
          path:'analysisForecast',
          component: AnalysisForecast//分析预测
        },
      ]
    },
    {
      path:'/login',
      component: Login,//登录
    },
    {
      path:'/manage',//管理员
      component: Manage,
      children:[
        {
          path:'',
          component: Market//市场更改
        },
        {
          path:'/manage/variety',
          component: Variety//品种更改
        },
        {
          path:'/manage/link',
          component: Link//链接更改
        },
        {
          path:'/manage/daily',
          component: Daily//日报更改
        },
        {
          path:'/manage/monthly',
          component: Monthly//周报更改
        },
        {
          path:'/manage/forecast',
          component: Forecast//预测报告更改
        },
      ]
    }
  ]
})

export default router
