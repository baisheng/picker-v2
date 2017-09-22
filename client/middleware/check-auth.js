/* eslint-disable no-unused-vars */
import { getUserFromCookie, getUserFromLocalStorage, getTokenFromCookie, getToken } from '~/utils/auth'

export default function ({ isServer, store, req }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) { return }
  const loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  // console.log(JSON.stringify(getToken(req)))
  const token = isServer ? getTokenFromCookie(req) : getToken()
  store.commit('SET_USER', loggedUser)
  store.commit('SET_TOKEN', token)
}
