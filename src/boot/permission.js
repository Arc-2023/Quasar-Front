import { userStore } from 'stores/user-store'
import { Notify } from 'quasar'
export default function permission (Router) {
  Router.beforeEach(
    async (to, before, next) => {
      if (to.matched.some(r => r.meta.requireAuth)) {
        const userstore = userStore()
        if (userstore.getUsername == null) {
          Notify.create('未登录，重定向至login')
          next('/login')
        }
      }
      next()
    })
}
