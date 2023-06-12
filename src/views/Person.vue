<template>
  <q-page-container draggable="false">
    <q-page class="q-pa-sm">
<!--      <q-list>-->
<!--        <q-item>-->
<!--          <q-field dense rounded outlined label="username"  stack-label maxlength="500px" filled style="width: 100%">-->
<!--            <template v-slot:control>-->
<!--              <div class="self-center full-width no-outline" tabindex="0">{{ username }} </div>-->
<!--            </template>-->
<!--          </q-field>-->
<!--        </q-item>-->
<!--        <q-item clickable v-ripple>-->
<!--          <q-field dense rounded outlined label="avatar"  stack-label maxlength="500px" filled style="width: 100%">-->
<!--            <template v-slot:control>-->
<!--              <div class="self-center full-width no-outline" tabindex="0">{{ avatar }}</div>-->
<!--            </template>-->
<!--          </q-field>-->
<!--        </q-item>-->
<!--        <q-item v-morph:menu:group1:300.resize="alertModel"  @click="togglealertdialog" clickable>-->
<!--          <q-field dense rounded outlined label="alertToken"  stack-label length="500px" filled style="width: 100%">-->
<!--            <template v-slot:control>-->
<!--              <div class="self-center full-width no-outline" tabindex="0">{{ alertToken }}</div>-->
<!--            </template>-->
<!--          </q-field>-->
<!--        </q-item>-->

<!--      </q-list>-->
      <div class="flex q-gutter-md-sm">
        <div>
          <q-card>

          </q-card>
        </div>
      </div>
      <q-stepper
        v-morph:step:group1:300.resize="alertModel"
        active-color="purple"
        ref="stepper"
        animated
      v-model="step">
        <q-step
          :name="1"
          :prefix="1"
          title="开始"
        >
          该AlertToken项是进行事务推送的必须项。
          在设置好AlterToken之后，你可以通过在Thing界面配置事务，之后便可以享受手机上无后台的系统级MiPush了！
          让我们开始吧！
        </q-step>
        <q-step
          :name="2"
          :prefix="2"
          title="注册">
          首先你需要注册一个“饭碗警告”的账号，你可以通过微信公众号和官网注册
        </q-step>
        <q-step
          :name="3"
          :prefix="3"
          title="配置">
          <span>然后你需要新建一个转发规则。然后你需要配置一下触发类型为WebHook，并设置start、message、end、type、tag等变量名，并设置变量来源为查询字符串。</span>
          <span>在设置完成之后，通知和正文就可以用双花括号的方式来获取这些变量了。</span>
          <span>
            最后你需要设置你的触发类型为「饭碗警告」应用，这样就可以推送到你的手机上了。你当然可以选择其他的，以便更灵活地使用这项提醒功能.
          </span>
        </q-step>
        <q-step
          :name="4"
          :prefix="4"
          title="填写你的Token！">
          在配置完成之后，请你填写你的AlertToklen，这样便大功告成！
          <div>
            <q-input
              v-model="alertToken"
              outlined
              rounded
              color="purple-12"
              label="输入你的Token！"
              :rules="[
              val => val && val.length>0 && val !='null' || 'token不为空'
              ]">
              <template v-slot:append>
                <q-btn round dense flat icon="add" @click="setalertToken()" />
              </template>
            </q-input>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn @click="nexttick" color="deep-orange" :label="step === 4 ? 'SetTokn' : 'Continue'" />
            <q-btn  flat color="deep-orange" @click="privioustick" :label="step === 1 ? 'Close' : 'Back'" class="q-ml-sm" />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-page>
  </q-page-container>

</template>

<script>

import { userStore } from 'stores/user-store'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Person',
  setup () {
    const userstore = userStore()

    return {
      userstore,
      step: ref(1)
    }
  },

  data () {
    return {
      alertModel: 'menu',
      username: 'aac',
      avatar: 'acc',
      alertToken: 'acc'
    }
  },
  methods: {
    nexttick () {
      if (this.step === 4) {
        this.setalertToken()
          .then(r => {
            this.togglealertdialog()
          })
      } else this.$refs.stepper.next()
    },
    privioustick () {
      if (this.step === 1) {
        this.togglealertdialog()
      } else {
        this.$refs.stepper.previous()
      }
    },

    async setalertToken () {
      return this.userstore.setalerttoken(this.alertToken)
    },
    togglealertdialog () {
      this.alertModel = this.alertModel === 'menu' ? 'step' : 'menu'
    }
  },
  mounted () {
    this.username = this.userstore.getUsername
    this.avatar = this.userstore.getAvatar
    this.alertToken = this.userstore.getalertToken
  }
})
</script>

<style scoped>

</style>
