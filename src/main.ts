// import './assets/main.css'

// import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue, { createApp } from '@vue/compat'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
Vue.use(BootstrapVue)
app.use(createPinia())
app.use(router)

app.mount('#app')
