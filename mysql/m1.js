const db = require('./mysql.js')

/* 查询 */
// db.query('select * from tab_user',(err,result)=>{
//   if(err){
//     console.log("error")
//   }
//   else{
//     console.log(result)
//   }
// })

/* 插入 使用占位符 */
// const sql = 'insert into tab_user(name,age,status) values(?,?,?)'
// db.query(sql, ['ll', 20, 0], (err, result) => {
//   if (err) {
//     console.log('error')
//   } else {
//     console.log(result.affectedRows==1?"success":"failed")
//   }
// })

/* 插入 便捷方式 信息对象里面key值对应表的列名 */
// const user = { name: 'xiao', age: 20, status: 0 }
// const sql = 'insert into tab_user set ?'
// db.query(sql, user, (err, result) => {
//   if (err) {
//     console.log('error')
//   } else {
//     console.log(result.affectedRows == 1 ? 'success' : 'failed')
//   }
// })

/* 更新数据  存在类似插入便捷方式 update tab_user set ? where id =? */
// const sql = 'update tab_user set age=? where id =?'
// db.query(sql, [100,7], (err, result) => {
//   if (err) {
//     console.log('error')
//   } else {
//     console.log(result.affectedRows==1?"success":"failed")
//   }
// })

/* 删除 */
const sql = 'delete from tab_user where id=?'
db.query(sql, 8 /* 只有一个占位符时可不使用数组 */, (err, result) => {
  if (err) {
    console.log('error')
  } else {
    console.log(result.affectedRows == 1 ? 'success' : 'failed')
  }
})

/* 标记删除 更新删除标志 ！！！ */
