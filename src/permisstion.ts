// 路由鉴权 某个路由什么条件下可以访问，什么条件下不可以访问
import router from '@/router'
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
// 获取用户的token
import useUserStore from './store/modules/user'
import setting from './setting'
// 全局守卫
// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  // 访问某一个路由之前守卫
  // to：将要访问的路由
  // from：从哪个路由来
  // next：路由的放行函数
  document.title = setting.title + '-' + to.meta.title
  nprogress.start()

  const userStore = useUserStore()
  if (userStore.token) {
    // 登录成功
    if (to.path == '/login') {
      ElMessage({
        type: 'error',
        message: '请先退出登录',
      })
      next(from.path)
    } else {
      next()
    }
  } else {
    // 未登录
    if (to.path == '/login') {
      next()
    } else {
      ElMessage({
        type: 'error',
        message: '请先登录',
      })
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done()
})
// 用户未登录：可以访问login,其余六个路由不能访问
// 用户登录后：就不能访问login
