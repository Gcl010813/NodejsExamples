const express = require('express')
const app = express()

/* 用于生成JWT字符串 加密 */
const jwt = require('jsonwebtoken')
/* 用于将JWT字符串解析还原成JSON对象 解密*/
const expressJWT = require('express-jwt')
/* JWT密钥 */
const secretKey = 'xiaoGuo @!'
/* 将 JWT 字符串解析还原成 JSON 对象的中间件    path:...表示/api/...网址的请求无需解密 */
app.use(
  expressJWT.expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api\//],
  })
)

/* 允许跨域访问 */
const cors = require('cors')
app.use(cors())

/* 解析客户端发送来的表单数据 */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/login', (req, res) => {
  const userInfo = req.body //中间件解析后的数据
  if (userInfo.username !== 'xiaoGuo' || userInfo.password !== '0813') {
    res.send({
      status: 400,
      msg: '失败',
    })
  } else {
    /* 
      登录成功之后调用 jwt.sign() 方法生成 JWT 字符串 并通过 token 属性发送给客户端
      参数1：用户的信息对象(账户即可)
      参数2：加密的秘钥
      参数3：配置对象,可以配置当前 token 的有效期
      记住：千万不要把密码加密到 token 字符中
    */
    const tokenStr = jwt.sign({ username: userInfo.username }, secretKey, {
      expiresIn: '30s',
    })
    res.send({
      status: 200,
      msg: '成功',
      // 生成的token返回到客户端
      token: tokenStr,
    })
  }
})

/* 这是一个有权限的 API 接口 */
app.get('/admin/getinfo', function (req, res) {
  // 使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.auth)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    // 要发送给客户端的用户信息
    data: req.user,
  })
})

/* 使用全局错误处理中间件,捕获解析 JWT 失败后产生的错误 */
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})

/* 监听 */
app.listen(80, (req, res) => {
  console.log('express serve running at http://127.0.0.1')
})
