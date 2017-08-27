const BaseRest = require('../common/rest.js');
module.exports = class extends BaseRest {
  async getAction() {

    let data = await this.modelInstance.getOptions()
    return this.success(data)
    // let key = this.get('key')
    // let data;
    // data = await this.modelInstance.where({'key': key}).find();
    // return this.success(data)
    // if (this.id) {
    //   const pk = this.modelInstance.pk;
    //   data = await this.modelInstance.where({[pk]: this.id}).find();
    //   return this.success(data);
    // }
    // data = await this.modelInstance.select();
    // return this.success(data);
  }
};
