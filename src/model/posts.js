'use strict';

import Base from './base';

/**
 * model
 */
export default class extends Base {
  // constructor(...args) {
  //   super(...args);
  //   this.relation = {
  //     metas: {
  //       type: think.model.HAS_MANY,
  //       model: 'postmeta',
  //       fKey: 'post_id',
  //       field: "post_id,meta_key,meta_value",
  //     }
  //     // comment: think.Model.HAS_MANY,
  //     // cate: think.Model.MANY_TO_MANY
  //   };
  // }

  get relation() {
    return {
      metas: {
        type: think.Model.HAS_MANY,
        model: 'postmeta',
        fKey: 'post_id',
        field: "post_id,meta_key,meta_value"
        // rModel: 'usermeta',
        // fKey: 'users_id'
      }
    };
  }

  /**
   * 添加 meta 信息
   *
   * @param post_id
   * @param meta_key
   * @param meta_value
   * @param unique
   * @returns {Promise.<*>}
   */
  async addMeta(post_id, meta_key, meta_value, unique = false) {
    let _metaModel = this.model('postmeta', {orgId: this.orgId})
    let _id = await _metaModel.add({
      post_id: post_id,
      meta_key: meta_key,
      meta_value: JSON.stringify(meta_value)
    })
    return _id
  }

  // async save(data) {
    // let res = await this.add{{
    // }}
  // }
}
