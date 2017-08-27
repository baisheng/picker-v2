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
    host: '127.0.0.1',
    port: '3311',
    user: 'root',
    password: 'ub08JASJQy9s',
    dateStrings: true
  }
}
