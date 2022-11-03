import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './local';
import 'element-plus/theme-chalk/dark/css-vars.css'


createApp(App).use(store).use(i18n).mount('#app')
