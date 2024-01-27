const express = require('express')
const app = express()

/* session中间件 */
const session = require('express-session')
// 固定写法
app.use(
  session({
    secret: 'itxiaoguo',
    resave: false,
    saveUninitialized: true,
  })
)

/* 托管静态页面 */
app.use(express.static('./page'))
/* 内置中间件 解析数据 */
app.use(express.urlencoded({ extended: false }))

/* 登录 */
app.post('/api/login', (req, res) => {
  if (req.body.username !== 'xiaoGuo' || req.body.password !== '0813') {
    res.send({
      status: 1,
      msg: '登录失败',
    })
  } else {
    // 存储session
    req.session.user = req.body
    req.session.isLogin = true
    res.send({
      status: 0,
      msg: '登录成功',
    })
  }
})

// session 清空方法 req.session.destroy()
/* 登出 */
app.post('/api/logout', (req, res) => {
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出成功',
  })
})

/* 检验是否登录 */
app.get('/api/username', (req, res) => {
  if (!req.session.isLogin) {
    res.send({
      status: 1,
      msg: '先登录',
    })
  }
})

app.listen(80, (req, res) => {
  console.log('express serve running at http://127.0.0.1')
})
