const Article = require('../../db/modal/Article')

module.exports = async (ctx, next) => {
  const { id } = ctx.request.body
  console.log(id)
  // return
  await Article.destroy({
    where: { id }
  }).then(data => {
    ctx.body = JSON.stringify({
      code: 0,
      data
    })
  })
}