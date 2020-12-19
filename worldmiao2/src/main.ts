import {createApp} from 'vue'
import App from './App.vue'
// @ts-ignore
import * as axios from 'axios';
import './index.css'
import VueAxios from "vue-axios";
// @ts-ignore
createApp(App)
    .use(VueAxios, axios)
    .mount('#app')
