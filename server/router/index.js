module.exports = (app) => {
  app.post('/api/getusername', async (ctx) => {
    ctx.body = JSON.stringify({
      code: 0,
      data: {
        username: 'seven'
      }
    })
  })
  app.get('/', async ctx => {
    await ctx.render('index', {
      title: 'framework',
      moduleName: 'framework'
    })
    ctx.logger.info('render /')
  })
}

