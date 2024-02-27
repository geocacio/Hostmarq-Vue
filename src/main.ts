import "bootstrap/dist/css/bootstrap.min.css"
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/sass/styles.scss'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Multiselect from 'vue-multiselect';

const app = createApp(App)
app.component('multiselect', Multiselect);

app.use(createPinia())
app.use(Toast);
app.use(router)

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
