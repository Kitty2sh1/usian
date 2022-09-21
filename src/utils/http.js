// import axios from "axios";
// import { Loading } from "element-ui";
// // 创建axios实例
// const instance = axios.create({
//     // 基准地址
//     // baseURL: process.env.VUE_APP_BASE_API,
//     // 超时时间
//     timeout: 3000,
// });

// var loading;
// // 添加请求拦截器
// instance.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     // 加载
//     loading = Loading.service({
//         lock: true,
//         text: '加载中',
//         spinner: 'el-icon-loading',
//         background: 'rgba(0, 0, 0, 0.7)'
//     })
//     // 请求头
//     config.headers.token = window.localStorage.getItem('token')
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     // 关闭加载
//     loading.close();
//     return Promise.reject(error);
// });

// // 添加响应拦截器
// instance.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     // 关闭加载
//     loading.close();
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     // 关闭加载
//     loading.close();
//     return Promise.reject(error);
// });

// const http=(options)=>{
//     options.method=options.method||'get'
//     if(options.method.toLowerCase()==='get'){
//         options.params=options.data||options.params
//         delete options.data
//     }
//     instance.defaults.baseURL=options.proxy||process.env.VUE_APP_BASE_API
//     return instance(options)
// }


// // 导出
// export default http;