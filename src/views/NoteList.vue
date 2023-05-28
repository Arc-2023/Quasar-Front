<template>
<q-page-container>
  <q-page class="" style="display: flex;flex-direction: column;">
    <q-list>
      <div v-for="(item,index) in notelist" :key="index" class="flex justify-center">
        <NoteCard
          :id="item.id"
          :index =index
          :noteid="item.noteid"
          :title="item.title"
          :creator="item.creator"
          :content="item.content"
          :created-time="item.createdTime"
          :editTime="item.editTime"
          :tag="item.tag"
          :type="item.type"
          :views="item.view"
          @call-edit="edit"
          @call-delete="deletecard"

        >
        </NoteCard>
      </div>

    </q-list>

    <q-page-sticky
      position="bottom-left">
      <q-btn fab class="q-ma-sm bg-blue"><q-icon name="add" @click="this.drawerstate = !this.drawerstate"></q-icon></q-btn>
    </q-page-sticky>
  </q-page>

  <q-drawer
    show-if-above
    :breakpoint="200"
   side="right"
   v-model="this.drawerstate"
    class="q-pa-sm align-left"
    style="display: flex;flex-direction: column;align-items: center"
  >
    <q-input
      rounded
      outlined
      dense
      v-model="search_content"
      label="Type to Search"
      class="self-stretch q-ma-sm"
      >
      <template v-slot:append>
        <q-icon style="overflow: hidden;border-radius: 50%" name="search" v-ripple @click="this.search"></q-icon>
      </template>
    </q-input>
    <div style="align-self: end" class="q-ma-sm flex reverse wrap">
      <div v-for="(data,index) in tagSet" :key="index" @click="this.activated_tag(index)"
        >

        <q-badge  rounded  class="q-mr-sm text-body2 cursor-pointer " v-ripple style="transition: all .5s">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
          <q-icon v-show="isactivated(data)" name="done" class="q-mr-sm "/>
          </transition>
          {{data}}
        </q-badge>
      </div>

    </div>
  </q-drawer>
</q-page-container>
</template>

<script>
import NoteCard from 'components/NoteCard.vue'
import { noteStore } from 'stores/note-store'
import { Notify } from 'quasar'
import { ref } from 'vue'
import { createRouter as $router } from 'vue-router/dist/vue-router.esm-browser'
import { useRouter } from 'vue-router'

export default {
  name: 'NoteList',
  components: { NoteCard },
  setup () {
    const notestore = noteStore()
    const tagSet = ref([])
    const tagSetActivtivated = ref([])
    const router = useRouter()

    return {
      notestore,
      tagSet,
      tagSetActivtivated,
      router
    }
  },
  data () {
    return {
      notelist: [
        {
          title: 'titlessssssssssssss',
          creator: 'creator',
          editTime: 'kast',
          createdTime: 'crtime',
          view: 22,
          tag: 'tag1',
          type: 'type',
          content: 'content',
          id: 's1'
        }
      ],
      menu_delete_morph: 'menu',
      drawerstate: true,
      search_content: ''
    }
  },
  methods: {
    edit (noteid) {
      Notify.create('edit: ' + noteid)
      this.router.push('/note/edit/' + noteid)
    },
    deletecard (noteid) {
      Notify.create('delete: ' + noteid)
    },
    search () {

    },
    isactivated (tag) {
      return this.tagSetActivtivated.some(function (tagchecking) {
        return tagchecking === tag
      })
    },
    activated_tag (index) {
      const actingtag = this.tagSet[index]
      if (!this.tagSetActivtivated.some(function (tagchecking, index) {
        return tagchecking === actingtag
      })) {
        this.tagSetActivtivated.push(actingtag)
      } else {
        for (let i = 0; i < this.tagSetActivtivated.length; ++i) {
          if (this.tagSetActivtivated[i] === actingtag) {
            this.tagSetActivtivated.splice(i, 1)
          }
        }
      }
    }
  },
  computed: {
  },
  mounted () {
    this.notestore.getnotecards()
      .then((res) => {
        this.notelist = res
        // console.log('notelist', this.notelist)
        setTimeout(() => {
          const cards = document.getElementsByClassName('mycard')
          for (let i = 0; i < cards.length; i++) {
            console.log(i)
            const element = cards[i]
            addMouseOverListener(element)
            addMouseLeaveListener(element)
            addMouseEnterListener(element)
          }
          const a = []

          this.notelist = Array.from(this.notelist)
          this.notelist.forEach((data) => [
            a.push(data.tag)
          ])
          this.tagSet = Array.from(new Set(a))
        }, 0)
      })
    function addMouseOverListener (element) {
      element.addEventListener('mouseover', (event) => {
        const rect = element.getBoundingClientRect()
        const rotateX = (event.x - (rect.x + rect.width / 2)) / 30
        const rotateY = (event.y - (rect.y + rect.height / 2)) / 30
        window.requestAnimationFrame(function () {
          element.style.transform =
            'translate(' + rotateX / 2 + 'px,' + rotateY + 'px) '
        })
      })
    }

    function addMouseLeaveListener (element) {
      element.addEventListener('mouseleave', (event) => {
        element.style.transform = 'rotateX(0) rotateY(0) translate(0,0)'
        element.getElementsByClassName('sepr')[0]
          .style
          .width = 10 + 'px'
        element
          .style
          .borderRadius = '30px'
      })
    }

    function addMouseEnterListener (element) {
      element.addEventListener('mouseenter', (event) => {
        element.getElementsByClassName('sepr')[0]
          .style
          .width = element.getElementsByClassName('title')[0].getBoundingClientRect().width + 'px'
        element
          .style
          .borderRadius = '40px'
      })
    }
  }
}
</script>

<style scoped>

</style>
