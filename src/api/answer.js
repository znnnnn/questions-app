/**
 * ranking模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const answer = {
  // 排行排名
  getAnswer(sid, gid) {
    console.log(sid)
    console.log(gid)
    return axios.get(`${base.sq}/` + sid + `/` + gid + `/questions`, {
      params: { // 请求参数
        api_token: base.token
      }
    })
  },
  submitone() {
    return axios.post(`${base.sq}/question/submitone`, qs.stringify(
      {
        api_token: base.token
      }
    ))
  }
  // 其他接口…………
}

export default answer
