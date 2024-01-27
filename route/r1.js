const express = require('express')
const app = express()
/* 应用级别全局中间件 共享req,res*/
app.use((req, res, next) => {
  console.log('中间件')
  next()
})

const router = require('./router.js')
// app.use(router)
app.use(/* 添加前缀 */ '/api', router)

/* 错误级别中间件 要放在路由后面 */
app.use((err, req, res, next) => {
  console.log(err.message)
  res.send('error')
})


app.listen(80, () => {
  console.log('express serve running at http://127.0.0.1')
})
