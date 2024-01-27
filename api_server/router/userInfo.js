const express = require('express')
const router = express.Router()

/* 验证数据合法性的中间件*/
const expressJoi = require('@escook/express-joi')
/* 需要的验证规则对象 */
const {
  update_userInfo_schema,
  update_userPassword_schema,
  update_userPic_schema,
} = require('../schema/user.js')

/* handler处理函数 */
const userInfoHandler = require('../router_handler/userInfo.js')
/* 获取信息 */
router.get('/getUserInfo', userInfoHandler.getUserInfo)

/* 更新信息 使用自定义规则 验证后只携带规则之内的数据 */
router.post(
  '/updateUserInfo',
  expressJoi(update_userInfo_schema),
  userInfoHandler.updateUserInfo
)

/* 更新密码 */
router.post(
  '/updatePassword',
  expressJoi(update_userPassword_schema),
  userInfoHandler.updateUserPassword
)

/* 更新头像 */
router.post(
  '/updateUserPic',
  expressJoi(update_userPic_schema),
  userInfoHandler.updateUserPic
)

module.exports = router
