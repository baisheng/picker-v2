/**
 * model adapter config
 * @type {Object}
 */
const mysql = require('think-model-mysql')
const isDev = think.env === 'development'

module.exports = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'picker',
    prefix: 'picker_',
    encoding: 'utf8',
    host: isDev ? '127.0.0.1': '114.55.230.6',
    port: isDev ? '3311' : '3318',
    user: 'root',
    password: 'ub08JASJQy9s',
    dateStrings: true
  }
}
