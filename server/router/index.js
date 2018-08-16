const getIn = require('../controller/getIn')

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
  app.get('/markdown-editor', render)
  app.get('/process-editor', render)
  app.get('/other', render)

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
  app.post('/api/getIn', getIn)
}

