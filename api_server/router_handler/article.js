// 导入处理路径的 path 核心模块
const path = require('path')
const db = require('../db/index.js')

exports.pubArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') {
    return res.cc('文章封面是必选参数')
  }
  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
  }
  const sql_insert = 'insert into ev_articles set ?'
  // 执行 SQL 语句
  db.query(sql_insert, articleInfo, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('发布文章失败,请重试')
    } else {
      res.cc('发布文章成功', 0)
    }
  })
}
