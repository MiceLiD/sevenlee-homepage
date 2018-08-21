const Article = require('../../db/modal/Article')

module.exports = async (ctx, next) => {
  const { id } = ctx.request.body
  const where = id ? { id } : {}
  await Article.sync()
  await Article.findAndCountAll({
    where
  }).then(data => {
    ctx.body = JSON.stringify({
      code: 0,
      data
    })
  })
}