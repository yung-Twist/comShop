/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import store from '@/store/index'
import router from '../router'
import Vue from 'vue'
import {
    Toast
} from 'vant';

Vue.use(Toast);
// 环境的切换
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'http://api.123dailu.com/';
// }
// axios.defaults.baseURL = window.apiObj.ApiUrl
// 请求超时时间
axios.defaults.timeout = 5000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
// axios.interceptors.request.use(   
//     config => {
//         Toast.loading()   
//     },    
//     error => {        
//         return Promise.error(error);    
//     })
// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            // Toast.clear();        
            return Promise.resolve(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        if (error.response.status == 505) {
            localStorage.clear()
            // router.push({
            //     path:'/misslogin',
            //     query:{
            //       redirect:encodeURIComponent(location.href)
            //     }
            // })
        }
        // else if (error.response.status == 909) {
        //     Toast({
        //         duration: 2000,
        //         message: "请先认证"
        //     })
        //     router.push('/userauth')
        // } else if (error.response.status == 808) {
        //     Toast({
        //         duration: 2000,
        //         message: "请先关注公众号"
        //     })
        //     return Promise.reject(error.response);
        // } 
        else {
            Toast(error.response.data.msg);
        }
    }
);

export default {
    /** 
     * get方法，对应get请求 
     * @param {String} url [请求的url地址] 
     * @param {Object} params [请求时携带的参数] 
     */

    async get(url, params) {
        params.token = localStorage.getItem('token');
        //  console.log(params)
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: params
                })
                .then(res => {
                    resolve(res.data.data);
                })
                .catch(err => {
                    reject(err.data.data)
                })
        });
    },
    /** 
     * post方法，对应post请求 
     * @param {String} url [请求的url地址] 
     * @param {Object} params [请求时携带的参数] 
     */
    async post(url, params) {
        // Toast.loading();

        // params.token = window.localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post(url, QS.stringify(params))
                .then(res => {
                    // Toast.clear();      
                    resolve(res.data.data);
                })
                .catch(err => {
                    reject(err)
                })
        });
    }
}