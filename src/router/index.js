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
import Monthly from '@/views/manager/components/MonthlyManage.vue'
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
          component: Home
        },
        {
          path:'dataQuery',
          component: DataQuery
        },
        {
          path:'marketInfo',
          component: MarketInfo
        },
        {
          path:'analysisForecast',
          component: AnalysisForecast
        },
      ]
    },
    {
      path:'/login',
      component: Login,
    },
    {
      path:'/manage',
      component: Manage,
      children:[
        {
          path:'',
          component: Market
        },
        {
          path:'/manage/variety',
          component: Variety
        },
        {
          path:'/manage/link',
          component: Link
        },
        {
          path:'/manage/daily',
          component: Daily
        },
        {
          path:'/manage/monthly',
          component: Monthly
        },
        {
          path:'/manage/forecast',
          component: Forecast
        },
      ]
    }
  ]
})

export default router
