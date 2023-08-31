import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import DataQuery from '@/views/DataQuery/index.vue'
import Index200 from '@/views/DataQuery/200index/index.vue'
import PriceQuotes from '@/views/DataQuery/priceQuotes/index.vue'

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
          path:'category',
          component: Category
        },
        {
          path:'dataQuery',
          component: DataQuery,
          children:[
            {
              path:'',
              component:Index200
            },
            {
              path:'/priceQuotes',
              component:PriceQuotes
            },
          ]
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
