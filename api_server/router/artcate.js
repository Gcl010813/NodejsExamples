const express = require('express')
const router = express.Router()

/* 验证规则 */
const expressJoi = require('@escook/express-joi')
const {
  insert_artcate_schema,
  delete_artcate_schema,
  getById_artcate_schema,
  update_artcate_schema,
} = require('../schema/artcate.js')

/* 路由处理函数 */
const artcateHandle = require('../router_handler/artcate.js')

/* 获取分类列表 */
router.get('/getArtcate', artcateHandle.getArtcate)

/* 增加文章分类 */
router.post(
  '/insertArtcate',
  expressJoi(insert_artcate_schema),
  artcateHandle.insertArtcate
)

/* 删除文章分类 */
router.post(
  '/deleteArtcate',
  expressJoi(delete_artcate_schema),
  artcateHandle.deleteArtcate
)

/* 根据id获取某个文章分类 */
router.get(
  '/getArtcateById/:id',
  expressJoi(getById_artcate_schema),
  artcateHandle.getArtcateById
)

/* 根据id更新文章分类 */
router.post(
  '/updateArtcate',
  expressJoi(update_artcate_schema),
  artcateHandle.updateArtcate
)

module.exports = router
