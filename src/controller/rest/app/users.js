/* eslint-disable default-case */
const BaseRest = require('./common/rest')
module.exports = class extends BaseRest {
  async postAction () {
    let data = this.post()
    console.log(data)
    const approach = this.post('approach')
    switch(approach) {
      case 'wxapp': {
        // const pickerAppId = data.appid
        let userMetaModel = this.model('usermeta')
        let wxUser = await this.model('users').where({user_login: data.openId}).find()

        if (!think.isEmpty(wxUser)) {
          return this.fail('微信用户已注册')
        } else {
          const userId = await this.model('users').addWxAppUser({
            appid: this.appId,
            user_login: data.openId,
            user_nicename: data.nickName,
            wxapp: data
          })
          return this.success('注册成功!')
        }
      }
      default:
        break
    }
    // console.log(this.orgId + 'xxxx')
    // const data = this.post()
    // const userId = await this.modelInstance.addUser(data)
    // return this.success(userId)
  }

  async getAction () {
    let appid = this.get('appId')

    this.success(appid)
    // const approach = this.get('openid')
    // let user = await this.modelInstance.
  }
  // async getByWxApp(openid) {
  //   let user = await this.modelInstance.
  // }
}
