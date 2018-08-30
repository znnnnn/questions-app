/**
  * ranking模块接口列表
  */

import base from './base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例

const category = {
  getCategory() {
    // console.log(`${base.sq}report/rank/`)
    return axios.get(`${base.sq}/index/cate`, {
      params: { // 请求参数
        api_token: base.token
      }
    })
  }
  // 其他接口…………
}

export default category
