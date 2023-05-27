<template>
    <q-card class="mycard row q-ma-sm rounded-borders inset-shadow-down" v-ripple style="
    height: 40%;
    width: 60%;
    border-radius: 20px;
    box-shadow: 0 0 10px 2px #bdcee0;
    transform-style: preserve-3d;
    transition: all .3s ease-in-out;
    perspective: 100px;
    cursor: auto;
    background-image:linear-gradient(0deg,#a18cd1 0%, #fbc2eb 100%)"
    >
      <div class="q-pa-md" style="max-width: 70%;">
          <div class="text-h3 text-bold title ellipsis" >
            <div class="ellipsis">{{ $props.title }}</div>
          </div>
          <q-separator color="orange"
                       style="width: 0;
                       height: 10px;
                       overflow: hidden;
                       transition: all .3s ease-in-out;
                       border-radius: 10px"
                       class="sepr"
          />
          <div class="text-subtitle2 q-ma-none q-pa-none">
            Create By {{$props.creator}}
          </div>
        <q-card-section class="q-pt-none column" style="flex: auto;">
          <q-item dense class="q-pa-none">
            <q-item-section class="q-pa-none">
              <q-item-label class="wrap text-h6" :lines="4" style="">
                {{$props.content}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

      </div>
      <q-space></q-space>
      <q-card-section style="width: 30%;" class=" column items-end ">
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

      </q-card-section>
      <div class="absolute-bottom-right q-ma-sm " style="background-color: #00ae9e;overflow: hidden;border-radius: 15px;max-width: 25px;max-height: 25px">
        {{$props.views}}
      </div>
    </q-card>
    <q-menu
      touch-position
      context-menu
      transition-show="flip-right"
      transition-hide="flip-left">
      <q-list dense style="max-width: 100px">
        <q-item dense clickable>
          <q-item-section @click="$emit('call-delete',$props.id)">Delete</q-item-section>
        </q-item>
        <q-item dense clickable>
          <q-item-section @click="$emit('call-edit',$props.id)">Edit</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

</template>

<script>
export default {
  name: 'NoteCard',
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
      type: String,
      default: 'title'
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
    edit (index) {

    },
    deletecard (index) {

    }
  },
  mounted () {
    console.log(this.$props.index)
  },
  computed () {

  },
  watch () {

  }
}
</script>

<style scoped>
</style>
