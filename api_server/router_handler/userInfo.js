const db = require('../db/index.js')
/* 密码验证 */
const bcryptjs = require('bcryptjs')

/* 查询用户信息 */
exports.getUserInfo = (req, res) => {
  const sql_selectInfo =
    'SELECT id,username,nickname,email,user_pic FROM ev_user WHERE id=?'
  db.query(sql_selectInfo, req.body.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length !== 1) {
      return res.cc('获取信息失败')
    } else {
      return res.send({
        status: 0,
        msg: '信息获取成功',
        data: results[0],
      })
    }
  })
}

/* 更新用户信息 */
exports.updateUserInfo = (req, res) => {
  const sql_updateInfo = 'UPDATE ev_user set ? WHERE id=?'
  db.query(sql_updateInfo, [req.body, req.user.id], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('更新信息失败')
    } else {
      return res.cc('信息更新成功', 0)
    }
  })
}

/* 更新密码 */
exports.updateUserPassword = (req, res) => {
  /* 验证账户是否存在 */
  const sql_selectPwd = 'SELECT * FROM ev_user WHERE id=?'
  db.query(
    sql_selectPwd,
    /* 低版本express-jwt 是req.user 高版本为req.auth  使用token内的数据 带有id值  */
    req.user.id,
    (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.length !== 1) {
        return res.cc('用户不存在')
      } else {
        /* 原密码比较 */
        const compareResult = bcryptjs.compareSync(
          req.body.oldPwd,
          results[0].password
        )
        if (!compareResult) {
          return res.cc('原密码错误')
        } else {
          const sql_updatePwd = 'UPDATE ev_user set password=? WHERE id=?'
          // 对新密码进行 bcryptjs 加密处理
          const newPwd = bcryptjs.hashSync(req.body.newPwd, 10)
          db.query(sql_updatePwd, [newPwd, req.user.id], (err, results) => {
            if (err) {
              return res.cc(err)
            }
            if (results.affectedRows !== 1) {
              return res.cc('密码更新失败')
            } else {
              res.cc('密码更新成功', 0)
              // 可以增加退出登录的功能
            }
          })
        }
      }
    }
  )
}

/* 更新用户头像 */
exports.updateUserPic = (req, res) => {
  console.log(req.body)
  const sql_updatePic = 'update ev_user set user_pic=? where id=?'
  db.query(sql_updatePic, [req.body.userPic, req.user.id], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('头像更新失败！')
      // 更新用户头像成功
    } else {
      return res.cc('头像更新成功！', 0)
    }
  })
}
