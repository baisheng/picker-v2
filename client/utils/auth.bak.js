
import storage from './helpers/storageLite'

const USER = 'user'
const TOKEN = 'token'

export default {
  name: 'auth',

  /**
   * 获取 auth，返回：管理员信息和 token
   * @return {Object}
   */
  get () {
    return {
      [USER]: storage.get(USER),
      [TOKEN]: storage.get(TOKEN)
    }
  },

  /**
   * 登录
   * @param {string} manager 登录管理员
   * @param {string} token 登录 token
   */
  login ({user, token}) {
    storage.set(USER, user)
    storage.set(TOKEN, token)
  },

  /**
   * 登出
   */
  logout () {
    storage.remove(USER)
    storage.remove(TOKEN)
  },

  /**
   * 是否已登录
   * @return {boolean}
   */
  loggedIn () {
    return Boolean(storage.get(USER)) && Boolean(storage.get(TOKEN))
  }
}
