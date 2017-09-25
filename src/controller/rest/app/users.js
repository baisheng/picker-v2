/* eslint-disable default-case */
const BaseRest = require('./common/rest')
const jwt = require('jsonwebtoken')

module.exports = class extends BaseRest {
  async postAction () {
    const data = this.post()
    console.log(data)
    const approach = this.post('approach')
    switch(approach) {
      case 'wxapp': {
        // const pickerAppId = data.appid
        const userMetaModel = this.model('usermeta')
        const wxUser = await this.model('users').getByWxApp(data.openId)
        // let wxUser = await this.model('users').where({user_login: data.openId}).find()

        if (!think.isEmpty(wxUser)) {
          // const token = await this.createToken(approach, data)
          // return this.success({token: token});
          // return this.fail('微信用户已注册')
          const token = await this.createToken(approach, data)
          // return this.json({user: data.openId, token: token})
          return this.success({userId: wxUser.id, token: token, token_type: 'Bearer'})
          // return this.success()
        } else {
          const userInfo = {
            appid: this.appId,
            user_login: data.openId,
            user_nicename: data.nickName,
            wxapp: data
          }
          const userId = await this.model('users').addWxAppUser(userInfo)
          const token = await this.createToken(approach, data)
          return this.success({userId: userId, token: token, token_type: 'Bearer'})
        }
      }
    }
  }

  async verifyWxApp(encrypted_data, iv, code) {

  }

  /**
   * 根据用户来源创建 token
   * @param approach
   * @param data
   * @returns {Promise.<*>}
   */
  async createToken(approach, data) {
    console.log(approach + '----')
    switch (approach) {
      case 'password': {
        break
      }
      case 'wxapp': {
        const token = jwt.sign(data, 'shared-secret', {expiresIn: '3d'})
        return token
      }
    }
    // const token = jwt.sign(userInfo, 'shared-secret', {expiresIn: '3d'})
    // user: userInfo.user_login,
    // return this.success({user: userInfo.user_login, token: token});
  }
  async getAction () {
    const appid = this.get('appId')

    this.success(appid)
    // const approach = this.get('openid')
    // let user = await this.modelInstance.
  }
  // async getByWxApp(openid) {
  //   let user = await this.modelInstance.
  // }
}
