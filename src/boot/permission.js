import { Notify, Cookies } from 'quasar'
export default function permission (Router) {
  Router.beforeEach(
    async (to, before, next) => {
      if (to.matched.some(r => r.meta.requireAuth === true)) {
        // const userstore = userStore()
        if (Cookies.get('satoken') != null && Cookies.get('satoken') !== '' && Cookies.has('satoken')) {
          console.log('路由检查:', Cookies.get('satoken'))
          Notify.create('未登录，重定向至login')
          next('/login')
        }
      }
      next()
    })
}
