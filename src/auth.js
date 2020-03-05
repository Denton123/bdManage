const SESSION_NAME = 'BD_SESSION_NAME'
const SESSION_ICON = 'BD_SESSION_ICON'
const SESSION_ROLE = 'BD_SESSION_ROLE'
const SESSION_ACCOUNT = 'BD_SESSION_ACCOUNT'
import {getToken} from '@/utils/cookie.js'
export default {
  session: {
    name: SESSION_NAME,
    hp: SESSION_ICON,
    type: SESSION_ROLE,
    account: SESSION_ACCOUNT
  },
  user: {
    authenticated: false,
  },
  getRoleID() {
    return localStorage.getItem(SESSION_ROLE)
  },
  setLoginSession(data) {
    localStorage.setItem(SESSION_NAME, data.name)
    localStorage.setItem(SESSION_ICON, data.gender)
    localStorage.setItem(SESSION_ROLE, data.type)
    localStorage.setItem(SESSION_ACCOUNT, data.account)
    this.user.authenticated = true
  },
  getLoginSession() {
    return {
      name: localStorage.getItem(SESSION_NAME),
      gender: localStorage.getItem(SESSION_ICON),
      type: localStorage.getItem(SESSION_ROLE),
      account: localStorage.getItem(SESSION_ACCOUNT),
    }
  },
  logout() {
    // localStorage.removeItem(SESSION_NAME)
    // localStorage.removeItem(SESSION_ICON)
    // localStorage.removeItem(SESSION_ROLE)
    // localStorage.removeItem(SESSION_ACCOUNT)
    this.user.authenticated = false
  },
  isLogin() {
    this.checkAuth()
    return this.user.authenticated
  },
  checkAuth() {
    let token = getToken('_bdls_token_')
    // let account = localStorage.getItem(SESSION_NAME)
    // let gender = localStorage.getItem(SESSION_ICON)
    // let type = localStorage.getItem(SESSION_ROLE)
    if (token) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },
}