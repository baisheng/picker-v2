const redisCache = require('think-cache-redis');
module.exports = {
  type: 'redis',
  common: {
    timeout: 24 * 3600 * 1000 // millisecond
  },
  redis: {
    handle: redisCache,
    port: 6379,
    host: '127.0.0.1',
    password: ''
  }
}