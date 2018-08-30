/**
  * api接口的统一出口
  */
// 文章模块接口
import article from './article'
// 分类
import homepage from './homePage'
// 排行模块接口
import ranking from './ranking'
// 我的模块接口
import userinfo from './userinfo'
import userinfoIndustry from './userinfo/industry'
// 其他模块的接口……
import test from './test' // mock测试

// 导出接口
export default {
  article,
  ranking,
  userinfo,
  userinfoIndustry,
  test,
  homepage
  // ……
}
