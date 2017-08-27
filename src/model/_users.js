/* eslint-disable prefer-promise-reject-errors,no-console */
// const {PasswordHash} = require('phpass');

module.exports = class extends think.Model {
  get relation() {
    return {
      usermeta: {
        type: think.Model.HAS_MANY,
        key: 'id',
        rModel: 'usermeta',
        fKey: 'users_id'
      }
    };
  }
}
