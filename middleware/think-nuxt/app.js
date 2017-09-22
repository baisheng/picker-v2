const Koa = require('koa')
const {Nuxt, Builder} = require('nuxt')
const Redis = require('ioredis')
const bunyan = require('bunyan')
const mkdirp = require('mkdirp')
const koaBunyan = require('koa-bunyan')
const koaLogger = require('koa-bunyan-logger')
const koaConnect = require('koa-connect')
const body = require('koa-body') // body parser
const compose = require('koa-compose') // middle composer
const compress = require('koa-compress') // HTT: compression
const session = require('koa-session2') // session for flash message
// const cookie = require('koa-cookie')
const chalk = require('chalk')
const proxy = require('koa-proxies')
const debugMudule = require('debug')

const consts = require('./utils/consts')
// const io = require('socket.io')(server)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
// no-deprecation 静默输出
process.noDeprecation = true

const config = require('../nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

const redis = new Redis({
  port: 6379,          // Redis port
  host: config.dev ? '127.0.0.1' : '114.55.230.6',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: config.dev ? '' : '__2017@picker-redis',
  db: 0
})
// Start nuxt.js
const start = async () => {
  const debug = debugMudule('app')
  const app = new Koa()
  // loggin
  let logDir = process.env.LOG_DIR || '/var/tmp/log'
  mkdirp.sync(logDir)
  logDir = logDir.replace(/(\\|\/)$/, '') + '/'

  const access = {
    type: 'rotating-file',
    path: `${logDir}picker-access.log`,
    level: config.dev ? 'debug' : 'info',
    period: '1d',
    count: 4
  }
  const error = {
    type: 'rotating-file',
    path: `${logDir}picker-error.log`,
    level: 'error',
    period: '1d',
    count: 4
  }
  const logger = bunyan.createLogger({
    name: 'picker',
    streams: [access, error]
  })
  app.use(koaBunyan(logger, {level: 'info'}))
  app.use(koaLogger(logger))
  // app.use(cookie())
  const SESSION_CONFIG = {
    key: consts.SESS_KEY
  }
  // session for flash messages (uses signed session cookies, with no server storage)
  app.use(session(SESSION_CONFIG, app)) // note koa-session@3.4.0 is v1 middleware which generates deprecation notice

  // select sub-app (admin/api) according to host subdomain (could also be by analysing request.url);
  // separate sub-apps can be used for modularisation of a large system, for different login/access
  // rights for public/protected elements, and also for different functionality between api & web
  // pages (content negotiation, error handling, handlebars templating, etc).
  app.use(async function subApp (ctx, next) {
    // console.log('server sub app ...')
    // console.log(ctx.host)
    ctx.state.subapp = ctx.url.split('/')[1] // subdomain = part after first '/' of hostname
    if (!Object.is(ctx.session.org, undefined)) {
      await next()
    } else {
      let org = await redis.get(ctx.host)
      // console.log(org)
      if (org !== null) {
        org = JSON.parse(org)
        ctx.session.org = org
        await next()
      } else {
        console.log('NOT FOUND')
        return ''
      }
    }
  })

  app.use(async function (ctx, next) {
    if (!Object.is(ctx.session.currentApp, undefined)) {
      await next()
    } else {
      for (const item of ctx.session.org.apps) {
        if (ctx.state.subapp === item.type) {
          ctx.session.currentApp = item
        }
      }
      if (Object.is(ctx.session.currentApp, undefined)) {
        ctx.session.currentApp = ctx.session.org.apps[0]
      }
      await next()
    }
  })

  const nuxt = new Nuxt(config)

  nuxt.showOpen = () => {
    // const _host = host
    const _host = host === '0.0.0.0' ? 'localhost' : host
    // eslint-disable-next-line no-console
    console.log('\n' + chalk.bgGreen.black(' OPEN ') + chalk.green(` http://${_host}:${port}\n`))
  }

  // Build only in dev mode
  if (config.dev) {
    const devConfigs = config.development
    if (devConfigs && devConfigs.proxies) {
      for (const proxyItem of devConfigs.proxies) {
        console.log(
          `Active Proxy: path[${proxyItem.path}] target[${proxyItem.target}]`
        )
        app.use(proxy(proxyItem.path, proxyItem))
      }
    }
    await new Builder(nuxt).build()
  }
  const nuxtRender = koaConnect(nuxt.render)
  app.use(async (ctx, next) => {
    await next()
    // if (ctx.state.subapp !== consts.API) {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    ctx.req.session = ctx.session
    await nuxtRender(ctx)
    // }
  })
  // return response time in X-Response-Time header
  app.use(async function responseTime (ctx, next) {
    const t1 = Date.now()
    await next()
    const t2 = Date.now()
    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms')
  })

  // HTTP compression
  app.use(compress({}))

  // only search-index www subdomain
  app.use(async function robots (ctx, next) {
    await next()
    if (ctx.hostname.slice(0, 3) !== 'www') {
      ctx.response.set('X-Robots-Tag', 'noindex, nofollow')
    }
  })

  // parse request body into ctx.request.body
  app.use(body())

  // somtimes useful to be able to track each reques...
  app.use(async function (ctx, next) {
    debug(ctx.method + ' ' + ctx.url)
    await next()
  })

  // note to 'next' after composed subapp, this must be the last middleware
  // app.use(async function composeSubapp (ctx, next) {
  //   switch (ctx.state.subapp) {
  //     case consts.API:
  //       await compose(api.middleware)(ctx)
  //       break
  //   }
  // })

  app.listen(port, host)
}

start()

