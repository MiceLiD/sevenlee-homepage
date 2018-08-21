const Article = require('../../db/modal/Article')

module.exports = async (ctx, next) => {
  const body = ctx.request.body

  await Article.sync()

  await Article.create({
    ...body, star: 0, star_er: '[]'
  }).then(data => {
    ctx.body = JSON.stringify({
      code: 0,
      data
    })
  })
}