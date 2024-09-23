import { createApp } from 'vue'
import { createPinia } from 'pinia';

import './style.css'
import App from './App.vue'
// Create a Pinia instance
const pinia = createPinia();

createApp(App).use(pinia).mount('#app')
