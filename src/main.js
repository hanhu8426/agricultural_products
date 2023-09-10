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

<<<<<<< HEAD
export const baseUrl = 'http://192.168.140.109:8081';
=======
export const baseUrl = 'http://10.208.78.209:8081';
>>>>>>> 2aa4de3ee257158f7be17fc00b50c6d0283617dd
