/**
  * ranking模块接口列表
  */

import base from './base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例

const userinfo = {
  // 排行排名
  getUserInfo(type = '') {
    // console.log(`${base.sq}report/rank/`)
    return axios.get(`${base.sq}/user/info`, {
      params: { // 请求参数
        api_token: '1535964211.TlMzj0yiC1ZWnatEXSErxzZfUp37i6YV6WXLO4MeYAJHutrkXzZYOERT25S3XgWJ'
      }
    })
  }
  // 其他接口…………
}

export default userinfo

