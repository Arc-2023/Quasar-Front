<template>
  <q-layout view="hHh lpR ffF"  style="max-height: 100%">
    <q-header :elevated="false" class="mdi-border-radius q-ma-sm"
              style="backdrop-filter: blur(30px);background-color: rgba(100,100,100,0.1);border-radius: 20px 20px 20px 20px;overflow: hidden">
      <q-ajax-bar color="primary"></q-ajax-bar>
    <q-toolbar class="bg-transparent">

      <q-toolbar-title class="justify-between" style="">

        <div class="row wrap">

          <div>
            <q-btn flat round dense
                   class="q-mr-sm"
                   icon="arrow_back"
                   color="black"
                   style="background-color: rgba(255,255,255,0.2)" @click="historyback"/>
          </div>
          <q-avatar square v-ripple:black text-black @click="this.switchsidebar">
            <q-img class="cursor-pointer mdi-border-radius" style="border-radius: 5px" spinner-size="10px" spinner-color="primary" fit="scale-down" :src="getavatar" alt="default"/>
          </q-avatar>
          <transition name="fade" appear enter-active-class="animated fadeIn"  mode="in-out">

            <div v-show="showtitle" class="col flex justify-start items-center q-ml-sm text-black">
              <q-breadcrumbs>
                <q-breadcrumbs-el :label="username" class="text-bold" style="
                background-color: #26004d;
                background-image: radial-gradient(at 96% 79%, hsla(318, 86%, 55%, 1) 0, hsla(318, 86%, 55%, 0) 50%),
                radial-gradient(at 61% 66%, hsla(167, 86%, 67%, 1) 0, hsla(167, 86%, 67%, 0) 50%),
                radial-gradient(at 55% 51%, hsla(309, 85%, 55%, 1) 0, hsla(309, 85%, 55%, 0) 50%),
                radial-gradient(at 74% 41%, hsla(218, 94%, 55%, 1) 0, hsla(218, 94%, 55%, 0) 50%),
                radial-gradient(at 42% 27%, hsla(290, 88%, 57%, 1) 0, hsla(290, 88%, 57%, 0) 50%),
                radial-gradient(at 22% 3%, hsla(346, 85%, 65%, 1) 0, hsla(346, 85%, 65%, 0) 50%),
                radial-gradient(at 50% 4%, hsla(358, 92%, 50%, 1) 0, hsla(358, 92%, 50%, 0) 50%);
                -webkit-background-clip: text;
                  color: transparent;

                "/>
                <q-breadcrumbs-el :label="currentname"/>
              </q-breadcrumbs>
            </div>
          </transition>

          <q-tabs  dense class="desktop-only absolute-center text-black mdi-border-radius">
<!--            <q-route-tab icon="perm_identity" to="/person"  @click="changename('Person')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>-->
            <q-route-tab icon="article" to="/"  @click="changename('Note')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>
            <q-route-tab icon="fact_check" to="/thing"  @click="changename('Thing')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>
            <q-route-tab icon="folder" to="/alist"  @click="changename('Alist')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>
            <q-route-tab icon="info" to="/info"  @click="changename('Info')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>
          </q-tabs>

<!--          <label class="switch" @click="toggledark">-->

<!--            <input type="checkbox">-->
<!--            <span class="slider"></span>-->

<!--          </label>-->
<!--          <div class="">-->
<!--            <q-badge rounded color="yellow" text-color="black" :label="permission" align="top">-->
<!--            </q-badge>-->
<!--          </div>-->

          <div>
            <q-btn flat round dense
                   icon="clear"
                   color="black"
                   style="background-color: rgba(255,255,255,0.2)" @click="backtologin"/>
          </div>

        </div>
      </q-toolbar-title>
    </q-toolbar >
      <q-tabs dense class="platform-android-only text-black bg-transparent">
<!--        <q-route-tab icon="perm_identity" to="/person"  @click="changename('Person')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>-->
        <q-route-tab icon="article" to="/"  @click="changename('Home')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>
        <q-route-tab icon="fact_check" to="/thing"  @click="changename('Thing')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>
        <q-route-tab icon="folder" to="/alist"  @click="changename('Alist')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>
        <q-route-tab icon="info" to="/info"  @click="changename('Info')" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px"></q-route-tab>
      </q-tabs>

<!--      <q-tabs v-if="this.devestore.getheaderstatus=='info'" dense class="text-black bg-transparent" v-model="this.devestore.$state.tabstatus">-->
<!--        <q-tab name="undo" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px">Developing</q-tab>-->
<!--        <q-tab name="done" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px">Done</q-tab>-->
<!--        <q-tab name="accepted" exact class="mdi-border-radius  overflow-hidden" style="border-radius: 10px">Accepted</q-tab>-->
<!--      </q-tabs>-->

    </q-header>
    <router-view class="myrouter"  v-slot="{ Component }">
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"  mode="out-in">
        <component :is="Component" @changename="changename" @changeheaderstatus="this.changeheaderstatus"/>
      </transition>
    </router-view>
    <q-footer class="z-top mdi-border-radius mdi-border-radius overflow-hidden" reveal
              style="background: rgba(255,255,255,0.2);backdrop-filter: blur(3px);border-radius: 10px;margin: 1px">
      <div class="icp-registration-container">
        <div class="icp-registration-item">
        </div>
        <div class="icp-registration-item" style="display: flex" @click="jumptocf(true)">
          冀ICP备2023003852号-1
        </div>
        <div class="icp-registration-item">
          |
        </div>

        <div class="icp-registration-item" style="display: flex" @click="jumptocf(false)">
           Powered By Cloudflare
        </div>
      </div>
    </q-footer>
    <q-drawer v-model="sidebar"
              side="left"
              class="row flex column"
              :overlay="true"
              :width="190"
              breakpoint="4000"
              :elevated="false"
              style="border-radius: 20px;background: transparent;backdrop-filter: blur(1px);"
              >
      <div class="absolute-top mdi-border-radius q-pa-sm align-center">
        <div style="width: 100%;border-radius: 10px;" class="flex justify-center cursor-pointer">
            <q-img @click="uploaddialog=true"
                   class=" icon cursor-pointer mdi-border-radius"
                   style="width: 75%;border-radius: 10px"
                   @mouseenter="e=>e.target.style.borderRadius = '20px'"
                   @mouseleave="e=>e.target.style.borderRadius = '10px'"
                   v-ripple="blue"
                   :spinner-color="blue"
                   :src="avatar || 'https://cdn.quasar.dev/logo-v2/svg/logo.svg'"
                   alt=""/>
        </div>
        <q-space></q-space>
          <q-item class="justify-center"
                  style=""
                  @mouseenter="e=>{e.target.style.borderWidth = '2px'}"
                  @mouseleave="e=>e.target.style.borderWidth = '0px'">
            <q-chip class="flex" style="flex: 1 1 0;" >
              <q-avatar icon="perm_identity">
              </q-avatar>
              <div class="text-weight-bold ellipsis text-center" style="flex:1 1 0;">{{ username }}</div>
            </q-chip>
          </q-item>
        <q-item>
          <q-chip class="justify-center" style="flex:1 1 0">
            <div class="text-weight-bold ellipsis text-center" style="flex:1 1 0;">{{ permission }}</div>
          </q-chip>
        </q-item>
        <q-item  >
          <q-chip class="justify-center" style="flex:1 1 0" @click="tokendialog = true" clickable>
            <div class="text-weight-bold ellipsis text-center" style="flex:1 1 0;">{{alertToken}}</div>
          </q-chip>
        </q-item>
      </div>

    </q-drawer>
    <q-dialog v-model="tokendialog" class="z-top">
        <q-card class="absolute-center z-top">
          <q-card-section class="bg-amber ">
            <div class="text-h6">输入你的Token</div>
            <q-input stack-label v-model="alertToken" clearable/>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn  flat label="取消" v-close-popup></q-btn>
            <q-btn flat label="确定" @click="setalertToken"></q-btn>
          </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="uploaddialog">
      <q-card class="q-pa-none mdi-border-radius " :bordered="false" style="border-radius: 20px">
          <q-file
            dense
            outlined
            rounded
            accept="image/*,.jpg,.png"
            v-model="imgFile"
            label="上传icon">
            <template #append>
              <q-btn flat rounded ripple :loading="loadingicon" icon="upload" @click="uploadicon"></q-btn>
            </template>
          </q-file>
      </q-card>
    </q-dialog>
  </q-layout>

</template>

<script>
import { defineComponent } from 'vue'
import { userStore } from 'stores/user-store'
import { Notify, useQuasar } from 'quasar'
import { noteStore } from 'stores/note-store'
import { developStore } from 'stores/develop-store'

export default defineComponent({
  name: 'Home',
  setup () {
    const userstore = userStore()
    const $q = useQuasar()
    const notestore = noteStore()
    const devestore = developStore()
    return {
      userstore,
      $q,
      notestore,
      devestore
    }
  },
  data () {
    return {
      imgFile: '',
      uploaddialog: false,
      tokendialog: false,
      sidebar: false,
      showrouter: true,
      avatar: this.userstore.getAvatar,
      permission: this.userstore.getRole,
      username: this.userstore.getUsername,
      alertToken: this.userstore.getalertToken,
      currentname: 'Home',
      showtitle: true,
      userdata: this.userstore.getUserdata,
      cff: 'https://www.cloudflare.com',
      loadingicon: false
    }
  },
  mounted () {

  },
  methods: {
    changeheaderstatus (name) {
      console.log('header change')
      this.headerstatus = name
    },
    onrejected () {
      Notify.create({
        message: '无法上传,过大或不是图片',
        type: 'error'
      })
    },
    historyback () {
      window.history.back()
    },
    async uploadicon () {
      this.loadingicon = true
      const formdata = new FormData()
      formdata.append('file', this.imgFile)
      await this.notestore.uploadimage(formdata).then(res => {
        console.log(res)
        this.avatar = 'https://spring.220608.xyz/getImage/' + res
        this.seticonurl()
      })
      this.loadingicon = false
    },
    setalertToken () {
      this.userstore.setalerttoken(this.alertToken)
    },
    seticonurl () {
      this.userstore.setimageicon(this.avatar)
    },
    switchsidebar () {
      this.sidebar = !this.sidebar
    },
    backtologin () {
      this.userstore.clearinfo()
      this.$router.push('/login')
    },
    jumptocf (booll) {
      booll === true ? window.location.replace(this.cff) : window.location.replace(this.cff)
    },
    changename (name) {
      this.showtitle = false
      this.currentname = name
      setTimeout(() => {
        this.showtitle = true
      })
    },
    changeinfostatus (name) {
      this.devestore.changetabstatus(name)
    }

  },
  computed: {
    getavatar () {
      return this.avatar == null ? 'https://cdn.quasar.dev/logo-v2/svg/logo.svg' : this.avatar
    }
  }

})
</script>

<style scoped>
.icp-registration-container {
  background-color: transparent;
  width: 100%;
  bottom: 0;
  height: 17px;
  padding: 5px;
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
.myrouter{
  background-color: rgb(211, 211, 211);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  width='300' height='150' viewBox='0 0 1600 800'%3E%3Cpath  fill='%23FF7' d='M1102.5 734.8c2.5-1.2 24.8-8.6 25.6-7.5.5.7-3.9 23.8-4.6 24.5C1123.3 752.1 1107.5 739.5 1102.5 734.8zM1226.3 229.1c0-.1-4.9-9.4-7-14.2-.1-.3-.3-1.1-.4-1.6-.1-.4-.3-.7-.6-.9-.3-.2-.6-.1-.8.1l-13.1 12.3c0 0 0 0 0 0-.2.2-.3.5-.4.8 0 .3 0 .7.2 1 .1.1 1.4 2.5 2.1 3.6 2.4 3.7 6.5 12.1 6.5 12.2.2.3.4.5.7.6.3 0 .5-.1.7-.3 0 0 1.8-2.5 2.7-3.6 1.5-1.6 3-3.2 4.6-4.7 1.2-1.2 1.6-1.4 2.1-1.6.5-.3 1.1-.5 2.5-1.9C1226.5 230.4 1226.6 229.6 1226.3 229.1zM33 770.3C33 770.3 33 770.3 33 770.3c0-.7-.5-1.2-1.2-1.2-.1 0-.3 0-.4.1-1.6.2-14.3.1-22.2 0-.3 0-.6.1-.9.4-.2.2-.4.5-.4.9 0 .2 0 4.9.1 5.9l.4 13.6c0 .3.2.6.4.9.2.2.5.3.8.3 0 0 .1 0 .1 0 7.3-.7 14.7-.9 22-.6.3 0 .7-.1.9-.3.2-.2.4-.6.4-.9C32.9 783.3 32.9 776.2 33 770.3z'/%3E%3Cpath  fill='%235ff' d='M171.1 383.4c1.3-2.5 14.3-22 15.6-21.6.8.3 11.5 21.2 11.5 22.1C198.1 384.2 177.9 384 171.1 383.4zM596.4 711.8c-.1-.1-6.7-8.2-9.7-12.5-.2-.3-.5-1-.7-1.5-.2-.4-.4-.7-.7-.8-.3-.1-.6 0-.8.3L574 712c0 0 0 0 0 0-.2.2-.2.5-.2.9 0 .3.2.7.4.9.1.1 1.8 2.2 2.8 3.1 3.1 3.1 8.8 10.5 8.9 10.6.2.3.5.4.8.4.3 0 .5-.2.6-.5 0 0 1.2-2.8 2-4.1 1.1-1.9 2.3-3.7 3.5-5.5.9-1.4 1.3-1.7 1.7-2 .5-.4 1-.7 2.1-2.4C596.9 713.1 596.8 712.3 596.4 711.8zM727.5 179.9C727.5 179.9 727.5 179.9 727.5 179.9c.6.2 1.3-.2 1.4-.8 0-.1 0-.2 0-.4.2-1.4 2.8-12.6 4.5-19.5.1-.3 0-.6-.2-.8-.2-.3-.5-.4-.8-.5-.2 0-4.7-1.1-5.7-1.3l-13.4-2.7c-.3-.1-.7 0-.9.2-.2.2-.4.4-.5.6 0 0 0 .1 0 .1-.8 6.5-2.2 13.1-3.9 19.4-.1.3 0 .6.2.9.2.3.5.4.8.5C714.8 176.9 721.7 178.5 727.5 179.9zM728.5 178.1c-.1-.1-.2-.2-.4-.2C728.3 177.9 728.4 178 728.5 178.1z'/%3E%3Cg fill-opacity='1'  fill='%23FFF'%3E%3Cpath d='M699.6 472.7c-1.5 0-2.8-.8-3.5-2.3-.8-1.9 0-4.2 1.9-5 3.7-1.6 6.8-4.7 8.4-8.5 1.6-3.8 1.7-8.1.2-11.9-.3-.9-.8-1.8-1.2-2.8-.8-1.7-1.8-3.7-2.3-5.9-.9-4.1-.2-8.6 2-12.8 1.7-3.1 4.1-6.1 7.6-9.1 1.6-1.4 4-1.2 5.3.4 1.4 1.6 1.2 4-.4 5.3-2.8 2.5-4.7 4.7-5.9 7-1.4 2.6-1.9 5.3-1.3 7.6.3 1.4 1 2.8 1.7 4.3.5 1.1 1 2.2 1.5 3.3 2.1 5.6 2 12-.3 17.6-2.3 5.5-6.8 10.1-12.3 12.5C700.6 472.6 700.1 472.7 699.6 472.7zM740.4 421.4c1.5-.2 3 .5 3.8 1.9 1.1 1.8.4 4.2-1.4 5.3-3.7 2.1-6.4 5.6-7.6 9.5-1.2 4-.8 8.4 1.1 12.1.4.9 1 1.7 1.6 2.7 1 1.7 2.2 3.5 3 5.7 1.4 4 1.2 8.7-.6 13.2-1.4 3.4-3.5 6.6-6.8 10.1-1.5 1.6-3.9 1.7-5.5.2-1.6-1.4-1.7-3.9-.2-5.4 2.6-2.8 4.3-5.3 5.3-7.7 1.1-2.8 1.3-5.6.5-7.9-.5-1.3-1.3-2.7-2.2-4.1-.6-1-1.3-2.1-1.9-3.2-2.8-5.4-3.4-11.9-1.7-17.8 1.8-5.9 5.8-11 11.2-14C739.4 421.6 739.9 421.4 740.4 421.4zM261.3 590.9c5.7 6.8 9 15.7 9.4 22.4.5 7.3-2.4 16.4-10.2 20.4-3 1.5-6.7 2.2-11.2 2.2-7.9-.1-12.9-2.9-15.4-8.4-2.1-4.7-2.3-11.4 1.8-15.9 3.2-3.5 7.8-4.1 11.2-1.6 1.2.9 1.5 2.7.6 3.9-.9 1.2-2.7 1.5-3.9.6-1.8-1.3-3.6.6-3.8.8-2.4 2.6-2.1 7-.8 9.9 1.5 3.4 4.7 5 10.4 5.1 3.6 0 6.4-.5 8.6-1.6 4.7-2.4 7.7-8.6 7.2-15-.5-7.3-5.3-18.2-13-23.9-4.2-3.1-8.5-4.1-12.9-3.1-3.1.7-6.2 2.4-9.7 5-6.6 5.1-11.7 11.8-14.2 19-2.7 7.7-2.1 15.8 1.9 23.9.7 1.4.1 3.1-1.3 3.7-1.4.7-3.1.1-3.7-1.3-4.6-9.4-5.4-19.2-2.2-28.2 2.9-8.2 8.6-15.9 16.1-21.6 4.1-3.1 8-5.1 11.8-6 6-1.4 12 0 17.5 4C257.6 586.9 259.6 588.8 261.3 590.9z'/%3E%3Ccircle cx='1013.7' cy='153.9' r='7.1'/%3E%3Ccircle cx='1024.3' cy='132.1' r='7.1'/%3E%3Ccircle cx='1037.3' cy='148.9' r='7.1'/%3E%3Cpath d='M1508.7 297.2c-4.8-5.4-9.7-10.8-14.8-16.2 5.6-5.6 11.1-11.5 15.6-18.2 1.2-1.7.7-4.1-1-5.2-1.7-1.2-4.1-.7-5.2 1-4.2 6.2-9.1 11.6-14.5 16.9-4.8-5-9.7-10-14.7-14.9-1.5-1.5-3.9-1.5-5.3 0-1.5 1.5-1.5 3.9 0 5.3 4.9 4.8 9.7 9.8 14.5 14.8-1.1 1.1-2.3 2.2-3.5 3.2-4.1 3.8-8.4 7.8-12.4 12-1.4 1.5-1.4 3.8 0 5.3 0 0 0 0 0 0 1.5 1.4 3.9 1.4 5.3-.1 3.9-4 8.1-7.9 12.1-11.7 1.2-1.1 2.3-2.2 3.5-3.3 4.9 5.3 9.8 10.6 14.6 15.9.1.1.1.1.2.2 1.4 1.4 3.7 1.5 5.2.2C1510 301.2 1510.1 298.8 1508.7 297.2zM327.6 248.6l-.4-2.6c-1.5-11.1-2.2-23.2-2.3-37 0-5.5 0-11.5.2-18.5 0-.7 0-1.5 0-2.3 0-5 0-11.2 3.9-13.5 2.2-1.3 5.1-1 8.5.9 5.7 3.1 13.2 8.7 17.5 14.9 5.5 7.8 7.3 16.9 5 25.7-3.2 12.3-15 31-30 32.1L327.6 248.6zM332.1 179.2c-.2 0-.3 0-.4.1-.1.1-.7.5-1.1 2.7-.3 1.9-.3 4.2-.3 6.3 0 .8 0 1.7 0 2.4-.2 6.9-.2 12.8-.2 18.3.1 12.5.7 23.5 2 33.7 11-2.7 20.4-18.1 23-27.8 1.9-7.2.4-14.8-4.2-21.3l0 0C347 188.1 340 183 335 180.3 333.6 179.5 332.6 179.2 332.1 179.2zM516.3 60.8c-.1 0-.2 0-.4-.1-2.4-.7-4-.9-6.7-.7-.7 0-1.3-.5-1.4-1.2 0-.7.5-1.3 1.2-1.4 3.1-.2 4.9 0 7.6.8.7.2 1.1.9.9 1.6C517.3 60.4 516.8 60.8 516.3 60.8zM506.1 70.5c-.5 0-1-.3-1.2-.8-.8-2.1-1.2-4.3-1.3-6.6 0-.7.5-1.3 1.2-1.3.7 0 1.3.5 1.3 1.2.1 2 .5 3.9 1.1 5.8.2.7-.1 1.4-.8 1.6C506.4 70.5 506.2 70.5 506.1 70.5zM494.1 64.4c-.4 0-.8-.2-1-.5-.4-.6-.3-1.4.2-1.8 1.8-1.4 3.7-2.6 5.8-3.6.6-.3 1.4 0 1.7.6.3.6 0 1.4-.6 1.7-1.9.9-3.7 2-5.3 3.3C494.7 64.3 494.4 64.4 494.1 64.4zM500.5 55.3c-.5 0-.9-.3-1.2-.7-.5-1-1.2-1.9-2.4-3.4-.3-.4-.7-.9-1.1-1.4-.4-.6-.3-1.4.2-1.8.6-.4 1.4-.3 1.8.2.4.5.8 1 1.1 1.4 1.3 1.6 2.1 2.6 2.7 3.9.3.6 0 1.4-.6 1.7C500.9 55.3 500.7 55.3 500.5 55.3zM506.7 55c-.3 0-.5-.1-.8-.2-.6-.4-.7-1.2-.3-1.8 1.2-1.7 2.3-3.4 3.3-5.2.3-.6 1.1-.9 1.7-.5.6.3.9 1.1.5 1.7-1 1.9-2.2 3.8-3.5 5.6C507.4 54.8 507.1 55 506.7 55zM1029.3 382.8c-.1 0-.2 0-.4-.1-2.4-.7-4-.9-6.7-.7-.7 0-1.3-.5-1.4-1.2 0-.7.5-1.3 1.2-1.4 3.1-.2 4.9 0 7.6.8.7.2 1.1.9.9 1.6C1030.3 382.4 1029.8 382.8 1029.3 382.8zM1019.1 392.5c-.5 0-1-.3-1.2-.8-.8-2.1-1.2-4.3-1.3-6.6 0-.7.5-1.3 1.2-1.3.7 0 1.3.5 1.3 1.2.1 2 .5 3.9 1.1 5.8.2.7-.1 1.4-.8 1.6C1019.4 392.5 1019.2 392.5 1019.1 392.5zM1007.1 386.4c-.4 0-.8-.2-1-.5-.4-.6-.3-1.4.2-1.8 1.8-1.4 3.7-2.6 5.8-3.6.6-.3 1.4 0 1.7.6.3.6 0 1.4-.6 1.7-1.9.9-3.7 2-5.3 3.3C1007.7 386.3 1007.4 386.4 1007.1 386.4zM1013.5 377.3c-.5 0-.9-.3-1.2-.7-.5-1-1.2-1.9-2.4-3.4-.3-.4-.7-.9-1.1-1.4-.4-.6-.3-1.4.2-1.8.6-.4 1.4-.3 1.8.2.4.5.8 1 1.1 1.4 1.3 1.6 2.1 2.6 2.7 3.9.3.6 0 1.4-.6 1.7C1013.9 377.3 1013.7 377.3 1013.5 377.3zM1019.7 377c-.3 0-.5-.1-.8-.2-.6-.4-.7-1.2-.3-1.8 1.2-1.7 2.3-3.4 3.3-5.2.3-.6 1.1-.9 1.7-.5.6.3.9 1.1.5 1.7-1 1.9-2.2 3.8-3.5 5.6C1020.4 376.8 1020.1 377 1019.7 377zM1329.7 573.4c-1.4 0-2.9-.2-4.5-.7-8.4-2.7-16.6-12.7-18.7-20-.4-1.4-.7-2.9-.9-4.4-8.1 3.3-15.5 10.6-15.4 21 0 1.5-1.2 2.7-2.7 2.8 0 0 0 0 0 0-1.5 0-2.7-1.2-2.7-2.7-.1-6.7 2.4-12.9 7-18 3.6-4 8.4-7.1 13.7-8.8.5-6.5 3.1-12.9 7.4-17.4 7-7.4 18.2-8.9 27.3-10.1l.7-.1c1.5-.2 2.9.9 3.1 2.3.2 1.5-.9 2.9-2.3 3.1l-.7.1c-8.6 1.2-18.4 2.5-24 8.4-3 3.2-5 7.7-5.7 12.4 7.9-1 17.7 1.3 24.3 5.7 4.3 2.9 7.1 7.8 7.2 12.7.2 4.3-1.7 8.3-5.2 11.1C1335.2 572.4 1332.6 573.4 1329.7 573.4zM1311 546.7c.1 1.5.4 3 .8 4.4 1.7 5.8 8.7 14.2 15.1 16.3 2.8.9 5.1.5 7.2-1.1 2.7-2.1 3.2-4.8 3.1-6.6-.1-3.2-2-6.4-4.8-8.3C1326.7 547.5 1317.7 545.6 1311 546.7z'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: auto;
  background-repeat: repeat;
  background-position: center center;
}
.cloudflare{
  transition: all .3s ease-in-out;
}
.cloudflare:hover{
  color:purple;
  font-size: 23px;
}
.icon{
  transition: all .5s ease-in-out;
 }
/* The switch - the box around the slider */
/*.switch {*/
/*  font-size: 17px;*/
/*  position: relative;*/
/*  display: inline-block;*/
/*  width: 3.5em;*/
/*  height: 2em;*/
/*}*/

/*!* Hide default HTML checkbox *!*/
/*.switch input {*/
/*  opacity: 0;*/
/*  width: 0;*/
/*  height: 0;*/
/*}*/

/*!* The slider *!*/
/*.slider {*/
/*  --background: #28096b;*/
/*  position: absolute;*/
/*  cursor: pointer;*/
/*  top: 0;*/
/*  left: 0;*/
/*  right: 0;*/
/*  bottom: 0;*/
/*  background-color: var(--background);*/
/*  transition: .5s;*/
/*  border-radius: 30px;*/
/*}*/

/*.slider:before {*/
/*  position: absolute;*/
/*  content: "";*/
/*  height: 1.4em;*/
/*  width: 1.4em;*/
/*  border-radius: 50%;*/
/*  left: 10%;*/
/*  bottom: 15%;*/
/*  box-shadow: inset 8px -4px 0px 0px #fff000;*/
/*  background: var(--background);*/
/*  transition: .5s;*/
/*}*/

/*input:checked + .slider {*/
/*  background-color: #522ba7;*/
/*}*/

/*input:checked + .slider:before {*/
/*  transform: translateX(100%);*/
/*  box-shadow: inset 15px -4px 0px 15px #fff000;*/
/*}*/
</style>
