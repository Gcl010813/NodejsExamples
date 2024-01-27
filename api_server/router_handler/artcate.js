const db = require('../db/index.js')

/* 获取未删除的分类数据 */
exports.getArtcate = (req, res) => {
  const sql_select =
    'SELECT * FROM ev_article_cate where is_delete=0 order by id asc'
  db.query(sql_select, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length == 0) {
      return res.cc('获取文章分类列表失败,请重试')
    } else {
      return res.send({
        status: 0,
        msg: '获取文章分类列表成功',
        data: results,
      })
    }
  })
}

/* 插入 */
exports.insertArtcate = (req, res) => {
  const sql_select = 'SELECT * FROM ev_article_cate WHERE name=? OR alias =?'
  db.query(sql_select, [req.body.name, req.body.alias], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length === 2) {
      return res.cc('分类名称与别名被占用,请更换后重试')
    }
    // 分别判断 分类名称 和 分类别名 是否被占用
    if (results.length === 1 && results[0].name === req.body.name) {
      return res.cc('分类名称被占用,请更换后重试！')
    }
    if (results.length === 1 && results[0].alias === req.body.alias) {
      return res.cc('分类别名被占用,请更换后重试！')
    }
    //name alias都未被占用
    const sql_insert = 'INSERT INTO ev_article_cate set ?'
    db.query(sql_insert, req.body, (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('增加文章分类失败,请重试')
      } else {
        return res.cc('增加文章分类成功', 0)
      }
    })
  })
}

/* 删除 */
exports.deleteArtcate = (req, res) => {
  // 标记删除 is_delete为 1 的数据不会被展示到web页面 用户仅仅知道未被删除的文章分类
  const sql_delete = 'UPDATE ev_article_cate set is_delete=1 WHERE id=?'
  db.query(sql_delete, req.body.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('文章分类删除失败,请检测id')
    } else {
      return res.cc('文章分类删除成功', 0)
    }
  })
}

/* 根据id获取文章分类 */
exports.getArtcateById = (req, res) => {
  const sql_select = 'SELECT * FROM ev_article_cate where id =?'
  db.query(sql_select, req.params.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length !== 1) {
      return res.cc('文章分类获取失败,请检测id')
    } else {
      return res.send({
        status: 0,
        msg: '文章分类获取成功',
        data: results[0],
      })
    }
  })
}

/* 根据id更新文章分类 */
exports.updateArtcate = (req, res) => {
  const sql_select =
    'select * from ev_article_cate where id !=? and (name=? or alias=?)'
  db.query(
    sql_select,
    [req.body.id, req.body.name, req.body.alias],
    (err, results) => {
      if (err) {
        return res.cc(err)
      }
      // 判断 分类名称 和 分类别名 是否被占用
      if (results.length === 2) {
        return res.cc('分类名称与别名被占用，请更换后重试！')
      }
      if (results.length === 1 && results[0].name === req.body.name) {
        return res.cc('分类名称被占用，请更换后重试！')
      }
      if (results.length === 1 && results[0].alias === req.body.alias) {
        return res.cc('分类别名被占用，请更换后重试！')
      }
      // 更新的信息皆合法
      const sql_update = 'update ev_article_cate set ? where id=?'
      db.query(sql_update, [req.body, req.body.id], (err, results) => {
        if (err) {
          return res.cc(err)
        }
        if (results.affectedRows !== 1) {
          return res.cc('更新文章分类失败！')
          // 更新文章分类成功
        } else {
          res.cc('更新文章分类成功！', 0)
        }
      })
    }
  )
}
