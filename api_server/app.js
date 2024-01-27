const express = require('express')
const app = express()
/* 配置 */
const config = require('./config.js')

/* 跨域问题 */
const cors = require('cors')
app.use(cors())

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

/* 配置内置解析application/x-www-form-urlencoded格式表单数据中间件 */
app.use(express.urlencoded({ extended: false }))

/* 封装res.send()函数中间件  实现复用 */
app.use((req, res, next) => {
  // 1为失败 0为成功(自定义 成功只有一种 失败的原因较多 404 500 等等)
  // res.cc函数传值(err ,status:不传默认1)
  res.cc = (err, status = 1) => {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err,
    })
  }
  // 放行
  next()
})

/* 路由之前使用解析token中间件 */
const expressJwt = require('express-jwt')
/* 使用.unless指定哪些接口不进行token解析 */
app.use(
  expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
)

/* 注册登录模块 使用前缀 /api */
const userRouter = require('./router/user.js')
app.use('/api', userRouter)

/* 用户信息模块 */
const userInfoRouter = require('./router/userInfo.js')
app.use('/user', userInfoRouter)

/* 文章分类模块 */
const artcateRouter = require('./router/artcate.js')
app.use('/artcate', artcateRouter)

/* 文章模块 */
const articleRouter = require('./router/article.js')
app.use('/article', articleRouter)

/* 全局错误中间件 放在路由之后 */
const joi = require('joi')
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.cc(err)
  }
  if (err.name === 'UnauthorizedError') {
    return res.cc('身份认证失败')
  }
  res.cc(err)
})

/* 监听端口 */
app.listen(80, (req, res) => {
  console.log('express serve running at http://127.0.0.1')
})
