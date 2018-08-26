const render = async ctx => {
  if (ctx.session && !ctx.session.username) {
    ctx.redirect('/login')
  } else {
    await ctx.render('index', { title: 'sevenlee', user: JSON.stringify(ctx.session) })
  }
}

module.exports = (app) => {
  app.get('/', ctx => {
    ctx.redirect('/main')
  })

  /* 匹配前端路由 */
  app.get('/main', render)
  app.get('/detail', render)
  app.get('/markdown-editor', render)
  app.get('/process-editor', render)
  app.get('/secret', render)

  /* 登录登出路由 */
  app.get('/login', async ctx => {
    if (ctx.session && !ctx.session.username) {
      await ctx.render('getIn', { title: 'getIn' })
    } else {
      ctx.redirect('/')
    }
  })
  app.get('/getout', async ctx => {
    ctx.session = null
    ctx.redirect('/login')
  })

  /* api */
  app.post('/api/get-in', require('../controller/getIn'))
  app.post('/api/get-out', ctx => {
    ctx.session = null
    ctx.body = JSON.stringify({
      code: 0,
      data: 'get out successful'
    })
  })

  app.post('/api/set-article', require('../controller/setArticle'))
  app.post('/api/get-article', require('../controller/getArticle'))
  app.post('/api/update-article', require('../controller/updateArticle'))
   app.post('/api/del-article', require('../controller/delArticle'))

  app.post('/api/upload', require('../controller/upload'))
}

