/* 1.导入express包 */
const express =require('express')

/* 2.创建web服务器 */
const app=express()

/* 暴露静态资  --->按续查找  若有相同的文件 则访问先调用的 */
app.use('/files',express.static('./files'))
app.use(express.static('./public'))

/* 监听客户端 get 和 post 请求 */
app.get('/get',(req,res)=>{
  console.log(req.query)
  res.send('/get')
})

app.get('/user/:id',(req,res)=>{
  console.log(req.params)
  res.send('成功')
})

app.post('/post',(req,res)=>{
  res.send('/post')
})

/* 3.启动web服务器 */
app.listen(80,()=>{
  console.log('express serve running http://127.0.0.1')
})