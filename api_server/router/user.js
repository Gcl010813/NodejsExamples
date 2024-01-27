const express = require('express')
const router = express.Router()

/* 第三方验证规则中间件 */
const expressJoi = require('@escook/express-joi')
/* 需要验证的规则对象(可以自定义) */
const { reg_login_schema } = require('../schema/user.js')

/* handler处理函数 */
const userHandler = require('../router_handler/user.js')
/* 注册 */
router.post('/register', expressJoi(reg_login_schema), userHandler.regUser)
/* 登录 */
router.post('/login', expressJoi(reg_login_schema),userHandler.logUser)

/* 共享模块 */
module.exports = router
