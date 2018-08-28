var Mock = require('mockjs')
import transactionAPI from './userinfo/industry'

Mock.mock('/mock/test', 'get', transactionAPI.getList)

export default Mock
