const express = require('express')
const apiRouter = express.Router()

/* get请求 */
apiRouter.get('/get', (req, res) => {
  const query = req.query
  res.send({
    status: 0,
    msg: 'get success!',
    data: query,
  })
})

/* post请求 */
apiRouter.post('/post', (req, res) => {
  const body = req.body
  res.send({
    status: 0,
    msg: 'post success',
    data: body,
  })
})

module.exports = apiRouter
