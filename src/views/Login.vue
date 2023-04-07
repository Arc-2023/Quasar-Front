<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="q-pa-md" style="max-width: 300px">
          <div class="text-h6 q-mb-md">欢迎</div>
          <q-card flat bordered>
            <q-card-section>
              <q-tabs v-model="tab" align="justify" dense indicator-color="primary">
                <q-tab name="login" label="登录" :before-transition="beforeTransition"
                       :after-transition="afterTransition"/>
                <q-tab name="register" label="注册" :before-transition="beforeTransition"
                       :after-transition="afterTransition"/>
              </q-tabs>
            </q-card-section>
            <q-card-section>
              <transition name="fade" appear  enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                <div v-if="tab == 'login'" key="login">
                  <q-form @submit="onLogin" class="q-gutter-md">
                    <q-input
                      filled
                      v-model="username"
                      label="用户名"
                      lazy-rules
                      :rules="[val => val && val.length > 0 || '请输入用户名']"
                    />
                    <q-input
                      filled
                      v-model="password"
                      label="密码"
                      type="password"
                      lazy-rules
                      :rules="[val => val && val.length > 0 || '请输入密码']"
                    />
                    <div class="row items-center"
                    style="justify-content: space-between">
                      <q-checkbox v-model="rememberMe" label="记住我" />
                      <q-btn label="登录" type="submit" color="primary" />
                    </div>
                  </q-form>
                </div>
                <div v-else-if="tab == 'register'" key="register">
                  <q-form @submit="onRegister" class="q-gutter-md">
                    <q-input
                      filled
                      v-model="username"
                      label="用户名"
                      lazy-rules
                      :rules="[val => val && val.length > 0 || '请输入用户名']"
                    />
                    <q-input
                      filled
                      v-model="password"
                      label="密码"
                      type="password"
                      lazy-rules
                      :rules="[val => val && val.length > 0 || '请输入密码']"
                    />
                    <q-input
                      filled
                      v-model="confirmPassword"
                      label="确认密码"
                      type="password"
                      lazy-rules
                      :rules="[val => val && val.length > 0 || '请输入确认密码', val => val === password || '两次输入的密码不一致']"
                    />
                    <div class="row items-center justify-end">
                      <q-btn label="注册" type="submit" color="primary" />
                    </div>
                  </q-form>
                </div>
              </transition>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, defineComponent } from 'vue'
import { userStore } from 'src/stores/user-store'
export default defineComponent({
  setup () {
    const userstore = userStore()
    const md = ref('')
    return {
      userstore,
      md
    }
  },
  data () {
    return {
      tab: 'login',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    }
  },
  methods: {
    onLogin () {
      this.userstore.login({ username: this.username, password: this.password, remember: this.rememberMe })
        .then((res) => {
          this.$q.notify('登录成功')
          console.log(res)
          this.$router.push('/')
        })
        .catch(e => {
          this.$q.notify('登录失败: ' + e.data)
        })
    },
    onRegister () {
      this.userstore.register({ username: this.username, password: this.password })
        .then(res => {
          this.$router.push('/login')
        })
    },
    beforeTransition (oldIndex, newIndex) {
      const oldTab = this.$refs.tabs.$children[oldIndex].$el
      const newTab = this.$refs.tabs.$children[newIndex].$el
      const oldAvatar = oldTab.querySelector('.q-tab__icon')
      const newAvatar = newTab.querySelector('.q-tab__icon')
      const rectOld = oldAvatar.getBoundingClientRect()
      const rectNew = newAvatar.getBoundingClientRect()
      const diffX = rectNew.left - rectOld.left
      const diffY = rectNew.top - rectOld.top
      const diffW = rectNew.width / rectOld.width
      const diffH = rectNew.height / rectOld.height

      this.$refs.tabs.$el.style.overflow = 'hidden'
      oldAvatar.style.transform = `translate(${diffX}px, ${diffY}px) scale(${diffW}, ${diffH})`
    },
    afterTransition () {
      const oldTab = this.$refs.tabs.$children[this.oldIndex].$el
      const newTab = this.$refs.tabs.$children[this.newIndex].$el
      const oldAvatar = oldTab.querySelector('.q-tab__icon')
      const newAvatar = newTab.querySelector('.q-tab__icon')

      this.$refs.tabs.$el.style.overflow = null
      oldAvatar.style.transform = null
      newAvatar.style.transform = null
    }
  }
}
)
</script>
<style scoped>
.q-page {
  background-image: url('https://source.unsplash.com/random');
  background-size: cover;
}

.q-form {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
}

q-input,
q-checkbox {
  transition: all .3s ease-in-out;
}

.q-input--filled:not(.q-field--focused):not(.q-field--highlighted) .q-field__control:before,
.q-checkbox:not(.q-checkbox--focused):not(.q-checkbox--highlighted) .q-checkbox__bg:before {
  border-color: transparent;
}

.q-input--filled .q-field__control:before,
.q-checkbox .q-checkbox__bg:before {
  border-radius: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
