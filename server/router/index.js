const handlebars = require('handlebars')
const xObj = require('../../extensions/hbs.ext.js')

module.exports = (app) => {
  app.get('/', ctx => {
    ctx.redirect('/index')
  })
  app.get('/*', async ctx => {
    let xStyle = new handlebars.SafeString(await xObj.xStyle())
    let xScript = new handlebars.SafeString(await xObj.xScript())
    let xIco = new handlebars.SafeString(await xObj.xIco())

    await ctx.render('index', { title: 'sevenlee', xStyle, xScript, xIco })
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

