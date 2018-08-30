/**
 * answer模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块
import createStore from '../store/index'
var store = createStore()

const answer = {
  // 排行排名
  getUserInfo(type = '') {
    // console.log(`${base.sq}report/rank/`)
    return axios.get(`${base.sq}/user/info`, {
      params: { // 请求参数
        api_token: store.state.token
      }
    })
  },
  selectCareer(career_id) {
    return axios.post(`${base.sq}/user/selectcareer`, qs.stringify(
      {
        api_token: store.state.token,
        career_id: career_id
      }
    ))
  }
  // 其他接口…………
}

export default answer
