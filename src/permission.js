import router from './router'
import { useUserStore } from './stores/user'
import { getToken } from './utils/auth'

// 白名单路由（无需登录）
const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 1. 已登录状态
  if (getToken()) {
    if (to.path === '/login') {
      next('/') // 已登录时禁止访问登录页
    } else {
      // 检查用户权限信息是否已加载
      if (!userStore.user.name) {
        await userStore.getUserInfo()
      }
      next()
    }
  }
  // 2. 未登录状态
  else {
    if (whiteList.includes(to.path)) {
      next() // 放行白名单路由
    } else {
      next(`/login?redirect=${to.path}`) // 重定向到登录页
    }
  }
})