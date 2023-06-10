import { createPinia, defineStore } from 'pinia'
import { getUserdata, login, register, setAlertToken } from 'src/api/user'
import { Notify } from 'quasar'
createPinia()
export const userStore = defineStore('userStore', {
  state: () => ({
    username: localStorage.getItem('username'),
    alertToken: localStorage.getItem('alertToken'),
    role: localStorage.getItem('permission'),
    Avatar: localStorage.getItem('avatar'),
    userdata: localStorage.getItem('userdata')
  }),

  getters: {
    getoken (state) {
      return state.token
    },
    getAvatar (state) {
      return state.avatar
    },
    getUsername (state) {
      return state.username
    },
    getUserdata (state) {
      return state.userdata
    },
    getRole (state) {
      return state.role
    },
    getalertToken (state) {
      return state.alertToken
    }

  },

  actions: {
    async login (data) {
      return await login({ username: data.username, password: data.password, remember: data.remember })
        .then(res => {
          this.username = res.data.data.username
          this.Avatar = res.data.data.Avatar
          this.role = res.data.data.permission
          this.userdata = res.data.data.userdata
          this.alertToken = res.data.data.alertToken

          localStorage.setItem('username', data.username)
          localStorage.setItem('avatar', res.data.data.Avatar)
          localStorage.setItem('permission', res.data.data.permission)
          localStorage.setItem('userdata', res.data.data.userdata)
          localStorage.setItem('alertToken', res.data.data.alertToken)
          // Notify.create({
          //   message: res.data.msg
          // })
          return true
        }).catch(e => {
          return Promise.reject(false)
        })
    },
    async register (data) {
      return await register({ username: data.username, password: data.password })
        .then(res => {
          Notify.create('注册成功: ' + res.data.msg)
          return res
        })
        .catch((e) => {
          Notify.create('注册失败: ' + e.data.msg)
          return Promise.reject(e.data.msg)
        })
    },
    async getuserdata () {
      return await getUserdata()
    },
    async setalerttoken (token) {
      return await setAlertToken({ alertToken: token })
        .then(r => {
          Notify.create('AlertToken已修改')
          localStorage.setItem('alertToken', token)
          return true
        })
        .catch(e => {
          Notify.create('AlertToken修改失败')
          return Promise.reject(false)
        })
    }
  }
})
