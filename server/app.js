const path = require('path')
const fs = require('fs')
const views = require('koa-views')
const bodyPaser =  require('koa-bodyparser')
const Logger = require('mini-logger')
const session = require('koa-session')
const config = require('../config/index')
const isDev = process.env.NODE_ENV === 'development'

if (!isDev && !fs.existsSync(path.join(__dirname, '../static'))) {
  throw new Error('You have not executed npm run build yet!')
  return
}

const Koa = isDev ? require('koa') : require('../extensions/koa.ext')
const app = new Koa()

/* logger */
app.context.logger = Logger({
  dir: config.logDir,
  categories: ['error', 'warn', 'info'],
  format: 'YYYY-MM-DD-[{category}][.log]'
})

/* 模板引擎 */
app.use(views(path.join(__dirname, './views'), {
  map: { hbs: 'handlebars' },
  extension: 'hbs',
  options: {
    helpers: require('../extensions/hbs.ext')
  }
}))

app.use(bodyPaser())
app.keys = [process.env.SESSION_SECRET || 'sevenlee']
app.use(
  session(
    {
      key: 'sevenlee:sess',
      maxAge: 86400000,
      // maxAge: 3000,
      overwrite: true,
      httpOnly: true,
      signed: true
    },
    app
  )
)

/* router */
const router = require('koa-router')({
  prefix: config.appPrefix
})
const appRouter = require('./router/index')
appRouter(router)
app.use(router.routes()).use(router.allowedMethods())
/* 404 */
app.use(async (ctx, next) => {
  if (ctx.status === 404) {
    await ctx.render('404')
  }
  await next;
})

/* listen */
if (isDev) {
  app.listen(config.nodePort)
  console.log(`development mode, server listening at ${config.nodePort}`)
} else {
  app.listen(config.nodeSocket, () => {
    fs.chmodSync(config.nodeSocket, '666')
    console.log(`production mode, server listening at ${config.nodeSocket}`)
  })
  // 记录进程id
  fs.writeFile(config.nodePidPath, `${process.pid}`, err => {
    if (err) console.log(err)
  })
}