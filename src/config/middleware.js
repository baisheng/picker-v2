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
    handle: jwt,
    options: {
      secret: 'shared-secret'
    },
    // unless: {
    //   path: [/^\/login,/^\/register]
    // },
    match: ctx => { // match 为一个函数，将 ctx 传递给这个函数，如果返回结果为 true，则启用该 middleware
      if (ctx.url.match(/^\/api/)) {
        // return false;
        ctx.body = 'protected\n';
        return false;
        // return true;
      } else if (ctx.url.match(/^\/login/) || ctx.url.match(/^\/register/)) {
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
