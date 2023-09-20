import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import type { UseState } from './types/type'
//引入操作本地存储
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由（常量路由）
import { constantRoute } from '@/router/routes'

// 创建用户小仓库
const useUserStore = defineStore('User', {
  state: (): UseState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      username: '',
      avatar: '',
    }
  },
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else if (result.code == 201) {
        return Promise.reject(new Error(result.data.message))
      }
    },
    //获取用户信息的
    async userInfo() {
      const result = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      }
    },
    // 退出登录
    userLogOut() {
      // 目前并没有mock接口：退出登录接口（通知服务器本地用户唯一标识失效）
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})
export default useUserStore
