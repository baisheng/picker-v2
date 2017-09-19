const BaseRest = require('../common/rest')
module.exports = class extends BaseRest {
  async postAction() {
    console.log(    this.orgId + 'xxxx')
    let data = this.post()
    let userId = await this.modelInstance.addUser(data)
    return this.success(userId)
  }
}
