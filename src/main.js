import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'
import '@/styles/index.scss'

// import {getCategory} from '@/apis/api'
// getCategory().then(res=>{
//     console.log(res)
// })
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

export const baseUrl = 'http://10.203.133.115:8081';
