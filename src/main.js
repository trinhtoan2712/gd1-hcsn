import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router"
import App from './App.vue'
import AssetList from './components/page/Assets/TheAssets.vue'
import Dashboard from './components/page/Dashboard/TheDashboard.vue'
import CustomerList from './components/page/Customer/TheCustomer.vue'
import BaseLoading from './components/base/BaseLoading.vue'
import BaseCombobox from './components/base/BaseCombobox.vue'
import BaseComboboxForm from './components/base/BaseComboboxForm.vue'
import VueSimpleContextMenu from 'vue-simple-context-menu'


const routers = [
    { path: "/assets", component: AssetList},
    { path: "/customer", component: CustomerList},
    { path: "/", component: Dashboard}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routers,
})

const app = createApp(App);
app.use(router).mount('#app');
app.component("BaseLoading", BaseLoading);
app.component("BaseCombobox", BaseCombobox);
app.component("BaseComboboxForm", BaseComboboxForm);
app.component('vue-simple-context-menu', VueSimpleContextMenu)

