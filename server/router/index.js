const getIn = require('../controller/getIn')

module.exports = (app) => {
  app.get('/', ctx => {
    ctx.redirect('/index')
  })

  app.get('/index', async ctx => {
    if (!ctx.session.username) {
      ctx.redirect('/login')
    } else {
      await ctx.render('index', { title: 'sevenlee' })
    }
  })

  app.get('/login', async ctx => {
    if (!ctx.session.username) {
      await ctx.render('getIn', { title: 'getIn' })
    } else {
      ctx.redirect('/')
    }
  })

  /* api */
  app.post('/api/getIn', getIn)
}

