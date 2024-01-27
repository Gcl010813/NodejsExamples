const express = require('express')
const app = express()
/* 导入api模块 */
const apiRouter = require('./apiRouter.js')

/* JSONP测试 */
app.get('/api/jsonp', (req, res) => {
  // 回调函数名称
  const funcName = req.query.callback
  // 返回的数据
  const data = { name: 'xiaoGuo', age: 23 }
  // 要转换成JSON格式
  const dataStr = `${funcName}(${JSON.stringify(data)})`
  // 发送
  res.send(dataStr)
})

/* 中间件 解析数据 */
app.use(express.urlencoded({ extended: false }))

/* 中间件 解决跨域问题 */
const cors = require('cors')
app.use(cors())

/* 使用时添加 /api*** */
app.use('/api', apiRouter)
app.listen(80, () => {
  console.log('express serve running at http://127.0.0.1')
})
