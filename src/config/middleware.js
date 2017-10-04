/* eslint-disable no-console,no-warning-comments */
const path = require('path');
const isDev = think.env === 'development';
const jwt = require('koa-jwt');
const cors = require('kcors');
// const koaConnect = require('koa-connect')
// const {Nuxt, Builder} = require('nuxt')
// const chalk = require('chalk')
// const config = require('../nuxt.config')

module.exports = [
  // nuxt ssr
  /*
  {
    handle: (option, app) => {
      return (ctx, next) => {
        config.dev = !(process.env.NODE_ENV === 'production')

        const nuxt = new Nuxt(config)

        // nuxt.showOpen = () => {
        // const _host = host
        // const _host = host === '0.0.0.0' ? 'localhost' : host
        // eslint-disable-next-line no-console
        // console.log('\n' + chalk.bgGreen.black(' OPEN ') + chalk.green(` http://${_host}:${port}\n`))
        // }

        // Build only in dev mode
        if (config.dev) {
          const devConfigs = config.development
          new Builder(nuxt).build()
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
      }
    }
  },
  */
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {}
  },
  {
    handle: 'router',
    options: {}
  },
  {
    handle: (option, app) => {
      return (ctx, next) => {
        // Custom 401 handling if you don't want to expose koa-jwt errors to users
        return next().catch((err) => {
          // eslint-disable-next-line yoda
          if (401 === err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
          } else {
            ctx.body = 'Protected resource, use Authorization header to get access\n';
            throw err;
          }
        });
      };
    }
  },
  // TODO: 中间件的顺序会对请求有影响，如文件上传、 权限验证等
  {
    handle: cors,
    options: {}
  },
  {
    handle: jwt,
    options: {
      // TODO: 可以加在数据文件中，这里的secret 用于 jwt sign @Basil 20170831
      secret: 'shared-secret'
    },
    // unless: {
    //   path: [/^\/login,/^\/register]
    // },
    match: ctx => { // match 为一个函数，将 ctx 传递给这个函数，如果返回结果为 true，则启用该 middleware
      if (ctx.url.match(/^\/rest\/app\/(\d+)\/options?/) || ctx.url.match(/^\/rest\/app\/(\d+)\/signin?/) || ctx.url.match(/^\/rest\/org\/(\d+)\/signin?/) || ctx.url.match(/^\/api\/signin/) || ctx.url.match(/^\/api\/register/)) {
        return false;
      } else if (ctx.url.match(/^\/rest\/?/) || ctx.url.match(/^\/rest\/org\/(\d+)\/?/) || ctx.url.match(/^\/rest\/app\/(\d+)\/?/)) {
        return true;
      }
    }
  },
  'logic',
  'controller'

];
