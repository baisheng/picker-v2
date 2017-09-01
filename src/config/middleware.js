const path = require('path');
const isDev = think.env === 'development';
const jwt = require('koa-jwt');
const cors = require('kcors');

module.exports = [
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
    handle: (option, app) => {
      return (ctx, next) => {
        // Custom 401 handling if you don't want to expose koa-jwt errors to users
        return next().catch((err) => {
          if (401 === err.status) {
            console.log(err)
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
          } else {
            throw err;
          }
        })
      }
    }
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
      if (ctx.url.match(/^\/api/)) {
        return true;
      } else if (ctx.url.match(/^\/signin/) || ctx.url.match(/^\/register/)) {
        // ctx.body = 'login\n';
        return false;
      }
    }
  },
  {
    handle: cors,
    options: {}
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'

];
