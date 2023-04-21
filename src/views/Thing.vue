<template>
<q-page-container>
  <q-page class="q-pa-sm row wrap q-gutter-sm justify-center"
          v-morph:menu:group1:200.resize="deleteM"

          >
    <transition-group
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"

    >
    <q-card style="
          width: 180px;
          height: 300px;"
          class="q-pa-sm"
          v-for="(item,index) in thingdata"
          :key="index">
          <q-item
            class=" bg-grey-2" clickable v-ripple
          >
            <q-item-section class="justify-sm-start">
              <div>
                <!--            <q-linear-progress size="5px" :value="progresss" rounded :color="progresscolor"></q-linear-progress>-->
                <q-circular-progress
                  disable
                  :value="getprogressss(item)"
                  show-value
                  size="80px"
                  :color="getprogresscolor(item)"
                  class="text-weight-bolder"
                  :thickness="0.5"
                  track-color="grey"
                ></q-circular-progress>
              </div>
            </q-item-section>
            <q-item-section>
              <div class="flex justify-end" cursor-pointer>
                <q-chip  class="text-caption" :color="getprogresscolor(item)" icon="alarm" text-color="white" dense :label="getDateDiffHours(item.endTime)"/>
                <q-chip   class="text-caption " :color="getprogresscolor(item)" icon="reviews" text-color="white" dense :label="item.tag">
                </q-chip>
                <q-chip   class="text-caption " :color="getprogresscolor(item)" icon="speed" text-color="white" dense :label="item.type">
                </q-chip>
                <q-popup-proxy breakpoint="300"  cover transition-show="scale" transition-hide="scale">
                  <q-input dense filled v-model="item.tag">
                    <template v-slot:append>
                      <q-avatar icon="save" v-ripple @click="updateitem(item)"></q-avatar>
                    </template>
                  </q-input>
                  <q-input dense filled v-model="item.type">
                    <template v-slot:append>
                      <q-avatar icon="save" v-ripple @click="updateitem(item)"></q-avatar>
                    </template>
                  </q-input>

                </q-popup-proxy>
              </div>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple class=" q-my-sm q-pa-none cursor-pointer" style="">
            <q-item-section class="q-ma-none">
              <q-field filled label="name" dense stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline">
                    <q-item-section>
                      <q-item-label class="" :lines="2">
                        {{ item.name }}
                      </q-item-label>
                    </q-item-section>
                  </div>
                </template>

              </q-field>
              <q-popup-proxy breakpoint="300">
                <q-input dense v-model="item.name" outlined class="border-radius-inherit">
                  <template v-slot:append>
                    <q-avatar icon="save" v-ripple @click="updateitem(item)"></q-avatar>
                  </template>
                </q-input>
              </q-popup-proxy>
            </q-item-section>
          </q-item>
          <q-item class="bg-grey-2 q-my-sm column" style="height: 27%">
            <q-item-label top>
              <q-badge class="float-left" transparent outline color="primary">
                Content
              </q-badge>
            </q-item-label>
            <q-item-section clickable v-ripple
                            class="cursor-pointer"
            >
              <q-item-section>
                <q-item-label class="" :lines="2">
                  {{item.message}}
                </q-item-label>
              </q-item-section>
              <q-popup-edit title="Content"
               v-model="item.message"
              v-slot="scope">
                <q-input
                  type="textarea"
                  autofocus counter
                  @keyup.enter.stop
                  v-model="scope.value">
                  <template v-slot:after>
                    <q-avatar icon="save" v-ripple @click="saveitem(item,scope)"></q-avatar>
                  </template>
                </q-input>

              </q-popup-edit>
            </q-item-section>
          </q-item>

          <q-item class="q-pa-none q-ma-none">
            <q-item-section>
              <div>
                <q-input dense filled v-model="item.endTime">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="item.endTime" mask="YYYY-MM-DD HH:mm">
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="item.endTime" mask="YYYY-MM-DD HH:mm" now-btn>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Save" color="primary" flat @click="updateitem(item)"/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </q-item-section>
          </q-item>
          <q-menu
            touch-position
            context-menu
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <q-list dense style="min-width: 100px">
              <q-item clickable @click="deletefun(index)">
                <q-item-section>Delete</q-item-section>
              </q-item>
              <q-item clickable @click="stopfun(item,index)">
                <q-item-section>Stop</q-item-section>
              </q-item>
              <q-item clickable @click="restartfun(item,index)">
                <q-item-section>Restart</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
      <q-badge floating rounded :color="this.getcolor(item)">

      </q-badge>
    </q-card>
    </transition-group>

<!--  morphing使用到的组件  -->
    <q-page-sticky position="bottom-right" :offset="[18,18]" >
      <q-btn fab icon="add" color="accent" @click="ToggleNewCard" v-morph:newbtn:group2:200.resize="newmorphing"></q-btn>
    </q-page-sticky>

    <q-page-sticky position="bottom-right" :offset="[18,18]" v-morph:newcard:group2:200.resize="newmorphing">
      <q-card class="q-pa-md">
        <q-form
          @submit="addthing"
          @reset="onReset"
          class="q-gutter-sm"
        >
          <q-input
            filled
            v-model="tmpdata.name"
            label="name"
            hint="Enter name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            dense
          />

          <q-input
            filled
            type="number"
            v-model="tmpdata.type"
            label="提醒间隔"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || '请输入间隔',
          val => val > 0 && val < 144 || '间隔不符合规范'
        ]"
            dense
          />
          <q-input
            :rules="[
              val => val && val.length > 0 || 'Please type something'
            ]"
            hint="输入时间"
            label="startTime"
            lazy-rules
            dense filled v-model="tmpdata.startTime">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="tmpdata.startTime" mask="YYYY-MM-DD HH:mm" today-btn>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="tmpdata.startTime" mask="YYYY-MM-DD HH:mm" now-btn>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            :rules="[
              val => val && val.length > 0 || 'Please type something'
            ]"
            hint="输入时间"
            label="endTime"
            dense filled v-model="tmpdata.endTime">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="tmpdata.endTime" mask="YYYY-MM-DD HH:mm" today-btn>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="tmpdata.endTime" mask="YYYY-MM-DD HH:mm" now-btn>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            filled
            v-model="tmpdata.tag"
            label="标签"
            hint="Enter tag"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            dense
          />
          <q-input
            filled
            v-model="tmpdata.message"
            label="Content"
            hint="Enter message"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            dense
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" @click="onReset" />
            <q-btn label="Close" color="primary" flat class="q-ml-sm" @click="ToggleNewCard" />
          </div>
        </q-form>
      </q-card>
    </q-page-sticky>

    <q-page-sticky position="top-right" :offset="[18,18]" >
      <q-btn fab color="accent" @click="this.refresh">
        <i class="fa-sharp fa-solid fa-rotate-right"></i>
      </q-btn>
    </q-page-sticky>
  </q-page>
  <q-card v-morph:cards:group1:200.resize="deleteM" class="absolute-center z-top">
    <q-card-section class="bg-amber ">
      <div class="text-h6">你确定要删除吗？</div>
      <div class="text-subtitle2 text-red">这是不可恢复的</div>
    </q-card-section>
    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="否" v-close-popup @click="toggledeldialog()"></q-btn>
      <q-btn flat label="是" v-close-popup @click="deleteitem()"></q-btn>
    </q-card-actions>
  </q-card>
</q-page-container>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import { thingStore } from 'stores/thing-store'

export default defineComponent({
  name: 'Thing',
  setup () {
    const thingstore = thingStore()
    const tmp = {
      id: 7,
      name: 'name',
      startTime: '2023-04-04 12:44',
      endTime: '2023-04-06 12:44',
      tag: 'tag',
      type: '5',
      content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
    }
    return {
      thingstore
    }
  },
  data: function () {
    return {
      editingitem: '',
      editormorphing: 'content',
      newmorphing: 'newbtn',
      morphingstate: false,
      thingdata: [
        {
          id: 1,
          name: 'name',
          startTime: '2023-04-04 12:44',
          endTime: '2023-04-06 12:44',
          tag: 'math',
          type: 5,
          message: 'content',
          status: 'Pause'
        }
      ],
      tmpdata: {
        id: 1,
        name: 'name',
        startTime: '2023-04-04 12:44',
        endTime: '2023-04-06 12:44',
        tag: 'math',
        type: 5,
        message: 'content'

      },
      index: 0,
      deleteM: 'menu',
      deletingindex: 0
    }
  },
  computed: {

  },
  methods: {
    getDateDiffHours (end) {
      const datee = Date.now()
      const fmtdate = date.formatDate(datee, 'YYYY-MM-DD HH:mm')
      return date.getDateDiff(end, fmtdate, 'hours') + 'H'
    },
    getcolor (item) {
      if (item.status === 'Running') return 'green'
      else if (item.status === 'Expired') return 'grey'
      else return 'orange'
    },
    deletefun (index) {
      this.toggledeldialog()
      this.deletingindex = index
    },
    deleteitem () {
      this.thingstore.delthing(this.thingdata[this.deletingindex].id)
        .then(r => {
          this.thingdata.splice(this.deletingindex, 1)
          this.toggledeldialog()
        })
        .catch(e => {
          this.toggledeldialog()
        })
    },
    stopfun (item, index) {
      this.thingstore.stopfun(item.id)
        .then(r => {
          this.thingdata[index].status = 'Pause'
        })
    },
    restartfun (item, index) {
      this.thingstore.restartfun(item.id)
        .then(r => {
          this.thingdata[index].status = 'Running'
        })
    },
    toggledeldialog () {
      if (this.deleteM === 'menu') this.deleteM = 'cards'
      else this.deleteM = 'menu'
    },
    ToggleNewCard: function () {
      this.newmorphing = this.newmorphing === 'newbtn' ? 'newcard' : 'newbtn'
    },
    getprogresss: function (item) {
      const noww = Date.now()
      const formatedate = date.formatDate(noww, 'YYYY-MM-DD HH:mm')
      return date.getDateDiff(formatedate, item.startTime, 'minutes') / date.getDateDiff(item.endTime, item.startTime, 'minutes')
    },
    getprogresscolor: function (item) {
      if (this.getprogresss(item) > 0.8) return 'red'
      else if (this.getprogresss(item) > 0.6) return 'orange'
      else return 'green'
    },
    getprogressss: function (item) {
      return (this.getprogresss(item) * 100).toString().slice(0, 4)
    },
    saveitem (item, scope) {
      item.message = scope.value
      this.updateitem(item)
    },
    updateitem (item) {
      this.thingstore.updatething(item)
        .catch(e => {
          this.refresh()
        })
    },
    addthing () {
      this.thingstore.addthing(this.tmpdata)
        .then(r => {
          this.ToggleNewCard()
          this.thingstore.refreshThings()
            .then(r => {
              this.thingdata = r
            })
        })
    },
    onReset () {
      for (const key in this.tmpdata) {
        this.tmpdata[key] = ''
      }
    },
    deletething () {

    },
    stopthing () {

    },
    refresh () {
      this.thingstore.refreshThings()
        .then(r => {
          this.thingdata = ' '
          setTimeout(() => {
            this.thingdata = r
          }, 200)
        })
      this.thingstore.initstart()
    }
  },
  mounted () {
    this.refresh()
  }
})
</script>
<style scoped>
</style>
