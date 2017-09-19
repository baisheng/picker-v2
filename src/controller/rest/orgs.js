const BaseRest = require('../common/rest')
const suffix = '.picker.la'
module.exports = class extends BaseRest {

  async getAction() {
    const subdomain = this.get('subdomain')
    if (!think.isEmpty(subdomain)) {
      return await this.subdomainValidation(subdomain)
    }
    // TODO:暂时未处理缓存 @Basil 270817
    let all = await this.modelInstance.get()
    return this.success(all)
  }

  /**
   * 验证域名
   * @param subdomain
   * @returns {Promise.<*>}
   */
  // api/teams/subdomain_validation?subdomain=vanq
  async subdomainValidation(subdomain) {
    // subdomain += suffix
    const orgs = await think.cache('orgs')
    console.log(JSON.stringify(orgs))
    let validation = await think._.has(orgs, subdomain + suffix)
    // console.log(JSON.stringify(validation))
    if (!validation) {
      return this.success()
    } else {
      return this.fail('域名已存在！')
    }
  }

  async postAction() {
    // 机构开通
    const data = this.post()

    // 获取 orgId
    try {
      // 1 Create Org
      const orgId = await this.modelInstance.add({
        subdomain: data['subdomain'] + suffix,
        created: new Date().getTime(),
        updated: new Date().getTime()
      })

      const orgs = await think.model('orgs').get()
      await think.cache('orgs', JSON.stringify(orgs))

      // 2 Create Org Table
      let db = this.service('orginit', {orgId: orgId})
      const error = await db.create()
      if (think.isEmpty(error)) {
        // 3 Create Org Administrator
        const userModel = think.model('users', {orgId: orgId})
        await userModel.addUser({
          user_login: data['user_login'],
          user_pass: data['user_pass'],
          user_email: data['user_email'],
          user_nicename: data['user_nicename'],
          user_phone: data['identity'],
          role: 'Adminstrator'
        })
      }

      // 4 Register Org Meta
      const metaModel = think.model('orgmeta')
      await metaModel.add({
        org_id: orgId,
        meta_key: 'basic',
        meta_value: JSON.stringify({
          name: data['org_name'],
          plan: 'basic',
          logo_url: '',
          subdomain: data['subdomain'],
          description: data['description']
        })
      })

      // 5 Registration log
      const logModel = think.model('registration_log')
      await logModel.add({
        user_email: data['user_email'],
        user_phone: data['identity'],
        created: new Date().getTime(),
        org_id: orgId,
        ip: _ip2int(this.ip)
      })

      return this.success(data['subdomain'] + suffix)
    } catch (e) {
      console.log(e)
      return this.fail(e)
    }
  }
}
