// 引入axios
import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
//   console.log('经过了没有?')

  // 在发送请求之前做些什么
  let tokenht = localStorage.getItem('tokenht')
  if (tokenht) {
    config.headers.Authorization = tokenht
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 暴露
export default axios
