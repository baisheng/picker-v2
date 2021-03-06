/* eslint-disable prefer-promise-reject-errors,no-console,prefer-promise-reject-errors,prefer-promise-reject-errors */
const Base = require('./base');
const {PasswordHash} = require('phpass');

module.exports = class extends Base {

  get relation () {
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
  getEncryptPassword (password) {
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
  checkPassword (userInfo, password) {
    const passwordHash = new PasswordHash();
    return passwordHash.checkPassword(password, userInfo.user_pass);
  }

  // checkUserRole(userInfo) {
  //
  // }
  generateKey (userId, appKey, appSecret, status) {
    const data = {appKey, appSecret};
    if (status) {
      data.status = status;
    }
    this.where({id: userId}).update(data);
  }

  /**
   * 查询微信注册来的用户
   * @param openId
   * @returns {Promise.<*>}
   */
  async getByWxApp (openId) {
    let user = await this.where({user_login: openId}).find()
    return user
  }

  /**
   * 添加从微信过来的用户
   *
   * @param data
   * @returns {Promise.<*>}
   */
  async addWxAppUser (data) {
    const createTime = new Date().getTime();
    const res = await this.where({
      user_login: data.user_login
    }).thenAdd({
      user_login: data.user_login,
      user_nicename: data.user_nicename,
      user_registered: createTime,
      user_status: 1
    });
    // Add user meta info
    if (!think.isEmpty(res)) {
      if (res.type === 'add') {
        const role = think.isEmpty(data.role) ? 'subscriber' : data.role
        const usermeta = this.model('usermeta')
        await usermeta.add({
          user_id: res.id,
          meta_key: data.appId ? `picker_${data.appId}_capabilities` : '_capabilities',
          meta_value: JSON.stringify({"role": role})
        }, {appId: data.appId})

        if (!think.isEmpty(data.wxapp)) {
          await usermeta.add({
            user_id: res.id,
            meta_key: `picker_${data.appId}_wxapp`,
            meta_value: JSON.stringify(data.wxapp)
          })
        }
      }
    }
    return res
  }

  async save (data) {
    if (think.isEmpty(data.id)) {
      // Add
      const createTime = new Date().getTime();
      const encryptPassword = this.getEncryptPassword(data.user_pass);
      const res = await this.where({
        user_login: data.user_login,
        // user_phone: data.user_phone,
        user_email: data.user_email,
        _logic: 'OR'
      }).thenAdd({
        user_login: data.user_login,
        user_email: data.user_email,
        user_phone: data.user_phone,
        user_nicename: data.user_nicename,
        user_pass: encryptPassword,
        user_registered: createTime,
        user_status: 1
      });
      if (!think.isEmpty(res)) {
        if (res.type === 'add') {
          const role = think.isEmpty(data.role) ? 'subscriber' : data.role
          const usermeta = this.model('usermeta')
          await usermeta.add({
            user_id: res.id,
            meta_key: data.appId ? `picker_${data.appId}_capabilities` : '_capabilities',
            meta_value: JSON.stringify({"role": role})
          }, {appId: data.appId})
          // 后续这里的用户简介可以处理与 resume 模型关联
          if (!think.isEmpty(data.summary)) {
            await usermeta.save(res.id, {
              'resume': JSON.stringify({"summary": data.summary})
            })
          }
          if (!think.isEmpty(data.avatar)) {
            await usermeta.save(res.id, {
              'avatar': data.avatar
            })
          }
        }
      }
    } else {
      // Update
      const info = await this.where({id: data.id}).find();
      if (think.isEmpty(info)) {
        return Promise.reject(new Error('UESR_NOT_EXIST'));
      }
      let password = data.user_pass;
      if (password) {
        password = this.getEncryptPassword(password);
      }
      let updateData = {};
      // ['display_name', 'type', 'status'].forEach(item => {
      //   if (data[item]) {
      //     updateData[item] = data[item];
      //   }
      // });
      updateData = data
      if (password) {
        updateData.user_pass = password;
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
      updateData.last_login_time = new Date().getTime();
      console.log(JSON.stringify(updateData))

      // updateData.last_login_ip = ip;
      const res = await this.where({id: data.id}).update(updateData);
      if (!think.isEmpty(res)) {
        const role = think.isEmpty(data.role) ? 'subscriber' : data.role
        const usermeta = this.model('usermeta')
        await usermeta.add({
          user_id: res.id,
          meta_key: data.appId ? `picker_${data.appId}_capabilities` : '_capabilities',
          meta_value: JSON.stringify({"role": role})
        }, {appId: data.appId})
        // 后续这里的用户简介可以处理与 resume 模型关联
        if (!think.isEmpty(data.summary)) {
          await usermeta.save(res.id, {
            'resume': JSON.stringify({"summary": data.summary})
          })
        }
        if (!think.isEmpty(data.avatar)) {
          await usermeta.save(res.id, {
            'avatar': data.avatar
          })
        }
      }
    }
  }

  /**
   * 添加用户
   * @param {[type]} data [description]
   * @param {[type]} ip   [description]
   */
  async addUser (data) {
    const createTime = new Date().getTime();
    const encryptPassword = this.getEncryptPassword(data.user_pass);
    const res = await this.where({
      user_login: data.user_login,
      // user_phone: data.user_phone,
      user_email: data.user_email,
      _logic: 'OR'
    }).thenAdd({
      user_login: data.user_login,
      user_email: data.user_email,
      user_phone: data.user_phone,
      user_nicename: data.user_nicename,
      user_pass: encryptPassword,
      user_registered: createTime,
      user_status: 1
    });
    // Add user meta info
    if (!think.isEmpty(res)) {
      if (res.type === 'add') {
        const role = think.isEmpty(data.role) ? 'subscriber' : data.role
        const usermeta = this.model('usermeta')
        await usermeta.add({
          user_id: res.id,
          meta_key: data.appid ? `picker_${data.appid}_capabilities` : '_capabilities',
          meta_value: JSON.stringify({"role": role})
        }, {appId: this.appId})
        // 后续这里的用户简介可以处理与 resume 模型关联
        if (!think.isEmpty(data.summary)) {
          await usermeta.save(res.id, {
            'resume': JSON.stringify({"summary": data.summary})
          })
        }
        if (!think.isEmpty(data.avatar)) {
          await usermeta.save(res.id, {
            'avatar': data.avatar
          })
        }
      }
    }
    return res
  }

  /**
   * 保存用户信息
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  async saveUser (data, ip) {
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

  async displayName (uid) {
    uid = uid || 0;
// eslint-disable-next-line no-warning-comments
    // TODO 缓存处理后续
    let name = '';
    const info = await this.field('display_name').find(uid);
    name = info.display_name;
    return name;
  }
}
