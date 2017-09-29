/* eslint-disable default-case,no-undef */
const BaseRest = require('./common/rest')
const jwt = require('jsonwebtoken')

module.exports = class extends BaseRest {
  async postAction () {
    const data = this.post()
    // console.log(data)
    const approach = this.post('approach')
    const userMetaModel = this.model('usermeta')
    // 注册用户来源
    switch(approach) {
      // 微信小程序
      case 'wxapp': {
        // 判断用户是否已注册
        const wxUser = await this.model('users').getByWxApp(data.openId)
        if (!think.isEmpty(wxUser)) {
          // 获取 token
          const token = await this.createToken(approach, data)
          return this.success({userId: wxUser.id, token: token, token_type: 'Bearer'})
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
      case 'pc': {
        data.appid = this.appId
        const userId = await this.model('users').addUser(data)
        return this.success(userId)
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
    const userId = this.get('id')
    const appid = this.get('appId')
    const userMeta = this.model('usermeta')
    // id 存在获取单用户否则按分页获取多用户
    if (!think.isEmpty(userId)) {
      const user = await this.model('users').where({id: userId}).find()
      _formatOneMeta(user)
      return this.success(user)
    } else {
      const userIds = await userMeta.where({'meta_key': `picker_${appid}_capabilities`}).select()
      let ids = []
      userIds.forEach((item) => {
        ids.push(item.user_id)
      })
      const users = await this.model('users').where({id: ['IN', ids]}).page(this.get('page'), 10).countSelect()
      _formatMeta(users.data)

      this.success(users)
    }
  }
}
