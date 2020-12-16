import {createApp} from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import {Button, Col, Layout, Row} from "ant-design-vue";
// @ts-ignore
import * as axios from 'axios';
import './index.css'
import VueAxios from "vue-axios";
// @ts-ignore
createApp(App)
    .use(VueAxios, axios)
    .use(Button)
    .use(Row)
    .use(Col)
    .use(Layout)
    .mount('#app')
