import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import DataQuery from '@/views/DataQuery/index.vue'
import MarketInfo from '@/views/MarketInfo/index.vue'
import AnalysisForecast from '@/views/AnalysisForecast/index.vue'

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
    }
  ]
})

export default router
