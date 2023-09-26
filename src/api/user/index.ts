//统一管理用户相关
import request from '@/utils/request'
import type { loginFormData, loginResponseData, userResponseData } from './type'
//统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
//暴露请求函数
//登录接口方法
export const reqLogin = (data: loginFormData) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}
//获取用户信息接口方法
export const reqUserInfo = () => {
  return request.get<any, userResponseData>(API.USERINFO_URL)
}
//退出登录接口
export const reqLogOut = () => {
  return request.post<any, any>(API.LOGOUT_URL)
}
