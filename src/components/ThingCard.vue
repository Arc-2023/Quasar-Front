<template>
  <q-card style="
          width: 170px;
          height: 310px;
          padding: 8px;
          border-radius: 11px;
          transition: all .5s;
          "
          @mouseenter="enterCard"
          @mouseleave="leaveCard"
          class="q-pa-none q-ma-none mdi-border-radius"
          >
    <q-item
      class=" bg-grey-2 q-pa-sm mdi-border-radius" style="border-radius: 10px" v-ripple clickable
    >
      <q-item-section class="justify-sm-start">
        <div>
          <!--            <q-linear-progress size="5px" :value="progresss" rounded :color="progresscolor"></q-linear-progress>-->
          <q-circular-progress
            disable
            :value="spliceTimeString(itemm)"
            show-value
            size="80px"
            :color="getprogresscolor(itemm)"
            class="text-weight-bolder"
            :thickness="0.5"
            track-color="grey"
          ></q-circular-progress>
        </div>
      </q-item-section>
      <q-item-section cursor-pointer>
        <div class="flex justify-end" >
          <q-chip  class="text-caption" :color="getprogresscolor(itemm)" icon="alarm" text-color="white" dense :label="getDateDiffHours(itemm.endTime)"/>
          <q-chip   class="text-caption " :color="getprogresscolor(itemm)" icon="reviews" text-color="white" dense :label="itemm.tag">
          </q-chip>
          <q-chip   class="text-caption " :color="getprogresscolor(itemm)" icon="speed" text-color="white" dense :label="itemm.type">
          </q-chip>
          <q-popup-proxy class="mdi-border-radius q-pa-sm" style="border-radius: 2rem" breakpoint="300"  cover transition-show="scale" transition-hide="scale">
            <q-input  dense rounded borderless  v-model="itemm.tag">

            </q-input>
            <q-input dense rounded borderless  v-model="itemm.type">
<!--              <template v-slot:append>-->
<!--                <q-btn rounded flat ripple icon="save" v-ripple @click="updateitem(itemm)"></q-btn>-->
<!--              </template>-->
            </q-input>
              <q-btn dense rounded flat ripple class="absolute-bottom-right q-mr-sm" icon="save" v-ripple @click="updateitem(itemm)"></q-btn>
          </q-popup-proxy>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="q-my-sm q-pa-none">
      <q-item-section class="mdi-border-radius"  style="border-radius: 10px">
        <q-field rounded
                 outlined
                 dense
                 label="name" stack-label >
          <template v-slot:control>
            <div class="self-center full-width no-outline">
              <q-item-section>
                <q-item-label class="" :lines="2">
                  {{ itemm.name }}
                </q-item-label>
              </q-item-section>
            </div>
          </template>

        </q-field>
        <q-popup-proxy breakpoint="300" class="mdi-border-radius" style="border-radius: 1rem">
          <q-input dense rounded borderless v-model="itemm.name" outlined>
            <template v-slot:append>
              <q-btn dense flat ripple rounded icon="save" v-ripple @click="updateitem(itemm)"></q-btn>
            </template>
          </q-input>
        </q-popup-proxy>
      </q-item-section>
    </q-item>
    <q-item class="bg-grey-2 q-mb-sm column mdi-border-radius" clickable v-ripple style="height: 25%;border-radius: 10px">
      <div>
        <q-badge class="absolute-top-left"  outline color="primary" >
          Content
        </q-badge>
      </div>
      <q-item-section clickable v-ripple
                      class="cursor-pointer"
      >
        <q-item-section>
          <q-item-label class="" :lines="2">
            {{itemm.message}}
          </q-item-label>
        </q-item-section>
        <q-popup-edit
          color="primary"
          v-model="itemm.message"
           v-slot="scope"
           class="q-pa-none mdi-border-radius"
        style="border-radius: 20px;padding: 3px">
          <q-input
            class="mdi-border-radius"
            style="border-radius: 10px"
            type="textarea"
            rounded
            borderless
            dense
            autofocus counter
            @keyup.enter.stop
            v-model="scope.value">
<!--            <template v-slot:append>-->
              <q-btn dense rounded flat
                     color="purple"
                     class="absolute-bottom-right text-red-1"
                     icon="save"
                     v-ripple
                     @click="saveitem(itemm,scope)"></q-btn>
<!--            </template>-->
          </q-input>
        </q-popup-edit>
      </q-item-section>
    </q-item>

    <q-item class="q-pa-none q-ma-none">
      <q-item-section>
        <div>
          <q-field rounded
                   outlined
                   dense
                    style="align-content: center">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{itemm.endTime}}</div>
            </template>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale" class="mdi-border-radius" style="border-radius: 2rem">
                  <q-date v-model="itemm.endTime" mask="YYYY-MM-DD HH:mm">
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale" class="mdi-border-radius" style="border-radius: 2rem">
                  <q-time
                    v-model="itemm.endTime"
                    mask="YYYY-MM-DD HH:mm"
                    now-btn class="mdi-border-radius">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Save" color="primary" flat @click="updateitem(itemm)"/>
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-field>
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
        <q-item clickable @click="this.$emit('call-deletefun',this.$props.index)">
          <q-item-section>Delete</q-item-section>
        </q-item>
        <q-item clickable @click="this.$emit('call-stopfun',itemm,this.$props.index)">
          <q-item-section>Stop</q-item-section>
        </q-item>
        <q-item clickable @click="this.$emit('call-restartfun',itemm,this.$props.index)">
          <q-item-section>Restart</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-badge  :color="this.getcolor(itemm)" class="q-ma-sm absolute-top-left">

    </q-badge>
  </q-card>
</template>
<script>
import { date } from 'quasar'
import { thingStore } from 'stores/thing-store'
import { reactive, ref } from 'vue'
export default {
  name: 'ThingCard',
  props: {
    index: { type: Number, default: 1 },
    item: {
      type: Object,
      default () {
        return {
          id: { type: String, default: 'id' },
          alertToken: { type: String, default: 'token' },
          startTime: { type: String, default: 'sTime' },
          endTime: { type: String, default: 'eTime' },
          message: { type: String, default: 'message' },
          name: { type: String, default: 'name' },
          status: { type: String, default: 'Running' },
          tag: { type: String, default: 'tag' },
          type: { type: Number, default: 10 },
          userid: { type: String, default: 'userid' }
        }
      }

    }
  },
  setup () {
    const thingstore = thingStore()
    return {
      thingstore
    }
  },
  methods: {
    enterCard (evt) {
      evt.target.style.borderRadius = '20px'
    },
    leaveCard (evt) {
      evt.target.style.borderRadius = '10px'
    },
    spliceTimeString: function () {
      return (this.getProgressByEndAndStart(this.itemm) * 100).toString().slice(0, 4)
    },
    getprogresscolor: function () {
      if (this.getProgressByEndAndStart(this.itemm) > 0.8) return 'red'
      else if (this.getProgressByEndAndStart(this.itemm) > 0.6) return 'orange'
      else return 'green'
    },
    async updateitem () {
      await this.thingstore.updatething(this.itemm)
      this.refresh()
    },
    saveitem (item, scope) {
      this.itemm.message = scope.value
      this.updateitem(this.itemm)
    },
    getDateDiffHours (end) {
      const datee = Date.now()
      const fmtdate = date.formatDate(datee, 'YYYY-MM-DD HH:mm')
      const diffhours = date.getDateDiff(end, fmtdate, 'hours')
      if (diffhours < 0) return 'Expired'
      return diffhours > 48 ? (diffhours / 24).toFixed(1) + 'D' : diffhours + 'H'
    },
    getcolor () {
      if (this.itemm.status === 'Running') return 'green'
      else if (this.itemm.status === 'Expired') return 'grey'
      else return 'orange'
    },
    getProgressByEndAndStart: function () {
      const noww = Date.now()
      const formatedate = date.formatDate(noww, 'YYYY-MM-DD HH:mm')
      return date.getDateDiff(formatedate, this.itemm.startTime, 'minutes') / date.getDateDiff(this.itemm.endTime, this.itemm.startTime, 'minutes')
    }
  },
  data: function () {
    return {
      itemm: this.$props.item
    }
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
