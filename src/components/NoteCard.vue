<template>
    <q-card
    class=" mycard q-ma-md cursor-pointer"
    v-ripple.early
    style="
    display: flex;
    height: 40%;
    width: 60%;
    min-height: 150px;
    min-width: 335px;
    border-radius: 20px;
    transform-style: preserve-3d;
    transition: all .3s;
    perspective: 100px;"
    @click="watchnote($props.noteid)"
    >
      <div class="q-pa-md" style="display:flex;flex-direction:column;pointer-events: none;max-width: 60%">
          <div class="text-h5 text-bold q-py-sm ellipsis" style="max-width: 100%;display: flex" >
            <div style="max-width: 100%" class="ellipsis tti">
              {{ $props.title }}
          </div>
          </div>
          <q-separator color="orange"
                       style="width: 10px;
                       height: 10px;
                       overflow: hidden;
                       transition: all .3s ease-in-out;
                       border-radius: 10px"
                       class="sepr"
          />
          <div class="text-subtitle2 q-ma-none q-pa-none">
            Create By {{$props.creator}}
          </div>
        <q-card-section class="q-pa-none" style="">
          <q-item dense class="q-pa-none">
            <q-item-section class="q-pa-none">
              <q-item-label class="wrap text-body1" :lines="4" style="">
                {{$props.content}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
      </div>
      <q-card-section style="flex: auto;pointer-events: none" class="column items-end q-pa-md">
        <div>
          <q-badge :floating="false" style="overflow: hidden;border-radius: 15px">
            <!--              <q-icon name="event" size="5px" style="margin-right: 3px"></q-icon>-->
            {{ $props.createdTime }}
          </q-badge>
        </div>
        <div>
          <q-badge :floating="false" style="overflow: hidden;border-radius: 15px">

            {{ $props.editTime }}
          </q-badge>
        </div>
        <div>
          <q-badge :floating="false" style="overflow: hidden;border-radius: 15px">

            {{ $props.tag }}
          </q-badge>
        </div><div>
        <q-badge :floating="false" style="overflow: hidden;border-radius: 15px">
          {{ $props.type }}
        </q-badge>
      </div>
        <q-badge rounded align="middle" class="absolute-bottom-right q-mr-md q-mb-sm"
                 style="background-color: rgba(0,99,194,0.84);padding: 2px">
          {{$props.views}}
        </q-badge>
      </q-card-section>

    </q-card>
    <q-menu
      touch-position
      context-menu
      transition-show="flip-right"
      transition-hide="flip-left">
      <q-list dense style="max-width: 100px">
        <q-item dense clickable>
          <q-item-section @click="$emit('call-delete',$props.noteid)">Delete</q-item-section>
        </q-item>
        <q-item dense clickable>
          <q-item-section @click="$emit('call-edit',$props.noteid)">Edit</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
</template>
<script>
import { useRouter } from 'vue-router'

export default {
  name: 'NoteCard',
  setup (options) {
    const router = useRouter()
    return {
      router
    }
  },
  emits: [
    'call-delete',
    'call-edit'
  ],
  props: {
    title: {
      type: String,
      default: 'title'
    },
    creator: {
      type: String,
      default: 'title'
    },
    content: {
      type: String,
      default: 'title'
    },
    views: {
      type: Number,
      default: 0
    },
    createdTime: {
      type: String,
      default: 'title'
    },
    editTime: {
      type: String,
      default: 'title'
    },
    tag: {
      type: String,
      default: 'title'
    },
    type: {
      type: String,
      default: 'title'
    },
    index: {
      type: Number,
      default: 99
    },
    id: {
      type: String,
      default: 'null'
    },
    noteid: {
      type: String,
      default: 'noteid'
    }
  },
  created () {
    return {

    }
  },
  data: function () {
    return {
      testdata: {
        title: 'title',
        creator: 'creator',
        editTime: 'kast',
        createdTime: 'crtime',
        view: 22,
        tag: 'tag',
        type: 'type'
      },
      hover_dom: ''
    }
  },
  methods: {
    watchnote (noteid) {
      setTimeout(() => {
        this.router.push('/note/preview/' + noteid)
      }, 200)
    },
    edit (index) {

    },
    deletecard (index) {

    }
  },
  mounted () {
    // console.log(this.$props.index)
  },
  computed () {

  },
  watch () {

  }
}
</script>

<style scoped>
.mycard{
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(0px);
}
.mycard:hover{
  backdrop-filter: blur(10px);
}
</style>
