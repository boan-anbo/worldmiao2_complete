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


// console.log("Console.log is enabled: ", process.env.VUE_APP_CONSOLE_ENABLED)
if (process.env.VUE_APP_CONSOLE_ENABLED !== 'true') {
    console.log = function () {};
} else {
    console.log('book search api:', process.env.VUE_APP_SEARCH_API)
    console.log('book fetch api:', process.env.VUE_APP_FETCH_API)
}

