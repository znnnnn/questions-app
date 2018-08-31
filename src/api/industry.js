/**
* ranking模块接口列表
*/

import base from './base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例
import createStore from '../store/index'
var store = createStore()

const industry = {
  getIndustry() {
    return axios.get(`${base.sq}/career/list`, {
      params: { // 请求参数
        api_token: store.state.token
      }
    })
  },
  getLevels(id) {
    return axios.get(`${base.sq}/cate/` + id + `/allgroups`, {
      params: { // 请求参数
        api_token: store.state.token
      }
    })
  }
}

export default industry
