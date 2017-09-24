/* eslint-disable default-case */
const BaseRest = require('../common/rest')
module.exports = class extends BaseRest {
  async postAction () {
    const approach = this.get('approach')
    let data = this.post()
    switch(approach) {
      case 'wxapp': {
        // const pickerAppId = data.appid
        let userMetaModel = this.mode('usermeta')
        let wxUser = await userMetaModel.where({meta_key: `picker_${data.appid}_wxapp`, meta_value: data.openid}).select()
        if (!think.isEmpty(wxUser)) {
          return this.fail('微信用户已注册')
        }
        break
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
    this.success('lala')
    // const approach = this.get('openid')
    // let user = await this.modelInstance.
  }
  // async getByWxApp(openid) {
  //   let user = await this.modelInstance.
  // }
}
