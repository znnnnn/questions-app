// 引入axios
import axios from 'axios'
import { Message } from 'element-ui'

let cancel; const promiseArr = {}
const CancelToken = axios.CancelToken
// 请求拦截器
axios.interceptors.request.use(config => {
  // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.Message = '错误请求'
        break
      case 401:
        error.Message = '未授权，请重新登录'
        break
      case 403:
        error.Message = '拒绝访问'
        break
      case 404:
        error.Message = '请求错误,未找到该资源'
        break
      case 405:
        error.Message = '请求方法未允许'
        break
      case 408:
        error.Message = '请求超时'
        break
      case 500:
        error.Message = '服务器端出错'
        break
      case 501:
        error.Message = '网络未实现'
        break
      case 502:
        error.Message = '网络错误'
        break
      case 503:
        error.Message = '服务不可用'
        break
      case 504:
        error.Message = '网络超时'
        break
      case 505:
        error.Message = 'http版本不支持该请求'
        break
      default:
        error.Message = `连接错误${error.response.status}`
    }
  } else {
    error.Message = '连接到服务器失败'
  }
  Message.error(error)
  return Promise.resolve(error.response)
})

axios.defaults.baseURL = '/api'
// 设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

export default {
  // get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },
  // post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  }
}
