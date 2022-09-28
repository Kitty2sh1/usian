import axios from "axios"
import { Loading, Message } from "element-ui"
import store from "../store"
const instance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
});

// 对应提示
const exceptionMessage = {
  2000: '登录成功'
}


var loading;
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 提示
  loading = Loading.service({
    lock: true,
    text: '加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  // 请求头token
  const token = store.state.token
  if (token) config.headers.authorization = 'Bearer ' + token
  return config;
}, function (error) {
  // 对请求错误做些什么
  loading.close();
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  loading.close();
  console.log(response,'response');
  if (response.status < 400) {
    if(response.data.data){
      return response.data.data
    }else{
      return response.data.msg
    }
  }

  if (response.status === 401) {
    // token过期处理
    return
  }
  // 传参   错误信息
  _showError(response.data.code, response.data.message)
  return response;
}, function (error) {
  // 对响应错误做点什么
  loading.close();
  return Promise.reject(error);
});


// code 错误提示 message
const _showError = (code, message) => {
  let title
  // exceptionMessage自定义提示信息
  title = exceptionMessage[code] || message || '发生未知错误'
  Message.error(title)
}

// option== 封装api  return request({})
const request = (options) => {
  // 如果请求里有method传参方式的话，就用请求里的，如果没有就默认是get传参
  options.method = options.method || 'get'
  // 判断如果option.method传参方式是get的话
  // toLowerCase()  小写
  if (options.method.toLowerCase() === 'get') {
    // options里没有params的情况下 将options里的data赋值给params
    // 有params 就用本来的params
    options.params = options.data || options.params
    // 将options.data删掉 (已经赋值给params)
    delete options.data
  }
  // 基准路径  如果封装api里写了proxy代理请求路径，就用proxy，没有就用默认路径
  instance.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
  // 调用上面的(拦截器)
  return instance(options)
}


export default request;