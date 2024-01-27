const express = require('express')
const router = express.Router()

const path = require('path')
// 解析 formdata 格式表单数据的包
const multer = require('multer')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })

/* 验证规则 */
const expressJoi = require('@escook/express-joi')
const { pub_article_schema } = require('../schema/article.js')

/* 路由处理函数 */
const articleHandle = require('../router_handler/article.js')

/* 发布文章 */
router.post(
  '/pubArticle',
  upload.single('cover_img'),
  expressJoi(pub_article_schema),
  articleHandle.pubArticle
)

module.exports = router
