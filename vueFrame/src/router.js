import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import startMain from './modules/appStart/startMain/startMain/startMain.js';
import Home from '../src/modules/components/home/home.js';
import tableMain from '../src/modules/components/tableMain/tableMain/tableMain.js';
import Index from '../src/modules/components/index/indexMain/index.js';
import loginMain from '../src/modules/components/login/loginMain/loginMain.js';
const routes = [
    {
        path: '/',redirect:"/login", component: loginMain,
    },
    {
        path: '/login', component: loginMain,
    },
    { path: '/zl', redirect:"/zl/home", component: startMain,
        children: [
            {
                path: '/zl/home',
                component: Home
            },
            {
                path: '/zl/table',
                component:tableMain
            },
            {
                path: '/zl/tab',
                component:Index
            }
        ]
    }

]


const router = new VueRouter({
    routes
})

export default router;