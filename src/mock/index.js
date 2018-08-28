var Mock = require('mockjs')
import transactionAPI from './userinfo/industry'

Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
