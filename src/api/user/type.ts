//登录接口需要携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}
// 定义全部接口返回数据类型都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
interface dataType {
  token?: string
  message?: string
}

//登录接口返回的数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  roles: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userInfo
}
//定义服务器返回用户信息相关的数据类型
export interface userResponseData extends ResponseData {
  code: number
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
