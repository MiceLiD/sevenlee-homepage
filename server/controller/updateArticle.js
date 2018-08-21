const Article = require('../../db/modal/Article')

module.exports = async (ctx, next) => {
  const { id, fields } = ctx.request.body
console.log(fields)
  await Article.update(
    {
      ...fields
    },
    {
      where: { id }
    }
  ).then(data => {
    ctx.body = JSON.stringify({
      code: 0,
      data
    })
  })
}