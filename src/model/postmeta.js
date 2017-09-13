/* eslint-disable prefer-promise-reject-errors,no-console */
// const {PasswordHash} = require('phpass');
const Base = require('./base');

module.exports = class extends Base {
  // constructor(...args) {
  //   super(...args);
  //   this.orgId = ''
  //   if (this.config['orgId'] !== undefined) {
  //     this.orgId = this.config['orgId'] + '_'
  //   }
  // }
  //
  // get tablePrefix() {
  //   return 'picker_'+ this.orgId;
  // }
  async getAttachment (type, post_id) {
    let query = {}
    query.post_id = post_id
    if (!think.isEmpty(post_id)) {
      switch (type) {
        case 'file':
          query = think.extend({'meta_key': '_attachment_file'}, query)
          let attachment = await this.where(query).find()
          if (!think.isEmpty(attachment)) {
            return JSON.parse(attachment['meta_value'])
          }
          return ''
          break
        case 'meta':
          break
      }
    }
    return
  }

  async save (post_id, meta) {
    for (let key of Object.keys(meta)) {
      await this.thenUpdate({
        'post_id': post_id,
        'meta_key': key,
        'meta_value': meta[key] + ''
      }, {post_id: post_id, meta_key: key})
    }

  }


  // async getThumbnail(post_id) {
  //   let query = {}
  //   query.post_id = post_id
  //   query = think.extend({'meta_key': '_thumbnail_id'}, query)
  //   let thumbnail = await this.where(query).find()
  //   return JSON.parse(attachment['meta_value'])
  // }
}
