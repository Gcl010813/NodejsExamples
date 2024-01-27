/* 内置模块 */
const qs = require('querystringify')

const selfMiddleWare = function (req, res, next) {
  // 若数据过大 需要多次传输 拼接数据
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  // 数据集传输完毕
  req.on('end', () => {
    /* 上游挂载 全都可以使用 */
    req.body = qs.parse(data)
    next()
  })
}

module.exports = selfMiddleWare
