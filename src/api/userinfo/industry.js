/**
  * 参与答题历史记录的模块接口列表
  */

import base from '../base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例
import createStore from '@src/store'
var store = createStore()

const userinfoIndustry = {
  // 排行排名
  getUserinfoIndustry(type = '') {
    // console.log(`${base.sq}report/rank/`)
    return axios.get(`${base.sq}/report/history/${type}`, {
      params: { // 请求参数
        api_token: store.state.token
      }
    })
  }
  // 其他接口…………
}

export default userinfoIndustry

