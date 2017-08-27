/* eslint-disable prefer-promise-reject-errors,no-console */
const {PasswordHash} = require('phpass');
import Base from './base';

module.exports = class extends Base {

  get relation() {
    return {
      metas: {
        type: think.Model.HAS_MANY,
        model: 'usermeta',
        // rModel: 'usermeta',
        fKey: 'user_id'
      }
    };
  }

  /**
   * get password
   * @param  {String} username []
   * @param  {String} salt     []
   * @return {String}          []
   */
  getEncryptPassword(password) {
    const passwordHash = new PasswordHash();
    const hash = passwordHash.hashPassword(password);
    return hash;
  }
  /**
   * check password
   * @param  {[type]} userInfo [description]
   * @param  {[type]} password [description]
   * @return {[type]}          [description]
   */
  checkPassword(userInfo, password) {
    const passwordHash = new PasswordHash();
    return passwordHash.checkPassword(password, userInfo.user_pass);
  }

  generateKey(userId, appKey, appSecret, status) {
    const data = {appKey, appSecret};
    if (status) {
      data.status = status;
    }
    this.where({id: userId}).update(data);
  }

  /**
   * 添加用户
   * @param {[type]} data [description]
   * @param {[type]} ip   [description]
   */
  async addUser(data) {
    const createTime = new Date().getTime();
    const encryptPassword = this.getEncryptPassword(data['user_pass']);
    let res = await this.where({user_login: data['user_login'], user_phone: data['user_phone'], user_email: data['user_email'], _logic: 'OR'}).thenAdd({
      user_login: data['user_login'],
      user_email: data['user_email'],
      user_phone: data['user_phone'],
      user_nicename: data['user_nicename'],
      user_pass: encryptPassword,
      user_registered: createTime,
      user_status: 1
    });
    // Add user meta info
    if (!think.isEmpty(res)) {
      if(res.type === 'add') {
        let role = think.isEmpty(data['role']) ? 'subscriber' : data['role']
        await this.model('usermeta').add({
          user_id: res.id,
          meta_key: '_capabilities',
          meta_value: JSON.stringify({"role": role})
        }, {orgId: this.orgId})
      }
    }
    return res
  }

  /**
   * 保存用户信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  async saveUser(data, ip) {
    const info = await this.where({id: data.id}).find();
    if (think.isEmpty(info)) {
      return Promise.reject(new Error('UESR_NOT_EXIST'));
    }
    let password = data.password;
    if (password) {
      password = this.getEncryptPassword(password);
    }
    const updateData = {};
    ['display_name', 'type', 'status'].forEach(item => {
      if (data[item]) {
        updateData[item] = data[item];
      }
    });
    if (password) {
      updateData.password = password;
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    if (think.isEmpty(updateData)) {
      return Promise.reject('DATA_EMPTY');
    }
    if (!info.email && data.email) {
      const count = await this.where({email: data.email}).count('email');
      if (!count) {
        updateData.email = data.email;
      }
    }
    updateData.last_login_time = think.datetime();
    updateData.last_login_ip = ip;
    return this.where({id: data.id}).update(updateData);
  }

  /**
   * 根据用户ID获取用户显示名字
   * @param  integer $uid 用户ID
   * @return string       用户昵称
   */

  async displayName(uid) {
    uid = uid || 0;
    // TODO 缓存处理后续
    let name = '';
    const info = await this.field('display_name').find(uid);
    name = info.display_name;
    return name;
  }
}
