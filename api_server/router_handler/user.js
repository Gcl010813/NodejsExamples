/* 加密模块 */
const bcryptjs = require('bcryptjs')
/* 数据库 */
const db = require('../db/index.js')
/* token处理 */
const jwt = require('jsonwebtoken')
/* 配置文件 */
const config = require('../config.js')

/* 注册处理 */
exports.regUser = (req, res) => {
  const userInfo = req.body
  // 用户名或者密码为空 不合法
  if (!userInfo.username || !userInfo.password) {
    return res.cc('用户名或者密码不能为空')
  }
  // 查询数据库
  const sql_select = 'SELECT * FROM ev_user WHERE username = ?'
  db.query(sql_select, userInfo.username, (err, results) => {
    // sql错误
    if (err) {
      return res.cc(err)
    }
    // username数据表中存在
    if (results.length > 0) {
      return res.cc('用户名重复!')
      // 用户不存在 可注册 准备写入数据库
    } else {
      // 加密密码
      userInfo.password = bcryptjs.hashSync(userInfo.password, 10)
      const sql_register = 'INSERT INTO ev_user set ?'
      db.query(
        sql_register,
        { username: userInfo.username, password: userInfo.password },
        (err, results) => {
          // sql错误
          if (err) {
            return res.cc(err)
          }
          // 注册错误
          if (results.affectedRows !== 1) {
            return res.cc('注册失败,请重新尝试')
            // 注册成功
          } else {
            return res.cc('注册成功', 0)
          }
        }
      )
    }
  })
}
/* 登录处理 */
exports.logUser = (req, res) => {
  const userInfo = req.body
  const sql_select = 'SELECT * FROM ev_user WHERE username=?'
  db.query(sql_select, userInfo.username, (err, results) => {
    // sql错误
    if (err) {
      return res.cc(err)
    }
    // 先验证账号 若不存在无需验证密码
    if (results.length != 1) {
      return res.cc('账号不存在')
    } else {
      // 同已存储密码比较(解密)
      const compareResult = bcryptjs.compareSync(
        userInfo.password,
        results[0].password
      )
      //密码不匹配
      if (!compareResult) {
        return res.cc('账号或密码错误')
      }
      // 账号密码皆匹配
      else {
        // 去除账号信息中的密码和头像 其余信息放入token
        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
          expiresIn: config.expiresIn,
        })
        return res.send({
          status: 0,
          msg: '登录成功',
          token: 'Bearer ' + tokenStr,
        })
      }
    }
  })
}
