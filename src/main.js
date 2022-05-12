// eslint-disable-next-line
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosInstance from '@/plugins/axios.js'
import VueAxios from 'vue-axios'
import store from './store'
import Notifications from '@kyvg/vue3-notification'
store.$axios = axiosInstance
console.log(store)
import '@/assets/css/nullStyle.css'
import '@/assets/css/main.css'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(Notifications)
app.use(VueAxios, axiosInstance)
app.mount('#app')
