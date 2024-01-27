const mysql = require('mysql')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0813',
  database: 'node',
})

module.exports=db