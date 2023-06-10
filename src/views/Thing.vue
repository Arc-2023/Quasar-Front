<template>
<q-page-container>
  <q-page class="q-pa-sm row wrap q-gutter-sm justify-center">
    <div class="flex justify-center">
      <transition class="q-ma-sm"
                      v-for="(item,index) in thingdata"
                      v-show="item.show && is_searched(item)"
                      :key="index"
                        appear
                        enter-active-class="animated fadeIn"
                        leave-active-class="animated fadeOut"
                      >
          <ThingCard :item="item" :index="index" @call-deletefun="deletefun" @call-stopfun="stopfun" @call-restartfun="restartfun"/>
      </transition>

    </div>
<!--  morphing使用到的组件  -->
    <q-page-sticky position="bottom-left" :offset="[18,18]" v-morph:newbtn:group2:300.hideFromClone="newmorphing" >
      <q-btn
        fab
        icon="add"
        color="primary"
        @click="ToggleNewCard"

      >NEW</q-btn>
    </q-page-sticky>
    <q-page-sticky

      position="bottom-right"
      :offset="[18,18]"
      v-morph:newcard:group2:300.hideFromClone="newmorphing"
      v-show="newmorphing=='newcard'">
      <q-card  class=" q-pa-sm bg-transparent"
              style="backdrop-filter: blur(10px)">
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

    <q-page-sticky
      position="bottom-right" >
      <q-btn flat fab class="q-ma-sm bg-blue" @click="this.rightcardmodel='rightcard'" v-morph:fab:group1:300.resize="rightcardmodel">
        <q-icon name="list"></q-icon></q-btn>
    </q-page-sticky>
    <q-page-sticky
      position="bottom-right"  v-show="rightcardmodel=='rightcard'">
      <q-card v-morph:rightcard:group1:300.resize="rightcardmodel"
              class="q-pa-sm mdi-border-radius"
              style="border-radius: 10px;backdrop-filter: blur(10px);background: transparent;max-width: 200px">
        <q-input
          rounded
          outlined
          dense
          v-model="search_content"
          label="Type to Search"
          class="self-stretch q-ma-sm"
        >
          <template v-slot:append>
            <q-icon style="overflow: hidden;border-radius: 50%" name="close" v-ripple @click="this.search_content = ''"></q-icon>
          </template>
        </q-input>
        <div style="align-self: start" class="q-ma-sm flex reverse wrap">
          <div v-for="(data,index) in tags" :key="index" @click="this.activated_tag(index)"
          >
            <q-chip :outline="isactivated(data)" dense class="q-mr-sm text-body2 cursor-pointer" style="transition: all .5s">
              <div>
                <transition
                  appear
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                >
                  <q-icon v-show="isactivated(data)" name="done" class="q-mr-sm "/>

                </transition>
                {{data}}
              </div>
            </q-chip>
          </div>
        </div>
        <q-card-actions>
          <q-btn color="white" flat text-color="black" @click="this.rightcardmodel='fab'">BACK</q-btn>
        </q-card-actions>
      </q-card>
    </q-page-sticky>
  </q-page>
  <q-dialog v-model="deleteM" >
    <q-card class="absolute-center z-top">
      <q-card-section class="bg-amber ">
        <div class="text-h6">你确定要删除吗？</div>
        <div class="text-subtitle2 text-red">这是不可恢复的</div>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn  flat label="否" v-close-popup @click="()=>deleteM=false"></q-btn>
        <q-btn flat label="是" v-close-popup @click="deleteitem()"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

</q-page-container>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { date } from 'quasar'
import { thingStore } from 'stores/thing-store'
import ThingCard from 'components/ThingCard.vue'

export default defineComponent({
  name: 'Thing',
  components: { ThingCard },
  setup () {
    const thingstore = thingStore()
    const thingdata = ref([])
    return {
      thingstore,
      thingdata
    }
  },
  data: function () {
    return {
      editingitem: '',
      editormorphing: 'content',
      newmorphing: 'newbtn',
      morphingstate: false,
      rightcardmodel: 'fab',
      search_content: '',
      // thingdata: [
      //   // {
      //   //   id: 1,
      //   //   name: 'name',
      //   //   startTime: '2023-04-04 12:44',
      //   //   endTime: '2023-04-06 12:44',
      //   //   tag: 'math',
      //   //   type: 5,
      //   //   message: 'content',
      //   //   status: 'Pause'
      //   // }
      // ],
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
      deleteM: false,
      deletingindex: 0,
      tags: [],
      active_tag: []
    }
  },
  computed: {

  },
  methods: {
    sortby_endtime () {
      this.thingdata.sort((a, b) => {
        return Date.parse(a.endTime) < Date.parse(a.endTime)
      })
    },
    sortby_resttime () {

    },
    is_searched (item) {
      if (this.search_content == '') return true
      else {
        if (item.name.includes(this.search_content) || item.message.includes(this.search_content)) return true; else return false
      }
    },
    filtdata () {
      if (this.active_tag.length == 0) {
        this.thingdata.forEach(e => { e.show = true })
      } else {
        this.thingdata.forEach(ee => {
          if (this.active_tag.some(e => ee.tag == e)) { ee.show = true } else ee.show = false
        })
      }
    },
    activated_tag (index) {
      if (!this.active_tag.some((e, indexx) => {
        if (e === this.tags[index]) {
          this.active_tag.splice(indexx, 1)
          return true
        }
        return false
      })) {
        this.active_tag.push(this.tags[index])
      }
    },
    isactivated (data) {
      console.log(this.active_tag)
      if (this.active_tag.some((e) => { return e === data })) {
        this.filtdata()
        return true
      } else {
        this.filtdata()
        return false
      }
    },
    // search () {
    //   this.thingdata.forEach(e => {
    //     if (!e.name.includes(this.search_content) &&
    //       !e.message.includes(this.search_content) &&
    //       this.search_content != '') { e.active = false }
    //   })
    // },
    deletefun (index) {
      this.toggledeldialog()
      this.deletingindex = index
    },
    deleteitem () {
      this.thingstore.delthing(this.thingdata[this.deletingindex].id)
        .then(r => {
          this.thingdata.at(this.deletingindex).show = false
          console.log('@', this.deletingindex)
          this.deleteM = false
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
      this.deleteM = true
    },
    ToggleNewCard: function () {
      this.newmorphing = this.newmorphing === 'newbtn' ? 'newcard' : 'newbtn'
    },
    addthing () {
      this.thingstore.addthing(this.tmpdata)
        .then(r => {
          this.ToggleNewCard()
          this.refresh(false)
        })
    },
    onReset () {
      for (const key in this.tmpdata) {
        this.tmpdata[key] = ''
      }
    },
    refresh (status) {
      this.thingstore.refreshThings()
        .then(rs => {
          rs.forEach((e) => {
            // console.log(e)
            e.show = true
            e.active = true
          })
          this.thingdata = rs
          this.thingdata.forEach(e => {
            if (!this.tags.some((ee, index) => ee == e.tag)) this.tags.push(e.tag)
          })
        })
      if (status) this.thingstore.initstart()
    }
  },
  mounted () {
    this.refresh()
  }
})
</script>
<style scoped>
</style>
