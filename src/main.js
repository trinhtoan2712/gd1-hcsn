import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router"
import App from './App.vue'
import AssetList from './components/page/Assets/TheAssets.vue'
import Dashboard from './components/page/Dashboard/TheDashboard.vue'
import BaseLoading from './components/base/BaseLoading.vue'
import BaseCombobox from './components/base/BaseCombobox.vue'
import BaseComboboxForm from './components/base/BaseComboboxForm.vue'
import Login from './components/page/Login/TheLogin.vue'
import Home from './components/page/Home/TheHome.vue'
import {getCookie} from './components/common/TheCommon'
import {Host, NameCookie} from './components/common/TheConst'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import MasterDetail from './components/page/MasterDetail/TheMasterDetail.vue'

// const routers = [
//     { path: "/assets", component: AssetList},
//     { path: "/customer", component: CustomerList},
//     { path: "/dashboard", component: Dashboard},
//     { path: "/", component: Login}
// ]
const routers = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
      path: '/login',
      name: '',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true }
        },
        {
          path: '/asset',
          name: 'Asset',
          component: AssetList,
          meta: { requiresAuth: true }
        },
        {
          path: '/increment',
          name: 'MasterDetail',
          component: MasterDetail,
          meta: { requiresAuth: true }
        }
      ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes: routers,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !getCookie(NameCookie.NAME_AUTH)) {
    return {
      path: '/login',
    }
  }
})

// var AUTH_TOKEN ='Bearer ' + getCookie(NameCookie.NAME_TOKEN)
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = Host.BASE_URL;

axios.interceptors.request.use(
  config => {
    const token = getCookie(NameCookie.NAME_TOKEN);
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common['Authorization'] = auth;
    return config;
  },
  error => Promise.reject(error),
);


const app = createApp(App);
app.use(router).mount('#app');
app.use(VueCookies, { expire: '7d'})
app.component("BaseLoading", BaseLoading);
app.component("BaseCombobox", BaseCombobox);
app.component("BaseComboboxForm", BaseComboboxForm);
