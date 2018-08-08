module.exports = (app) => {
  app.get('/', ctx => {
    ctx.redirect('/index')
  })
  app.get('/*', async ctx => {
    await ctx.render('index', { title: 'sevenlee' })
  })

  /* api */
  app.post('/api/getusername', async (ctx) => {
    ctx.body = JSON.stringify({
      code: 0,
      data: {
        username: 'seven'
      }
    })
  })
}

