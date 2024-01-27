const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

/* 文章分类名称验证规则 */
const name = joi.string().required()
/* 文章分类别名验证规则 */
const alias = joi.string().alphanum().required()

exports.insert_artcate_schema = {
  body: {
    name,
    alias,
  },
}

/* 文章分类id验证规则 */
const id = joi.number().integer().min(1).required()

exports.delete_artcate_schema = {
  body: {
    id,
  },
}

exports.getById_artcate_schema = {
  params: {
    id,
  },
}

exports.update_artcate_schema = {
  body: {
    id,
    name,
    alias,
  },
}
