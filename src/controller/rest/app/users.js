/* eslint-disable default-case,no-undef */
const BaseRest = require('./common/rest')
const jwt = require('jsonwebtoken')

module.exports = class extends BaseRest {
  constructor(ctx) {
    super(ctx);
    this.DAO = this.model('users')
    this.metaDAO = this.model('usermeta')
  }

  async postAction () {
    const data = this.post()
    const approach = this.post('approach')
    // 注册用户来源
    switch(approach) {
      // 微信小程序
      case 'wxapp': {
        // 判断用户是否已注册
        const wxUser = await this.model('users').getByWxApp(data.openId)
        if (!think.isEmpty(wxUser)) {
          // 获取 token
          const token = await this.createToken(approach, data)
          return this.success({userId: wxUser.id, token: token, token_type: 'Bearer'})
        } else {
          const userInfo = {
            appid: this.appId,
            user_login: data.openId,
            user_nicename: data.nickName,
            wxapp: data
          }
          const userId = await this.model('users').addWxAppUser(userInfo)
          const token = await this.createToken(approach, data)
          return this.success({userId: userId, token: token, token_type: 'Bearer'})
        }
      }
      default: {
        data.appid = this.appId
        const userId = await this.model('users').save(data)
        return this.success(userId)
      }
    }
  }

  async putAction () {
    const data = this.post()
    const approach = this.post('approach')
    // console.log(approach)
    // console.log(approach + '------')
    // 注册用户来源
    switch(approach) {
      // 微信小程序
      case 'wxapp': {
        // 判断用户是否已注册
        const wxUser = await this.DAO.getByWxApp(data.openId)
        if (!think.isEmpty(wxUser)) {
          // 获取 token
          const token = await this.createToken(approach, data)
          return this.success({userId: wxUser.id, token: token, token_type: 'Bearer'})
        } else {
          const userInfo = {
            appid: this.appId,
            user_login: data.openId,
            user_nicename: data.nickName,
            wxapp: data
          }
          const userId = await this.DAO.addWxAppUser(userInfo)
          const token = await this.createToken(approach, data)
          return this.success({userId: userId, token: token, token_type: 'Bearer'})
        }
      }
      default: {
        // if (!this.id) {
        //   return this.fail('params error');
        // }
        // const pk = this.modelInstance.pk;
        // delete data[pk];
        if (think.isEmpty(data)) {
          return this.fail('data is empty');
        }
        // 更新
        // const currentTime = new Date().getTime();
        // data.modified = currentTime
        data.appId = this.appId
        console.log(data.appId + 'xxxkkkkkk')
        console.log(JSON.stringify(data))
        await this.DAO.save(data)
        return this.success()
        // const res = await this.DAO.where({id: data.id}).update(data);
        // if (res > 0) {
        //   更新 meta 图片数据
          // if (!Object.is(data.meta, undefined)) {
          //   const res = await this.metaDAO.save(data.id, data.meta)
          //   if (res) {
          //     return this.success()
          //   } else {
          //     return this.fail('Update fail')
          //   }
          //   const metaModel = await this.model('postmeta', {appId: this.appId})
          //   保存 meta 信息
          //   await metaModel.save(this.id, data.meta)
          // }
        // } else {
        //   return this.fail('Update fail')
        // }

        // return this.success()
      }
    }
  }

  /**
   * 根据用户来源创建 token
   * @param approach
   * @param data
   * @returns {Promise.<*>}
   */
  async createToken(approach, data) {
    switch (approach) {
      case 'password': {
        break
      }
      case 'wxapp': {
        const token = jwt.sign(data, 'shared-secret', {expiresIn: '3d'})
        return token
      }
    }
    // const token = jwt.sign(userInfo, 'shared-secret', {expiresIn: '3d'})
    // user: userInfo.user_login,
    // return this.success({user: userInfo.user_login, token: token});
  }
  async getAction () {
    const userId = this.get('id')
    const appid = this.get('appId')
    const userMeta = this.model('usermeta')
    // id 存在获取单用户否则按分页获取多用户
    if (!think.isEmpty(userId)) {
      const user = await this.model('users').where({id: userId}).find()
      _formatOneMeta(user)
      // 处理人员头像地址
      user.avatar = await this.model('postmeta').getAttachment('file', user.meta.avatar)
      return this.success(user)
    } else {
      const userIds = await userMeta.where({'meta_key': `picker_${appid}_capabilities`}).select()
      const ids = []
      userIds.forEach((item) => {
        ids.push(item.user_id)
      })
      const users = await this.model('users').where({id: ['IN', ids]}).page(this.get('page'), 10).countSelect()
      _formatMeta(users.data)
      for (const user of users.data) {
        if (!think.isEmpty(user.meta.avatar)) {
          user.avatar = await this.model('postmeta').getAttachment('file', user.meta.avatar)
        }
      }
      this.success(users)
    }
  }
}
