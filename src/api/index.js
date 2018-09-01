/**
  * api接口的统一出口
  */
// 文章模块接口
import article from './article'
// 分类模块接口
import homepage from './homePage'
// 行业分类模块
import industry from './industry'
// 关卡模块接口
import levels from './levels'
// 题目模块接口
import answer from './answer'
// 排行模块接口
import ranking from './ranking'
// 我的模块接口
import userinfo from './userinfo'
import userinfoIndustry from './userinfo/industry'
import feedback from './userinfo/feedback'
// 其他模块的接口……
import test from './test' // mock测试
// account的模块接口
import login from './account/login'
import register from './account/register'
import forgotPassword from './account/forgotPassword'
// 通用接口
import sendsms from './sendsms'

// 导出接口
export default {
  article,
  ranking,
  userinfo,
  userinfoIndustry,
  test,
  homepage,
  login,
  register,
  sendsms,
  forgotPassword,
  levels,
  answer,
  feedback,
  industry
  // ……
}
