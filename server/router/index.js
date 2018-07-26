module.exports = (app) => {
  app.post('/api/getusername', async (ctx) => {
    ctx.body = JSON.stringify({
      code: 0,
      data: {
        username: 'seven'
      }
    })
  })
  app.get('/', ctx => {
    ctx.redirect('/index')
  })
  app.get('/index', async ctx => {
    await ctx.render('index', {
      title: 'sevenlee',
      moduleName: 'framework'
    })
  })
  app.get('/*', async ctx => {
    await ctx.render('index', {
      title: 'sevenlee',
      moduleName: 'framework'
    })
  })
}

