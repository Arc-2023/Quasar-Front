<template>
<q-page-container>
  <q-page class="q-pa-sm row wrap q-gutter-sm justify-center">
    <div class="flex justify-center">
      <q-intersection class="q-ma-sm"
                      v-for="(item,index) in thingdata"
                      :key="index"
                      once
                      transition="fade">
          <ThingCard :item="item" :index="index" @call-deletefun="deletefun" @call-stopfun="stopfun" @call-restartfun="restartfun"/>
      </q-intersection>

    </div>
<!--  morphing使用到的组件  -->
    <q-page-sticky position="bottom-right" :offset="[18,18]" v-morph:newbtn:group2:300.hideFromClone="newmorphing" >
      <q-btn
        fab
        icon="add"
        color="accent"
        @click="ToggleNewCard"

      ></q-btn>
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
      // thingdata: [
      //   {
      //     id: 1,
      //     name: 'name',
      //     startTime: '2023-04-04 12:44',
      //     endTime: '2023-04-06 12:44',
      //     tag: 'math',
      //     type: 5,
      //     message: 'content',
      //     status: 'Pause'
      //   }
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
      deletingindex: 0
    }
  },
  computed: {

  },
  methods: {
    deletefun (index) {
      this.toggledeldialog()
      this.deletingindex = index
    },
    deleteitem () {
      this.thingstore.delthing(this.thingdata[this.deletingindex].id)
        .then(r => {
          this.thingdata.splice(this.deletingindex, 1)
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
    refresh () {
      this.thingstore.refreshThings()
        .then(rs => {
          this.thingdata = Array.from(rs)
          console.log(this.thingdata)
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
