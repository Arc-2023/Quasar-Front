<template>
<q-page-container>
  <q-page class="q-py-sm q-px-none row wrap q-gutter-sm justify-center">
    <div class="flex justify-center">
      <transition-group
                      appear
                      enter-active-class="animated fadeIn"
                      leave-active-class="animated fadeOut">
          <ThingCard
            class="q-ma-sm"
            v-for="(item) in thingdata"
            v-show="item.show && is_searched(item) && filt_bytag(item)"
            :item="item"
            :index="index"
            :key="item.id"
            @call-deletefun="deletefun"
            @call-stopfun="stopfun"
            @call-restartfun="restartfun"/>
      </transition-group>
    </div>
<!--  morphing使用到的组件  -->
    <q-page-sticky position="bottom-left" :offset="[18,18]">
        <q-btn
          v-morph:newbtn:group2:300.resize="newmorphing"
          fab
          icon="add"
          color="primary"
          @click="ToggleNewCard"
        >NEW</q-btn>
    </q-page-sticky>
    <q-page-sticky
      position="bottom-left"
      :offset="[18,18]"
      v-morph:newcard:group2:300.resize="newmorphing"
      v-show="newmorphing=='newcard'">
      <q-card  class=" q-pa-sm bg-transparent mdi-border-radius"
              style="
              backdrop-filter: blur(100px);border-radius: 10px">
        <q-form
          @submit="addthing"
          @reset="onReset"
          class="q-gutter-sm"
        >
          <q-input
            rounded
            outlined
            dense
            v-model="tmpdata.name"
            label="name"
            hint="Enter name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            rounded
            outlined
            dense
            type="number"
            v-model="tmpdata.type"
            label="提醒间隔"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || '请输入间隔',
          val => val > 0 && val < 144 || '间隔不符合规范'
        ]"
          />
          <q-input
            rounded
            outlined
            dense
            :rules="[
              val => val && val.length > 0 || 'Please type something'
            ]"
            hint="输入时间"
            label="startTime"
            lazy-rules
            v-model="tmpdata.startTime">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale" class="mdi-border-radius" style="border-radius: 10px">
                  <q-date v-model="tmpdata.startTime" mask="YYYY-MM-DD HH:mm" today-btn>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale" class="mdi-border-radius" style="border-radius: 10px">
                  <q-time v-model="tmpdata.startTime" mask="YYYY-MM-DD HH:mm" now-btn>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            rounded
            outlined
            dense
            :rules="[
              val => val && val.length > 0 || 'Please type something'
            ]"
            hint="输入时间"
            label="endTime"
            v-model="tmpdata.endTime">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale" class="mdi-border-radius" style="border-radius: 10px">
                  <q-date v-model="tmpdata.endTime" mask="YYYY-MM-DD HH:mm" today-btn>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale" class="mdi-border-radius" style="border-radius: 10px">
                  <q-time v-model="tmpdata.endTime" mask="YYYY-MM-DD HH:mm" now-btn>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            rounded
            outlined
            dense
            v-model="tmpdata.tag"
            label="标签"
            hint="Enter tag"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            rounded
            outlined
            dense
            v-model="tmpdata.message"
            label="Content"
            hint="Enter message"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <div>
            <q-btn flat color="green" label="Submit" type="submit"/>
            <q-btn label="Reset" type="reset" color="red" flat class="q-ml-sm" @click="onReset" />
            <q-btn label="Close" flat class="q-ml-sm" @click="ToggleNewCard" />
          </div>
        </q-form>
      </q-card>
    </q-page-sticky>

    <q-page-sticky position="top-right" :offset="[18,18]" >
      <q-btn fab color="purple-7" @click="this.refresh">
        <i class="fa-sharp fa-solid fa-rotate-right"></i>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky
      :offset="[18,18]"
      position="bottom-right">
      <q-btn color="primary" v-morph:fab:group1:300.resize="rightcardmodel" fab @click="this.rightcardmodel='rightcard'">
        <q-icon name="list" color="white"></q-icon></q-btn>
    </q-page-sticky>
    <q-page-sticky
      position="bottom-right"  v-show="rightcardmodel=='rightcard'" :offset="[18,18]">
      <q-card
        v-morph:rightcard:group1:300.resize="rightcardmodel"
        class="q-pa-sm mdi-border-radius" style="border-radius: 10px;backdrop-filter: blur(10px);background: transparent;max-width: 200px">
        <q-card-section class="q-pa-none q-ma-none">
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
                    leave-active-class="animated fadeOut">
                    <q-icon v-show="isactivated(data)" name="done" class="q-mr-sm "/>
                  </transition>
                  {{data}}
                </div>
              </q-chip>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-ma-none">
          <div @click="sortthings('interval')">
            <q-chip  :outline="checksort('interval')" dense class="q-mr-sm text-body2 cursor-pointer" style="transition: all .5s">
              <transition
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                <q-icon v-show="checksort('interval')" name="done" class="q-mr-sm"/>
              </transition>
              提醒间隔升序
            </q-chip>
          </div>
          <div @click="sortthings('restTime')">
            <q-chip  :outline="checksort('restTime')" dense class="q-mr-sm text-body2 cursor-pointer" style="transition: all .5s">
              <transition
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut">
                <q-icon v-show="checksort('restTime')" name="done" class="q-mr-sm "/>
              </transition>
              剩余时间升序
            </q-chip>
          </div>

<!--          <q-chip :outline="checksort('endTime')" dense class="q-mr-sm text-body2 cursor-pointer" style="transition: all .5s"></q-chip>-->

        </q-card-section>
        <q-card-actions>
          <q-btn color="white" flat text-color="black" @click="this.rightcardmodel='fab'">BACK</q-btn>
        </q-card-actions>
      </q-card>
    </q-page-sticky>
  </q-page>
  <q-dialog v-model="deleteM" >
    <q-card class="absolute-center z-top">
      <q-card-section class="bg-amber">
        <div class="text-h6">你确定要删除{{getnamebyid(deletingid)}}吗？</div>
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
import { defineComponent } from 'vue'
import { date } from 'quasar'
import { thingStore } from 'stores/thing-store'
import ThingCard from 'components/ThingCard.vue'
import { developStore } from 'stores/develop-store'

export default defineComponent({
  name: 'Thing',
  components: { ThingCard },
  setup () {
    const datee = date
    const thingstore = thingStore()
    // const thingdata = ref([])
    const devestore = developStore()
    return {
      thingstore,
      // thingdata,
      datee,
      devestore
    }
  },
  data: function () {
    return {
      sortType: '',
      editingitem: '',
      editormorphing: 'content',
      newmorphing: 'newbtn',
      morphingstate: false,
      rightcardmodel: 'fab',
      search_content: '',
      thingdata: [
        // {
        //   id: 1,
        //   name: 'name',
        //   startTime: '2023-04-04 12:44',
        //   endTime: '2023-04-06 12:44',
        //   tag: 'math',
        //   type: 5,
        //   message: 'content',
        //   status: 'Pause'
        // }
      ],
      tmpdata: {
        id: '',
        name: '',
        startTime: this.datee.formatDate(Date.now(), 'YYYY-MM-DD HH:mm'),
        endTime: '',
        tag: 'default',
        type: 12,
        message: ''
      },
      index: 0,
      deleteM: false,
      deletingid: '',
      tags: [],
      active_tag: []
    }
  },
  computed: {
  },
  methods: {
    getDateDiffHours (end) {
      const datee = Date.now()
      const fmtdate = date.formatDate(datee, 'YYYY-MM-DD HH:mm')
      return date.getDateDiff(end, fmtdate, 'hours')
    },
    checksort (lable) {
      return lable == this.sortType
    },
    sortthings (lable) {
      console.log(this.thingdata[0].endTime)
      if (lable == 'restTime') {
        this.sortby_endtime()
      } else {
        this.sortby_interval()
      }
      this.thingdata = this.thingdata.splice(0)
      // const tmp = this.thingdata.splice(0)
      // this.thingdata = []
      // tmp.forEach(e => {
      //   this.thingdata.push(e)
      // })
      // console.log(this.thingdata[0].endTime)
      this.sortType = lable
      // this.$forceUpdate()
    },
    filt_bytag (item) {
      return this.active_tag.some(e => item.tag == e) || this.active_tag.length === 0
    },
    sortby_endtime () {
      this.thingdata = Array.from(this.thingdata.splice(0)).sort((a, b) => {
        console.log(Date.parse(a.endTime) < Date.parse(b.endTime))
        return Date.parse(a.endTime) - Date.parse(b.endTime)
      })
    },
    sortby_interval () {
      this.thingdata.sort((a, b) => {
        return b.type - a.type
      })
    },
    is_searched (item) {
      if (this.search_content === '') return true
      else {
        return (item.name.includes(this.search_content) || item.message.includes(this.search_content))
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
      if (this.active_tag.some((e) => { return e === data })) {
        return true
      } else {
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
    getnamebyid (id) {
      return this.thingdata.find(e => e.id == id).name
    },
    deletefun (id) {
      console.log(id)
      this.toggledeldialog()
      this.deletingid = id
    },
    deleteitem () {
      this.thingstore.delthing(this.deletingid)
        .then(r => {
          this.thingdata = this.thingdata.map(e => {
            if (e.id == this.deletingid) e.show = false
            return e
          })
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
            e.showbytag = true
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
    this.refresh(true)
    this.devestore.changeheaderstatus('thing')
  }
})
</script>
<style scoped>
</style>
