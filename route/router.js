const express = require('express')
const router = express.Router()

router.get('/getUser', (req, res) => {
  console.log(req.url)
  res.send({ name: 'xiaoGuo', age: 23 })
})

/* 局部中间件 */
const mw1=function(req,res,next){
  console.log('局部中间件')
  next()
}
router.post('/postUser/:user',mw1, (req, res) => {
  console.log(req.params)
  res.send(req.params)
})

router.get('/error',(req,res)=>{
  throw new Error('错误')
})

module.exports=router
