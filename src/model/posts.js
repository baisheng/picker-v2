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
        fKey: 'post_id'
        // rModel: 'usermeta',
        // fKey: 'users_id'
      }
    };
  }
}
