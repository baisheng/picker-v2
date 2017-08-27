'use strict';
const Redis = require('ioredis')
const redis = new Redis()
const BaseRest = require('../common/rest')
// import speakeasy from 'speakeasy';
const jwt = require('jsonwebtoken')
// const SMSClient = require('aliyun-dysms-sdk')
export default class extends BaseRest {

  async postAction() {
    let data = this.post()
    let identity = data['identity']
    let code = data['code']
    // create-org
    let type = this.post('type')
    if (type === 'create-org' && think.isEmpty(code)) {
      await this.requestCode(identity)
    }
    if (type === 'create-org' && !think.isEmpty(code)) {
      await this.verifyCode(identity, code)
    }
  }

  /**
   * 校验短信验证码
   * @param identity
   * @param code
   * @returns {Promise.<*>}
   */
  async verifyCode(identity, code) {
    let _code = await redis.get(identity)
    if (!think.isEmpty(_code)) {
      if (_code === code) {
        await redis.del(identity)
        return this.success()
      }
    }
    return this.fail('校验失败！')

    // redis.get('foo').then(function (result) {
    //   console.log(result);
    // });
    // let data = await this.model('registration_log').where({phone: identity, code: code}).find()
    // if (!think.isEmpty(data)) {
    //   return this.success()
    // } else {
    //   return this.fail('校验失败！')
    // }
  }

  /**
   * 生成短信验证码
   * @param identity
   * @returns {Promise.<*>}
   */
  async requestCode(identity) {
    let signName = this.config('options.sms.sign.value')
    // 发送短信验证码
    let code = Random()
    const SMS = this.service("sms");
    let msg = {
      PhoneNumbers: identity,
      SignName: signName,
      TemplateCode: this.config('options.sms.template.value'),
      TemplateParam:`{"code":"${code}","product":"${this.config('options.sms.product.value')}"}`
    }
    let res = await SMS.send(msg);
    if (res['Code'] !== 'OK') {
      return this.fail('发送过于频繁，请 1 小时后再尝试！')
    }
    await redis.set(identity, code, 'EX', 360);
    // 使用 redis
    // await think.cache(identity, code, {
    //   timeout:  1,
    //   type: 'redis'
    // })
    // 增加注册日志
    // await this.model('registration_log').add({
    //   phone: identity,
    //   code: code,
    //   data_registered: new Date().valueOf()
    // })
    return this.success()
  }
  /**
   * login
   * @return {} []
   */
  async _loginAction() {
    //二步验证
    // let model = this.model('options');
    // let options = await model.getOptions();
    // if(options.two_factor_auth){
    //     let two_factor_auth = this.post('two_factor_auth');
    //     let verified = speakeasy.totp.verify({
    //         secret: options.two_factor_auth,
    //         encoding: 'base32',
    //         token: two_factor_auth,
    //         window: 2
    //     });
    //     if(!verified){
    //         return this.fail('TWO_FACTOR_AUTH_ERROR');
    //     }
    // }

    //校验帐号和密码
    let username = this.post('username');
    let userModel = this.model('users');
    let userInfo = await userModel.where({name: username}).find();
    if (think.isEmpty(userInfo)) {
      return this.fail('ACCOUNT_ERROR');
    }

    //帐号是否被禁用，且投稿者不允许登录
    if ((userInfo.status | 0) !== 1 || userInfo.type === 3) {
      return this.fail('ACCOUNT_FORBIDDEN');
    }

    //校验密码
    let password = this.post('password');
    if (!userModel.checkPassword(userInfo, password)) {
      return this.fail('ACCOUNT_ERROR');
    }

    await this.session('userInfo', userInfo);

    return this.success();
  }

  /**
   * logout
   * @return {}
   */
  async logoutAction() {
    await this.session('userInfo', '');
    return this.redirect('/');
  }

  /**
   * update user password
   */
  async passwordAction() {
    let userInfo = await this.session('userInfo') || {};
    if (think.isEmpty(userInfo)) {
      return this.fail('USER_NOT_LOGIN');
    }

    let rows = await this.model('user').saveUser({
      password: this.post('password'),
      id: userInfo.id
    }, this.ip());

    return this.success(rows);
  }
}