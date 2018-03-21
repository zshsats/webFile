import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import "./main.less";
import router from './router.js';

Vue.use(iView);

import "./service/ajaxPost.js"
import cook from "./service/cookie";
Vue.config.productionTip=false

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    const token = localStorage.getItem('token');
    if (cook.getCookie('isLogin')!=='1') {
        if(to.path === '/login'){
            next();
            localStorage.removeItem('token');
        }else{
            next({ path: '/login' });
        }

    }else {
        if(!token && to.path !== '/login'){
            next({ path: '/login' });
        }else{
            next();
        }
    }




});

router.afterEach(route => {
    iView.LoadingBar.finish();
});

const app = new Vue({
    router,
    created:function () {


    }

}).$mount('#app')

















