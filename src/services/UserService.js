import BaseService from './BaseService'

export default class UserService extends BaseService {
  // 登录
  login(params) {
    return this.postApi(`/adminUser/login`, params)
  }
  // 退出登录
  logout(params) {
    return this.postApi('/adminUser/logout', params)
  }
  // 修改用户密码
  modifyPW(params) {
    return this.postApi('/v1/adminUser/modifyPW', params)
  }
  // 修改用户信息
  modifyInfo(params) {
    return this.postApi('/v1/adminUser/modifyInfo', params)
  }
  // 获取用户信息
  getInfo(oid) {
    return this.getApi('/v1/adminUser/detail', oid)
  }
  // 获取头像列表
  getHPList(oid) {
    return this.getApi('/v1/user/getHPList', oid)
  }
  // 获取用户角色
  getRole() {
    return this.getApi('/user/api/navigation', {}, '')
  }
}