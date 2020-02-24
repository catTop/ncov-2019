/**
 * @Date:   2018-01-08T16:12:15+08:00
 * @Last modified time: 2018-04-19T17:33:53+08:00
 */
import router from '@/router'
const whiteList = ['/login', '/register', '/openAddPeople', '/openAddVisit', '/success', '/firstPage']
router.beforeEach((to, from, next) => {
  /**
   * 1.有token情况
   *  1.1 如果是登录页 跳转到首页
   *  1.2 否则
   *    1.2.1 如果没有用户导航（判断有没有menuList） 没有去加载用户信息 并动态添加权限
   *    1.2.2 如果  有用户导航
   *            （1） 如果是主页 加载导航菜单第一个
   *            （2） 否则     直接next
   */
  if (localStorage.getItem('uinfo')) {
    if (to.path === '/login') {
      next('/')
    } else {
      next();
    }
  } else {
    /**
     * 2.没有token情况
     *  2.1 如果是白名单 免登录
     *  2.2 跳转到登录页
     */
    console.log(to.path)
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})
