/**
  * ranking模块接口列表
  */

import base from './base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例

const levels = {
  getNav(id) {
    console.log(id)
    return axios.get(`${base.sq}/cate/` + id + `/childs`, {
      params: { // 请求参数
        api_token: base.token
      }
    })
  },
  getLevels(id) {
    return axios.get(`${base.sq}/cate/` + id + `/groups`, {
      params: { // 请求参数
        api_token: base.token
      }
    })
  }
}

export default levels
