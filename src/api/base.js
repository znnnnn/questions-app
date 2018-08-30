/**
  * 接口域名的管理
  */
import store from '../store/index'

const base = {
  sq: '/api', // 在线地址api -> '/api'在'webpack.config.client.js中映射为'http://101.132.141.130:82/api/'
  bd: '/mock', // '本地开发api  数据mock模拟'
  token: store.state.token
}

// http://101.132.141.130:82/api/report/rank/0

export default base
