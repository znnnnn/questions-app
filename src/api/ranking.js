/**
  * ranking模块接口列表
  */

import base from './base' // 导入接口域名列表
import axios from '@src/utils/http' // 导入http中创建的axios实例

const ranking = {
  // 新闻列表
  getRankingList() {
    return axios.get(`${base.sq}/report/rank/0`)
  }
  // 其他接口…………
}

export default ranking
