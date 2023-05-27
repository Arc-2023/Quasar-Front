<template>
  <q-layout view="hHh Lpr fff" style="max-height: 100%">
    <q-header :elevated="true" class="transparent bg-blue-grey" style="">
    <q-toolbar style="backdrop-filter: blur(10px);" >
      <q-btn flat round dense icon="clear" @click="backtologin"/>
      <q-toolbar-title class="justify-between" style="">
        <div class="row wrap">
          <transition name="fade" appear enter-active-class="animated fadeIn"  mode="in-out">
            <div v-show="showtitle" class="col flex justify-start items-center q-ml-sm text-black">
              {{username}} /
              {{currentname}}
            </div>
          </transition>
          <q-tabs  dense class="desktop-only absolute-center text-black"
          >
            <q-route-tab icon="perm_identity" to="/"  @click="changename('Person')" exact></q-route-tab>
            <q-route-tab icon="article" to="/note"  @click="changename('Note')" exact></q-route-tab>
            <q-route-tab icon="fact_check" to="/thing"  @click="changename('Thing')" exact></q-route-tab>
            <q-route-tab icon="folder" to="/alist"  @click="changename('Alist')" exact></q-route-tab>
          </q-tabs>

          <div class="">
            <q-badge rounded color="yellow" text-color="black" :label="permission" align="top">
            </q-badge>
          </div>
            <q-avatar v-ripple text-black>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
            </q-avatar>
        </div>
      </q-toolbar-title>

    </q-toolbar >
      <q-tabs  dense class="platform-android-only text-black"
        >
        <q-route-tab icon="perm_identity" to="/"  @click="changename('Person')" exact></q-route-tab>
        <q-route-tab icon="article" to="/note"  @click="changename('Note')" exact></q-route-tab>
        <q-route-tab icon="fact_check" to="/thing"  @click="changename('Thing')" exact></q-route-tab>
        <q-route-tab icon="folder" to="/alist"  @click="changename('Alist')" exact></q-route-tab>
      </q-tabs>

    </q-header>
    <router-view  v-slot="{ Component }">
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"  mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <q-footer reveal>
      <div class="icp-registration-container">
        <div class="icp-registration-item">
          ICP 备案：
        </div>
        <div class="icp-registration-item">
          冀ICP备2023003852号-1
        </div>
      </div>
    </q-footer>
  </q-layout>

</template>

<script>
import { defineComponent } from 'vue'
import { userStore } from 'stores/user-store'
export default defineComponent({
  name: 'Home',
  setup () {
    const userstore = userStore()
    return {
      userstore
    }
  },
  data () {
    return {
      showrouter: true,
      avatar: this.userstore.getAvatar,
      permission: this.userstore.getRole,
      username: this.userstore.getUsername,
      currentname: 'Home',
      showtitle: true,
      userdata: this.userstore.getUserdata

    }
  },
  mounted () {

  },
  methods: {
    changename (name) {
      this.showtitle = false
      this.currentname = name
      setTimeout(() => {
        this.showtitle = true
      })
    },
    backtologin () {
      this.$router.push('/login')
    }

  },
  computed: {
  }

})
</script>

<style scoped>
.icp-registration-container {
  background-color: #ffffff;
  width: 100%;
  bottom: 0;
  height: 17px;
  padding: 5px;
  box-shadow: 0px 0px 3px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}
.icp-registration-container:hover {
  height: 30px;
  padding: 20px;
}
.icp-registration-item {
  font-size: 14px;
  color: purple;
  margin-right: 10px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
}
.icp-registration-item:hover {
  color: #007bff;
}
</style>
