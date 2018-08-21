const User = require('../../db/modal/User')

module.exports = async (ctx, next) => {
  const { username, code } = ctx.request.body

  await User.sync()

  await User.findOrCreate({
    where: { username, code },
    defaults: { code }
  }).spread((result, created) => {
    ctx.session = { username, code, created }
    ctx.body = JSON.stringify({
      code: 0,
      data: 'created successful!'
    })
  })
}