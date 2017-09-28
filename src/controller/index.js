const Base = require('./base.js');
// const jwt = require('koa-jwt');
const jwt = require('jsonwebtoken')
// const Redis = require('ioredis');
// const redis = new Redis();
module.exports = class extends Base {

  // indexAction() {
  //   return this.display();
  // }
  // async redisAction() {
  //   redis.set('foo', 'bar')
  //   redis.get('foo').then(function (result) {
  //     console.log(result);
  //   });
  // }
  async loginAction() {
    if (this.ctx.isPost) {
      const userLogin = this.post('user_login');
      const userModel = this.model('users');
      const userInfo = await userModel.where({user_login: userLogin}).find();
      if (think.isEmpty(userInfo)) {
        return this.fail('ACCOUNT_ERROR');
      }

      // 帐号是否被禁用，且投稿者不允许登录
      if ((userInfo.user_status | 0) !== 1 || userInfo.deleted === 1) {
        return this.fail('ACCOUNT_FORBIDDEN');
      }

      // 校验密码
      const password = this.post('user_pass');
      if (!userModel.checkPassword(userInfo, password)) {
        return this.fail('ACCOUNT_ERROR');
      }
      // 获取签名盐
      const token = jwt.sign(userInfo, 'pa$$word')
      return this.success({manager: userInfo.user_login, token: token});
    }
  }
};
