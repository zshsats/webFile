import Vue from 'vue';
import axios from 'axios';
const ajax =axios.create({
    baseURL: 'http://localhost:1101',
    timeout:5000
});
axios.defaults.withCredentials=true;
import cook from './cookie.js';
ajax.interceptors.request.use(
    config => {
        var token = localStorage.getItem("token");
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);
ajax.interceptors.response.use(function (res) {
    return res.data;
}, function (error) {
    return Promise.reject(error);
});
const ajaxPost={

    get(url, params = {}) {
        return new Promise(function (resolve, reject) {
            ajax.get(url, {
                params: params
            })
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    },
    post(url, data = {}, config) {
        return new Promise(function (resolve, reject) {
            ajax.post(url, data, config)
                .then(function (res) {
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }
}
const info = function (that,content) {
    that.$Modal.error({
        title: title,
        content: content
    });
}
Vue.prototype.get = ajaxPost.get;
Vue.prototype.post = ajaxPost.post;
