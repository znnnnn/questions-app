/**
  * api接口的统一出口
  */
// 文章模块接口
import article from './article'
import ranking from './ranking'
import userinfoIndustry from './userinfo/industry'
// 其他模块的接口……
import test from './test' // mock测试

// 导出接口
export default {
  article,
  ranking,
  userinfoIndustry,
  test
  // ……
}
