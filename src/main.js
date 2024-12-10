import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Notifications from 'notiwind'

createApp(App)
  .use(Notifications)
  .mount('#app')
