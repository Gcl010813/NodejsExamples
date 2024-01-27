const express = require('express')
const app = express()

/* 使用自定义中间件模块 */
const selfMiddleWare = require('./selfMiddleWare.js')
app.use(selfMiddleWare)

app.post('/data', (req, res) => {
  res.send(req.body)
})

app.listen(80, () => {
  console.log('express serve running at http://127.0.0.1')
})
