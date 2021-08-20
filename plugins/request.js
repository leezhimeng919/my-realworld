// 基于axios封装请求模块
// esm
import axios from "axios";

export const request = axios.create({
    baseURL: 'http://realworld.api.fed.lagounews.com'
    // baseURL: 'https://conduit.productionready.io'
})


export default ( {store} ) => {
    // 请求拦截器
    request.interceptors.request.use(function (config) {
        const { user } = store.state

        // 在发送请求之前做些什么
        if(user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
    });
    // 响应拦截器
    
}

